'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  UserGroupIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  PhotoIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Students',
    value: '2,047',
    change: '+12%',
    changeType: 'increase',
    icon: UserGroupIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    name: 'New Applications',
    value: '156',
    change: '+8%',
    changeType: 'increase',
    icon: AcademicCapIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    name: 'News Articles',
    value: '23',
    change: '+3',
    changeType: 'increase',
    icon: DocumentTextIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    name: 'Messages',
    value: '89',
    change: '-5%',
    changeType: 'decrease',
    icon: EnvelopeIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
]

const recentActivities = [
  {
    id: 1,
    type: 'application',
    title: 'New admission application received',
    description: 'Priya Sharma applied for Class 10',
    time: '2 hours ago',
    status: 'pending'
  },
  {
    id: 2,
    type: 'message',
    title: 'New contact message',
    description: 'Parent inquiry about fee structure',
    time: '4 hours ago',
    status: 'unread'
  },
  {
    id: 3,
    type: 'news',
    title: 'News article published',
    description: 'CBSE Results 2024: 98% Pass Rate',
    time: '1 day ago',
    status: 'published'
  },
  {
    id: 4,
    type: 'gallery',
    title: 'Photos uploaded',
    description: 'Annual Sports Day 2024',
    time: '2 days ago',
    status: 'completed'
  }
]

const quickActions = [
  {
    name: 'Add News Article',
    description: 'Create and publish new content',
    href: '/admin/content/news/new',
    icon: DocumentTextIcon,
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    name: 'Review Applications',
    description: 'Process pending applications',
    href: '/admin/admissions',
    icon: AcademicCapIcon,
    color: 'bg-green-600 hover:bg-green-700'
  },
  {
    name: 'Upload Photos',
    description: 'Add images to gallery',
    href: '/admin/gallery',
    icon: PhotoIcon,
    color: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    name: 'View Messages',
    description: 'Check contact inquiries',
    href: '/admin/messages',
    icon: EnvelopeIcon,
    color: 'bg-orange-600 hover:bg-orange-700'
  }
]

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at Sunrise Public School.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'increase' ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                    <span className="ml-1">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <div key={activity.id} className="p-6">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'application' ? 'bg-green-100' :
                    activity.type === 'message' ? 'bg-blue-100' :
                    activity.type === 'news' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    {activity.type === 'application' && <AcademicCapIcon className="h-5 w-5 text-green-600" />}
                    {activity.type === 'message' && <EnvelopeIcon className="h-5 w-5 text-blue-600" />}
                    {activity.type === 'news' && <DocumentTextIcon className="h-5 w-5 text-purple-600" />}
                    {activity.type === 'gallery' && <PhotoIcon className="h-5 w-5 text-orange-600" />}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'unread' ? 'bg-red-100 text-red-800' :
                    activity.status === 'published' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <a
                  key={action.name}
                  href={action.href}
                  className={`${action.color} text-white rounded-lg p-4 hover:shadow-lg transition-all duration-200 group`}
                >
                  <div className="flex items-center">
                    <action.icon className="h-6 w-6 mr-3" />
                    <div>
                      <p className="font-medium">{action.name}</p>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white rounded-lg shadow"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Analytics Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-sm text-gray-600">Website Visitors</div>
              <div className="text-xs text-green-600 mt-1">+15% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
              <div className="text-sm text-gray-600">Application Completion Rate</div>
              <div className="text-xs text-green-600 mt-1">+3% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-sm text-gray-600">News Article Views</div>
              <div className="text-xs text-green-600 mt-1">+22% from last month</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
