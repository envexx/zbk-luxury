import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  console.log('🔵 [DB TEST] ==========================================')
  console.log('🔵 [DB TEST] Testing database connection...')
  
  try {
    // Check DATABASE_URL from environment
    const databaseUrl = process.env.DATABASE_URL
    console.log('🔵 [DB TEST] DATABASE_URL exists:', !!databaseUrl)
    console.log('🔵 [DB TEST] DATABASE_URL length:', databaseUrl?.length || 0)
    console.log('🔵 [DB TEST] DATABASE_URL preview:', databaseUrl ? `${databaseUrl.substring(0, 20)}...` : 'NOT SET')
    
    if (!databaseUrl) {
      console.error('❌ [DB TEST] DATABASE_URL is not set in environment variables')
      return NextResponse.json({
        success: false,
        message: 'DATABASE_URL is not set',
        error: 'Please set DATABASE_URL in your environment variables (.env.local)',
        envCheck: {
          hasDatabaseUrl: false,
          nodeEnv: process.env.NODE_ENV,
          allEnvKeys: Object.keys(process.env).filter(k => k.includes('DATABASE'))
        }
      }, { status: 500 })
    }

    // Create new Prisma client instance for testing
    console.log('🔵 [DB TEST] Creating Prisma client...')
    const prisma = new PrismaClient({
      log: ['error', 'warn'],
    })

    console.log('🔵 [DB TEST] Attempting to connect...')
    // Test connection
    await prisma.$connect()
    console.log('✅ [DB TEST] Database connection successful!')

    // Test a simple query
    console.log('🔵 [DB TEST] Testing query...')
    const userCount = await prisma.user.count()
    const vehicleCount = await prisma.vehicle.count()
    const bookingCount = await prisma.booking.count()
    
    console.log('✅ [DB TEST] Query successful!')
    console.log('🔵 [DB TEST] Stats:', { userCount, vehicleCount, bookingCount })

    // Get database info
    const dbInfo = await prisma.$queryRaw`SELECT version() as version` as any[]
    const dbVersion = dbInfo[0]?.version || 'Unknown'

    console.log('✅ [DB TEST] Database connection test completed successfully')
    console.log('🔵 [DB TEST] ==========================================')

    await prisma.$disconnect()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        userCount,
        vehicleCount,
        bookingCount,
        dbVersion,
        timestamp: new Date().toISOString()
      },
      connection: {
        url: databaseUrl ? `${databaseUrl.substring(0, 30)}...` : 'Not set',
        connected: true
      }
    })

  } catch (error) {
    console.error('❌ [DB TEST] ==========================================')
    console.error('❌ [DB TEST] Database connection error')
    console.error('❌ [DB TEST] Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('❌ [DB TEST] Error message:', error instanceof Error ? error.message : String(error))
    console.error('❌ [DB TEST] Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('❌ [DB TEST] ==========================================')
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      troubleshooting: {
        checkDatabaseUrl: 'Verify DATABASE_URL in .env.local matches your database',
        checkConnection: 'Ensure database server is running and accessible',
        checkCredentials: 'Verify username, password, host, and port are correct',
        checkNetwork: 'Check firewall and network connectivity',
        checkSsl: 'For production, ensure ?sslmode=require is in DATABASE_URL'
      },
      envCheck: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrlLength: process.env.DATABASE_URL?.length || 0,
        nodeEnv: process.env.NODE_ENV,
        allEnvKeys: Object.keys(process.env).filter(k => k.includes('DATABASE'))
      }
    }, { status: 500 })
  }
}
