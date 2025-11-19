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
      
      {/* Service Highlights Section */}
      <section className="py-16 lg:py-20 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Premium Services
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience luxury transportation tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                id: 'city-tour',
                title: 'City Tour',
                description: 'Explore the city with our luxury vehicles and professional drivers',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                features: ['Professional Drivers', 'Best Routes', 'Comfortable Ride']
              },
              {
                id: 'hourly-renting',
                title: 'Hourly Renting',
                description: 'Flexible hourly rental for your convenience and schedule',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                features: ['Flexible Hours', 'Competitive Rates', 'Premium Service']
              },
              {
                id: 'event',
                title: 'Event Transportation',
                description: 'Make your special events memorable with luxury transport',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16.5V7a1 1 0 00-1-1H4.5a1 1 0 00-1 1v9.5M2 7h2.5M13 7h2.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a1 1 0 011-1h2a1 1 0 011 1v2" />
                  </svg>
                ),
                features: ['Wedding Ready', 'Corporate Events', 'Special Occasions']
              },
            ].map((service, index) => (
              <div 
                key={service.id}
                className="text-center group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-luxury-gold/20 transition-all duration-300 mb-4">
                    <div className="text-luxury-gold">
                      {service.icon}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-luxury-gold/20 text-luxury-gold text-sm rounded-full border border-luxury-gold/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
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
