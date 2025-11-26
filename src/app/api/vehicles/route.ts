import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { vehicleData, getAvailableVehicles } from '@/data/vehicleData'

// GET /api/vehicles - Get all vehicles
export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({
      success: true,
      data: vehicles
    })
  } catch (error) {
    console.error('Database error, using updated vehicle data:', error)
    
    // Use the new vehicle data from extracted information
    return NextResponse.json({
      success: true,
      data: vehicleData,
      fallback: true,
      message: 'Using updated vehicle data - database not connected'
    })
  }
}

// POST /api/vehicles - Create new vehicle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const vehicle = await prisma.vehicle.create({
      data: {
        name: body.name,
        model: body.model,
        year: body.year,
        category: body.category,
        status: body.status || 'AVAILABLE',
        location: body.location,
        plateNumber: body.plateNumber,
        capacity: body.capacity,
        color: body.color,
        price: body.price || 0,
        minimumHours: body.minimumHours || 1,
        purchaseDate: new Date(body.purchaseDate),
        purchasePrice: body.purchasePrice,
        mileage: body.mileage,
        features: body.features || [],
        images: body.images || [],
        description: body.description,
        lastMaintenance: body.lastMaintenance ? new Date(body.lastMaintenance) : null,
        nextMaintenance: body.nextMaintenance ? new Date(body.nextMaintenance) : null,
      }
    })
    
    return NextResponse.json({
      success: true,
      data: vehicle
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create vehicle'
    }, { status: 500 })
  }
}
