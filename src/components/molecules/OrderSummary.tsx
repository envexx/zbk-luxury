'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import PhoneInput from '@/components/atoms/PhoneInput';
import Badge from '@/components/atoms/Badge';
import { BookingData } from '@/components/organisms/BookingForm';

import { vehicleData } from '@/data/vehicleData';

// Use updated vehicle data with correct pricing from extracted information
const availableVehicles = vehicleData.map(vehicle => ({
  id: vehicle.id,
  name: vehicle.name,
  image: vehicle.images[0],
  price: vehicle.price, // Updated prices: Wedding Affairs $300, Alphard/Vellfire $140
  category: vehicle.category,
  seats: vehicle.capacity,
  transmission: vehicle.transmission as 'Automatic',
  year: vehicle.year,
  rating: vehicle.rating || 4.8,
  isLuxury: vehicle.isLuxury || false,
  minimumHours: vehicle.minimumHours || 1,
}));

export interface OrderSummaryProps {
  className?: string;
  bookingData: BookingData;
  onComplete: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  className,
  bookingData,
  onComplete,
  onBack,
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: bookingData.customerInfo?.name || '',
    email: bookingData.customerInfo?.email || '',
    phone: bookingData.customerInfo?.phone || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedVehicle = availableVehicles.find(v => v.id === bookingData.selectedVehicleId);
  
  // Calculate pricing based on ZBK price list
  // This is a simplified calculation - actual price will be calculated on server
  const hours = parseInt(bookingData.hours) || 8;
  const hourlyRate = selectedVehicle?.price || 0;
  const subtotal = hourlyRate * hours;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  const depositAmount = total * 0.2; // 20% deposit

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Determine service type based on duration
      let service = 'RENTAL';
      const hours = parseInt(bookingData.hours) || 8;
      if (bookingData.pickupLocation.toLowerCase().includes('airport') || 
          bookingData.dropOffLocation.toLowerCase().includes('airport')) {
        service = 'AIRPORT_TRANSFER';
      }

      // Prepare booking data for API
      const bookingPayload = {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        vehicleId: bookingData.selectedVehicleId,
        service: service,
        startDate: bookingData.pickupDate,
        endDate: bookingData.returnDate || bookingData.pickupDate,
        startTime: bookingData.pickupTime,
        duration: `${hours} hours`,
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropOffLocation,
        status: 'PENDING',
        notes: `Trip Type: ${bookingData.tripType}${bookingData.returnTime ? `, Return Time: ${bookingData.returnTime}` : ''}`
      };

      console.log('Sending booking data:', bookingPayload);

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
        setIsSubmitting(false);
        return;
      }

      const bookingId = bookingResult.data.id;
      console.log('Booking created successfully:', bookingId);

      // Step 2: Create Stripe checkout session
      const checkoutResponse = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId }),
      });

      // Check if response is ok
      if (!checkoutResponse.ok) {
        const errorData = await checkoutResponse.json().catch(() => ({ error: 'Failed to parse error response' }));
        console.error('Checkout session HTTP error:', checkoutResponse.status, errorData);
        alert(`Payment setup failed (${checkoutResponse.status}): ${errorData.error || 'Unknown error'}`);
        setIsSubmitting(false);
        return;
      }

      const checkoutResult = await checkoutResponse.json();

      if (checkoutResult.success && checkoutResult.url) {
        // Redirect to Stripe Checkout
        window.location.href = checkoutResult.url;
      } else {
        console.error('Checkout session failed:', checkoutResult);
        alert(`Payment setup failed: ${checkoutResult.error || 'Unknown error'}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (!selectedVehicle) {
    return (
      <div className="text-center py-8">
        <p className="text-alert-red">Vehicle not found. Please go back and select a vehicle.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Place Order</h3>
        <p className="text-charcoal">Review your booking details and complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="space-y-6">
          {/* Booking Details */}
          <div className="bg-off-white rounded-compact p-6">
            <h4 className="text-lg font-bold text-deep-navy mb-4">Booking Details</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-charcoal">Pickup Date:</span>
                <span className="font-semibold text-deep-navy">{formatDate(bookingData.pickupDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal">Pickup Time:</span>
                <span className="font-semibold text-deep-navy">{formatTime(bookingData.pickupTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal">Duration:</span>
                <span className="font-semibold text-deep-navy">{hours} hour{hours > 1 ? 's' : ''}</span>
              </div>
              <div className="pt-2 border-t border-light-gray">
                <div className="mb-2">
                  <span className="text-charcoal">Pickup Location:</span>
                </div>
                <p className="font-semibold text-deep-navy text-sm">{bookingData.pickupLocation}</p>
              </div>
              <div>
                <div className="mb-2">
                  <span className="text-charcoal">Drop-off Location:</span>
                </div>
                <p className="font-semibold text-deep-navy text-sm">{bookingData.dropOffLocation}</p>
              </div>
            </div>
          </div>

          {/* Selected Vehicle */}
          <div className="bg-off-white rounded-compact p-6">
            <h4 className="text-lg font-bold text-deep-navy mb-4">Selected Vehicle</h4>
            
            <div className="flex gap-4">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                className="w-24 h-16 object-contain rounded"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-bold text-deep-navy">{selectedVehicle.name}</h5>
                  {selectedVehicle.isLuxury && (
                    <Badge variant="luxury" size="small">Luxury</Badge>
                  )}
                </div>
                <div className="text-sm text-charcoal mb-2">
                  {selectedVehicle.category} • {selectedVehicle.seats} seats • {selectedVehicle.year}
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-charcoal">{selectedVehicle.rating} rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-off-white rounded-compact p-6">
            <h4 className="text-lg font-bold text-deep-navy mb-4">Price Breakdown</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-charcoal">Hourly Rate:</span>
                <span className="font-semibold text-deep-navy">${hourlyRate}/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal">Duration:</span>
                <span className="font-semibold text-deep-navy">{hours} hour{hours > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal">Subtotal:</span>
                <span className="font-semibold text-deep-navy">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal">Tax (10%):</span>
                <span className="font-semibold text-deep-navy">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-light-gray">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-bold text-deep-navy">Total Amount:</span>
                  <span className="text-xl font-bold text-deep-navy">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-light-gray">
                  <span className="text-sm text-charcoal">Deposit Required (20%):</span>
                  <span className="text-lg font-bold text-luxury-gold">${depositAmount.toFixed(2)}</span>
                </div>
                <div className="mt-3 p-3 bg-luxury-gold bg-opacity-10 rounded-compact">
                  <p className="text-xs text-charcoal">
                    <strong className="text-luxury-gold">Note:</strong> A 20% deposit is required to confirm your booking. 
                    The remaining balance will be collected before your trip.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information Form */}
        <div>
          <div className="bg-off-white rounded-compact p-6">
            <h4 className="text-lg font-bold text-deep-navy mb-4">Customer Information</h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={customerInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                isRequired
              />
              
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                isRequired
              />
              
              <PhoneInput
                label="Phone Number"
                placeholder="Enter your phone number"
                value={customerInfo.phone}
                onChange={(value) => handleInputChange('phone', value)}
                error={errors.phone}
                isRequired
              />

              {/* Terms and Conditions */}
              <div className="pt-4">
                <div className="flex items-start gap-3 p-4 bg-luxury-gold bg-opacity-10 border border-luxury-gold rounded-compact">
                  <div className="flex-shrink-0 w-5 h-5 text-luxury-gold mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-luxury-gold mb-1">Important Information</h5>
                    <p className="text-xs text-charcoal">
                      By placing this order, you agree to our terms and conditions. 
                      A confirmation will be sent to your email. Our driver will contact you 15 minutes before pickup.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  size="large"
                  onClick={onBack}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  className="flex-1"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : `Pay Deposit (20%) - $${(total * 0.2).toFixed(2)}`}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
