import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Check DATABASE_URL - disconnect existing connection if not set
const dbUrl = process.env.DATABASE_URL
if (!dbUrl) {
  console.error('❌ [PRISMA] DATABASE_URL is not set')
  // Disconnect existing connection if DATABASE_URL is removed
  if (globalForPrisma.prisma) {
    globalForPrisma.prisma.$disconnect().catch(() => {})
    delete globalForPrisma.prisma
  }
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
