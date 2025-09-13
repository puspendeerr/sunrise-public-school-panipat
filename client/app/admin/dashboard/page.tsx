'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  PhotoIcon, 
  NewspaperIcon,
  CalendarIcon,
  EnvelopeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface DashboardStats {
  totalApplications: number
  pendingApplications: number
  acceptedApplications: number
  totalNews: number
  totalEvents: number
  totalGallery: number
  totalMessages: number
}

interface RecentApplication {
  id: number
  student_name: string
  parent_name: string
  email: string
  grade_applying: string
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    totalNews: 0,
    totalEvents: 0,
    totalGallery: 0,
    totalMessages: 0
  })
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      // Demo data - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Set demo statistics
      setStats({
        totalApplications: 156,
        pendingApplications: 23,
        acceptedApplications: 98,
        totalNews: 12,
        totalEvents: 8,
        totalGallery: 45,
        totalMessages: 23
      })

      // Set demo recent applications
      setRecentApplications([
        {
          id: 1,
          student_name: 'Priya Sharma',
          parent_name: 'Rajesh Sharma',
          email: 'priya.sharma@email.com',
          grade_applying: 'Class 10',
          status: 'pending',
          created_at: '2024-12-15T10:30:00Z'
        },
        {
          id: 2,
          student_name: 'Arjun Kumar',
          parent_name: 'Sunita Kumar',
          email: 'arjun.kumar@email.com',
          grade_applying: 'Class 8',
          status: 'accepted',
          created_at: '2024-12-14T14:20:00Z'
        },
        {
          id: 3,
          student_name: 'Sneha Patel',
          parent_name: 'Vikram Patel',
          email: 'sneha.patel@email.com',
          grade_applying: 'Class 6',
          status: 'under_review',
          created_at: '2024-12-13T09:15:00Z'
        },
        {
          id: 4,
          student_name: 'Rohan Singh',
          parent_name: 'Anita Singh',
          email: 'rohan.singh@email.com',
          grade_applying: 'Class 9',
          status: 'accepted',
          created_at: '2024-12-12T16:45:00Z'
        },
        {
          id: 5,
          student_name: 'Kavya Reddy',
          parent_name: 'Suresh Reddy',
          email: 'kavya.reddy@email.com',
          grade_applying: 'Class 7',
          status: 'pending',
          created_at: '2024-12-11T11:30:00Z'
        }
      ])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'under_review': return 'bg-blue-100 text-blue-800'
      case 'waitlisted': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at Sunrise Public School.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-gray-900">{stats.acceptedApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <EnvelopeIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <button
                onClick={() => router.push('/admin/admissions')}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.student_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.parent_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.grade_applying}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <NewspaperIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">News & Events</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage school news and upcoming events.</p>
            <button
              onClick={() => router.push('/admin/news')}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Manage Content
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <PhotoIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Gallery</h3>
            </div>
            <p className="text-gray-600 mb-4">Upload and manage school photos and videos.</p>
            <button
              onClick={() => router.push('/admin/gallery')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Manage Gallery
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Events</h3>
            </div>
            <p className="text-gray-600 mb-4">Create and manage school events and activities.</p>
            <button
              onClick={() => router.push('/admin/events')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Manage Events
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
