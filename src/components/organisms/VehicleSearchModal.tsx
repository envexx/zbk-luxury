'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import VehicleCard from '@/components/molecules/VehicleCard';
import Button from '@/components/atoms/Button';
import { cn } from '@/utils/cn';

interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  category: string;
  status: string;
  location: string;
  plateNumber: string;
  capacity: number;
  color: string;
  price: number;
  minimumHours: number;
  features: string[];
  images: string[];
  description?: string;
}

interface BookingData {
  tripType: 'oneWay' | 'roundTrip';
  pickupLocation: string;
  dropOffLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
}

interface VehicleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData;
  onSelectVehicle: (vehicleId: string, bookingData: BookingData) => void;
}

const VehicleSearchModal: React.FC<VehicleSearchModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  onSelectVehicle,
}) => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchVehicles();
    }
  }, [isOpen]);

  useEffect(() => {
    // Filter vehicles based on booking data if needed
    setFilteredVehicles(vehicles);
  }, [vehicles]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/vehicles');
      const result = await response.json();
      
      const availableVehicles = result.success && Array.isArray(result.data)
        ? result.data.filter((v: any) => v.status === 'AVAILABLE')
        : [];
      
      setVehicles(availableVehicles);
      setFilteredVehicles(availableVehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehicles([]);
      setFilteredVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVehicle = (vehicleId: string) => {
    // Prepare booking data with vehicle ID
    const fullBookingData = {
      ...bookingData,
      vehicleId: vehicleId,
    };

    // Store in sessionStorage as backup
    sessionStorage.setItem('bookingData', JSON.stringify(fullBookingData));

    // Navigate to confirmation page
    const bookingDataStr = encodeURIComponent(JSON.stringify(fullBookingData));
    router.push(`/booking/confirmation?vehicleId=${vehicleId}&bookingData=${bookingDataStr}`);
    
    // Close modal
    onClose();
    
    // Call callback if provided
    onSelectVehicle?.(vehicleId, bookingData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-luxury-gold to-yellow-500 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Available Vehicles</h2>
              <p className="text-white/90 text-sm mt-1">
                {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''} available
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500 font-medium">Trip Type:</span>
                <p className="text-gray-900 font-semibold capitalize">{bookingData.tripType === 'oneWay' ? 'One Way' : 'Round Trip'}</p>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Pickup:</span>
                <p className="text-gray-900 font-semibold truncate">{bookingData.pickupLocation || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Drop-off:</span>
                <p className="text-gray-900 font-semibold truncate">{bookingData.dropOffLocation || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Date & Time:</span>
                <p className="text-gray-900 font-semibold">
                  {bookingData.pickupDate} {bookingData.pickupTime}
                </p>
              </div>
            </div>
          </div>

          {/* Vehicle List */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle, index) => (
                  <div
                    key={vehicle.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <VehicleCard
                      id={vehicle.id}
                      name={vehicle.name}
                      image={vehicle.images?.[0] || '/4.-alphard-colors-black.png'}
                      price={vehicle.price || 0}
                      priceUnit="hour"
                      category={vehicle.category}
                      seats={vehicle.capacity}
                      transmission="Automatic"
                      year={vehicle.year}
                      rating={4.8}
                      isLuxury={true}
                      brand={vehicle.name.split(' ')[0]}
                      model={vehicle.model}
                      specialNote={vehicle.description}
                      onBookNow={handleSelectVehicle}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Vehicles Available</h3>
                <p className="text-gray-500 mb-6">We couldn't find any available vehicles matching your criteria.</p>
                <Button
                  variant="primary"
                  onClick={onClose}
                  className="px-6 py-2"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSearchModal;

