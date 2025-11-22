import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/vehicles - Get all vehicles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where: any = {}
    
    if (status && status !== 'ALL') {
      where.status = status
    }
    
    if (category && category !== 'ALL') {
      where.category = category
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { plateNumber: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } }
      ]
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      include: {
        bookings: {
          select: {
            id: true,
            totalAmount: true,
            status: true
          }
        },
        _count: {
          select: {
            bookings: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate revenue for each vehicle
    const vehiclesWithStats = vehicles.map(vehicle => ({
      ...vehicle,
      totalBookings: vehicle._count.bookings,
      revenue: vehicle.bookings.reduce((sum, booking) => 
        booking.status === 'COMPLETED' ? sum + booking.totalAmount : sum, 0
      )
    }))

    return NextResponse.json(vehiclesWithStats)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    )
  }
}

// POST /api/admin/vehicles - Create new vehicle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      name,
      model,
      year,
      category,
      plateNumber,
      capacity,
      color,
      location,
      purchaseDate,
      purchasePrice,
      features,
      images,
      description
    } = body

    // Check if plate number already exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { plateNumber }
    })

    if (existingVehicle) {
      return NextResponse.json(
        { error: 'Vehicle with this plate number already exists' },
        { status: 400 }
      )
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        model,
        year: parseInt(year),
        category,
        plateNumber,
        capacity: parseInt(capacity),
        color,
        location,
        purchaseDate: new Date(purchaseDate),
        purchasePrice: parseFloat(purchasePrice),
        features: features || [],
        images: images || [],
        description
      }
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    )
  }
}
