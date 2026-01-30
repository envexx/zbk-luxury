import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

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

// GET /api/stripe/receipt?session_id=xxx or ?booking_id=xxx
export async function GET(request: NextRequest) {
  const startTime = Date.now()
  console.log('🟣 [STRIPE RECEIPT] ==========================================')
  console.log('🟣 [STRIPE RECEIPT] Request received at:', new Date().toISOString())
  
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    const bookingId = searchParams.get('booking_id')

    console.log('🟣 [STRIPE RECEIPT] Request params:', { sessionId, bookingId })

    if (!sessionId && !bookingId) {
      console.error('❌ [STRIPE RECEIPT] Missing sessionId and bookingId')
      return NextResponse.json(
        { error: 'Session ID or Booking ID is required' },
        { status: 400 }
      )
    }

    let booking
    let session: Stripe.Checkout.Session | null = null

    // Get booking first
    if (bookingId) {
      console.log('🟣 [STRIPE RECEIPT] Fetching booking by ID:', bookingId)
      booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          vehicle: {
            select: {
              name: true,
              model: true,
              plateNumber: true
            }
          }
        }
      })

      if (!booking) {
        console.error('❌ [STRIPE RECEIPT] Booking not found:', bookingId)
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }

      console.log('✅ [STRIPE RECEIPT] Booking found:', {
        bookingId: booking.id,
        customerEmail: booking.customerEmail,
        totalAmount: booking.totalAmount,
        stripeSessionId: booking.stripeSessionId
      })

      // Get session from booking
      if (booking.stripeSessionId) {
        console.log('🟣 [STRIPE RECEIPT] Retrieving session from Stripe:', booking.stripeSessionId)
        try {
          session = await stripe.checkout.sessions.retrieve(booking.stripeSessionId)
          console.log('✅ [STRIPE RECEIPT] Session retrieved')
        } catch (error) {
          console.error('❌ [STRIPE RECEIPT] Error retrieving session:', error)
        }
      }
    } else if (sessionId) {
      console.log('🟣 [STRIPE RECEIPT] Fetching session by ID:', sessionId)
      // Get session from Stripe
      try {
        session = await stripe.checkout.sessions.retrieve(sessionId)
        console.log('✅ [STRIPE RECEIPT] Session retrieved:', {
          sessionId: session.id,
          paymentStatus: session.payment_status
        })
      } catch (error) {
        console.error('❌ [STRIPE RECEIPT] Invalid session ID:', sessionId)
        return NextResponse.json(
          { error: 'Invalid session ID' },
          { status: 404 }
        )
      }

      // Get booking from session metadata
      const bookingIdFromSession = session.metadata?.bookingId
      if (bookingIdFromSession) {
        console.log('🟣 [STRIPE RECEIPT] Fetching booking from session metadata:', bookingIdFromSession)
        booking = await prisma.booking.findUnique({
          where: { id: bookingIdFromSession },
          include: {
            vehicle: {
              select: {
                name: true,
                model: true,
                plateNumber: true
              }
            }
          }
        })
        if (booking) {
          console.log('✅ [STRIPE RECEIPT] Booking found from session metadata')
        }
      }
    }

    if (!booking) {
      console.error('❌ [STRIPE RECEIPT] Booking not found')
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Get payment intent details if available
    let paymentIntent: Stripe.PaymentIntent | null = null
    if (session?.payment_intent) {
      console.log('🟣 [STRIPE RECEIPT] Retrieving payment intent:', session.payment_intent)
      try {
        if (typeof session.payment_intent === 'string') {
          paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
          console.log('✅ [STRIPE RECEIPT] Payment intent retrieved:', paymentIntent.id)
        }
      } catch (error) {
        console.error('❌ [STRIPE RECEIPT] Error retrieving payment intent:', error)
      }
    }

    // Get charge details if available
    let charge: Stripe.Charge | null = null
    if (paymentIntent?.latest_charge) {
      console.log('🟣 [STRIPE RECEIPT] Retrieving charge:', paymentIntent.latest_charge)
      try {
        if (typeof paymentIntent.latest_charge === 'string') {
          charge = await stripe.charges.retrieve(paymentIntent.latest_charge)
          console.log('✅ [STRIPE RECEIPT] Charge retrieved:', charge.id)
        }
      } catch (error) {
        console.error('❌ [STRIPE RECEIPT] Error retrieving charge:', error)
      }
    }

    console.log('🟣 [STRIPE RECEIPT] Formatting receipt data...')
    // Format receipt data
    const receipt = {
      receiptNumber: session?.id || booking.id,
      transactionId: paymentIntent?.id || session?.payment_intent || booking.stripePaymentId || 'N/A',
      bookingId: booking.id,
      paymentDate: session?.created ? new Date(session.created * 1000).toISOString() : booking.updatedAt.toISOString(),
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      vehicle: {
        name: booking.vehicle.name,
        model: booking.vehicle.model,
        plateNumber: booking.vehicle.plateNumber
      },
      service: booking.service,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
      pickupNote: (booking as any).pickupNote || null,
      dropoffNote: (booking as any).dropoffNote || null,
      startDate: booking.startDate.toISOString(),
      startTime: booking.startTime,
      duration: booking.duration,
      totalAmount: booking.totalAmount,
      depositAmount: booking.depositAmount || 0,
      amountPaid: session?.amount_total ? session.amount_total / 100 : (booking.depositAmount || 0),
      currency: session?.currency?.toUpperCase() || 'USD',
      paymentStatus: booking.paymentStatus,
      paymentMethod: charge?.payment_method_details?.type || session?.payment_method_types?.[0] || 'card',
      cardBrand: charge?.payment_method_details?.card?.brand || null,
      cardLast4: charge?.payment_method_details?.card?.last4 || null,
      status: booking.status,
      stripeSessionUrl: session?.url || null,
      invoiceUrl: charge?.receipt_url || 
        (typeof session?.invoice === 'object' && session.invoice !== null 
          ? (session.invoice as Stripe.Invoice).hosted_invoice_url || null
          : null)
    }

    const duration = Date.now() - startTime
    console.log('✅ [STRIPE RECEIPT] Receipt generated successfully')
    console.log('🟣 [STRIPE RECEIPT] Receipt summary:', {
      receiptNumber: receipt.receiptNumber,
      transactionId: receipt.transactionId,
      amountPaid: receipt.amountPaid,
      currency: receipt.currency,
      paymentStatus: receipt.paymentStatus
    })
    console.log('🟣 [STRIPE RECEIPT] Processing time:', duration + 'ms')
    console.log('🟣 [STRIPE RECEIPT] ==========================================')

    return NextResponse.json({
      success: true,
      data: receipt
    })

  } catch (error: any) {
    const duration = Date.now() - startTime
    console.error('❌ [STRIPE RECEIPT] ==========================================')
    console.error('❌ [STRIPE RECEIPT] Error generating receipt')
    console.error('❌ [STRIPE RECEIPT] Error type:', error.type || error.constructor.name)
    console.error('❌ [STRIPE RECEIPT] Error message:', error.message)
    console.error('❌ [STRIPE RECEIPT] Error stack:', error.stack)
    console.error('❌ [STRIPE RECEIPT] Processing time:', duration + 'ms')
    console.error('❌ [STRIPE RECEIPT] ==========================================')
    return NextResponse.json(
      { error: error.message || 'Failed to generate receipt' },
      { status: 500 }
    )
  }
}

