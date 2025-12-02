import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/vehicles/[id] - Get single vehicle
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id
      },
      include: {
        bookings: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        maintenanceRecords: {
          orderBy: {
            date: 'desc'
          }
        }
      }
    })
    
    if (!vehicle) {
      return NextResponse.json({
        success: false,
        error: 'Vehicle not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: vehicle
    })
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch vehicle'
    }, { status: 500 })
  }
}

// PUT /api/vehicles/[id] - Update vehicle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const vehicle = await prisma.vehicle.update({
      where: {
        id
      },
      data: {
        name: body.name,
        model: body.model,
        year: parseInt(body.year) || body.year,
        category: body.category,
        status: body.status,
        location: body.location,
        plateNumber: body.plateNumber,
        capacity: parseInt(body.capacity) || body.capacity,
        color: body.color,
        price: body.price !== undefined ? parseFloat(body.price) : undefined,
        minimumHours: body.minimumHours !== undefined ? (body.minimumHours ? parseInt(body.minimumHours) : null) : undefined,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
        purchasePrice: body.purchasePrice !== undefined ? parseFloat(body.purchasePrice) : undefined,
        mileage: body.mileage,
        features: body.features,
        images: body.images,
        description: body.description,
        lastMaintenance: body.lastMaintenance ? new Date(body.lastMaintenance) : null,
        nextMaintenance: body.nextMaintenance ? new Date(body.nextMaintenance) : null,
      }
    })
    
    return NextResponse.json({
      success: true,
      data: vehicle
    })
  } catch (error) {
    console.error('Error updating vehicle:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update vehicle'
    }, { status: 500 })
  }
}

// DELETE /api/vehicles/[id] - Delete vehicle
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.vehicle.delete({
      where: {
        id
      }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Vehicle deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete vehicle'
    }, { status: 500 })
  }
}
