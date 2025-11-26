'use client';

import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import AuthModal from '@/components/organisms/AuthModal';
import BookingForm from '@/components/organisms/BookingForm';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/utils/cn';

export interface HeroProps {
  onBookingClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookingClick }) => {
  const { isAuthenticated } = useAuth();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick();
    } else {
      // Allow guest booking - no authentication required
      setShowBookingForm(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowBookingForm(true);
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
  };

  const handleBookingComplete = (bookingData: any) => {
    console.log('Booking completed:', bookingData);
    setShowBookingForm(false);
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  const scrollToFleet = () => {
    const fleetSection = document.querySelector('[data-section="fleet"]');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative min-h-[120vh] lg:min-h-[130vh] flex items-center justify-center overflow-hidden py-8 lg:py-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Hero.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Experience{' '}
            <span className="text-gradient bg-gradient-to-r from-luxury-gold to-yellow-300 bg-clip-text text-transparent">
              Luxury Travel
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Premium Toyota Alphard & Hiace rental for City Tours, Hourly Renting, and Special Events. Experience luxury transportation tailored to your needs.
          </p>
        </div>

        {/* Enhanced Booking Form */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/40 relative overflow-hidden">
            {/* Subtle glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/15 to-white/5 rounded-3xl"></div>
            <div className="relative z-10">
            {/* Form Header */}
            <div className="text-center mb-10 lg:mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">Book Your Luxury Ride</h3>
              <p className="text-gray-600 text-lg">Quick and easy reservation in just a few clicks</p>
            </div>

            {/* Trip Type Selector */}
            <div className="flex justify-center mb-10 lg:mb-12">
              <div className="bg-white/40 backdrop-blur-sm rounded-full p-1 inline-flex border border-white/50">
                <button 
                  onClick={() => setTripType('oneWay')}
                  className={cn(
                    "px-6 py-2 rounded-full font-medium transition-all duration-300",
                    tripType === 'oneWay' 
                      ? "bg-luxury-gold text-white shadow-md" 
                      : "text-gray-700 hover:text-gray-800 hover:bg-white/10"
                  )}
                >
                  One Way
                </button>
                <button 
                  onClick={() => setTripType('roundTrip')}
                  className={cn(
                    "px-6 py-2 rounded-full font-medium transition-all duration-300",
                    tripType === 'roundTrip' 
                      ? "bg-luxury-gold text-white shadow-md" 
                      : "text-gray-700 hover:text-gray-800 hover:bg-white/10"
                  )}
                >
                  Round Trip
                </button>
              </div>
            </div>

            {/* Location Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-10">
              <div className="relative group">
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                  <svg className="w-4 h-4 mr-2 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
                  </svg>
                  PICK-UP LOCATION
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter pickup location"
                    className="w-full h-14 pl-12 pr-4 py-3 border-2 border-white/40 rounded-xl focus:border-luxury-gold focus:outline-none bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-300 group-hover:border-white/60"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                  <svg className="w-4 h-4 mr-2 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
                  </svg>
                  DROP-OFF LOCATION
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter destination"
                    className="w-full h-14 pl-12 pr-4 py-3 border-2 border-white/40 rounded-xl focus:border-luxury-gold focus:outline-none bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-300 group-hover:border-white/60"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time Section */}
            <div className={cn(
              "grid gap-6 lg:gap-8 mb-10 lg:mb-12",
              tripType === 'oneWay' 
                ? "grid-cols-1 md:grid-cols-2" 
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            )}>
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                  <svg className="w-4 h-4 mr-2 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  PICK-UP DATE
                </label>
                <input 
                  type="date" 
                  className="w-full h-14 px-4 py-3 border-2 border-white/40 rounded-xl focus:border-luxury-gold focus:outline-none bg-white/70 backdrop-blur-sm text-gray-800 transition-all duration-300 group-hover:border-white/60"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                  <svg className="w-4 h-4 mr-2 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  PICK-UP TIME
                </label>
                <select className="w-full h-14 px-4 py-3 border-2 border-white/40 rounded-xl focus:border-luxury-gold focus:outline-none bg-white/80 backdrop-blur-sm text-gray-800 transition-all duration-300 group-hover:border-white/60">
                  <option value="" className="text-gray-600">Select time</option>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour24 = i;
                    const hour12 = hour24 % 12 || 12;
                    const ampm = hour24 >= 12 ? 'PM' : 'AM';
                    const hour24String = i.toString().padStart(2, '0');
                    return <option key={hour24String} value={hour24String + ':00'} className="text-gray-800">{hour12}:00 {ampm}</option>;
                  })}
                </select>
              </div>

              {/* Return Date & Time - Only show for Round Trip */}
              {tripType === 'roundTrip' && (
                <>
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                      <svg className="w-4 h-4 mr-2 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      RETURN DATE
                    </label>
                    <input 
                      type="date" 
                      className="w-full h-14 px-4 py-3 border-2 border-white/40 rounded-xl focus:border-luxury-gold focus:outline-none bg-white/70 backdrop-blur-sm text-gray-800 transition-all duration-300 group-hover:border-white/60"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-3">
                      <svg className="w-4 h-4 mr-2 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      RETURN TIME
                    </label>
                    <select className="w-full h-14 px-4 py-3 border-2 border-white/40 rounded-xl focus:border-luxury-gold focus:outline-none bg-white/80 backdrop-blur-sm text-gray-800 transition-all duration-300 group-hover:border-white/60">
                      <option value="" className="text-gray-600">Select time</option>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour24 = i;
                        const hour12 = hour24 % 12 || 12;
                        const ampm = hour24 >= 12 ? 'PM' : 'AM';
                        const hour24String = i.toString().padStart(2, '0');
                        return <option key={hour24String} value={hour24String + ':00'} className="text-gray-800">{hour12}:00 {ampm}</option>;
                      })}
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* Search Button */}
            <div className="text-center mb-8 lg:mb-10">
              <Button 
                variant="primary" 
                size="large"
                className="px-10 py-3 h-14 bg-luxury-gold hover:bg-luxury-gold/90 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-luxury-gold/20"
                onClick={handleBookingClick}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Vehicles
              </Button>
            </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-2 sm:px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCloseBooking}></div>
            <div className="relative bg-deep-navy rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
              <BookingForm
                onClose={handleCloseBooking}
                onSubmit={handleBookingComplete}
              />
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signup"
        onSuccess={handleAuthSuccess}
      />
    </section>
  );
};

export default Hero;
