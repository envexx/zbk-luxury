'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BookingForm from '@/components/organisms/BookingForm';

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if this is a redirect from payment
    const sessionId = searchParams.get('session_id');
    const bookingId = searchParams.get('booking_id');
    
    if (sessionId && bookingId) {
      // Redirect to payment success page
      router.replace(`/payment/success?session_id=${sessionId}&booking_id=${bookingId}`);
      return;
    }

    // Store booking data from URL to sessionStorage if present
    const bookingDataParam = searchParams.get('bookingData');
    if (bookingDataParam) {
      try {
        const bookingData = JSON.parse(decodeURIComponent(bookingDataParam));
        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
        // Also set for BookingForm compatibility
        sessionStorage.setItem('bookingFormData', JSON.stringify({
          tripType: bookingData.tripType === 'oneWay' ? 'one-way' : 'round-trip',
          pickupDate: bookingData.pickupDate,
          pickupTime: bookingData.pickupTime,
          returnDate: bookingData.returnDate,
          returnTime: bookingData.returnTime,
          pickupLocation: bookingData.pickupLocation,
          dropOffLocation: bookingData.dropOffLocation,
          hours: bookingData.hours || '8',
        }));
      } catch (error) {
        console.error('Error parsing booking data from URL:', error);
      }
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-deep-navy">
      <BookingForm />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-deep-navy flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto mb-4"></div>
            <p className="text-white">Loading...</p>
          </div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}

