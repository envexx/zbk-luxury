'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function AuthGuard({ children, redirectTo = '/login/admin' }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('auth-token')
        const userInfo = localStorage.getItem('admin-user')
        
        if (!token || !userInfo) {
          console.log('No token or user info found, redirecting to login')
          localStorage.clear() // Clear all localStorage
          setIsAuthenticated(false)
          window.location.href = redirectTo // Force redirect
          return
        }

        // Verify token with API
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            console.log('Authentication verified for user:', data.data.user.email)
            setIsAuthenticated(true)
          } else {
            console.log('Authentication failed:', data.message)
            localStorage.clear()
            setIsAuthenticated(false)
            window.location.href = redirectTo
          }
        } else {
          console.log('Authentication request failed:', response.status)
          localStorage.clear()
          setIsAuthenticated(false)
          window.location.href = redirectTo
        }
      } catch (error) {
        console.error('Auth check error:', error)
        localStorage.clear()
        setIsAuthenticated(false)
        window.location.href = redirectTo
      }
    }

    checkAuth()
  }, [router, redirectTo])

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // Show children only if authenticated
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Show loading while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to login...</p>
      </div>
    </div>
  )
}
