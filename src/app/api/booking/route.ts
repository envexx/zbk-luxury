import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, emailTemplates } from '@/lib/email'

// POST /api/booking - Create booking from website
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      customerName,
      customerEmail,
      customerPhone,
      vehicleCategory,
      service,
      startDate,
      endDate,
      startTime,
      duration,
      pickupLocation,
      dropoffLocation,
      notes
    } = body

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !vehicleCategory || !service || !startDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find available vehicle in the requested category
    const availableVehicle = await prisma.vehicle.findFirst({
      where: {
        category: vehicleCategory,
        status: 'AVAILABLE'
      },
      select: {
        id: true,
        name: true,
        model: true,
        price: true,
        priceAirportTransfer: true,
        price6Hours: true,
        price12Hours: true,
        services: true,
        minimumHours: true
      }
    })

    if (!availableVehicle) {
      return NextResponse.json(
        { error: 'No vehicles available in the selected category' },
        { status: 400 }
      )
    }

    // Calculate price based on service type and duration
    const durationHours = parseInt(duration.replace(' hours', '').replace(' hour', '')) || 8
    let totalAmount = 0
    
    // Determine service type from booking service field
    const serviceType = service?.toUpperCase() || 'TRIP'
    const isTripService = serviceType.includes('TRIP') || serviceType.includes('AIRPORT')
    
    if (isTripService && availableVehicle.priceAirportTransfer) {
      // Airport Transfer / Trip service
      totalAmount = availableVehicle.priceAirportTransfer
    } else {
      // Rent service - use 6hrs or 12hrs pricing
      if (durationHours >= 12 && availableVehicle.price12Hours) {
        totalAmount = availableVehicle.price12Hours
      } else if (durationHours >= 6 && availableVehicle.price6Hours) {
        totalAmount = availableVehicle.price6Hours
      } else {
        // Fallback to hourly rate if available
        const minimumHours = availableVehicle.minimumHours || 1
        const actualHours = Math.max(durationHours, minimumHours)
        totalAmount = (availableVehicle.price || 0) * actualHours
      }
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        vehicleId: availableVehicle.id,
        service,
        startDate: new Date(startDate),
        endDate: new Date(endDate || startDate),
        startTime: startTime || '09:00',
        duration: duration || '8 hours',
        pickupLocation,
        dropoffLocation,
        totalAmount,
        notes,
        status: 'PENDING'
      },
      include: {
        vehicle: true
      }
    })

    // Update vehicle status to reserved
    await prisma.vehicle.update({
      where: { id: availableVehicle.id },
      data: { status: 'RESERVED' }
    })

    // Format date
    const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Send confirmation email to customer
    const customerEmailTemplate = emailTemplates.bookingConfirmation(
      customerName,
      booking.id,
      availableVehicle.name,
      formattedDate,
      pickupLocation,
      startTime || '09:00'
    )

    await sendEmail({
      to: customerEmail,
      subject: customerEmailTemplate.subject,
      html: customerEmailTemplate.html
    })

    // Send notification to admin (zbklimo@gmail.com)
    const adminEmailTemplate = emailTemplates.adminNotification(
      booking.id,
      customerName,
      customerEmail,
      customerPhone,
      availableVehicle.name,
      availableVehicle.model || '',
      service,
      formattedDate,
      startTime || '09:00',
      pickupLocation,
      dropoffLocation || '',
      duration || '8 hours',
      totalAmount,
      notes || undefined
    )

    // Send to zbklimo@gmail.com (same email as sender)
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'zbklimo@gmail.com',
      subject: adminEmailTemplate.subject,
      html: adminEmailTemplate.html
    })

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      message: 'Booking created successfully. You will receive a confirmation email shortly.'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again.' },
      { status: 500 }
    )
  }
}
