'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TestimonialCard from '@/components/molecules/TestimonialCard';
import { cn } from '@/utils/cn';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Business Executive',
    rating: 5,
    testimonial: 'Exceptional service and stunning vehicles. The Mercedes S-Class was perfect for my corporate meetings. Professional, punctual, and luxurious.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Wedding Planner',
    rating: 5,
    testimonial: 'ZBK made our wedding day extra special. The BMW X7 was immaculate and the driver was incredibly professional. Highly recommend for special occasions.',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    title: 'Travel Blogger',
    rating: 5,
    testimonial: 'Amazing experience exploring the city in their Audi A8. Clean, comfortable, and the booking process was seamless. Will definitely use again.',
  },
  {
    id: 4,
    name: 'David Thompson',
    title: 'Corporate Manager',
    rating: 4,
    testimonial: 'Great fleet and reliable service. Used their airport transfer service multiple times and it\'s always been smooth and on time.',
  },
];

export interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle auto-play resume with cleanup
  useEffect(() => {
    let resumeTimeout: NodeJS.Timeout;

    if (!isAutoPlaying) {
      resumeTimeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000);
    }

    return () => {
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
      }
    };
  }, [isAutoPlaying]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1);
    setIsAutoPlaying(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1);
    setIsAutoPlaying(false);
  }, []);

  // Memoize visible testimonials to prevent unnecessary re-renders
  const visibleTestimonials = useMemo(() => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  }, [currentIndex]);

  return (
    <section className={cn('py-16 lg:py-20 bg-deep-navy text-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Don't just take our word for it. Here's what our satisfied customers have to say about their luxury car rental experience.
          </p>
          <div className="w-16 h-1 bg-luxury-gold mx-auto rounded-full"></div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-10 h-10 bg-luxury-gold bg-opacity-20 hover:bg-opacity-40 rounded-compact flex items-center justify-center text-luxury-gold transition-all duration-micro"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-10 h-10 bg-luxury-gold bg-opacity-20 hover:bg-opacity-40 rounded-compact flex items-center justify-center text-luxury-gold transition-all duration-micro"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  title={testimonial.title}
                  rating={testimonial.rating}
                  testimonial={testimonial.testimonial}
                />
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-micro',
                  index === currentIndex
                    ? 'bg-luxury-gold w-8'
                    : 'bg-luxury-gold bg-opacity-30 hover:bg-opacity-50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6">
            Ready to experience luxury for yourself?
          </p>
          <button className="px-8 py-3 bg-luxury-gold text-deep-navy font-semibold rounded-compact hover:bg-luxury-gold-hover transition-colors duration-micro">
            Book Your Luxury Ride
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
