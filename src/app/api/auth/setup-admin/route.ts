import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Check if any admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Admin user already exists'
      }, { status: 400 })
    }

    // Create default admin users
    const adminUsers = [
      {
        email: 'admin@zbkluxury.com',
        password: 'ZBKAdmin2024!',
        name: 'ZBK Admin'
      },
      {
        email: 'test@zbkluxury.com',
        password: 'TestAdmin123!',
        name: 'Test Admin'
      }
    ]

    const createdUsers = []

    for (const userData of adminUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12)
      
      const admin = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          name: userData.name,
          role: 'ADMIN'
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true
        }
      })

      createdUsers.push(admin)
    }

    return NextResponse.json({
      success: true,
      message: 'Admin users created successfully',
      data: createdUsers
    })

  } catch (error) {
    console.error('Error setting up admin users:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to setup admin users',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint to check if admin exists
export async function GET() {
  try {
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    })

    return NextResponse.json({
      success: true,
      adminExists: adminCount > 0,
      adminCount
    })

  } catch (error) {
    console.error('Error checking admin users:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to check admin users',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
