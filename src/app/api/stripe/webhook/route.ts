import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { sendEmail, emailTemplates } from '@/lib/email'

// Get and validate Stripe secret key
const getStripeSecretKey = (): string => {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set')
  }
  if (!key.startsWith('sk_')) {
    throw new Error('Invalid Stripe secret key. Must start with "sk_"')
  }
  return key
}

const stripe = new Stripe(getStripeSecretKey(), {
  apiVersion: '2025-11-17.clover',
})

// Disable body parsing, need raw body for webhook signature verification
export const runtime = 'nodejs'

// Allow CORS for Stripe webhook
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
    },
  })
}

// POST /api/stripe/webhook
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      console.error('❌ [WEBHOOK] No signature provided')
      return NextResponse.json(
        { error: 'No signature provided' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
          },
        }
      )
    }

    let event: Stripe.Event

    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
      
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      } else {
        console.warn('⚠️ [WEBHOOK] No webhook secret - parsing without verification (DEV MODE)')
        event = JSON.parse(body) as Stripe.Event
      }
    } catch (err: any) {
      console.error('❌ [WEBHOOK] Signature verification failed:', err.message)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
          },
        }
      )
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const bookingId = session.metadata?.bookingId

      if (!bookingId) {
        console.error('❌ [WEBHOOK] No booking ID in session metadata')
        return NextResponse.json({ error: 'No booking ID found' }, { status: 400 })
      }

      // Check if booking exists and current status
      const existingBooking = await prisma.booking.findUnique({
        where: { id: bookingId },
        select: {
          id: true,
          paymentStatus: true,
          status: true,
          stripePaymentId: true
        }
      })
      
      if (!existingBooking) {
        console.error('❌ [WEBHOOK] Booking not found:', bookingId)
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
      }
      
      // Skip update if already paid (idempotent)
      if (existingBooking.paymentStatus === 'PAID' && existingBooking.status === 'CONFIRMED') {
        return NextResponse.json({ received: true, message: 'Booking already confirmed' }, { status: 200 })
      }
      
      // Update booking payment status - ensure atomic update
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
          stripePaymentId: session.payment_intent as string || existingBooking.stripePaymentId || undefined
        },
        include: {
          vehicle: true
        }
      })
      
      // Verify update was successful
      if (booking.paymentStatus !== 'PAID' || booking.status !== 'CONFIRMED') {
        throw new Error('Booking update verification failed')
      }
      
      console.log('✅ [WEBHOOK] Payment confirmed - Booking updated:', {
        bookingId: booking.id,
        paymentStatus: booking.paymentStatus,
        status: booking.status
      })

      // Format date for email
      const formattedDate = booking.startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Send confirmation emails
      try {
        const customerTemplate = emailTemplates.bookingConfirmation(
          booking.customerName,
          booking.id,
          booking.vehicle.name,
          formattedDate,
          booking.pickupLocation,
          booking.startTime,
          (booking as any).pickupNote || undefined,
          booking.dropoffLocation || undefined,
          (booking as any).dropoffNote || undefined
        )

        await sendEmail({
          to: booking.customerEmail,
          subject: customerTemplate.subject,
          html: customerTemplate.html
        })

        const adminTemplate = emailTemplates.adminNotification(
          booking.id,
          booking.customerName,
          booking.customerEmail,
          booking.customerPhone,
          booking.vehicle.name,
          booking.vehicle.model || '',
          booking.service,
          formattedDate,
          booking.startTime,
          booking.pickupLocation,
          booking.dropoffLocation || '',
          booking.duration,
          booking.totalAmount,
          booking.notes || undefined,
          (booking as any).serviceType || undefined,
          (booking as any).pickupNote || undefined,
          (booking as any).dropoffNote || undefined
        )

        await sendEmail({
          to: 'zbklimo@gmail.com',
          subject: adminTemplate.subject,
          html: adminTemplate.html
        })

        console.log('✅ [WEBHOOK] Confirmation emails sent')
      } catch (emailError) {
        console.error('❌ [WEBHOOK] Failed to send emails:', emailError)
      }
    } else if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object as Stripe.Checkout.Session
      const bookingId = session.metadata?.bookingId

      if (bookingId) {
        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            paymentStatus: 'FAILED'
          }
        })
        console.log('✅ [WEBHOOK] Payment failed - Booking updated:', bookingId)
      }
    } else if (event.type === 'payment_intent.succeeded') {
      // Fallback: Handle payment_intent.succeeded if checkout.session.completed didn't fire
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const bookingId = paymentIntent.metadata?.bookingId
      
      if (bookingId) {
        try {
          const existingBooking = await prisma.booking.findUnique({
            where: { id: bookingId },
            select: {
              id: true,
              paymentStatus: true,
              status: true
            }
          })
          
          if (!existingBooking) {
            console.error('❌ [WEBHOOK] Booking not found:', bookingId)
          } else if (existingBooking.paymentStatus !== 'PAID' || existingBooking.status !== 'CONFIRMED') {
            const booking = await prisma.booking.update({
              where: { id: bookingId },
              data: {
                paymentStatus: 'PAID',
                status: 'CONFIRMED',
                stripePaymentId: paymentIntent.id
              }
            })
            
            // Verify update was successful
            if (booking.paymentStatus !== 'PAID' || booking.status !== 'CONFIRMED') {
              throw new Error('Booking update verification failed')
            }
            
            console.log('✅ [WEBHOOK] Payment confirmed via payment_intent - Booking updated:', booking.id)
          }
        } catch (error) {
          console.error('❌ [WEBHOOK] Error updating booking from payment_intent:', error)
        }
      }
    }

    return NextResponse.json(
      { received: true },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
      }
    )
  } catch (error: any) {
    console.error('❌ [WEBHOOK] Error processing webhook:', error.message)
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
      }
    )
  }
}
