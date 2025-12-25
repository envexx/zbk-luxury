'use client';

import React, { useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className }) => {
  useEffect(() => {
    // Load Featurable script if not already loaded
    if (!document.querySelector('script[src="https://featurable.com/assets/bundle.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://featurable.com/assets/bundle.js';
      script.defer = true;
      script.charset = 'UTF-8';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className={cn('py-20 bg-gradient-to-br from-gray-50 to-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-deep-navy mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real reviews from our valued customers who have experienced our premium luxury transportation services.
          </p>
          
          {/* Decorative divider */}
          <div className="w-16 h-1 bg-luxury-gold mx-auto rounded-full mt-8"></div>
        </div>

        {/* Featurable Reviews Embed */}
        <div className="flex justify-center">
          <div 
            id="featurable-185cc8af-969b-4710-9594-2d0465477145" 
            data-featurable-async
          ></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
