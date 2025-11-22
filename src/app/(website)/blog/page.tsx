'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '@/components/molecules/BlogCard';
import { BlogPost, BlogCategory } from '@/types/blog';

// Featured article with real images and enhanced content
const featuredArticle: BlogPost = {
  id: '1',
  title: 'Luxury Experience with Toyota Alphard: Premium Vehicle for Business and Family Travel',
  slug: 'luxury-experience-toyota-alphard-premium',
  excerpt: 'Discover why Toyota Alphard has become the top choice for luxury travel worldwide. From advanced features to unparalleled comfort, learn everything you need to know about this premium MPV.',
  content: 'Full content here...',
  featuredImage: '/Hero.jpg',
  author: {
    name: 'ZBK Luxury Team',
    avatar: '/Logo.png',
    bio: 'Expert luxury vehicle rental team with over 10 years of experience serving premium clients worldwide. Specializing in Toyota Alphard and Toyota Hiace vehicles.'
  },
  category: {
    name: 'Premium Vehicles',
    slug: 'premium-vehicles'
  },
  tags: ['toyota alphard', 'toyota hiace', 'luxury mpv', 'premium rental', 'business', 'family', 'luxury travel'],
  publishedAt: '2025-11-15T10:00:00Z',
  updatedAt: '2025-11-15T10:00:00Z',
  readingTime: 12,
  seo: {
    metaTitle: 'Toyota Alphard Premium Rental - Ultimate Luxury Experience | ZBK Luxury',
    metaDescription: 'Rent Toyota Alphard premium for business and family travel. Enjoy unparalleled comfort, advanced features, and the best service from ZBK Luxury.',
    keywords: ['toyota alphard rental', 'toyota hiace rental', 'luxury mpv rental', 'premium vehicle rental', 'business travel', 'zbk luxury']
  },
  status: 'published',
  featured: true
};

const mockCategories: BlogCategory[] = [
  { id: '1', name: 'Toyota Alphard', slug: 'toyota-alphard', description: 'Everything about Toyota Alphard luxury MPV', postCount: 8 },
  { id: '2', name: 'Toyota Hiace', slug: 'toyota-hiace', description: 'Complete guide to Toyota Hiace transportation', postCount: 6 },
  { id: '3', name: 'Business Travel', slug: 'business-travel', description: 'Professional travel solutions with our vehicles', postCount: 5 },
  { id: '4', name: 'Premium Vehicles', slug: 'premium-vehicles', description: 'Our luxury vehicle fleet insights', postCount: 10 },
];

export default function BlogPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="relative bg-deep-navy py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              ZBK Luxury Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover the latest insights about luxury vehicles, premium travel tips, 
              and comprehensive guides from our ZBK Luxury expert team.
            </p>
            <div className="w-24 h-1 bg-luxury-gold mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Articles List Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-deep-navy mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive guides and insights about luxury vehicles
            </p>
          </div>
          
          {/* Article List */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Single Article Item */}
              <article className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <Link href={`/blog/${featuredArticle.slug}`} className="block group">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Article Image */}
                    <div className="md:w-1/3">
                      <div className="aspect-w-16 aspect-h-10 relative rounded-lg overflow-hidden">
                        <Image
                          src={featuredArticle.featuredImage}
                          alt={featuredArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    
                    {/* Article Content */}
                    <div className="md:w-2/3">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-luxury-gold text-deep-navy text-xs font-semibold rounded-full">
                          {featuredArticle.category.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {featuredArticle.readingTime} min read
                        </span>
                        <span className="text-gray-500 text-sm">
                          November 15, 2024
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-deep-navy mb-3 group-hover:text-luxury-gold transition-colors">
                        {featuredArticle.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {featuredArticle.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {featuredArticle.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-deep-navy mb-4">
            Never Miss an Update
          </h2>
          <p className="text-lg text-deep-navy mb-8 opacity-80">
            Subscribe to our blog newsletter and get the latest luxury vehicle insights delivered directly to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-compact border border-deep-navy border-opacity-20 focus:border-deep-navy focus:outline-none"
            />
            <button className="px-8 py-3 bg-deep-navy text-white rounded-compact hover:bg-charcoal transition-colors duration-300 font-semibold">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-deep-navy opacity-60 mt-4">
            Weekly updates, no spam, unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}
