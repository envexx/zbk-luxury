'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Hero from "@/components/organisms/Hero";
import FleetSection from "@/components/organisms/FleetSection";
import ServicesSection from "@/components/organisms/ServicesSection";

const TestimonialsSection = dynamic(() => import("@/components/organisms/TestimonialsSection"), {
  ssr: false
});

export default function Home() {
  const handleViewAllFleet = () => {
    // Navigate to fleet page
    window.location.href = '/fleet';
  };

  useEffect(() => {
    // Add Organization Schema Markup for Google Search Logo
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zbktransportservices.com';
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": baseUrl,
      "logo": `${baseUrl}/logo-website.png`,
      "name": "ZBK Limo Tours",
      "description": "Premium luxury transportation in Singapore. Experience exceptional limousine and vehicle rental services.",
      "sameAs": []
    };

    // Remove existing organization schema if any
    const existingScript = document.querySelector('script[type="application/ld+json"][data-organization-schema]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-organization-schema', 'true');
    script.text = JSON.stringify(organizationSchema);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-organization-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

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
                id: 'airport-transport',
                title: 'Airport Transport',
                description: 'Reliable and punctual airport transfers with luxury vehicles',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                ),
                features: ['Flight Monitoring', 'Meet & Greet', 'Professional Chauffeurs']
              },
              {
                id: 'city-tour-hourly',
                title: 'City Tour / Hourly Rental',
                description: 'Flexible city exploration and hourly rental services',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                features: ['Flexible Hours', 'Local Expertise', 'Competitive Rates']
              },
              {
                id: 'corporate-event',
                title: 'Corporate Event',
                description: 'Professional transportation for corporate events and business functions',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                features: ['Executive Comfort', 'Business Functions', 'Reliable Service']
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
