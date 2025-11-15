'use client';

import Hero from "@/components/organisms/Hero";
import FleetSection from "@/components/organisms/FleetSection";
import ServicesSection from "@/components/organisms/ServicesSection";
import TestimonialsSection from "@/components/organisms/TestimonialsSection";

export default function Home() {
  const handleViewAllFleet = () => {
    // Navigate to fleet page
    window.location.href = '/fleet';
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Fleet Section */}
      <FleetSection onViewAll={handleViewAllFleet} />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Booking Process Section */}
      <section className="py-16 lg:py-20 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Simple Booking Process
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Book your luxury vehicle in just 3 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                step: '1',
                title: 'Enter Details',
                description: 'Pickup location, date & time',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                step: '2',
                title: 'Choose Vehicle',
                description: 'Select from premium fleet',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                step: '3',
                title: 'Confirm Booking',
                description: 'Review and place order',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div 
                key={item.step}
                className="text-center group"
              >
                <div className="mb-6">
                  <div className="w-8 h-8 bg-luxury-gold text-deep-navy rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-luxury-gold/20 transition-all duration-300">
                    <div className="text-luxury-gold">
                      {item.icon}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-deep-navy mb-4">
            Stay Updated with ZBK
          </h2>
          <p className="text-lg text-deep-navy mb-8 opacity-80">
            Get the latest offers, new vehicle arrivals, and exclusive deals delivered to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-compact border border-deep-navy border-opacity-20 focus:border-deep-navy focus:outline-none"
            />
            <button className="px-8 py-3 bg-deep-navy text-white rounded-compact hover:bg-charcoal transition-colors duration-micro font-semibold">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-deep-navy opacity-60 mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>
    </>
  );
}
