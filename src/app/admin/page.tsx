'use client'

import { useState, useEffect } from 'react'
import { Car, Calendar, Users, DollarSign } from '@/components/admin/Icons'

interface DashboardStats {
  vehicles: number
  bookings: number
  blogPosts: number
  users: number
  activeBookings: number
  totalRevenue: number
}

interface RecentActivity {
  id: string
  action: string
  time: string
  user: string
  type: 'booking' | 'vehicle' | 'user' | 'payment'
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    vehicles: 0,
    bookings: 0,
    blogPosts: 0,
    users: 0,
    activeBookings: 0,
    totalRevenue: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats from test-data endpoint
      const statsResponse = await fetch('/api/test-data')
      const statsData = await statsResponse.json()
      
      if (statsData.success) {
        // Fetch bookings for active count and revenue
        const bookingsResponse = await fetch('/api/admin/bookings')
        const bookingsData = await bookingsResponse.json()
        
        const activeBookings = Array.isArray(bookingsData) 
          ? bookingsData.filter(b => b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS').length 
          : 0
        
        const totalRevenue = Array.isArray(bookingsData)
          ? bookingsData.reduce((sum, b) => sum + (b.totalAmount || 0), 0)
          : 0
        
        setStats({
          vehicles: statsData.stats.vehicles,
          bookings: statsData.stats.bookings,
          blogPosts: statsData.stats.blogPosts,
          users: statsData.stats.users,
          activeBookings,
          totalRevenue
        })
        
        // Generate recent activity from latest data
        const activities: RecentActivity[] = []
        
        if (statsData.latest?.booking) {
          activities.push({
            id: '1',
            action: `New booking: ${statsData.latest.booking.service}`,
            time: new Date(statsData.latest.booking.createdAt).toLocaleString(),
            user: statsData.latest.booking.customerName,
            type: 'booking'
          })
        }
        
        if (statsData.latest?.vehicle) {
          activities.push({
            id: '2',
            action: `Vehicle added: ${statsData.latest.vehicle.name}`,
            time: new Date(statsData.latest.vehicle.createdAt).toLocaleString(),
            user: 'Admin',
            type: 'vehicle'
          })
        }
        
        if (statsData.latest?.blogPost) {
          activities.push({
            id: '3',
            action: `Blog post published: ${statsData.latest.blogPost.title}`,
            time: new Date(statsData.latest.blogPost.createdAt).toLocaleString(),
            user: 'Admin',
            type: 'user'
          })
        }
        
        setRecentActivity(activities)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const dashboardStats = [
    {
      title: 'Total Vehicles',
      value: loading ? '...' : stats.vehicles.toString(),
      icon: Car,
      color: 'bg-blue-500',
      change: `${stats.vehicles} vehicles in fleet`
    },
    {
      title: 'Active Bookings',
      value: loading ? '...' : stats.activeBookings.toString(),
      icon: Calendar,
      color: 'bg-green-500',
      change: `${stats.bookings} total bookings`
    },
    {
      title: 'Blog Posts',
      value: loading ? '...' : stats.blogPosts.toString(),
      icon: Users,
      color: 'bg-purple-500',
      change: `${stats.users} users registered`
    },
    {
      title: 'Total Revenue',
      value: loading ? '...' : formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: 'From all bookings'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome to ZBK Luxury Transport Admin Dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    by {activity.user}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </span>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No recent activity</p>
                <p className="text-sm mt-1">Activity will appear here as you use the system</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
