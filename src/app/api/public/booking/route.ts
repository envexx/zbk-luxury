import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, emailTemplates } from '@/lib/email'

// POST /api/public/booking - Create booking from website (public endpoint)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['customerName', 'customerEmail', 'customerPhone', 'vehicleId', 'service', 'startDate', 'pickupLocation']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          success: false,
          error: `Missing required field: ${field}`
        }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.customerEmail)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 })
    }

    // Check if vehicle exists and is available
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: body.vehicleId },
      select: {
        id: true,
        name: true,
        model: true,
        status: true,
        plateNumber: true
      }
    })

    if (!vehicle) {
      return NextResponse.json({
        success: false,
        error: 'Vehicle not found'
      }, { status: 404 })
    }

    if (vehicle.status !== 'AVAILABLE') {
      return NextResponse.json({
        success: false,
        error: 'Vehicle is not available for booking'
      }, { status: 400 })
    }

    // Create booking with PENDING status (admin needs to confirm)
    const booking = await prisma.booking.create({
      data: {
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        vehicleId: body.vehicleId,
        service: body.service,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : new Date(body.startDate),
        startTime: body.startTime || '09:00',
        duration: body.duration || '8 hours',
        pickupLocation: body.pickupLocation,
        dropoffLocation: body.dropoffLocation || body.pickupLocation,
        totalAmount: body.totalAmount || 0,
        status: 'PENDING', // Always start as PENDING for admin review
        notes: body.notes || '',
        specialRequests: body.specialRequests || ''
      },
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

    // Send email notifications
    try {
      // Send confirmation email to customer
      const customerTemplate = emailTemplates.bookingConfirmation(
        booking.customerName,
        booking.id,
        booking.vehicle.name,
        booking.startDate.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      )
      
      await sendEmail({
        to: booking.customerEmail,
        subject: customerTemplate.subject,
        html: customerTemplate.html
      })
      
      // Send notification to admin
      const adminTemplate = emailTemplates.adminNotification(
        booking.id,
        booking.customerName,
        booking.vehicle.name
      )
      
      // Get admin emails from settings or use default
      const adminEmails = process.env.ADMIN_EMAILS?.split(',') || ['admin@zbkluxury.com']
      
      for (const adminEmail of adminEmails) {
        await sendEmail({
          to: adminEmail.trim(),
          subject: adminTemplate.subject,
          html: adminTemplate.html
        })
      }
      
      console.log('Booking notification emails sent successfully')
    } catch (emailError) {
      console.error('Failed to send booking emails:', emailError)
      // Don't fail the booking creation if email fails
    }

    // Return success response (don't expose internal booking details)
    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully',
      data: {
        bookingId: booking.id,
        customerName: booking.customerName,
        vehicleName: booking.vehicle.name,
        service: booking.service,
        startDate: booking.startDate,
        status: booking.status,
        estimatedResponse: '24 hours'
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating public booking:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to submit booking request. Please try again later.'
    }, { status: 500 })
  }
}

// GET /api/public/booking/[id] - Check booking status (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')
    const email = searchParams.get('email')

    if (!bookingId || !email) {
      return NextResponse.json({
        success: false,
        error: 'Booking ID and email are required'
      }, { status: 400 })
    }

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        customerEmail: email
      },
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
      return NextResponse.json({
        success: false,
        error: 'Booking not found or email does not match'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking.id,
        customerName: booking.customerName,
        vehicleName: booking.vehicle.name,
        service: booking.service,
        startDate: booking.startDate,
        startTime: booking.startTime,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
        status: booking.status,
        totalAmount: booking.totalAmount,
        createdAt: booking.createdAt
      }
    })

  } catch (error) {
    console.error('Error fetching booking status:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch booking status'
    }, { status: 500 })
  }
}
