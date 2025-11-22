import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    console.error('Database error, using mock data:', error)
    
    // Fallback to mock data if database is not available
    const mockVehicles = [
      {
        id: 'mock-1',
        name: 'Mercedes S-Class',
        model: 'S450',
        year: 2024,
        category: 'WEDDING_AFFAIRS',
        status: 'AVAILABLE',
        location: 'Jakarta',
        plateNumber: 'B 1234 ZBK',
        capacity: 4,
        color: 'Black',
        purchaseDate: '2024-01-01T00:00:00.000Z',
        purchasePrice: 250000,
        mileage: '5000 km',
        features: ['Leather Seats', 'Sunroof', 'Premium Audio', 'GPS Navigation'],
        images: ['/api/placeholder/800/600'],
        description: 'Luxury sedan perfect for special occasions and business trips.',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'mock-2',
        name: 'BMW X7',
        model: 'xDrive40i',
        year: 2024,
        category: 'WEDDING_AFFAIRS',
        status: 'AVAILABLE',
        location: 'Jakarta',
        plateNumber: 'B 5678 ZBK',
        capacity: 7,
        color: 'White',
        purchaseDate: '2024-01-01T00:00:00.000Z',
        purchasePrice: 300000,
        mileage: '3000 km',
        features: ['7 Seats', 'Premium Sound', 'Panoramic Roof', 'Ambient Lighting'],
        images: ['/api/placeholder/800/600'],
        description: 'Spacious luxury SUV ideal for family trips and group transportation.',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'mock-3',
        name: 'Audi A8',
        model: 'L 55 TFSI',
        year: 2023,
        category: 'WEDDING_AFFAIRS',
        status: 'MAINTENANCE',
        location: 'Jakarta',
        plateNumber: 'B 9012 ZBK',
        capacity: 4,
        color: 'Silver',
        purchaseDate: '2023-06-01T00:00:00.000Z',
        purchasePrice: 280000,
        mileage: '8000 km',
        features: ['Massage Seats', 'Air Suspension', 'Premium Audio', 'Rear Entertainment'],
        images: ['/api/placeholder/800/600'],
        description: 'Executive luxury sedan with advanced comfort features.',
        createdAt: '2023-06-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    ]
    
    return NextResponse.json({
      success: true,
      data: mockVehicles,
      fallback: true,
      message: 'Using mock data - database not connected'
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
