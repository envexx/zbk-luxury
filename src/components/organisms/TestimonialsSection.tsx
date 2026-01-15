'use client';

import React, { useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className }) => {
  useEffect(() => {
    const proxySrc = '/api/elfsight/elfsightcdn.com/platform.js';

    // Load Elfsight script (via proxy cache) if not already loaded
    if (!document.querySelector(`script[src="${proxySrc}"]`)) {
      const script = document.createElement('script');
      script.src = proxySrc;
      script.async = true;
      document.head.appendChild(script);
    }

    // Rewrite any Elfsight script injected later to go through our proxy (so cache TTL is controlled by our domain)
    const rewriteElfsightScript = (el: HTMLScriptElement) => {
      const src = el.getAttribute('src');
      if (!src) return;

      try {
        const url = new URL(src, window.location.origin);
        const host = url.hostname;
        if (!host.includes('elfsight')) return;
        if (url.origin === window.location.origin) return;

        const proxy = `/api/elfsight/${host}${url.pathname}${url.search}`;
        el.setAttribute('src', proxy);
      } catch {
        // ignore invalid URLs
      }
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLScriptElement) {
            rewriteElfsightScript(node);
          } else if (node instanceof HTMLElement) {
            node.querySelectorAll('script[src]').forEach((s) => rewriteElfsightScript(s as HTMLScriptElement));
          }
        });
      }
    });

    observer.observe(document.head, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
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

        {/* Google Reviews Embed */}
        <div className="flex justify-center">
          <div 
            className="elfsight-app-abad4134-b8dc-4a21-8519-cd78ff490635" 
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
