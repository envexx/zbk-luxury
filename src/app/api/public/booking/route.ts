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
        plateNumber: true,
        price: true,
        priceAirportTransfer: true,
        price6Hours: true,
        price12Hours: true,
        services: true,
        minimumHours: true
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

    // Calculate total amount based on trip type and duration
    let totalAmount = body.totalAmount || 0
    
    // If totalAmount not provided, calculate from vehicle pricing
    if (!totalAmount) {
      const durationHours = parseInt((body.duration || '6 hours').replace(' hours', '').replace(' hour', '')) || 6
      const serviceType = (body.service || '').toUpperCase()
      
      // Determine if it's one-way or round-trip
      const isOneWay = serviceType.includes('ONE') || 
                       serviceType.includes('ONE-WAY') || 
                       serviceType.includes('TRIP') || 
                       serviceType.includes('AIRPORT')
      
      if (isOneWay) {
        // ONE WAY: Use flat rate (priceAirportTransfer)
        totalAmount = vehicle.priceAirportTransfer || 80
      } else {
        // ROUND TRIP: Calculate based on hours
        if (durationHours >= 12 && vehicle.price12Hours) {
          totalAmount = vehicle.price12Hours
        } else if (durationHours >= 6 && vehicle.price6Hours) {
          totalAmount = vehicle.price6Hours
        } else {
          // Default to 6-hour package
          totalAmount = vehicle.price6Hours || 360
        }
      }
      
      // Add 10% tax
      totalAmount = totalAmount * 1.1
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
        totalAmount: totalAmount,
        status: 'PENDING', // Always start as PENDING for admin review
        notes: body.notes || ''
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
      // Format date and time
      const formattedDate = booking.startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      
      // Send confirmation email to customer
      const customerTemplate = emailTemplates.bookingConfirmation(
        booking.customerName,
        booking.id,
        booking.vehicle.name,
        formattedDate,
        booking.pickupLocation,
        booking.startTime
      )
      
      await sendEmail({
        to: booking.customerEmail,
        subject: customerTemplate.subject,
        html: customerTemplate.html
      })
      
      // Send notification to admin (zbklimo@gmail.com)
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
        booking.notes || undefined
      )
      
      // Send to zbklimo@gmail.com (same email as sender)
      const adminEmail = process.env.ADMIN_EMAIL || 'zbklimo@gmail.com'
      
      await sendEmail({
        to: adminEmail,
        subject: adminTemplate.subject,
        html: adminTemplate.html
      })
      
      console.log('✅ Booking emails sent successfully')
      console.log(`   - Customer email sent to: ${booking.customerEmail}`)
      console.log(`   - Admin notification sent to: ${adminEmail}`)
    } catch (emailError) {
      console.error('❌ Failed to send booking emails:', emailError)
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
