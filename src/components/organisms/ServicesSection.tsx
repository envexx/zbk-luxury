'use client';

import React from 'react';
import ServiceCard from '@/components/molecules/ServiceCard';
import { cn } from '@/utils/cn';

const services = [
  {
    id: 'city-tour',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'City Tour',
    description: 'Explore the city in luxury and comfort with our premium vehicles. Perfect for sightseeing, business tours, or discovering hidden gems with professional drivers who know the best routes.',
  },
  {
    id: 'hourly-renting',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Hourly Renting',
    description: 'Flexible hourly rental service for your convenience. Whether you need transportation for meetings, shopping, or short trips, rent by the hour with our competitive rates and premium service.',
  },
  {
    id: 'event',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16.5V7a1 1 0 00-1-1H4.5a1 1 0 00-1 1v9.5M2 7h2.5M13 7h2.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a1 1 0 011-1h2a1 1 0 011 1v2" />
      </svg>
    ),
    title: 'Event',
    description: 'Make your special events memorable with our luxury transportation. Perfect for weddings, corporate events, parties, and celebrations. Professional service to make your event extraordinary.',
  },
];

export interface ServicesSectionProps {
  className?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ className }) => {
  const handleServiceClick = (serviceId: string) => {
    console.log('Service clicked:', serviceId);
    // Handle navigation to service details
  };

  return (
    <section className={cn('py-16 lg:py-20 bg-gradient-light', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Discover our comprehensive range of luxury car rental services designed to meet your every need with excellence and sophistication.
          </p>
          
          {/* Decorative divider */}
          <div className="w-16 h-1 bg-luxury-gold mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:items-start">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                onClick={() => handleServiceClick(service.id)}
              />
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 pt-12 border-t border-light-gray">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-luxury-gold bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-micro">
                <svg className="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Best Price Guarantee
              </h3>
              <p className="text-sm text-gray-300">
                Competitive rates with no hidden fees
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-luxury-gold bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-micro">
                <svg className="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Fully Insured
              </h3>
              <p className="text-sm text-gray-300">
                Comprehensive insurance coverage included
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-luxury-gold bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-micro">
                <svg className="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Instant Booking
              </h3>
              <p className="text-sm text-gray-300">
                Quick and easy online reservation system
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-luxury-gold bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-colors duration-micro">
                <svg className="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-sm text-gray-300">
                Round-the-clock customer assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
