import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateBookingPrice } from '@/utils/pricing'

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
    
    // Get vehicle details for price calculation
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: body.vehicleId },
      select: {
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

    if (!vehicle) {
      return NextResponse.json({
        success: false,
        error: 'Vehicle not found'
      }, { status: 404 })
    }

    // Calculate total amount based on service type and duration
    // Extract hours from duration (e.g., "8 hours" -> 8)
    const hoursMatch = (body.duration || '8 hours').match(/\d+/);
    const hours = hoursMatch ? parseInt(hoursMatch[0]) : 8;
    
    let subtotal = 0;
    const serviceType = (body.service || 'RENTAL').toUpperCase();
    const isTripService = serviceType.includes('TRIP') || serviceType.includes('AIRPORT');
    
    if (isTripService && vehicle.priceAirportTransfer) {
      // Airport Transfer / Trip service
      subtotal = vehicle.priceAirportTransfer;
    } else {
      // Rent service - use 6hrs or 12hrs pricing
      if (hours >= 12 && vehicle.price12Hours) {
        subtotal = vehicle.price12Hours;
      } else if (hours >= 6 && vehicle.price6Hours) {
        subtotal = vehicle.price6Hours;
      } else {
        // Fallback to hourly rate if available
        const minimumHours = vehicle.minimumHours || 1;
        const actualHours = Math.max(hours, minimumHours);
        subtotal = (vehicle.price || 0) * actualHours;
      }
    }
    
    const tax = subtotal * 0.1; // 10% tax
    const totalAmount = subtotal + tax;
    
    const booking = await prisma.booking.create({
      data: {
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        vehicleId: body.vehicleId,
        service: body.service || 'RENTAL',
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        startTime: body.startTime || '09:00',
        duration: body.duration || '8 hours',
        pickupLocation: body.pickupLocation,
        dropoffLocation: body.dropoffLocation,
        totalAmount: totalAmount,
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
    
    // NOTE: Email notifications will be sent after payment confirmation via webhook
    // This ensures emails are only sent when payment is successful
    
    return NextResponse.json({
      success: true,
      data: booking,
      message: 'Booking created successfully. Please proceed to payment.'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create booking'
    }, { status: 500 })
  }
}
