'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface Application {
  id: number
  student_name: string
  parent_name: string
  email: string
  phone: string
  grade_applying: string
  previous_school?: string
  birth_date: string
  address: string
  emergency_contact?: string
  medical_conditions?: string
  special_needs?: string
  additional_info?: string
  status: string
  notes?: string
  created_at: string
  updated_at: string
}

export default function AdmissionsManagement() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [updateNotes, setUpdateNotes] = useState('')
  const [updateStatus, setUpdateStatus] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchApplications()
  }, [router])

  useEffect(() => {
    filterApplications()
  }, [applications, searchTerm, statusFilter])

  const fetchApplications = async () => {
    try {
      // Demo data - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Set demo applications
      const demoApplications = [
        {
          id: 1,
          student_name: 'Priya Sharma',
          parent_name: 'Rajesh Sharma',
          email: 'priya.sharma@email.com',
          phone: '+91 98765 43210',
          grade_applying: 'Class 10',
          previous_school: 'ABC School',
          birth_date: '2008-05-15',
          address: '123 Main Street, Mumbai, Maharashtra',
          emergency_contact: '+91 98765 43211',
          medical_conditions: 'None',
          special_needs: 'None',
          additional_info: 'Interested in science stream',
          status: 'pending',
          notes: '',
          created_at: '2024-12-15T10:30:00Z',
          updated_at: '2024-12-15T10:30:00Z'
        },
        {
          id: 2,
          student_name: 'Arjun Kumar',
          parent_name: 'Sunita Kumar',
          email: 'arjun.kumar@email.com',
          phone: '+91 98765 43212',
          grade_applying: 'Class 8',
          previous_school: 'XYZ School',
          birth_date: '2010-08-22',
          address: '456 Park Avenue, Delhi, Delhi',
          emergency_contact: '+91 98765 43213',
          medical_conditions: 'None',
          special_needs: 'None',
          additional_info: 'Good in mathematics',
          status: 'accepted',
          notes: 'Excellent academic record',
          created_at: '2024-12-14T14:20:00Z',
          updated_at: '2024-12-14T16:30:00Z'
        },
        {
          id: 3,
          student_name: 'Sneha Patel',
          parent_name: 'Vikram Patel',
          email: 'sneha.patel@email.com',
          phone: '+91 98765 43214',
          grade_applying: 'Class 6',
          previous_school: 'DEF School',
          birth_date: '2012-03-10',
          address: '789 Garden Road, Bangalore, Karnataka',
          emergency_contact: '+91 98765 43215',
          medical_conditions: 'None',
          special_needs: 'None',
          additional_info: 'Loves reading and writing',
          status: 'under_review',
          notes: 'Under review for scholarship',
          created_at: '2024-12-13T09:15:00Z',
          updated_at: '2024-12-13T11:45:00Z'
        },
        {
          id: 4,
          student_name: 'Rohan Singh',
          parent_name: 'Anita Singh',
          email: 'rohan.singh@email.com',
          phone: '+91 98765 43216',
          grade_applying: 'Class 9',
          previous_school: 'GHI School',
          birth_date: '2009-11-05',
          address: '321 Lake View, Chennai, Tamil Nadu',
          emergency_contact: '+91 98765 43217',
          medical_conditions: 'None',
          special_needs: 'None',
          additional_info: 'Interested in sports',
          status: 'accepted',
          notes: 'Good sports potential',
          created_at: '2024-12-12T16:45:00Z',
          updated_at: '2024-12-12T18:20:00Z'
        },
        {
          id: 5,
          student_name: 'Kavya Reddy',
          parent_name: 'Suresh Reddy',
          email: 'kavya.reddy@email.com',
          phone: '+91 98765 43218',
          grade_applying: 'Class 7',
          previous_school: 'JKL School',
          birth_date: '2011-07-18',
          address: '654 Hill Station, Hyderabad, Telangana',
          emergency_contact: '+91 98765 43219',
          medical_conditions: 'None',
          special_needs: 'None',
          additional_info: 'Artistic and creative',
          status: 'pending',
          notes: '',
          created_at: '2024-12-11T11:30:00Z',
          updated_at: '2024-12-11T11:30:00Z'
        }
      ]
      
      setApplications(demoApplications)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = applications

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.grade_applying.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter)
    }

    setFilteredApplications(filtered)
  }

  const handleStatusUpdate = async () => {
    if (!selectedApplication || !updateStatus) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/admissions/${selectedApplication.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: updateStatus,
          notes: updateNotes
        })
      })

      if (response.ok) {
        // Update the application in the list
        setApplications(prev => prev.map(app => 
          app.id === selectedApplication.id 
            ? { ...app, status: updateStatus, notes: updateNotes }
            : app
        ))
        setShowModal(false)
        setSelectedApplication(null)
        setUpdateNotes('')
        setUpdateStatus('')
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const openModal = (application: Application) => {
    setSelectedApplication(application)
    setUpdateStatus(application.status)
    setUpdateNotes(application.notes || '')
    setShowModal(true)
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckIcon className="h-4 w-4" />
      case 'rejected': return <XMarkIcon className="h-4 w-4" />
      case 'pending': return <ClockIcon className="h-4 w-4" />
      default: return <ClockIcon className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admission Applications</h1>
            <p className="text-gray-600">Manage and review student applications</p>
          </div>
          <div className="text-sm text-gray-500">
            Total: {applications.length} applications
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name, parent, email, or grade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="waitlisted">Waitlisted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
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
                      <div className="text-sm text-gray-900">{application.email}</div>
                      <div className="text-sm text-gray-500">{application.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{application.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(application)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No applications match your filters'
                  : 'No applications found'
                }
              </div>
            </div>
          )}
        </div>

        {/* Application Details Modal */}
        {showModal && selectedApplication && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Application Details
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Student Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.student_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Parent Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.parent_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Grade Applying</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.grade_applying}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.birth_date}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.address}</p>
                  </div>

                  {selectedApplication.previous_school && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Previous School</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.previous_school}</p>
                    </div>
                  )}

                  {selectedApplication.medical_conditions && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.medical_conditions}</p>
                    </div>
                  )}

                  {selectedApplication.special_needs && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Special Needs</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.special_needs}</p>
                    </div>
                  )}

                  {selectedApplication.additional_info && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.additional_info}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="under_review">Under Review</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="waitlisted">Waitlisted</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      value={updateNotes}
                      onChange={(e) => setUpdateNotes(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Add notes about this application..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusUpdate}
                    className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
