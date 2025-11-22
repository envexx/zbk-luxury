import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Try to get real data from database
    const vehicleStats = await prisma.vehicle.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    const bookingStats = await prisma.booking.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    // Monthly booking trends (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyBookings = await prisma.booking.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      _count: { id: true },
      _sum: { totalAmount: true }
    })

    // Revenue analytics
    const totalRevenue = await prisma.booking.aggregate({
      _sum: { totalAmount: true },
      where: { status: 'COMPLETED' }
    })

    const monthlyRevenue = await prisma.booking.aggregate({
      _sum: { totalAmount: true },
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    })

    // Popular vehicles
    const popularVehicles = await prisma.booking.groupBy({
      by: ['vehicleId'],
      _count: { vehicleId: true },
      orderBy: { _count: { vehicleId: 'desc' } },
      take: 5
    })

    const vehicleDetails = await Promise.all(
      popularVehicles.map(async (item) => {
        const vehicle = await prisma.vehicle.findUnique({
          where: { id: item.vehicleId },
          select: { name: true, model: true }
        })
        return {
          ...vehicle,
          bookings: item._count.vehicleId
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalVehicles: await prisma.vehicle.count(),
          totalBookings: await prisma.booking.count(),
          totalRevenue: totalRevenue._sum.totalAmount || 0,
          monthlyRevenue: monthlyRevenue._sum.totalAmount || 0
        },
        vehicleStats: vehicleStats.map(stat => ({
          status: stat.status,
          count: stat._count.status
        })),
        bookingStats: bookingStats.map(stat => ({
          status: stat.status,
          count: stat._count.status
        })),
        monthlyTrends: monthlyBookings.map(item => ({
          month: item.createdAt,
          bookings: item._count.id,
          revenue: item._sum.totalAmount || 0
        })),
        popularVehicles: vehicleDetails,
        performance: {
          averageBookingValue: totalRevenue._sum.totalAmount && await prisma.booking.count() 
            ? (totalRevenue._sum.totalAmount / await prisma.booking.count()) 
            : 0,
          completionRate: bookingStats.find(s => s.status === 'COMPLETED')?._count.status || 0,
          utilizationRate: Math.round((vehicleStats.find(s => s.status === 'IN_USE')?._count.status || 0) / await prisma.vehicle.count() * 100)
        }
      }
    })

  } catch (error) {
    console.error('Analytics error, using mock data:', error)
    
    // Fallback mock analytics data
    const mockAnalytics = {
      overview: {
        totalVehicles: 12,
        totalBookings: 156,
        totalRevenue: 450000,
        monthlyRevenue: 85000
      },
      vehicleStats: [
        { status: 'AVAILABLE', count: 8 },
        { status: 'IN_USE', count: 3 },
        { status: 'MAINTENANCE', count: 1 }
      ],
      bookingStats: [
        { status: 'COMPLETED', count: 89 },
        { status: 'CONFIRMED', count: 34 },
        { status: 'PENDING', count: 23 },
        { status: 'CANCELLED', count: 10 }
      ],
      monthlyTrends: [
        { month: '2024-06', bookings: 18, revenue: 54000 },
        { month: '2024-07', bookings: 22, revenue: 66000 },
        { month: '2024-08', bookings: 28, revenue: 84000 },
        { month: '2024-09', bookings: 31, revenue: 93000 },
        { month: '2024-10', bookings: 26, revenue: 78000 },
        { month: '2024-11', bookings: 31, revenue: 93000 }
      ],
      popularVehicles: [
        { name: 'Mercedes S-Class', model: 'S450', bookings: 45 },
        { name: 'BMW X7', model: 'xDrive40i', bookings: 38 },
        { name: 'Audi A8', model: 'L 55 TFSI', bookings: 32 },
        { name: 'Toyota Alphard', model: 'Executive Lounge', bookings: 28 },
        { name: 'Range Rover', model: 'Vogue', bookings: 13 }
      ],
      performance: {
        averageBookingValue: 2885,
        completionRate: 89,
        utilizationRate: 75
      }
    }

    return NextResponse.json({
      success: true,
      data: mockAnalytics,
      fallback: true,
      message: 'Using mock analytics data - database not connected'
    })
  }
}
