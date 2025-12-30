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

// POST /api/stripe/webhook
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
    
    // Verify webhook signature (in production, use your webhook secret)
    // For development, we'll skip verification if no secret is set
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } else {
      // For development/testing, parse the event without verification
      event = JSON.parse(body) as Stripe.Event
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const bookingId = session.metadata?.bookingId

      if (!bookingId) {
        console.error('No booking ID in session metadata')
        return NextResponse.json({ error: 'No booking ID found' }, { status: 400 })
      }

      // Update booking payment status
      const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
          stripePaymentId: session.payment_intent as string || undefined
        },
        include: {
          vehicle: true
        }
      })

      // Format date for email
      const formattedDate = booking.startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Send confirmation email to customer
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

        // Send notification to admin (always zbklimo@gmail.com)
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

        const adminEmail = 'zbklimo@gmail.com' // Admin email is always zbklimo@gmail.com
        await sendEmail({
          to: adminEmail,
          subject: adminTemplate.subject,
          html: adminTemplate.html
        })

        console.log('✅ Payment confirmed and emails sent')
        console.log(`   - Customer email sent to: ${booking.customerEmail}`)
        console.log(`   - Admin notification sent to: ${adminEmail}`)
      } catch (emailError) {
        console.error('❌ Failed to send payment confirmation emails:', emailError)
        // Don't fail the webhook if email fails
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
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

