'use client'

import { Car, Calendar, Users, DollarSign } from '@/components/admin/Icons'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Vehicles',
      value: '12',
      icon: Car,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Active Bookings',
      value: '8',
      icon: Calendar,
      color: 'bg-green-500',
      change: '+12% from last week'
    },
    {
      title: 'Total Users',
      value: '156',
      icon: Users,
      color: 'bg-purple-500',
      change: '+5 new users'
    },
    {
      title: 'Monthly Revenue',
      value: 'Rp 45M',
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+8% from last month'
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
        {stats.map((stat, index) => (
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
            {[
              { action: 'New booking created', time: '2 minutes ago', user: 'John Doe' },
              { action: 'Vehicle maintenance completed', time: '1 hour ago', user: 'System' },
              { action: 'New user registered', time: '3 hours ago', user: 'Jane Smith' },
              { action: 'Payment received', time: '5 hours ago', user: 'Mike Johnson' },
            ].map((activity, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
