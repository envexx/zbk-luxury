'use client'

import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      console.log('Logout initiated...')
      
      // Call logout API to clear server-side cookie
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      })
      
      // Clear all localStorage
      localStorage.clear()
      
      console.log('Logout successful, redirecting to login')
      
      // Force redirect to login
      window.location.href = '/login/admin'
    } catch (error) {
      console.error('Logout error:', error)
      // Even if API fails, clear local storage and redirect
      localStorage.clear()
      window.location.href = '/login/admin'
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout Test</span>
    </button>
  )
}
