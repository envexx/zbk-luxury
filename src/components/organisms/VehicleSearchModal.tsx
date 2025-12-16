'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/atoms/Button';
import RideDetailsForm from '@/components/molecules/RideDetailsForm';
import VehicleSelection from '@/components/molecules/VehicleSelection';
import OrderSummary from '@/components/molecules/OrderSummary';
import { BookingData } from '@/components/organisms/BookingForm';
import BookingForm from '@/components/organisms/BookingForm';

export interface VehicleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<BookingData>;
}

const VehicleSearchModal: React.FC<VehicleSearchModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>(initialData || {});

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Cleanup function - restore scroll when modal closes
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRideDetailsComplete = (data: Partial<BookingData>) => {
    const updatedData = { ...bookingData, ...data };
    setBookingData(updatedData);
    setCurrentStep(2);
  };

  const handleVehicleSelectComplete = (data: Partial<BookingData>) => {
    setBookingData({ ...bookingData, ...data });
    setCurrentStep(3);
  };

  const handleOrderSummaryComplete = async (data: Partial<BookingData>) => {
    // Update booking data with customer info
    const updatedBookingData = { ...bookingData, ...data };
    setBookingData(updatedBookingData);

    // Proceed with payment
    try {
      // Determine service type based on duration
      let service = 'RENTAL';
      const hours = parseInt(updatedBookingData.hours as string) || 8;
      if ((updatedBookingData.pickupLocation as string)?.toLowerCase().includes('airport') || 
          (updatedBookingData.dropOffLocation as string)?.toLowerCase().includes('airport')) {
        service = 'AIRPORT_TRANSFER';
      }

      // Prepare booking data for API
      const bookingPayload = {
        customerName: updatedBookingData.customerInfo?.name,
        customerEmail: updatedBookingData.customerInfo?.email,
        customerPhone: updatedBookingData.customerInfo?.phone,
        vehicleId: updatedBookingData.selectedVehicleId,
        service: service,
        startDate: updatedBookingData.pickupDate,
        endDate: updatedBookingData.returnDate || updatedBookingData.pickupDate,
        startTime: updatedBookingData.pickupTime,
        duration: `${hours} hours`,
        pickupLocation: updatedBookingData.pickupLocation,
        dropoffLocation: updatedBookingData.dropOffLocation,
        status: 'PENDING',
        notes: `Trip Type: ${updatedBookingData.tripType}${updatedBookingData.returnTime ? `, Return Time: ${updatedBookingData.returnTime}` : ''}`
      };

      // Step 1: Create booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      const bookingResult = await bookingResponse.json();

      if (!bookingResult.success) {
        console.error('Booking failed:', bookingResult.error);
        alert(`Booking failed: ${bookingResult.error}`);
        return;
      }

      const bookingId = bookingResult.data.id;

      // Step 2: Create Stripe checkout session
      const checkoutResponse = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId }),
      });

      if (!checkoutResponse.ok) {
        const errorData = await checkoutResponse.json().catch(() => ({ error: 'Failed to parse error response' }));
        alert(`Payment setup failed (${checkoutResponse.status}): ${errorData.error || 'Unknown error'}`);
        return;
      }

      const checkoutResult = await checkoutResponse.json();

      if (checkoutResult.success && checkoutResult.url) {
        // Redirect to Stripe Checkout
        window.location.href = checkoutResult.url;
      } else {
        alert(`Payment setup failed: ${checkoutResult.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-3 sm:px-4 py-4 sm:py-8">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-md" 
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-6xl w-full h-[calc(100vh-2rem)] sm:h-auto sm:max-h-[90vh] overflow-hidden border border-luxury-gold/30">
          {/* Header */}
          <div className="sticky top-0 bg-white/98 border-b border-luxury-gold/30 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 flex items-center justify-between z-10 backdrop-blur-sm">
            <div className="flex-1 min-w-0 pr-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Book Your Ride</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-1.5 font-medium">
                Step {currentStep} of 3: {
                  currentStep === 1 ? 'Ride Details' :
                  currentStep === 2 ? 'Vehicle Selection' :
                  'Order Summary'
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-luxury-gold/5 via-white to-luxury-gold/5 border-b border-luxury-gold/20">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex items-center flex-1">
                    <div className="flex flex-col items-center w-full">
                      <div
                        className={cn(
                          'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-sm',
                          currentStep === step
                            ? 'bg-luxury-gold text-gray-900 shadow-lg shadow-luxury-gold/30 scale-110'
                            : currentStep > step
                            ? 'bg-luxury-gold/90 text-gray-900'
                            : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                        )}
                      >
                        {currentStep > step ? (
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-base sm:text-lg">{step}</span>
                        )}
                      </div>
                      <span
                        className={cn(
                          'mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider hidden xs:block transition-colors text-center',
                          currentStep >= step ? 'text-luxury-gold' : 'text-gray-400'
                        )}
                      >
                        {
                          step === 1 ? 'Ride Details' :
                          step === 2 ? 'Select Vehicle' :
                          'Review & Book'
                        }
                      </span>
                    </div>
                  </div>
                  {step < 3 && (
                    <div className="flex-1 mx-2 sm:mx-4 h-0.5 relative">
                      <div className={cn(
                        'absolute inset-0 rounded-full transition-all duration-500',
                        currentStep > step ? 'bg-luxury-gold' : 'bg-gray-200'
                      )} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8 bg-white overflow-y-auto h-[calc(100vh-200px)] sm:h-[calc(90vh-280px)]">
            {currentStep === 1 && (
              <RideDetailsForm
                initialData={bookingData}
                onComplete={handleRideDetailsComplete}
              />
            )}

            {currentStep === 2 && (
              <VehicleSelection
                initialVehicleId={bookingData.selectedVehicleId}
                bookingData={bookingData as BookingData}
                onComplete={handleVehicleSelectComplete}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <OrderSummary
                bookingData={bookingData as BookingData}
                onComplete={(data) => {
                  handleOrderSummaryComplete(data);
                  // OrderSummary will redirect to Stripe, so we can close the modal
                  // The redirect happens in OrderSummary's handleSubmit
                }}
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSearchModal;

