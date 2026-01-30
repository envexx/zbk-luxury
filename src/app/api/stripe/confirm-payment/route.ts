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

// POST /api/stripe/confirm-payment - Confirm payment from success page (fallback if webhook hasn't fired)
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  console.log('🟡 [STRIPE CONFIRM] ==========================================')
  console.log('🟡 [STRIPE CONFIRM] Request received at:', new Date().toISOString())
  
  try {
    const body = await request.json()
    const { sessionId, bookingId } = body

    console.log('🟡 [STRIPE CONFIRM] Request body:', { sessionId, bookingId })

    if (!sessionId && !bookingId) {
      console.error('❌ [STRIPE CONFIRM] Missing sessionId and bookingId')
      return NextResponse.json(
        { error: 'Session ID or Booking ID is required' },
        { status: 400 }
      )
    }

    let booking
    let session: Stripe.Checkout.Session | null = null

    // Get booking first
    if (bookingId) {
      console.log('🟡 [STRIPE CONFIRM] Fetching booking by ID:', bookingId)
      booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          vehicle: true
        }
      })

      if (!booking) {
        console.error('❌ [STRIPE CONFIRM] Booking not found:', bookingId)
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }

      console.log('✅ [STRIPE CONFIRM] Booking found:', {
        bookingId: booking.id,
        paymentStatus: booking.paymentStatus,
        status: booking.status,
        stripeSessionId: booking.stripeSessionId
      })

      // If already paid, return success
      if (booking.paymentStatus === 'PAID') {
        console.log('✅ [STRIPE CONFIRM] Payment already confirmed')
        return NextResponse.json({
          success: true,
          message: 'Payment already confirmed',
          booking: {
            id: booking.id,
            paymentStatus: booking.paymentStatus,
            status: booking.status
          }
        })
      }

      // Get session from booking
      if (booking.stripeSessionId) {
        console.log('🟡 [STRIPE CONFIRM] Retrieving session from Stripe:', booking.stripeSessionId)
        try {
          session = await stripe.checkout.sessions.retrieve(booking.stripeSessionId)
          console.log('✅ [STRIPE CONFIRM] Session retrieved:', {
            sessionId: session.id,
            paymentStatus: session.payment_status,
            status: session.status
          })
        } catch (error) {
          console.error('❌ [STRIPE CONFIRM] Error retrieving session:', error)
        }
      } else {
        console.warn('⚠️ [STRIPE CONFIRM] No stripeSessionId in booking')
      }
    } else if (sessionId) {
      console.log('🟡 [STRIPE CONFIRM] Fetching session by ID:', sessionId)
      // Get session from Stripe
      try {
        session = await stripe.checkout.sessions.retrieve(sessionId)
        console.log('✅ [STRIPE CONFIRM] Session retrieved:', {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          status: session.status,
          bookingId: session.metadata?.bookingId
        })
      } catch (error) {
        console.error('❌ [STRIPE CONFIRM] Invalid session ID:', sessionId)
        return NextResponse.json(
          { error: 'Invalid session ID' },
          { status: 404 }
        )
      }

      // Get booking from session metadata
      const bookingIdFromSession = session.metadata?.bookingId
      if (bookingIdFromSession) {
        console.log('🟡 [STRIPE CONFIRM] Fetching booking from session metadata:', bookingIdFromSession)
        booking = await prisma.booking.findUnique({
          where: { id: bookingIdFromSession },
          include: {
            vehicle: true
          }
        })
        if (booking) {
          console.log('✅ [STRIPE CONFIRM] Booking found from session metadata')
        }
      }
    }

    if (!booking) {
      console.error('❌ [STRIPE CONFIRM] Booking not found')
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Check if payment is actually successful
    if (session) {
      console.log('🟡 [STRIPE CONFIRM] Checking payment status...')
      console.log('🟡 [STRIPE CONFIRM] Session payment status:', session.payment_status)
      console.log('🟡 [STRIPE CONFIRM] Session status:', session.status)
      
      // Only update if session is completed and payment is successful
      if (session.payment_status === 'paid' && session.status === 'complete') {
        console.log('✅ [STRIPE CONFIRM] Payment is successful, updating booking...')
        
        // Get payment intent details
        let paymentIntent: Stripe.PaymentIntent | null = null
        if (session.payment_intent) {
          console.log('🟡 [STRIPE CONFIRM] Retrieving payment intent:', session.payment_intent)
          try {
            if (typeof session.payment_intent === 'string') {
              paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
              console.log('✅ [STRIPE CONFIRM] Payment intent retrieved:', paymentIntent.id)
            }
          } catch (error) {
            console.error('❌ [STRIPE CONFIRM] Error retrieving payment intent:', error)
          }
        }

        console.log('🟡 [STRIPE CONFIRM] Updating booking payment status...')
        // Update booking payment status
        const updatedBooking = await prisma.booking.update({
          where: { id: booking.id },
          data: {
            paymentStatus: 'PAID',
            status: 'CONFIRMED',
            stripePaymentId: paymentIntent?.id || session.payment_intent as string || booking.stripePaymentId || undefined
          },
          include: {
            vehicle: true
          }
        })

        console.log('✅ [STRIPE CONFIRM] Payment confirmed via fallback endpoint')
        console.log('🟡 [STRIPE CONFIRM] Booking updated:', {
          bookingId: updatedBooking.id,
          paymentStatus: updatedBooking.paymentStatus,
          status: updatedBooking.status,
          stripePaymentId: updatedBooking.stripePaymentId
        })

        // Send confirmation emails (same as webhook)
        console.log('🟡 [STRIPE CONFIRM] Sending confirmation emails...')
        try {
          const formattedDate = updatedBooking.startDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })

          // Send confirmation email to customer
          console.log('🟡 [STRIPE CONFIRM] Preparing customer email...')
          const customerTemplate = emailTemplates.bookingConfirmation(
            updatedBooking.customerName,
            updatedBooking.id,
            updatedBooking.vehicle.name,
            formattedDate,
            updatedBooking.pickupLocation,
            updatedBooking.startTime,
            (updatedBooking as any).pickupNote || undefined,
            updatedBooking.dropoffLocation || undefined,
            (updatedBooking as any).dropoffNote || undefined
          )

          console.log('🟡 [STRIPE CONFIRM] Sending email to customer:', updatedBooking.customerEmail)
          await sendEmail({
            to: updatedBooking.customerEmail,
            subject: customerTemplate.subject,
            html: customerTemplate.html
          })
          console.log('✅ [STRIPE CONFIRM] Customer email sent')

          // Send notification to admin (always zbklimo@gmail.com)
          console.log('🟡 [STRIPE CONFIRM] Preparing admin notification...')
          const adminTemplate = emailTemplates.adminNotification(
            updatedBooking.id,
            updatedBooking.customerName,
            updatedBooking.customerEmail,
            updatedBooking.customerPhone,
            updatedBooking.vehicle.name,
            updatedBooking.vehicle.model || '',
            updatedBooking.service,
            formattedDate,
            updatedBooking.startTime,
            updatedBooking.pickupLocation,
            updatedBooking.dropoffLocation || '',
            updatedBooking.duration,
            updatedBooking.totalAmount,
            updatedBooking.notes || undefined,
            (updatedBooking as any).serviceType || undefined,
            (updatedBooking as any).pickupNote || undefined,
            (updatedBooking as any).dropoffNote || undefined
          )

          const adminEmail = 'zbklimo@gmail.com'
          console.log('🟡 [STRIPE CONFIRM] Sending email to admin:', adminEmail)
          await sendEmail({
            to: adminEmail,
            subject: adminTemplate.subject,
            html: adminTemplate.html
          })
          console.log('✅ [STRIPE CONFIRM] Admin notification sent')

          console.log('✅ [STRIPE CONFIRM] Confirmation emails sent')
          console.log('🟡 [STRIPE CONFIRM]   - Customer email sent to:', updatedBooking.customerEmail)
          console.log('🟡 [STRIPE CONFIRM]   - Admin notification sent to:', adminEmail)
        } catch (emailError) {
          console.error('❌ [STRIPE CONFIRM] Failed to send confirmation emails')
          console.error('❌ [STRIPE CONFIRM] Email error:', emailError)
          console.error('❌ [STRIPE CONFIRM] Error stack:', (emailError as any)?.stack)
          // Don't fail the payment confirmation if email fails
        }

        const duration = Date.now() - startTime
        console.log('✅ [STRIPE CONFIRM] Payment confirmed successfully')
        console.log('🟡 [STRIPE CONFIRM] Processing time:', duration + 'ms')
        console.log('🟡 [STRIPE CONFIRM] ==========================================')

        return NextResponse.json({
          success: true,
          message: 'Payment confirmed successfully',
          booking: {
            id: updatedBooking.id,
            paymentStatus: updatedBooking.paymentStatus,
            status: updatedBooking.status
          }
        })
      } else {
        // Payment not completed yet
        console.warn('⚠️ [STRIPE CONFIRM] Payment not completed yet')
        console.warn('⚠️ [STRIPE CONFIRM] Payment status:', session.payment_status)
        console.warn('⚠️ [STRIPE CONFIRM] Session status:', session.status)
        return NextResponse.json({
          success: false,
          message: 'Payment not completed yet',
          paymentStatus: session.payment_status,
          sessionStatus: session.status
        }, { status: 400 })
      }
    } else {
      // No session found, but booking exists
      console.warn('⚠️ [STRIPE CONFIRM] No payment session found for this booking')
      console.warn('⚠️ [STRIPE CONFIRM] Booking:', {
        id: booking.id,
        paymentStatus: booking.paymentStatus,
        status: booking.status
      })
      return NextResponse.json({
        success: false,
        message: 'No payment session found for this booking',
        booking: {
          id: booking.id,
          paymentStatus: booking.paymentStatus,
          status: booking.status
        }
      }, { status: 400 })
    }

  } catch (error: any) {
    const duration = Date.now() - startTime
    console.error('❌ [STRIPE CONFIRM] ==========================================')
    console.error('❌ [STRIPE CONFIRM] Error confirming payment')
    console.error('❌ [STRIPE CONFIRM] Error type:', error.type || error.constructor.name)
    console.error('❌ [STRIPE CONFIRM] Error message:', error.message)
    console.error('❌ [STRIPE CONFIRM] Error stack:', error.stack)
    console.error('❌ [STRIPE CONFIRM] Processing time:', duration + 'ms')
    console.error('❌ [STRIPE CONFIRM] ==========================================')
    return NextResponse.json(
      { error: error.message || 'Failed to confirm payment' },
      { status: 500 }
    )
  }
}

