'use client';

import React, { useState } from 'react';
import VehicleCard from '@/components/molecules/VehicleCard';
import Button from '@/components/atoms/Button';
import BookingForm from '@/components/organisms/BookingForm';
import { cn } from '@/utils/cn';

// Real fleet data
const sampleVehicles = [
  {
    id: '1',
    name: 'TOYOTA ALPHARD',
    image: '/4.-alphard-colors-black.png',
    price: 240,
    category: 'Wedding Affairs',
    seats: 7,
    transmission: 'Automatic' as const,
    year: 2024,
    rating: 4.9,
    isLuxury: true,
    specialNote: 'Wedding Function - Minimum 5 hours',
    brand: 'TOYOTA',
    model: 'ALPHARD',
  },
  {
    id: '2',
    name: 'TOYOTA ALPHARD / VELLFIRE',
    image: '/4.-alphard-colors-black.png',
    price: 320,
    category: 'Alphard',
    seats: 4,
    transmission: 'Automatic' as const,
    year: 2024,
    rating: 4.8,
    isLuxury: true,
    brand: 'Toyota',
    model: 'ALPHARD / VELLFIRE',
    doors: 3,
  },
  {
    id: '3',
    name: 'TOYOTA HIACE COMBI 13 SEATER',
    image: '/4.-alphard-colors-black.png',
    price: 360,
    category: 'COMBI',
    seats: 12,
    transmission: 'Automatic' as const,
    year: 2024,
    rating: 4.7,
    isLuxury: false,
    brand: 'TOYOTA',
    model: 'HIACE',
    engine: '3000',
    fuel: 'Diesel',
    doors: 4,
    specialNote: '13 SEATER',
  },
];

export interface FleetSectionProps {
  className?: string;
  showAll?: boolean;
  onViewAll?: () => void;
}

const FleetSection: React.FC<FleetSectionProps> = ({
  className,
  showAll = false,
  onViewAll,
}) => {
  const vehiclesToShow = showAll ? sampleVehicles : sampleVehicles.slice(0, 4);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');

  const handleBookNow = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setShowBookingForm(true);
  };

  const handleLearnMore = (vehicleId: string) => {
    console.log('Learn more about vehicle:', vehicleId);
    // Handle navigation to vehicle details
  };

  const handleBookingComplete = (bookingData: any) => {
    console.log('Booking completed:', bookingData);
    // Handle successful booking (e.g., redirect to confirmation page)
    setShowBookingForm(false);
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
    setSelectedVehicleId('');
  };

  return (
    <section className={cn('py-16 lg:py-20 bg-deep-navy', className)} data-section="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Only show when not showing all vehicles (i.e., not on fleet page) */}
        {!showAll && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Premium Fleet
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
              Choose from our carefully curated collection of luxury vehicles, each maintained to the highest standards for your comfort and safety.
            </p>
            
            {/* Decorative divider */}
            <div className="w-16 h-1 bg-luxury-gold mx-auto rounded-full"></div>
          </div>
        )}

        {/* Vehicle Grid */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12",
          showAll && "mt-8" // Add top margin when no header is shown
        )}>
          {vehiclesToShow.map((vehicle, index) => (
            <div 
              key={vehicle.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <VehicleCard
                {...vehicle}
                priceUnit="hour"
                onBookNow={handleBookNow}
                onLearnMore={handleLearnMore}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && (
          <div className="text-center">
            <Button 
              variant="secondary" 
              size="large"
              onClick={onViewAll}
              className="px-12"
            >
              View All Vehicles
            </Button>
          </div>
        )}

      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCloseBooking}></div>
            <div className="relative bg-deep-navy rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <BookingForm
                initialVehicleId={selectedVehicleId}
                onClose={handleCloseBooking}
                onSubmit={handleBookingComplete}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FleetSection;
