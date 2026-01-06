'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import AuthModal from '@/components/organisms/AuthModal';
import BookingForm from '@/components/organisms/BookingForm';
import VehicleSearchModal from '@/components/organisms/VehicleSearchModal';
import AlertModal from '@/components/molecules/AlertModal';
import { useAuth } from '@/contexts/AuthContext';

export interface HeroProps {
  onBookingClick?: () => void;
}

interface HeroSectionData {
  headline: string;
  description: string;
  image?: string;
}

const Hero: React.FC<HeroProps> = ({ onBookingClick }) => {
  const { isAuthenticated } = useAuth();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showVehicleSearchModal, setShowVehicleSearchModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [heroData, setHeroData] = useState<HeroSectionData>({
    headline: 'Premium Limousine Service in Singapore',
    description: 'Professional limousine rental services with premium Toyota Alphard & Hiace. Experience luxury limo transportation for airport transfers, city tours, corporate events, and special occasions. Book your elegant ride today.',
    image: '/Hero.jpg'
  });
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
  }>({
    isOpen: false,
    message: '',
    type: 'info',
  });

  // Fetch hero section data from API
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero-section');
        if (response.ok) {
          const data = await response.json();
          setHeroData({
            headline: data.headline || heroData.headline,
            description: data.description || heroData.description
          });
        }
      } catch (error) {
        console.error('Error fetching hero section:', error);
        // Use default values if fetch fails
      }
    };

    fetchHeroData();
  }, []);

  const showAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', title?: string) => {
    setAlertModal({
      isOpen: true,
      message,
      type,
      title,
    });
  };

  const handleSearchVehicles = () => {
    setShowVehicleSearchModal(true);
  };

  const handleSelectVehicle = (vehicleId: string) => {
    setShowVehicleSearchModal(false);
    setShowBookingForm(true);
  };

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
    showAlert(
      'Booking confirmed! You will receive a confirmation email shortly.',
      'success',
      'Booking Successful'
    );
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
            backgroundImage: `url('${heroData.image || '/Hero.jpg'}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {heroData.headline}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            {heroData.description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
              <Button 
                variant="primary" 
                size="large"
            className="px-12 py-4 h-16 bg-luxury-gold hover:bg-luxury-gold/90 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-luxury-gold/20"
                onClick={handleSearchVehicles}
              >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            Book Your Ride
              </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Vehicle Search Modal */}
      <VehicleSearchModal
        isOpen={showVehicleSearchModal}
        onClose={() => setShowVehicleSearchModal(false)}
      />

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


      {/* Alert Modal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </section>
  );
};

export default Hero;
