'use client'

import { useState, useEffect } from 'react'
import { Car, Plus, Edit, Trash, Eye, Settings, CheckCircle, XCircle, AlertCircle } from '@/components/admin/Icons'
import VehicleModal from '@/components/admin/VehicleModal'

interface Vehicle {
  id: string
  name: string
  model: string
  year: number
  category: string
  status: string
  location: string
  plateNumber: string
  capacity: number
  color: string
  purchaseDate: string
  purchasePrice: number
  mileage: string
  features: string[]
  images: string[]
  description: string
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Fetch vehicles from API
  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/admin/vehicles')
      const data = await response.json()
      // Ensure data is an array
      setVehicles(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      setVehicles([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleAddVehicle = () => {
    setSelectedVehicle(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (deleteConfirm === vehicleId) {
      try {
        const response = await fetch(`/api/vehicles/${vehicleId}`, {
          method: 'DELETE'
        })
        const data = await response.json()
        if (data.success) {
          setVehicles(vehicles.filter(v => v.id !== vehicleId))
          setDeleteConfirm(null)
        } else {
          alert('Failed to delete vehicle')
        }
      } catch (error) {
        console.error('Error deleting vehicle:', error)
        alert('Error deleting vehicle')
      }
    } else {
      setDeleteConfirm(vehicleId)
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  const handleSaveVehicle = async (vehicleData: any) => {
    try {
      const url = modalMode === 'add' ? '/api/admin/vehicles' : `/api/vehicles/${selectedVehicle?.id}`
      const method = modalMode === 'add' ? 'POST' : 'PUT'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicleData)
      })
      
      const data = await response.json()
      if (response.ok) {
        if (modalMode === 'add') {
          setVehicles([...vehicles, data])
        } else {
          setVehicles(vehicles.map(v => v.id === selectedVehicle?.id ? data : v))
        }
        setIsModalOpen(false)
        setSelectedVehicle(null)
      } else {
        alert('Failed to save vehicle')
      }
    } catch (error) {
      console.error('Error saving vehicle:', error)
      alert('Error saving vehicle')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'BOOKED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'MAINTENANCE': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'OUT_OF_SERVICE': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500 dark:text-gray-400">Loading vehicles...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Vehicle Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your luxury vehicle fleet
          </p>
        </div>
        <button 
          onClick={handleAddVehicle}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Vehicles</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{vehicles.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Car className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{Array.isArray(vehicles) ? vehicles.filter(v => v.status === 'AVAILABLE').length : 0}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Booked</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{Array.isArray(vehicles) ? vehicles.filter(v => v.status === 'BOOKED' || v.status === 'RESERVED' || v.status === 'IN_USE').length : 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <XCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Maintenance</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{Array.isArray(vehicles) ? vehicles.filter(v => v.status === 'MAINTENANCE').length : 0}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Vehicle List
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Model & Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Plate Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {Array.isArray(vehicles) && vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {vehicle.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {vehicle.model} ({vehicle.year})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {vehicle.plateNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditVehicle(vehicle)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20"
                        title="Edit Vehicle"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className={`p-1 rounded transition-colors ${
                          deleteConfirm === vehicle.id 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                            : 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                        }`}
                        title={deleteConfirm === vehicle.id ? "Click again to confirm delete" : "Delete Vehicle"}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicle Modal */}
      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVehicle}
        vehicle={selectedVehicle}
        mode={modalMode}
      />
    </div>
  )
}
