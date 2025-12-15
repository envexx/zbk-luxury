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
        priceTrip: true,
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
    const hoursMatch = (body.duration || '6 hours').match(/\d+/);
    const hours = hoursMatch ? parseInt(hoursMatch[0]) : 6;
    
    let subtotal = 0;
    let serviceType: 'AIRPORT_TRANSFER' | 'TRIP' | 'RENTAL' = 'RENTAL';
    
    // Determine service type from body or from locations
    if (body.serviceType) {
      serviceType = body.serviceType;
    } else {
      // Fallback: detect from service field or locations
      const serviceStr = (body.service || '').toUpperCase();
      const pickupLower = (body.pickupLocation || '').toLowerCase();
      const dropoffLower = (body.dropoffLocation || '').toLowerCase();
      
      const isOneWay = serviceStr.includes('ONE') || 
                       serviceStr.includes('ONE-WAY') || 
                       serviceStr.includes('TRIP') || 
                       serviceStr.includes('AIRPORT');
      
      if (isOneWay) {
        const isAirportRelated = pickupLower.includes('airport') || 
                                 pickupLower.includes('terminal') ||
                                 dropoffLower.includes('airport') || 
                                 dropoffLower.includes('terminal');
        
        serviceType = isAirportRelated ? 'AIRPORT_TRANSFER' : 'TRIP';
      } else {
        serviceType = 'RENTAL';
      }
    }
    
    // Calculate price based on service type
    if (serviceType === 'AIRPORT_TRANSFER') {
      subtotal = vehicle.priceAirportTransfer || 100;
    } else if (serviceType === 'TRIP') {
      subtotal = vehicle.priceTrip || 85;
    } else {
      // RENTAL: Calculate based on hours
      if (hours >= 12 && vehicle.price12Hours) {
        subtotal = vehicle.price12Hours;
      } else if (hours >= 6 && vehicle.price6Hours) {
        subtotal = vehicle.price6Hours;
      } else {
        subtotal = vehicle.price6Hours || 360;
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
        service: body.service || serviceType, // Keep legacy field
        serviceType: serviceType, // New field
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
