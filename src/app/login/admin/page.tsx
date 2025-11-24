'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Login attempt with:', formData) // Debug log

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      console.log('Response status:', response.status) // Debug log
      const data = await response.json()
      console.log('Response data:', data) // Debug log

      if (data.success) {
        localStorage.setItem('admin-user', JSON.stringify(data.data.user))
        console.log('Login successful, redirecting to /admin') // Debug log
        
        // Try multiple redirect methods for better reliability
        setTimeout(() => {
          try {
            router.push('/admin')
            router.refresh()
          } catch (routerError) {
            console.log('Router failed, using window.location') // Debug log
            window.location.href = '/admin'
          }
        }, 200)
      } else {
        console.error('Login failed:', data.message) // Debug log
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-blue-600/20"></div>
      </div>
      
      {/* Back to Home */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/"
          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-6 shadow-2xl">
              <Shield className="h-10 w-10 text-slate-900" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-slate-300 text-lg">
              ZBK Luxury Transport
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Secure access to dashboard
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-white">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder="admin@zbkluxury.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-white">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-white transition-colors duration-200" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-white transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-sm text-red-200 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-slate-900 font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mr-3"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Access Dashboard
                  </div>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <p className="text-xs font-semibold text-slate-300">Demo Credentials</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      email: 'admin@zbkluxury.com',
                      password: 'ZBKAdmin2024!'
                    })
                  }}
                  className="text-xs text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
                >
                  Auto Fill
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">
                  <span className="font-medium text-slate-300">Email:</span> admin@zbkluxury.com
                </p>
                <p className="text-xs text-slate-400">
                  <span className="font-medium text-slate-300">Password:</span> ZBKAdmin2024!
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700/50">
                <p className="text-xs text-slate-400">
                  <span className="font-medium text-slate-300">Alternative:</span> test@zbkluxury.com / TestAdmin123!
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-400">
              © 2024 ZBK Luxury Transport. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Secure admin access portal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
