'use client';

import React, { useState, useEffect } from 'react';
import VehicleCard from '@/components/molecules/VehicleCard';
import Button from '@/components/atoms/Button';
import BookingForm from '@/components/organisms/BookingForm';
import { cn } from '@/utils/cn';

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
  features: string[]
  images: string[]
  description?: string
  purchasePrice?: number
}

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/admin/vehicles')
      const data = await response.json()
      // Filter only available vehicles for public display
      const availableVehicles = Array.isArray(data) 
        ? data.filter(v => v.status === 'AVAILABLE') 
        : []
      setVehicles(availableVehicles)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }

  const vehiclesToShow = showAll ? vehicles : vehicles.slice(0, 4);

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
          {loading ? (
            // Loading skeleton
            Array.from({ length: showAll ? 6 : 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-3/4"></div>
              </div>
            ))
          ) : vehiclesToShow.length > 0 ? (
            vehiclesToShow.map((vehicle: Vehicle, index: number) => (
              <div 
                key={vehicle.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <VehicleCard
                  id={vehicle.id}
                  name={vehicle.name}
                  image={vehicle.images?.[0] || '/4.-alphard-colors-black.png'}
                  price={vehicle.purchasePrice ? Math.round(vehicle.purchasePrice / 1000000) : 250} // Convert to hourly rate estimate
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
                  onBookNow={handleBookNow}
                  onLearnMore={handleLearnMore}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-300 text-lg">No vehicles available at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">Please check back later or contact us for assistance.</p>
            </div>
          )}
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
