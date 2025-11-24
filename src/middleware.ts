import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'zbk-luxury-secret-key-2024'

export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      // Redirect to new login page if no token
      return NextResponse.redirect(new URL('/login/admin', request.url))
    }

    try {
      // Verify JWT token
      jwt.verify(token, JWT_SECRET)
      // Token is valid, continue to the requested page
      return NextResponse.next()
    } catch (error) {
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/login/admin', request.url))
      // Clear invalid token
      response.cookies.set('auth-token', '', { maxAge: 0 })
      return response
    }
  }

  // For all other routes, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}
