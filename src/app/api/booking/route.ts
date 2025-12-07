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
      }
    })

    if (!availableVehicle) {
      return NextResponse.json(
        { error: 'No vehicles available in the selected category' },
        { status: 400 }
      )
    }

    // Calculate price based on service and duration
    const basePrice = getServicePrice(service, vehicleCategory)
    const durationHours = parseInt(duration.replace(' hours', '')) || 8
    const totalAmount = basePrice * (durationHours / 8) // Base price is for 8 hours

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

// Helper function to calculate service price
function getServicePrice(service: string, category: string): number {
  const basePrices = {
    'WEDDING_AFFAIRS': 2000,
    'ALPHARD_PREMIUM': 1500,
    'COMBI_TRANSPORT': 1000
  }

  const serviceMultipliers = {
    'Wedding Transport': 1.5,
    'Corporate Event': 1.2,
    'City Tour': 1.0,
    'Airport Transfer': 0.8,
    'Hourly Rental': 1.0
  }

  const basePrice = basePrices[category as keyof typeof basePrices] || 1000
  const multiplier = serviceMultipliers[service as keyof typeof serviceMultipliers] || 1.0

  return basePrice * multiplier
}
