import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, emailTemplates } from '@/lib/email'

// GET /api/bookings - Get all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        vehicle: {
          select: {
            name: true,
            model: true,
            plateNumber: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({
      success: true,
      data: bookings
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch bookings'
    }, { status: 500 })
  }
}

// POST /api/bookings - Create new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const booking = await prisma.booking.create({
      data: {
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        vehicleId: body.vehicleId,
        service: body.service,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        startTime: body.startTime,
        duration: body.duration,
        pickupLocation: body.pickupLocation,
        dropoffLocation: body.dropoffLocation,
        totalAmount: 1500, // Updated booking total amount to USD
        status: body.status || 'PENDING',
        notes: body.notes,
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
        booking.startDate.toLocaleDateString()
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
      
      // Get admin email from settings or use default
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@zbkluxury.com'
      
      await sendEmail({
        to: adminEmail,
        subject: adminTemplate.subject,
        html: adminTemplate.html
      })
      
      console.log('Booking emails sent successfully')
    } catch (emailError) {
      console.error('Failed to send booking emails:', emailError)
      // Don't fail the booking creation if email fails
    }
    
    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking created successfully and notifications sent'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create booking'
    }, { status: 500 })
  }
}
