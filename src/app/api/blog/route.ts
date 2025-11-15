import { NextRequest, NextResponse } from 'next/server';
import { BlogPost, BlogListResponse } from '@/types/blog';

// Mock data - replace with actual database queries
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Luxury Car Rental in 2024',
    slug: 'ultimate-guide-luxury-car-rental-2024',
    excerpt: 'Discover everything you need to know about renting luxury vehicles, from choosing the right car to maximizing your experience.',
    content: 'Full content here...',
    featuredImage: '/api/placeholder/800/600',
    author: {
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/100/100',
      bio: 'Luxury travel expert with 10+ years experience'
    },
    category: {
      name: 'Travel Tips',
      slug: 'travel-tips'
    },
    tags: ['luxury', 'travel', 'guide', 'rental'],
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readingTime: 8,
    seo: {
      metaTitle: 'Ultimate Guide to Luxury Car Rental 2024 | ZBK Luxury',
      metaDescription: 'Complete guide to luxury car rental with expert tips, best practices, and insider secrets for the perfect premium vehicle experience.',
      keywords: ['luxury car rental', 'premium vehicles', 'travel guide', 'luxury travel']
    },
    status: 'published',
    featured: true
  },
  // Add more mock posts here...
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';

    let filteredPosts = mockPosts.filter(post => post.status === 'published');

    // Apply filters
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category.slug === category);
    }

    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    if (search) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(postTag => postTag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (featured) {
      filteredPosts = filteredPosts.filter(post => post.featured);
    }

    // Sort by published date (newest first)
    filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const response: BlogListResponse = {
      posts: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      categories: [
        { id: '1', name: 'Travel Tips', slug: 'travel-tips', description: 'Expert advice for luxury travel', postCount: 15 },
        { id: '2', name: 'Business Travel', slug: 'business-travel', description: 'Professional travel solutions', postCount: 8 },
        { id: '3', name: 'Sustainability', slug: 'sustainability', description: 'Eco-friendly luxury options', postCount: 5 },
        { id: '4', name: 'Car Reviews', slug: 'car-reviews', description: 'In-depth vehicle reviews', postCount: 12 },
      ],
      featuredPosts: mockPosts.filter(post => post.featured),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'content', 'excerpt', 'categoryId', 'authorId'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate SEO-friendly slug
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Auto-generate SEO metadata if not provided
    const seoMetadata = {
      metaTitle: body.seo?.metaTitle || `${body.title} | ZBK Luxury Car Rental Blog`,
      metaDescription: body.seo?.metaDescription || body.excerpt.substring(0, 160),
      keywords: body.seo?.keywords || body.tags || [],
      ogImage: body.seo?.ogImage || body.featuredImage,
      canonicalUrl: body.seo?.canonicalUrl || `/blog/${slug}`,
    };

    // Calculate reading time (average 200 words per minute)
    const wordCount = body.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    const newPost: Partial<BlogPost> = {
      id: Date.now().toString(), // In real app, this would be generated by database
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      featuredImage: body.featuredImage,
      tags: body.tags || [],
      readingTime,
      seo: seoMetadata,
      status: body.status || 'draft',
      featured: body.featured || false,
      publishedAt: body.status === 'published' ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    };

    // In a real application, you would save this to your database
    console.log('New blog post created:', newPost);

    return NextResponse.json(
      { message: 'Blog post created successfully', post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
