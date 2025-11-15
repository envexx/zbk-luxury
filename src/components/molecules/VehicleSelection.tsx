'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { BookingData } from '@/components/organisms/BookingForm';

export interface Vehicle {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  year: number;
  rating: number;
  isLuxury: boolean;
  features?: string[];
}

export interface VehicleSelectionProps {
  className?: string;
  initialVehicleId?: string;
  onComplete: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

// Real fleet data
const availableVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'TOYOTA ALPHARD',
    image: '/4.-alphard-colors-black.png',
    price: 240,
    category: 'Wedding Affairs',
    seats: 7,
    transmission: 'Automatic',
    year: 2024,
    rating: 4.9,
    isLuxury: true,
    features: ['Wedding Function', 'Minimum 5 hours', 'Premium Interior', 'Air Conditioning'],
  },
  {
    id: '2',
    name: 'TOYOTA ALPHARD / VELLFIRE',
    image: '/4.-alphard-colors-black.png',
    price: 320,
    category: 'Alphard',
    seats: 4,
    transmission: 'Automatic',
    year: 2024,
    rating: 4.8,
    isLuxury: true,
    features: ['Premium Seating', '3 Doors', 'Luxury Interior', 'Climate Control'],
  },
  {
    id: '3',
    name: 'TOYOTA HIACE COMBI 13 SEATER',
    image: '/4.-alphard-colors-black.png',
    price: 360,
    category: 'COMBI',
    seats: 12,
    transmission: 'Automatic',
    year: 2024,
    rating: 4.7,
    isLuxury: false,
    features: ['13 Seater', '3000cc Engine', 'Diesel', '4 Doors'],
  },
];

const VehicleSelection: React.FC<VehicleSelectionProps> = ({
  className,
  initialVehicleId,
  onComplete,
  onBack,
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(initialVehicleId || '');
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Wedding Affairs', 'Alphard', 'COMBI'];
  
  const filteredVehicles = filter === 'All' 
    ? availableVehicles 
    : availableVehicles.filter(vehicle => vehicle.category === filter);

  const selectedVehicle = availableVehicles.find(v => v.id === selectedVehicleId);

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
        <h3 className="text-xl font-bold text-white mb-2">Choose a Vehicle</h3>
        <p className="text-charcoal">Select from our premium fleet of luxury vehicles</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={cn(
              'px-4 py-2 rounded-compact text-sm font-medium transition-all',
              filter === category
                ? 'bg-luxury-gold text-deep-navy'
                : 'bg-light-gray text-charcoal hover:bg-luxury-gold hover:bg-opacity-20'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={cn(
              'bg-off-white rounded-compact overflow-hidden cursor-pointer transition-all duration-micro',
              'hover:shadow-glow hover:scale-[1.02]',
              selectedVehicleId === vehicle.id
                ? 'ring-2 ring-luxury-gold shadow-glow'
                : 'hover:ring-1 hover:ring-luxury-gold'
            )}
            onClick={() => handleVehicleSelect(vehicle.id)}
          >
            {/* Vehicle Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-contain transition-transform duration-micro hover:scale-110"
              />
              {vehicle.isLuxury && (
                <Badge
                  variant="luxury"
                  className="absolute top-3 right-3"
                >
                  Luxury
                </Badge>
              )}
              {selectedVehicleId === vehicle.id && (
                <div className="absolute inset-0 bg-luxury-gold bg-opacity-20 flex items-center justify-center">
                  <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-deep-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-deep-navy">{vehicle.name}</h4>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-charcoal">{vehicle.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3 text-sm text-charcoal">
                <span>{vehicle.category}</span>
                <span>•</span>
                <span>{vehicle.seats} seats</span>
                <span>•</span>
                <span>{vehicle.year}</span>
              </div>

              {/* Features */}
              {vehicle.features && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {vehicle.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="neutral" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {vehicle.features.length > 2 && (
                    <Badge variant="neutral" className="text-xs">
                      +{vehicle.features.length - 2} more
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-luxury-gold">${vehicle.price}</span>
                  <span className="text-sm text-charcoal ml-1">/hour</span>
                </div>
                <Button
                  variant={selectedVehicleId === vehicle.id ? "primary" : "secondary"}
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVehicleSelect(vehicle.id);
                  }}
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
        <div className="bg-luxury-gold bg-opacity-10 border border-luxury-gold rounded-compact p-4 mb-8">
          <h4 className="text-lg font-semibold text-luxury-gold mb-2">Selected Vehicle</h4>
          <div className="flex items-center gap-4">
            <img
              src={selectedVehicle.image}
              alt={selectedVehicle.name}
              className="w-16 h-12 object-contain rounded"
            />
            <div className="flex-1">
              <div className="font-semibold text-white">{selectedVehicle.name}</div>
              <div className="text-sm text-charcoal">{selectedVehicle.category} • {selectedVehicle.seats} seats</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-luxury-gold">${selectedVehicle.price}/hour</div>
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
