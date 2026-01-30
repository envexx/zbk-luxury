import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Debug endpoint to check booking status
 * GET /api/debug/booking-status?bookingId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('bookingId')

    if (!bookingId) {
      return NextResponse.json({
        success: false,
        error: 'bookingId is required'
      }, { status: 400 })
    }

    console.log('🔍 [DEBUG] Checking booking status for:', bookingId)

    // Get booking from database
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        vehicle: {
          select: {
            name: true,
            model: true
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json({
        success: false,
        error: 'Booking not found',
        bookingId
      }, { status: 404 })
    }

    // Get all bookings with same customer email for comparison
    const relatedBookings = await prisma.booking.findMany({
      where: {
        customerEmail: booking.customerEmail
      },
      select: {
        id: true,
        paymentStatus: true,
        status: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    })

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        paymentStatus: booking.paymentStatus,
        status: booking.status,
        stripeSessionId: booking.stripeSessionId,
        stripePaymentId: booking.stripePaymentId,
        totalAmount: booking.totalAmount,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        vehicle: booking.vehicle
      },
      relatedBookings,
      database: {
        connected: true,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error: any) {
    console.error('❌ [DEBUG] Error checking booking status:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to check booking status',
      stack: error.stack
    }, { status: 500 })
  }
}

