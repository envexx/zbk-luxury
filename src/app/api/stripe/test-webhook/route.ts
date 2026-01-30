import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

/**
 * Test Webhook Endpoint
 * 
 * This endpoint allows you to test webhook functionality locally
 * Usage: POST /api/stripe/test-webhook
 * 
 * Body: {
 *   eventType: 'checkout.session.completed' | 'checkout.session.async_payment_failed',
 *   bookingId?: string (optional, for testing)
 * }
 */

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  console.log('🧪 [TEST WEBHOOK] ==========================================')
  console.log('🧪 [TEST WEBHOOK] Test webhook endpoint called')
  
  try {
    const body = await request.json()
    const { eventType = 'checkout.session.completed', bookingId = 'test_booking_' + Date.now() } = body

    console.log('🧪 [TEST WEBHOOK] Test parameters:', { eventType, bookingId })

    // Create a mock Stripe event
    // Using 'as any' to bypass strict type checking for mock event
    const mockEvent = {
      id: 'evt_test_' + Date.now(),
      object: 'event',
      api_version: '2025-11-17.clover',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: 'cs_test_' + Date.now(),
          object: 'checkout.session',
          payment_status: eventType === 'checkout.session.completed' ? 'paid' : 'unpaid',
          status: eventType === 'checkout.session.completed' ? 'complete' : 'open',
          amount_total: 10000,
          currency: 'usd',
          customer_email: 'test@example.com',
          payment_intent: 'pi_test_' + Date.now(),
          metadata: {
            bookingId: bookingId
          },
          // Add other required fields
          mode: 'payment',
          payment_method_types: ['card'],
          success_url: 'https://example.com/success',
          cancel_url: 'https://example.com/cancel',
          url: null,
          customer: null,
          customer_details: null,
          line_items: null,
        }
      },
      livemode: false,
      pending_webhooks: 1,
      request: {
        id: 'req_test_' + Date.now(),
        idempotency_key: null
      },
      type: eventType
    } as Stripe.Event

    console.log('🧪 [TEST WEBHOOK] Mock event created:', {
      id: mockEvent.id,
      type: mockEvent.type,
      bookingId: (mockEvent.data.object as any).metadata?.bookingId
    })

    // Simulate webhook processing
    console.log('🧪 [TEST WEBHOOK] Simulating webhook processing...')
    
    // Here you would normally call your webhook handler logic
    // For now, we'll just return the mock event structure
    
    return NextResponse.json({
      success: true,
      message: 'Test webhook event created successfully',
      event: {
        id: mockEvent.id,
        type: mockEvent.type,
        bookingId: (mockEvent.data.object as any).metadata?.bookingId,
        paymentStatus: (mockEvent.data.object as any).payment_status,
        status: (mockEvent.data.object as any).status
      },
      note: 'This is a test endpoint. In production, Stripe will send real events to /api/stripe/webhook'
    })

  } catch (error: any) {
    console.error('❌ [TEST WEBHOOK] Error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to process test webhook' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Test webhook endpoint is available',
    usage: {
      method: 'POST',
      endpoint: '/api/stripe/test-webhook',
      body: {
        eventType: 'checkout.session.completed' | 'checkout.session.async_payment_failed',
        bookingId: 'optional_booking_id'
      }
    },
    note: 'This endpoint is for testing only. Real webhooks should be sent to /api/stripe/webhook'
  })
}

