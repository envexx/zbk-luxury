'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/atoms/Button';
import RideDetailsForm from '@/components/molecules/RideDetailsForm';
import VehicleSelection from '@/components/molecules/VehicleSelection';
import OrderSummary from '@/components/molecules/OrderSummary';
// Removed AuthModal and useAuth - booking works without login

export interface BookingData {
  // Step 1: Ride Details
  tripType: 'one-way' | 'round-trip';
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  pickupLocation: string;
  dropOffLocation: string;
  hours: string;
  
  // Step 2: Vehicle Selection
  selectedVehicleId?: string;
  
  // Step 3: Order Summary
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface BookingFormProps {
  className?: string;
  onClose?: () => void;
  onSubmit?: (data: BookingData) => void;
  initialVehicleId?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  className,
  onClose,
  onSubmit,
  initialVehicleId,
}) => {
  // Check sessionStorage and URL params for pre-filled data
  const getInitialData = (): BookingData => {
    if (typeof window !== 'undefined') {
      // First, try to get from URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const bookingDataParam = urlParams.get('bookingData');
      
      if (bookingDataParam) {
        try {
          const parsed = JSON.parse(decodeURIComponent(bookingDataParam));
          // Convert tripType format if needed
          const tripType = parsed.tripType === 'oneWay' ? 'one-way' : 
                          parsed.tripType === 'roundTrip' ? 'round-trip' : 
                          parsed.tripType || 'one-way';
          return {
            tripType: tripType as 'one-way' | 'round-trip',
            pickupDate: parsed.pickupDate || '',
            pickupTime: parsed.pickupTime || '',
            returnDate: parsed.returnDate || '',
            returnTime: parsed.returnTime || '',
            pickupLocation: parsed.pickupLocation || '',
            dropOffLocation: parsed.dropOffLocation || '',
            hours: parsed.hours || '8',
            selectedVehicleId: parsed.vehicleId || parsed.selectedVehicleId || initialVehicleId,
          };
        } catch (e) {
          console.error('Error parsing URL booking data:', e);
        }
      }
      
      // Fallback to sessionStorage
      const storedData = sessionStorage.getItem('bookingData') || sessionStorage.getItem('bookingFormData');
      
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          const tripType = parsed.tripType === 'oneWay' ? 'one-way' : 
                          parsed.tripType === 'roundTrip' ? 'round-trip' : 
                          parsed.tripType || 'one-way';
          return {
            tripType: tripType as 'one-way' | 'round-trip',
            pickupDate: parsed.pickupDate || '',
            pickupTime: parsed.pickupTime || '',
            returnDate: parsed.returnDate || '',
            returnTime: parsed.returnTime || '',
            pickupLocation: parsed.pickupLocation || '',
            dropOffLocation: parsed.dropOffLocation || '',
            hours: parsed.hours || '8',
            selectedVehicleId: parsed.vehicleId || parsed.selectedVehicleId || initialVehicleId,
          };
        } catch (e) {
          console.error('Error parsing stored booking data:', e);
        }
      }
    }
    
    return {
      tripType: 'one-way',
      pickupDate: '',
      pickupTime: '',
      returnDate: '',
      returnTime: '',
      pickupLocation: '',
      dropOffLocation: '',
      hours: '',
      selectedVehicleId: initialVehicleId,
    };
  };

  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedStep = sessionStorage.getItem('bookingStep');
      return storedStep ? parseInt(storedStep) : 1;
    }
    return 1;
  });
  
  const [bookingData, setBookingData] = useState<BookingData>(getInitialData);

  const steps = [
    { number: 1, title: 'Enter Ride Details', description: 'Pickup, drop-off, and duration' },
    { number: 2, title: 'Choose a Vehicle', description: 'Select from our premium fleet' },
    { number: 3, title: 'Place Order', description: 'Review and confirm booking' },
  ];

  const handleStepComplete = (stepData: Partial<BookingData>) => {
    const updatedData = { ...bookingData, ...stepData };
    setBookingData(updatedData);
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit booking data (customer info will be collected in the form)
      onSubmit?.(updatedData);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RideDetailsForm
            initialData={bookingData}
            onComplete={handleStepComplete}
          />
        );
      case 2:
        return (
          <VehicleSelection
            initialVehicleId={bookingData.selectedVehicleId}
            onComplete={handleStepComplete}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <OrderSummary
            bookingData={bookingData}
            onComplete={handleStepComplete}
            onBack={handlePrevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('bg-deep-navy text-white', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-light-gray">
        <h2 className="text-2xl font-bold">Book Your Ride</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-charcoal hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress Steps */}
      <div className="p-6 border-b border-light-gray">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    currentStep >= step.number
                      ? 'bg-luxury-gold text-deep-navy'
                      : 'bg-gray-600 text-white border border-gray-500'
                  )}
                >
                  {currentStep > step.number ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={cn(
                    'text-sm font-semibold',
                    currentStep >= step.number ? 'text-luxury-gold' : 'text-charcoal'
                  )}>
                    {step.title}
                  </div>
                  <div className="text-xs text-charcoal mt-1">
                    {step.description}
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-16 h-0.5 mx-4 transition-all',
                    currentStep > step.number ? 'bg-luxury-gold' : 'bg-light-gray'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {renderStepContent()}
      </div>

      {/* Auth Modal removed - booking works without login */}
    </div>
  );
};

export default BookingForm;
