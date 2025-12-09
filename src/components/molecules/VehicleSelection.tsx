'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { BookingData } from '@/components/organisms/BookingForm';

export interface Vehicle {
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
  features: string[];
  images: string[];
  description?: string;
  price?: number; // Hourly rental price from database
  purchasePrice?: number;
}

export interface VehicleSelectionProps {
  className?: string;
  initialVehicleId?: string;
  onComplete: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

const VehicleSelection: React.FC<VehicleSelectionProps> = ({
  className,
  initialVehicleId,
  onComplete,
  onBack,
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(initialVehicleId || '');
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/vehicles')
      const result = await response.json()
      
      if (result.success && result.data) {
        // Filter only available vehicles for booking
        const availableVehicles = result.data.filter((v: Vehicle) => v.status === 'AVAILABLE')
        setVehicles(availableVehicles)
      } else {
        setVehicles([])
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }

  // Format category: replace underscores with spaces and capitalize
  const formatCategory = (category: string): string => {
    return category
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const categories = ['All', ...Array.from(new Set(vehicles.map(v => v.category)))]
  
  const filteredVehicles = filter === 'All' 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.category === filter);

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
  };

  const handleContinue = () => {
    if (selectedVehicleId) {
      onComplete({ selectedVehicleId });
    }
  };

  return (
    <div className={cn('max-w-6xl mx-auto', className)}>
      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Choose a Vehicle</h3>
        <p className="text-gray-600">Select from our premium fleet of luxury vehicles</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={cn(
              'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
              filter === category
                ? 'bg-luxury-gold text-gray-900 shadow-md'
                : 'bg-white text-gray-700 hover:bg-luxury-gold/10 hover:text-luxury-gold border border-gray-200 hover:border-luxury-gold/50'
            )}
          >
            {category === 'All' ? category : formatCategory(category)}
          </button>
        ))}
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={cn(
              'bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg',
              'hover:shadow-2xl hover:-translate-y-1 border border-gray-200',
              selectedVehicleId === vehicle.id
                ? 'ring-2 ring-luxury-gold shadow-xl border-luxury-gold'
                : 'hover:border-luxury-gold/50'
            )}
            onClick={() => handleVehicleSelect(vehicle.id)}
          >
            {/* Vehicle Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img 
                src={vehicle.images?.[0] || '/4.-alphard-colors-black.png'} 
                alt={vehicle.name}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Premium Badge */}
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-luxury-gold/90 backdrop-blur-sm text-gray-900 border border-luxury-gold">
                  Premium
                </div>
              </div>
              
              {/* Selected Indicator */}
              {selectedVehicleId === vehicle.id && (
                <div className="absolute inset-0 bg-luxury-gold/10 flex items-center justify-center">
                  <div className="w-14 h-14 bg-luxury-gold rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div className="p-5 bg-white">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{vehicle.name}</h4>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                  <svg className="w-4 h-4 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">4.8</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {vehicle.capacity} seats
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {vehicle.year}
                </span>
                <span className="px-2 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-medium">
                  {formatCategory(vehicle.category)}
                </span>
              </div>

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {vehicle.features.slice(0, 3).map((feature) => (
                    <span key={feature} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                  {vehicle.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                      +{vehicle.features.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <span className="text-2xl font-bold text-gray-900">${vehicle.price || 250}</span>
                  <span className="text-sm text-gray-600 ml-1">/hour</span>
                </div>
                <Button
                  variant={selectedVehicleId === vehicle.id ? 'primary' : 'secondary'}
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVehicleSelect(vehicle.id);
                  }}
                  className={selectedVehicleId === vehicle.id ? 'bg-luxury-gold hover:bg-luxury-gold/90' : ''}
                >
                  {selectedVehicleId === vehicle.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Vehicle Summary */}
      {selectedVehicle && (
        <div className="bg-white border-2 border-luxury-gold rounded-2xl p-5 mb-8 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
            <h4 className="text-lg font-bold text-gray-900">Selected Vehicle</h4>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={selectedVehicle.images?.[0] || '/4.-alphard-colors-black.png'}
                alt={selectedVehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-lg mb-1">{selectedVehicle.name}</div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-medium">
                  {formatCategory(selectedVehicle.category)}
                </span>
                <span>•</span>
                <span>{selectedVehicle.capacity} seats</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-luxury-gold">${selectedVehicle.price || 250}</div>
              <div className="text-sm text-gray-600">/hour</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="ghost"
          size="large"
          onClick={onBack}
          className="px-8"
        >
          Back
        </Button>
        
        <Button
          variant="primary"
          size="large"
          onClick={handleContinue}
          disabled={!selectedVehicleId}
          className="px-12"
        >
          Continue to Order
        </Button>
      </div>
    </div>
  );
};

export default VehicleSelection;
