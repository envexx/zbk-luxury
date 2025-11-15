'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import BlogCard from '@/components/molecules/BlogCard';

// Enhanced article with comprehensive content about Toyota Alphard
const mockPost: BlogPost = {
  id: '1',
  title: 'Luxury Experience with Toyota Alphard: Premium Vehicle for Business and Family Travel',
  slug: 'luxury-experience-toyota-alphard-premium',
  excerpt: 'Discover why Toyota Alphard has become the top choice for luxury travel worldwide. From advanced features to unparalleled comfort, learn everything you need to know about this premium MPV.',
  content: `
    <section class="content-section">
      <h2>Why Toyota Alphard Reigns as the Premium MPV King?</h2>
      <p class="lead-paragraph">Toyota Alphard has set new standards in the luxury MPV segment globally. With elegant design, advanced technology, and unmatched comfort, Alphard has become the top choice for executives, VIP families, and anyone who values luxury in travel.</p>
      
      <p>Since its launch, Alphard has become a symbol of status and luxury. This vehicle doesn't just offer transportation, but a special driving experience with an interior that resembles a luxury lounge.</p>
    </section>
    
    <section class="content-section">
      <h2>Stunning Interior Features</h2>
      
      <div class="image-showcase">
        <img src="/4.-alphard-colors-black.png" alt="Toyota Alphard Premium Black - Elegant and Luxurious Design" />
        <p class="image-caption">Toyota Alphard with elegant design that symbolizes luxury</p>
      </div>
      
      <div class="feature-block">
        <h3>Luxurious Captain Seats</h3>
        <p class="feature-intro">One of Toyota Alphard's main advantages is the electrically adjustable captain seats in the second row. These seats are equipped with:</p>
        <ul class="feature-list">
          <li><strong>Automatic massage:</strong> Integrated massage system for relaxation during travel</li>
          <li><strong>Ventilation and heating:</strong> Individual temperature control for maximum comfort</li>
          <li><strong>Extendable ottoman:</strong> For perfect reclining position</li>
          <li><strong>Armrest with controls:</strong> Easy access to various vehicle functions</li>
        </ul>
      </div>
      
      <div class="feature-block">
        <h3>Advanced Entertainment Technology</h3>
        <p class="feature-intro">Alphard is equipped with premium-class entertainment systems including:</p>
        <ul class="feature-list">
          <li>13-inch monitor screens on front seat backs</li>
          <li>Premium audio system with 17 JBL speakers</li>
          <li>Wireless connectivity for music and video streaming</li>
          <li>USB ports and wireless charging for all passengers</li>
        </ul>
      </div>
    </section>
    
    <section class="content-section">
      <h2>Leading Performance and Safety</h2>
      
      <div class="feature-block">
        <h3>Powerful and Efficient Engine</h3>
        <p>Toyota Alphard uses a 2.5L Hybrid engine that provides the perfect combination of power and fuel efficiency. This hybrid system is not only environmentally friendly but also provides smooth and responsive acceleration.</p>
      </div>
      
      <div class="feature-block">
        <h3>Toyota Safety Sense Features</h3>
        <p class="feature-intro">Safety is a top priority in Alphard with advanced features such as:</p>
        <ul class="feature-list">
          <li><strong>Pre-Collision System:</strong> Early detection to prevent collisions</li>
          <li><strong>Lane Departure Alert:</strong> Warning if vehicle leaves lane</li>
          <li><strong>Adaptive Cruise Control:</strong> Smart automatic speed control</li>
          <li><strong>Blind Spot Monitor:</strong> Vehicle detection in blind spots</li>
        </ul>
      </div>
    </section>
    
    <section class="content-section">
      <h2>Ideal for Various Needs</h2>
      
      <div class="use-cases">
        <div class="use-case">
          <h3>Executive Business Travel</h3>
          <p>For executives, Alphard offers the perfect mobile workspace. With fold-out tables, adjustable lighting, and internet connectivity, you can stay productive during business trips.</p>
        </div>
        
        <div class="use-case">
          <h3>Luxurious Family Vacations</h3>
          <p>For families, Alphard provides maximum comfort with 7-passenger capacity, spacious luggage compartment, and entertainment features that will make long journeys enjoyable for all family members.</p>
        </div>
        
        <div class="use-case">
          <h3>Special and Formal Events</h3>
          <p>Alphard is also the ideal choice for important events such as weddings, important meetings, or other formal occasions where first impressions are crucial.</p>
        </div>
      </div>
    </section>
    
    <section class="content-section highlight-section">
      <h2>Why Choose ZBK Luxury for Alphard Rental?</h2>
      <p class="section-intro">ZBK Luxury offers an unmatched Toyota Alphard rental experience with:</p>
      <ul class="benefits-list">
        <li><strong>Latest fleet:</strong> All our Alphard units are the latest models in prime condition</li>
        <li><strong>Professional service:</strong> Experienced drivers specially trained for luxury vehicles</li>
        <li><strong>Time flexibility:</strong> Daily, weekly, or monthly rental as needed</li>
        <li><strong>24/7 service:</strong> Customer support and emergency service around the clock</li>
        <li><strong>Competitive pricing:</strong> Transparent rental packages with no hidden fees</li>
      </ul>
    </section>
    
    <section class="content-section">
      <h2>Tips to Maximize Your Alphard Experience</h2>
      <ol class="tips-list">
        <li><strong>Learn advanced features:</strong> Take time to understand all available features</li>
        <li><strong>Set optimal seat position:</strong> Utilize all electric adjustments for maximum comfort</li>
        <li><strong>Use entertainment system:</strong> Enjoy the journey with your favorite music or movies</li>
        <li><strong>Utilize storage space:</strong> Alphard has many compartments for personal items</li>
        <li><strong>Communicate special needs:</strong> ZBK team is ready to help with adjustments according to your preferences</li>
      </ol>
    </section>
    
    <section class="content-section conclusion-section">
      <h2>Conclusion</h2>
      <p class="conclusion-text">Toyota Alphard is not just a transportation vehicle, but a complete luxury experience. With a combination of advanced technology, premium comfort, and leading safety, Alphard becomes the perfect choice for various luxury travel needs.</p>
      
      <p class="cta-text">Trust your premium vehicle rental needs to ZBK Luxury and experience the difference of an unforgettable driving experience. Contact us today for reservations and consultation on your luxury travel needs.</p>
    </section>
  `,
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
  tags: ['toyota alphard', 'toyota hiace', 'luxury mpv', 'premium rental', 'business', 'family', 'zbk luxury'],
  publishedAt: '2024-11-15T10:00:00Z',
  updatedAt: '2024-11-15T10:00:00Z',
  readingTime: 12,
  seo: {
    metaTitle: 'Toyota Alphard Premium Rental - Ultimate Luxury Experience | ZBK Luxury',
    metaDescription: 'Rent Toyota Alphard premium for business and family travel. Enjoy unparalleled comfort, advanced features, and the best service from ZBK Luxury.',
    keywords: ['toyota alphard rental', 'toyota hiace rental', 'luxury mpv rental', 'premium vehicle rental', 'business travel', 'zbk luxury']
  },
  status: 'published',
  featured: true
};

const mockRelatedPosts: BlogPost[] = [
  {
    id: '2',
    title: 'Toyota Hiace: The Perfect Group Transportation Solution',
    slug: 'toyota-hiace-group-transportation',
    excerpt: 'Discover why Toyota Hiace is the ideal choice for group travel, business trips, and family outings with its spacious interior and reliable performance.',
    content: '',
    featuredImage: '/4.-alphard-colors-black.png',
    author: {
      name: 'ZBK Luxury Team',
      avatar: '/Logo.png',
      bio: 'Expert in Toyota Alphard and Hiace rental services'
    },
    category: {
      name: 'Premium Vehicles',
      slug: 'premium-vehicles'
    },
    tags: ['toyota hiace', 'group travel', 'business transport'],
    publishedAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
    readingTime: 8,
    seo: {
      metaTitle: 'Toyota Hiace Group Transportation | ZBK Luxury',
      metaDescription: 'Best Toyota Hiace rental for group transportation and business travel',
      keywords: ['toyota hiace rental', 'group transportation', 'business travel']
    },
    status: 'published',
    featured: false
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPost(mockPost);
      setRelatedPosts(mockRelatedPosts);
      setLoading(false);
    }, 1000);
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="bg-luxury-gold text-deep-navy px-6 py-3 rounded-compact font-semibold hover:bg-opacity-90 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Breadcrumb */}
      <section className="py-4 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-luxury-gold transition-colors">Blog</Link>
            <span>/</span>
            <Link href={`/blog/category/${post.category.slug}`} className="hover:text-luxury-gold transition-colors">
              {post.category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-400 truncate">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category and Reading Time */}
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href={`/blog/category/${post.category.slug}`}
              className="inline-block px-3 py-1 bg-luxury-gold text-deep-navy text-sm font-semibold rounded-full hover:bg-opacity-90 transition-colors"
            >
              {post.category.name}
            </Link>
            <span className="text-gray-500 text-sm">
              {post.readingTime} min read
            </span>
            <span className="text-gray-500 text-sm">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-deep-navy mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author Info - Hidden as requested */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="text-sm text-gray-500">
              Published on {formatDate(post.publishedAt)} • {post.readingTime} min read
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={600}
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Article Content */}
          <div 
            className="article-content max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <style jsx>{`
            .article-content {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.7;
              color: #333333;
            }
            
            /* Headings */
            .article-content h2 {
              font-size: 28px;
              font-weight: 700;
              color: #1a1a1a;
              margin: 50px 0 30px 0;
              line-height: 1.3;
              border-bottom: 2px solid #d4af37;
              padding-bottom: 15px;
            }
            
            .article-content h2:first-child {
              margin-top: 30px;
            }
            
            .article-content h3 {
              font-size: 22px;
              font-weight: 600;
              color: #2d2d2d;
              margin: 40px 0 25px 0;
              line-height: 1.4;
            }
            
            /* Paragraphs */
            .article-content p {
              font-size: 16px;
              line-height: 1.8;
              color: #444444;
              margin-bottom: 25px;
              text-align: left;
            }
            
            .article-content .lead-paragraph {
              font-size: 18px;
              font-weight: 500;
              color: #1a1a1a;
              margin-bottom: 30px;
              line-height: 1.6;
            }
            
            .article-content .feature-intro {
              font-weight: 500;
              color: #2d2d2d;
              margin-bottom: 20px;
            }
            
            .article-content .section-intro {
              font-size: 17px;
              font-weight: 500;
              color: #1a1a1a;
              margin-bottom: 25px;
            }
            
            /* Sections */
            .article-content .content-section {
              margin-bottom: 50px;
            }
            
            .article-content .feature-block {
              margin: 25px 0;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 8px;
              border-left: 4px solid #d4af37;
            }
            
            .article-content .feature-block h3 {
              margin-top: 0;
              margin-bottom: 15px;
            }
            
            .article-content .use-cases {
              margin: 30px 0;
            }
            
            .article-content .use-case {
              margin-bottom: 20px;
              padding: 20px;
              background: #ffffff;
              border: 1px solid #e1e5e9;
              border-radius: 8px;
              border-left: 4px solid #d4af37;
            }
            
            .article-content .use-case h3 {
              margin-top: 0;
              margin-bottom: 10px;
            }
            
            /* Image */
            .article-content .image-showcase {
              text-align: center;
              margin: 40px 0;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 8px;
            }
            
            .article-content .image-showcase img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              margin-bottom: 15px;
            }
            
            .article-content .image-caption {
              font-style: italic;
              color: #666666;
              font-size: 14px;
              margin: 0;
            }
            
            /* Lists */
            .article-content .feature-list,
            .article-content .benefits-list {
              margin: 30px 0;
              padding-left: 0;
              list-style: none;
              background: #f8f9fa;
              padding: 25px;
              border-radius: 8px;
              border-left: 4px solid #d4af37;
            }
            
            .article-content .feature-list li,
            .article-content .benefits-list li {
              margin-bottom: 18px;
              padding-left: 30px;
              position: relative;
              line-height: 1.7;
              color: #444444;
              font-size: 16px;
            }
            
            .article-content .feature-list li:last-child,
            .article-content .benefits-list li:last-child {
              margin-bottom: 0;
            }
            
            .article-content .feature-list li::before,
            .article-content .benefits-list li::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: #d4af37;
              font-weight: bold;
              font-size: 18px;
              top: 0;
            }
            
            .article-content .tips-list {
              counter-reset: tip-counter;
              padding-left: 0;
              margin: 30px 0;
              list-style: none;
              background: #f8f9fa;
              padding: 25px;
              border-radius: 8px;
              border-left: 4px solid #d4af37;
            }
            
            .article-content .tips-list li {
              counter-increment: tip-counter;
              margin-bottom: 20px;
              padding-left: 35px;
              position: relative;
              line-height: 1.7;
              color: #444444;
              font-size: 16px;
            }
            
            .article-content .tips-list li:last-child {
              margin-bottom: 0;
            }
            
            .article-content .tips-list li::before {
              content: counter(tip-counter) ".";
              position: absolute;
              left: 0;
              top: 0;
              color: #d4af37;
              font-weight: bold;
              font-size: 18px;
              width: 25px;
            }
            
            /* Special Sections */
            .article-content .highlight-section {
              background: #fef9e7;
              padding: 30px;
              border-radius: 8px;
              border: 1px solid #d4af37;
              margin: 40px 0;
            }
            
            .article-content .conclusion-section {
              background: #f8f9fa;
              padding: 30px;
              border-radius: 8px;
              border-top: 4px solid #d4af37;
              margin: 40px 0 0 0;
            }
            
            /* Strong text */
            .article-content strong {
              color: #1a1a1a;
              font-weight: 600;
            }
          `}</style>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm font-medium text-gray-600 mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-4 py-6 border-t border-b">
            <span className="text-sm font-medium text-gray-600">Share this article:</span>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </button>
              <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-deep-navy mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-deep-navy mb-4">
            Enjoyed This Article?
          </h2>
          <p className="text-lg text-deep-navy mb-8 opacity-80">
            Subscribe to our newsletter for more luxury travel insights and exclusive content
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
        </div>
      </section>
    </div>
  );
}
