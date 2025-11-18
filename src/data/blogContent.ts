// Dataset dummy content untuk blog
// Simulasi konten yang akan diambil dari database

import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Luxury Experience with Toyota Alphard: Premium Vehicle for Business and Family Travel',
    slug: 'luxury-experience-toyota-alphard-premium',
    excerpt: 'Discover why Toyota Alphard has become the top choice for luxury travel worldwide. From advanced features to unparalleled comfort, learn everything you need to know about this premium MPV.',
    content: `
      <h2>Why Toyota Alphard Reigns as the Premium MPV King?</h2>
      <p>Toyota Alphard has set new standards in the luxury MPV segment globally. With elegant design, advanced technology, and unmatched comfort, Alphard has become the top choice for executives, VIP families, and anyone who values luxury in travel.</p>
      
      <p>Since its launch, Alphard has become a symbol of status and luxury. This vehicle doesn't just offer transportation, but a special driving experience with an interior that resembles a luxury lounge.</p>
      
      <h2>Stunning Interior Features</h2>
      
      <img src="/4.-alphard-colors-black.png" alt="Toyota Alphard Premium Black - Elegant and Luxurious Design" />
      
      <h3>Luxurious Captain Seats</h3>
      <p>One of Toyota Alphard's main advantages is the electrically adjustable captain seats in the second row. These seats are equipped with:</p>
      <ul>
        <li><strong>Automatic massage:</strong> Integrated massage system for relaxation during travel</li>
        <li><strong>Ventilation and heating:</strong> Individual temperature control for maximum comfort</li>
        <li><strong>Extendable ottoman:</strong> For perfect reclining position</li>
        <li><strong>Armrest with controls:</strong> Easy access to various vehicle functions</li>
      </ul>
      
      <h3>Advanced Entertainment Technology</h3>
      <p>Alphard is equipped with premium-class entertainment systems including:</p>
      <ul>
        <li>13-inch monitor screens on front seat backs</li>
        <li>Premium audio system with 17 JBL speakers</li>
        <li>Wireless connectivity for music and video streaming</li>
        <li>USB ports and wireless charging for all passengers</li>
      </ul>
      
      <h2>Leading Performance and Safety</h2>
      
      <h3>Powerful and Efficient Engine</h3>
      <p>Toyota Alphard uses a 2.5L Hybrid engine that provides the perfect combination of power and fuel efficiency. This hybrid system is not only environmentally friendly but also provides smooth and responsive acceleration.</p>
      
      <h3>Toyota Safety Sense Features</h3>
      <p>Safety is a top priority in Alphard with advanced features such as:</p>
      <ul>
        <li><strong>Pre-Collision System:</strong> Early detection to prevent collisions</li>
        <li><strong>Lane Departure Alert:</strong> Warning if vehicle leaves lane</li>
        <li><strong>Adaptive Cruise Control:</strong> Smart automatic speed control</li>
        <li><strong>Blind Spot Monitor:</strong> Vehicle detection in blind spots</li>
      </ul>
      
      <h2>Perfect for Business and Family</h2>
      <p>Toyota Alphard is ideal for various needs:</p>
      
      <h3>Business Travel</h3>
      <ul>
        <li>Professional and prestigious appearance</li>
        <li>Comfortable workspace with tables and charging ports</li>
        <li>Quiet cabin for important calls and meetings</li>
        <li>Spacious luggage area for business equipment</li>
      </ul>
      
      <h3>Family Travel</h3>
      <ul>
        <li>Spacious seating for up to 7 passengers</li>
        <li>Entertainment system to keep children happy</li>
        <li>Easy access through sliding doors</li>
        <li>Ample storage for family luggage</li>
      </ul>
      
      <h2>Why Choose ZBK Luxury for Alphard Rental?</h2>
      <p>At ZBK Luxury, we provide the best Toyota Alphard rental experience with:</p>
      <ul>
        <li><strong>Latest fleet:</strong> All our Alphards are the newest models with complete features</li>
        <li><strong>Professional drivers:</strong> Experienced and trained drivers for your comfort</li>
        <li><strong>Flexible service:</strong> Hourly, daily, or long-term rental options</li>
        <li><strong>Competitive prices:</strong> Best rates without compromising service quality</li>
        <li><strong>24/7 support:</strong> Customer service ready to assist anytime</li>
      </ul>
      
      <p>Experience the luxury and comfort of Toyota Alphard for your next trip. Contact ZBK Luxury now to book your premium vehicle and enjoy an unforgettable travel experience.</p>
    `,
    featuredImage: '/4.-alphard-colors-black.png',
    author: {
      name: 'ZBK Luxury Team',
      avatar: '/api/placeholder/100/100',
      bio: 'Expert team in luxury vehicle rental with years of experience in premium transportation services.'
    },
    category: {
      name: 'Vehicle Reviews',
      slug: 'vehicle-reviews'
    },
    tags: ['Toyota Alphard', 'Luxury MPV', 'Premium Rental', 'Business Travel', 'Family Vehicle'],
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readingTime: 8,
    seo: {
      metaTitle: 'Toyota Alphard Luxury Rental - Premium MPV for Business & Family | ZBK Luxury',
      metaDescription: 'Rent Toyota Alphard premium for business and family travel. Enjoy unparalleled comfort, advanced features, and the best service from ZBK Luxury.',
      keywords: ['toyota alphard rental', 'luxury mpv rental', 'premium vehicle rental', 'business travel', 'zbk luxury']
    },
    status: 'published' as const,
    featured: true
  },
  {
    id: '2',
    title: 'Toyota Hiace: The Perfect Solution for Group Transportation and Business Travel',
    slug: 'toyota-hiace-perfect-solution-group-transportation',
    excerpt: 'Learn why Toyota Hiace is the ideal choice for group travel, business transportation, and special events. Discover its features and benefits for your next group journey.',
    content: `
      <h2>Toyota Hiace: Reliable Group Transportation</h2>
      <p>Toyota Hiace has long been recognized as one of the most reliable vehicles for group transportation worldwide. With its spacious interior, fuel efficiency, and proven durability, Hiace is the perfect choice for various transportation needs.</p>
      
      <h2>Spacious and Comfortable Interior</h2>
      <p>Toyota Hiace offers exceptional space and comfort for group travel:</p>
      <ul>
        <li><strong>Seating capacity:</strong> Up to 14 passengers with comfortable seating arrangement</li>
        <li><strong>Flexible configuration:</strong> Seats can be adjusted or removed for cargo space</li>
        <li><strong>Air conditioning:</strong> Powerful AC system for all passengers</li>
        <li><strong>Easy access:</strong> Wide sliding doors for convenient entry and exit</li>
      </ul>
      
      <h2>Ideal for Various Purposes</h2>
      
      <h3>Business Transportation</h3>
      <ul>
        <li>Employee shuttle services</li>
        <li>Corporate events and meetings</li>
        <li>Airport transfers for groups</li>
        <li>Business trips and conferences</li>
      </ul>
      
      <h3>Tourism and Travel</h3>
      <ul>
        <li>Group tours and sightseeing</li>
        <li>Family reunions and gatherings</li>
        <li>School trips and educational tours</li>
        <li>Wedding and special event transportation</li>
      </ul>
      
      <h2>Safety and Reliability</h2>
      <p>Toyota Hiace is equipped with modern safety features:</p>
      <ul>
        <li>ABS (Anti-lock Braking System)</li>
        <li>Dual front airbags</li>
        <li>Vehicle Stability Control</li>
        <li>Emergency brake assistance</li>
      </ul>
      
      <h2>Fuel Efficiency and Performance</h2>
      <p>Despite its size, Toyota Hiace offers excellent fuel efficiency and performance, making it cost-effective for long-distance travel and frequent use.</p>
      
      <h2>ZBK Luxury Hiace Rental Service</h2>
      <p>Choose ZBK Luxury for your Toyota Hiace rental needs:</p>
      <ul>
        <li>Well-maintained fleet with regular servicing</li>
        <li>Professional and experienced drivers</li>
        <li>Competitive pricing for group transportation</li>
        <li>Flexible rental periods</li>
        <li>24/7 customer support</li>
      </ul>
      
      <p>Book your Toyota Hiace rental with ZBK Luxury today and experience reliable, comfortable group transportation for your next journey.</p>
    `,
    featuredImage: '/api/placeholder/600/400',
    author: {
      name: 'Transport Specialist',
      avatar: '/api/placeholder/100/100',
      bio: 'Specialist in group transportation solutions with extensive knowledge of commercial vehicles.'
    },
    category: {
      name: 'Vehicle Reviews',
      slug: 'vehicle-reviews'
    },
    tags: ['Toyota Hiace', 'Group Transportation', 'Business Travel', 'Van Rental'],
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    readingTime: 6,
    seo: {
      metaTitle: 'Toyota Hiace Rental for Group Transportation | ZBK Luxury',
      metaDescription: 'Best Toyota Hiace rental for group transportation and business travel',
      keywords: ['toyota hiace rental', 'group transportation', 'business travel']
    },
    status: 'published' as const,
    featured: false
  },
  {
    id: '3',
    title: 'Essential Travel Tips for Luxury Car Rental in Indonesia',
    slug: 'essential-travel-tips-luxury-car-rental-indonesia',
    excerpt: 'Maximize your luxury car rental experience in Indonesia with these comprehensive travel tips. From route planning to local regulations, get the most out of your premium vehicle rental.',
    content: `
      <h2>Planning Your Luxury Car Rental Journey in Indonesia</h2>
      <p>Indonesia offers incredible destinations perfect for luxury car travel. Whether you're exploring Jakarta's business district, Bali's scenic routes, or Yogyakarta's cultural sites, proper planning ensures a memorable experience.</p>
      
      <h2>Best Routes for Luxury Car Travel</h2>
      
      <h3>Jakarta and Surrounding Areas</h3>
      <ul>
        <li><strong>Jakarta - Bandung:</strong> Scenic mountain route with luxury resorts</li>
        <li><strong>Jakarta - Bogor:</strong> Perfect for day trips to botanical gardens</li>
        <li><strong>Jakarta - Puncak:</strong> Mountain retreat with cool weather</li>
      </ul>
      
      <h3>Bali Premium Routes</h3>
      <ul>
        <li><strong>Denpasar - Ubud:</strong> Cultural journey through rice terraces</li>
        <li><strong>Seminyak - Uluwatu:</strong> Coastal drive with stunning cliff views</li>
        <li><strong>Sanur - Kintamani:</strong> Volcano and lake scenic route</li>
      </ul>
      
      <h2>Important Regulations and Requirements</h2>
      
      <h3>Driving License Requirements</h3>
      <ul>
        <li>Valid international driving permit (IDP)</li>
        <li>Original home country license</li>
        <li>Passport and visa documentation</li>
        <li>Minimum age requirement (usually 21-25 years)</li>
      </ul>
      
      <h3>Traffic Rules and Regulations</h3>
      <ul>
        <li>Drive on the left side of the road</li>
        <li>Speed limits: 60 km/h in cities, 100 km/h on highways</li>
        <li>Mandatory seatbelt usage</li>
        <li>No mobile phone use while driving</li>
      </ul>
      
      <h2>Safety and Security Tips</h2>
      
      <h3>Vehicle Security</h3>
      <ul>
        <li>Always lock your vehicle when parked</li>
        <li>Use secure parking facilities</li>
        <li>Don't leave valuables visible in the car</li>
        <li>Keep rental documents and insurance papers handy</li>
      </ul>
      
      <h3>Road Safety</h3>
      <ul>
        <li>Be aware of local driving habits</li>
        <li>Watch for motorcycles and scooters</li>
        <li>Avoid driving during heavy rain</li>
        <li>Plan routes in advance using GPS</li>
      </ul>
      
      <h2>Cultural Considerations</h2>
      
      <h3>Local Customs</h3>
      <ul>
        <li>Respect local dress codes when visiting religious sites</li>
        <li>Learn basic Indonesian phrases for better communication</li>
        <li>Understand tipping culture and practices</li>
        <li>Be patient with traffic conditions</li>
      </ul>
      
      <h2>Maximizing Your Luxury Experience</h2>
      
      <h3>Vehicle Features</h3>
      <ul>
        <li>Familiarize yourself with luxury features</li>
        <li>Adjust climate control for comfort</li>
        <li>Use navigation and entertainment systems</li>
        <li>Take advantage of premium amenities</li>
      </ul>
      
      <h3>Service Benefits</h3>
      <ul>
        <li>Utilize concierge services when available</li>
        <li>Take advantage of 24/7 support</li>
        <li>Request recommendations for destinations</li>
        <li>Use professional driver services when needed</li>
      </ul>
      
      <h2>Emergency Preparedness</h2>
      
      <h3>Emergency Contacts</h3>
      <ul>
        <li>Save rental company emergency number</li>
        <li>Keep local emergency services numbers</li>
        <li>Have embassy contact information</li>
        <li>Maintain communication with family/colleagues</li>
      </ul>
      
      <h2>Making the Most of Your Journey</h2>
      <p>A luxury car rental in Indonesia opens up countless possibilities for exploration. From business meetings in Jakarta's skyscrapers to sunset drives along Bali's coastline, your premium vehicle ensures comfort and style throughout your journey.</p>
      
      <p>Remember that the journey is just as important as the destination. Take time to enjoy the advanced features of your luxury vehicle, appreciate Indonesia's diverse landscapes, and create unforgettable memories.</p>
      
      <p>For the best luxury car rental experience in Indonesia, choose ZBK Luxury. Our premium fleet, professional service, and local expertise ensure your journey exceeds expectations.</p>
    `,
    featuredImage: '/api/placeholder/600/400',
    author: {
      name: 'Travel Expert',
      avatar: '/api/placeholder/100/100',
      bio: 'Experienced travel consultant specializing in luxury transportation and Indonesian destinations.'
    },
    category: {
      name: 'Travel Tips',
      slug: 'travel-tips'
    },
    tags: ['Travel Tips', 'Indonesia', 'Luxury Rental', 'Road Trip', 'Safety'],
    publishedAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    readingTime: 10,
    seo: {
      metaTitle: 'Essential Travel Tips for Luxury Car Rental in Indonesia | ZBK Luxury',
      metaDescription: 'Make the most of your luxury car rental experience in Indonesia with these essential tips covering routes, regulations, and local insights.',
      keywords: ['travel tips', 'indonesia travel', 'luxury rental', 'road trip', 'safety']
    },
    status: 'published' as const,
    featured: true
  }
];

// Function to get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Function to get all published posts
export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.status === 'published');
};

// Function to get featured posts
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured && post.status === 'published');
};

// Function to get posts by category
export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.category.slug === categorySlug && post.status === 'published'
  );
};

// Function to get related posts
export const getRelatedPosts = (currentPostId: string, categorySlug: string, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => 
      post.id !== currentPostId && 
      post.category.slug === categorySlug && 
      post.status === 'published'
    )
    .slice(0, limit);
};
