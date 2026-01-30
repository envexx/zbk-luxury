import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { calculateBookingPriceNew } from '@/utils/pricing'

// Helper function to get and validate Stripe secret key
const getStripeSecretKey = (): string => {
  const key = process.env.STRIPE_SECRET_KEY
  
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set. Please add it to your .env.local file.')
  }
  
  const trimmedKey = key.trim()
  
  if (!trimmedKey.startsWith('sk_')) {
    if (trimmedKey.startsWith('pk_')) {
      throw new Error('You are using a publishable key (pk_) instead of a secret key (sk_). Please use your secret key from Stripe Dashboard.')
    }
    throw new Error(`Invalid Stripe secret key. Secret keys must start with 'sk_'. Current key starts with '${trimmedKey.substring(0, 3)}'. Please check your STRIPE_SECRET_KEY in .env.local`)
  }
  
  return trimmedKey
}

// GET /api/stripe/create-checkout-session - Test endpoint
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Stripe checkout session endpoint is available',
    endpoint: '/api/stripe/create-checkout-session'
  })
}

// POST /api/stripe/create-checkout-session
export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    
    if (!secretKey) {
      console.error('❌ [CHECKOUT] STRIPE_SECRET_KEY is not set')
      return NextResponse.json(
        { 
          error: 'Stripe configuration error: STRIPE_SECRET_KEY is not set. Please add it to your .env.local file.',
          details: 'Add this line to your .env.local: STRIPE_SECRET_KEY=sk_test_...',
        },
        { status: 500 }
      )
    }
    
    const trimmedKey = secretKey.trim()
    
    if (!trimmedKey.startsWith('sk_')) {
      if (trimmedKey.startsWith('pk_')) {
        return NextResponse.json(
          { 
            error: 'Stripe configuration error: You are using a PUBLISHABLE key (pk_) instead of a SECRET key (sk_).',
            details: 'Please use your SECRET key from Stripe Dashboard. Secret keys start with "sk_test_" or "sk_live_"',
          },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'Stripe configuration error: Invalid secret key format. Secret keys must start with "sk_".',
          details: `Your key starts with "${trimmedKey.substring(0, 3)}" (length: ${trimmedKey.length}). Please check your STRIPE_SECRET_KEY in .env.local`,
        },
        { status: 500 }
      )
    }
    
    const body = await request.json()
    const { bookingId } = body

    if (!bookingId) {
      console.error('❌ [CHECKOUT] Booking ID is missing')
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    // Fetch booking from database
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        vehicle: true
      }
    })

    if (!booking) {
      console.error('❌ [CHECKOUT] Booking not found:', bookingId)
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Payment condition: Check if booking already has payment
    if ((booking as any).paymentStatus === 'PAID') {
      console.warn('⚠️ [CHECKOUT] Booking already paid:', bookingId)
      return NextResponse.json(
        { error: 'This booking has already been paid' },
        { status: 400 }
      )
    }

    // Payment condition: Check if booking is cancelled
    if (booking.status === 'CANCELLED') {
      console.warn('⚠️ [CHECKOUT] Booking is cancelled:', bookingId)
      return NextResponse.json(
        { error: 'Cannot process payment for cancelled booking' },
        { status: 400 }
      )
    }

    // Calculate total amount using new pricing logic
    const hoursMatch = booking.duration?.match(/\d+/);
    const hours = hoursMatch ? parseInt(hoursMatch[0]) : 0;
    
    // Get service type from booking (should be set from frontend)
    const serviceTypeFromBooking = (booking as any).serviceType as 'AIRPORT_TRANSFER' | 'TRIP' | 'RENTAL' | undefined;
    
    // Determine service type if not set
    let serviceType: 'AIRPORT_TRANSFER' | 'TRIP' | 'RENTAL' = serviceTypeFromBooking || 'RENTAL';
    
    if (!serviceTypeFromBooking) {
      // Fallback: Detect from service field (legacy support)
      const serviceStr = (booking.service || '').toUpperCase();
      const pickupLower = (booking.pickupLocation || '').toLowerCase();
      const dropoffLower = (booking.dropoffLocation || '').toLowerCase();
      
      const isOneWay = serviceStr.includes('ONE') || 
                       serviceStr.includes('ONE-WAY') || 
                       serviceStr.includes('TRIP') || 
                       serviceStr.includes('AIRPORT');
      
      if (isOneWay) {
        const { isAirportLocation } = await import('@/utils/pricing');
        const isAirportRelated = isAirportLocation(booking.pickupLocation || '') || isAirportLocation(booking.dropoffLocation || '');
        serviceType = isAirportRelated ? 'AIRPORT_TRANSFER' : 'TRIP';
      } else {
        serviceType = 'RENTAL';
      }
    }
    
    // Calculate price using new pricing logic
    const priceCalculation = calculateBookingPriceNew({
      vehicle: {
        priceAirportTransfer: booking.vehicle.priceAirportTransfer,
        price6Hours: booking.vehicle.price6Hours,
        price12Hours: booking.vehicle.price12Hours,
        pricePerHour: (booking.vehicle as any).pricePerHour
      },
      serviceType,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation || null,
      startTime: booking.startTime,
      startDate: booking.startDate,
      hours: serviceType === 'RENTAL' ? hours : 0
    });
    
    const subtotal = priceCalculation.subtotal;
    const midnightCharge = priceCalculation.midnightCharge;
    const finalTotal = priceCalculation.total;
    
    // Generate service label
    let serviceLabel = '';
    if (serviceType === 'AIRPORT_TRANSFER') {
      serviceLabel = 'Airport Transfer (One Way)';
    } else if (serviceType === 'TRIP') {
      serviceLabel = 'Trip (One Way)';
    } else {
      if (hours >= 12) {
        serviceLabel = '12 Hours Rental';
      } else if (hours >= 6) {
        serviceLabel = '6 Hours Rental';
      } else {
        serviceLabel = `${hours} Hours Rental`;
      }
    }
    
    // Update booking with accurate total if different
    if (Math.abs(finalTotal - (booking.totalAmount || 0)) > 0.01) {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { totalAmount: finalTotal }
      });
    }

    // Get the origin URL for redirect URLs
    let origin = request.headers.get('origin')
    
    if (!origin) {
      const referer = request.headers.get('referer')
      if (referer) {
        const url = new URL(referer)
        origin = `${url.protocol}//${url.host}`
      }
    }
    
    if (!origin) {
      origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }

    // Initialize Stripe with validated key
    const stripe = new Stripe(trimmedKey, {
      apiVersion: '2025-11-17.clover',
    })

    // Create line items for Stripe
    const lineItems: any[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${booking.vehicle.name} - ${serviceLabel || booking.service}`,
            description: `${serviceLabel || booking.service} • ${booking.pickupLocation} → ${booking.dropoffLocation || 'N/A'}`,
          },
          unit_amount: Math.round(subtotal * 100), // Subtotal in cents
        },
        quantity: 1,
      }
    ];
    
    // Add midnight charge if applicable
    if (midnightCharge > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Midnight Pickup Charge',
            description: 'Additional charge for pickup between 23:00 - 06:00',
          },
          unit_amount: Math.round(midnightCharge * 100), // Midnight charge in cents
        },
        quantity: 1,
      });
    }
    
    // Create Stripe Checkout Session with detailed line items
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/payment/success`,
      cancel_url: `${origin}/payment/cancel`,
      payment_intent_data: {
        metadata: {
          bookingId: bookingId,
        }
      },
      metadata: {
        bookingId: bookingId,
        customerEmail: booking.customerEmail,
        customerName: booking.customerName,
        vehicleName: booking.vehicle.name,
        service: booking.service,
        serviceType: serviceTypeFromBooking || 'RENTAL',
        serviceLabel: serviceLabel || booking.service,
        duration: booking.duration,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation || '',
        startDate: booking.startDate.toISOString(),
        startTime: booking.startTime,
        subtotal: subtotal.toFixed(2),
        midnightCharge: midnightCharge.toFixed(2),
        total: finalTotal.toFixed(2),
      },
      customer_email: booking.customerEmail,
    })

    // Update booking with Stripe session ID
    await prisma.booking.update({
      where: { id: bookingId },
      data: { stripeSessionId: session.id } as any
    })

    console.log('✅ [CHECKOUT] Session created:', session.id)

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url
    })

  } catch (error: any) {
    console.error('❌ [CHECKOUT] Error:', error.message)
    
    // Check for specific Stripe errors
    if (error.type === 'StripePermissionError' || error.code === 'secret_key_required') {
      return NextResponse.json(
        { 
          error: 'Stripe configuration error: Invalid API key.',
          details: 'Please check your STRIPE_SECRET_KEY in .env.local. Make sure you are using a SECRET key (sk_test_...) not a publishable key (pk_test_...).',
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create checkout session',
        details: error.details || 'Please check your Stripe configuration and try again.'
      },
      { status: 500 }
    )
  }
}
