import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'zbk-luxury-secret-key-2024'

export function middleware(request: NextRequest) {
  console.log('Middleware called for:', request.nextUrl.pathname) // Debug log
  
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Admin route detected, checking auth...') // Debug log
    
    const token = request.cookies.get('auth-token')?.value
    console.log('Token found:', !!token) // Debug log

    if (!token) {
      console.log('No token, redirecting to login') // Debug log
      // Redirect to new login page if no token
      return NextResponse.redirect(new URL('/login/admin', request.url))
    }

    try {
      // Verify JWT token
      jwt.verify(token, JWT_SECRET)
      console.log('Token valid, allowing access') // Debug log
      // Token is valid, continue to the requested page
      return NextResponse.next()
    } catch (error) {
      console.log('Token invalid, redirecting to login') // Debug log
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
