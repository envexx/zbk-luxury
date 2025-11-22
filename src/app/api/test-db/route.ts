import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Test database connection and create sample data
export async function GET() {
  try {
    // Test connection
    await prisma.$connect()
    
    // Create sample vehicle if not exists
    const vehicleCount = await prisma.vehicle.count()
    if (vehicleCount === 0) {
      await prisma.vehicle.create({
        data: {
          name: 'Mercedes S-Class',
          model: 'S450',
          year: 2024,
          category: 'WEDDING_AFFAIRS',
          status: 'AVAILABLE',
          location: 'Jakarta',
          plateNumber: 'B 1234 ZBK',
          capacity: 4,
          color: 'Black',
          purchaseDate: new Date('2024-01-01'),
          purchasePrice: 2500000000,
          mileage: '5000 km',
          features: ['Leather Seats', 'Sunroof', 'Premium Audio'],
          images: ['/api/placeholder/800/600'],
          description: 'Luxury sedan perfect for special occasions'
        }
      })
    }

    // Create sample booking if not exists
    const bookingCount = await prisma.booking.count()
    if (bookingCount === 0) {
      const vehicle = await prisma.vehicle.findFirst()
      if (vehicle) {
        await prisma.booking.create({
          data: {
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            customerPhone: '+62812345678',
            vehicleId: vehicle.id,
            service: 'Airport Transfer',
            startDate: new Date('2024-12-01'),
            endDate: new Date('2024-12-01'),
            startTime: '14:00',
            duration: '3 hours',
            pickupLocation: 'Soekarno-Hatta Airport',
            dropoffLocation: 'Hotel Indonesia',
            totalAmount: 1500000,
            status: 'CONFIRMED'
          }
        })
      }
    }

    // Create sample blog post if not exists
    const blogCount = await prisma.blogPost.count()
    if (blogCount === 0) {
      await prisma.blogPost.create({
        data: {
          title: 'The Ultimate Guide to Luxury Car Rental in Jakarta',
          slug: 'ultimate-guide-luxury-car-rental-jakarta',
          excerpt: 'Discover the best luxury car rental services in Jakarta for your special occasions.',
          content: 'Jakarta, the bustling capital of Indonesia, offers numerous luxury car rental options for discerning customers. Whether you need transportation for a wedding, corporate event, or special occasion, choosing the right luxury vehicle can make all the difference...',
          image: '/api/placeholder/800/600',
          author: 'ZBK Luxury Team',
          isPublished: true,
          tags: ['luxury', 'jakarta', 'rental', 'guide'],
          publishedAt: new Date()
        }
      })
    }

    const stats = {
      vehicles: await prisma.vehicle.count(),
      bookings: await prisma.booking.count(),
      blogPosts: await prisma.blogPost.count(),
      users: await prisma.user.count()
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful and sample data created',
      stats
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
