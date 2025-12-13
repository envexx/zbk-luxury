import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { calculateBookingPrice, calculateDeposit } from '@/utils/pricing'

// Helper function to get and validate Stripe secret key
const getStripeSecretKey = (): string => {
  const key = process.env.STRIPE_SECRET_KEY
  
  // Validate that we have a secret key
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set. Please add it to your .env.local file.')
  }
  
  // Trim whitespace (sometimes there are hidden spaces or newlines)
  const trimmedKey = key.trim()
  
  // Validate that it's a secret key (starts with sk_)
  if (!trimmedKey.startsWith('sk_')) {
    // Check if it's a publishable key
    if (trimmedKey.startsWith('pk_')) {
      throw new Error('You are using a publishable key (pk_) instead of a secret key (sk_). Please use your secret key from Stripe Dashboard.')
    }
    throw new Error(`Invalid Stripe secret key. Secret keys must start with 'sk_'. Current key starts with '${trimmedKey.substring(0, 3)}'. Please check your STRIPE_SECRET_KEY in .env.local`)
  }
  
  return trimmedKey
}

// Note: Stripe is now initialized directly in POST handler with validated key

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
    // Validate Stripe key before proceeding
    const secretKey = process.env.STRIPE_SECRET_KEY
    
    // Debug logging
    console.log('=== Stripe Key Debug ===')
    console.log('STRIPE_SECRET_KEY exists:', !!secretKey)
    console.log('STRIPE_SECRET_KEY length:', secretKey?.length || 0)
    console.log('STRIPE_SECRET_KEY first 10 chars:', secretKey?.substring(0, 10) || 'N/A')
    console.log('STRIPE_SECRET_KEY starts with sk_:', secretKey?.startsWith('sk_') || false)
    console.log('All env vars with STRIPE:', Object.keys(process.env).filter(k => k.includes('STRIPE')))
    
    if (!secretKey) {
      console.error('STRIPE_SECRET_KEY is not set in environment variables')
      return NextResponse.json(
        { 
          error: 'Stripe configuration error: STRIPE_SECRET_KEY is not set. Please add it to your .env.local file.',
          details: 'Add this line to your .env.local: STRIPE_SECRET_KEY=sk_test_...',
          debug: {
            envKeys: Object.keys(process.env).filter(k => k.includes('STRIPE')),
            hasEnvLocal: 'Check if .env.local exists in root directory'
          }
        },
        { status: 500 }
      )
    }
    
    // Trim whitespace (sometimes there are hidden spaces)
    const trimmedKey = secretKey.trim()
    
    if (!trimmedKey.startsWith('sk_')) {
      console.error('Invalid Stripe key format')
      console.error('Key first 3 chars:', trimmedKey.substring(0, 3))
      console.error('Key first 10 chars:', trimmedKey.substring(0, 10))
      console.error('Key full length:', trimmedKey.length)
      
      // Check if it's a publishable key
      if (trimmedKey.startsWith('pk_')) {
        return NextResponse.json(
          { 
            error: 'Stripe configuration error: You are using a PUBLISHABLE key (pk_) instead of a SECRET key (sk_).',
            details: 'Please use your SECRET key from Stripe Dashboard. Secret keys start with "sk_test_" or "sk_live_"',
            help: 'Go to Stripe Dashboard → Developers → API keys → Reveal test key'
          },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'Stripe configuration error: Invalid secret key format. Secret keys must start with "sk_".',
          details: `Your key starts with "${trimmedKey.substring(0, 3)}" (length: ${trimmedKey.length}). Please check your STRIPE_SECRET_KEY in .env.local`,
          debug: {
            firstChars: trimmedKey.substring(0, 10),
            keyLength: trimmedKey.length,
            hasWhitespace: trimmedKey !== secretKey
          }
        },
        { status: 500 }
      )
    }
    
    const body = await request.json()
    const { bookingId } = body

    if (!bookingId) {
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
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Payment condition: Check if booking already has payment
    if ((booking as any).paymentStatus === 'PAID') {
      return NextResponse.json(
        { error: 'This booking has already been paid' },
        { status: 400 }
      )
    }

    // Payment condition: Check if booking is cancelled
    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        { error: 'Cannot process payment for cancelled booking' },
        { status: 400 }
      )
    }

    // Calculate total amount based on trip type (one-way vs round-trip)
    const hoursMatch = booking.duration?.match(/\d+/);
    const hours = hoursMatch ? parseInt(hoursMatch[0]) : 0;
    
    // Determine if it's one-way or round-trip
    const serviceType = (booking.service || '').toUpperCase();
    const isOneWay = serviceType.includes('ONE') || 
                     serviceType.includes('ONE-WAY') || 
                     serviceType.includes('TRIP') || 
                     serviceType.includes('AIRPORT');
    
    let subtotal = 0;
    
    if (isOneWay) {
      // ONE WAY: Use flat rate from priceAirportTransfer
      subtotal = booking.vehicle.priceAirportTransfer || 80;
    } else {
      // ROUND TRIP: Calculate based on hours
      if (hours >= 12 && booking.vehicle.price12Hours) {
        subtotal = booking.vehicle.price12Hours;
      } else if (hours >= 6 && booking.vehicle.price6Hours) {
        subtotal = booking.vehicle.price6Hours;
      } else {
        // Default to 6-hour package for round trip
        subtotal = booking.vehicle.price6Hours || 360;
      }
    }
    
    const tax = subtotal * 0.1; // 10% tax
    const calculatedTotal = subtotal + tax;
    
    // Use calculated total
    const finalTotal = calculatedTotal;
    
    // Update booking with accurate total if different
    if (Math.abs(finalTotal - (booking.totalAmount || 0)) > 0.01) {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { totalAmount: finalTotal }
      });
    }

    // Use 100% payment (full amount)
    // No deposit needed - full payment required

    // Get the origin URL for redirect URLs
    // Try multiple methods to get the correct origin
    let origin = request.headers.get('origin')
    
    if (!origin) {
      // Try to get from referer header
      const referer = request.headers.get('referer')
      if (referer) {
        const url = new URL(referer)
        origin = `${url.protocol}//${url.host}`
      }
    }
    
    // Fallback to environment variable or default
    if (!origin) {
      origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }
    
    console.log('Stripe checkout origin:', origin)

    // Use the validated and trimmed key
    const validatedKey = trimmedKey
    
    // Initialize Stripe with validated key
    const stripe = new Stripe(validatedKey, {
      apiVersion: '2025-11-17.clover',
    })
    
    console.log('Stripe initialized successfully with key starting with:', validatedKey.substring(0, 10) + '...')
    
    // Use the calculated values from above

    // Create Stripe Checkout Session with detailed line items
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Vehicle ${isOneWay ? 'One Way' : 'Rental'} - ${booking.vehicle.name}`,
              description: isOneWay ? 'One way trip' : `${booking.duration} rental service`,
            },
            unit_amount: Math.round(subtotal * 100), // Subtotal in cents
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Tax (10%)',
              description: 'Service tax',
            },
            unit_amount: Math.round(tax * 100), // Tax in cents
          },
          quantity: 1,
        },
      ],
      // Ensure total matches what's displayed in OrderSummary
      // Total = subtotal + tax (already calculated above)
      mode: 'payment',
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${origin}/payment/cancel?booking_id=${bookingId}`,
      // Ensure we're using absolute URLs
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
        duration: booking.duration,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation || '',
        startDate: booking.startDate.toISOString(),
        startTime: booking.startTime,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: finalTotal.toFixed(2),
      },
      customer_email: booking.customerEmail,
    })

    // Update booking with Stripe session ID
    await prisma.booking.update({
      where: { id: bookingId },
      data: { stripeSessionId: session.id } as any
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url
    })

  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    
    // Check for specific Stripe errors
    if (error.type === 'StripePermissionError' || error.code === 'secret_key_required') {
      return NextResponse.json(
        { 
          error: 'Stripe configuration error: Invalid API key.',
          details: 'Please check your STRIPE_SECRET_KEY in .env.local. Make sure you are using a SECRET key (sk_test_...) not a publishable key (pk_test_...).',
          help: 'See STRIPE_ENV_SETUP.md for setup instructions.'
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

