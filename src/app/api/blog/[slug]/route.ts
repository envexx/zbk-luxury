import { NextRequest, NextResponse } from 'next/server';
import { BlogPost } from '@/types/blog';

// Mock data - replace with actual database queries
const mockPost: BlogPost = {
  id: '1',
  title: 'The Ultimate Guide to Luxury Car Rental in 2024',
  slug: 'ultimate-guide-luxury-car-rental-2024',
  excerpt: 'Discover everything you need to know about renting luxury vehicles, from choosing the right car to maximizing your experience.',
  content: `
    <h2>Introduction to Luxury Car Rental</h2>
    <p>Luxury car rental has evolved significantly over the past decade...</p>
    <!-- Full content would be here -->
  `,
  featuredImage: '/api/placeholder/1200/600',
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
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // In a real application, you would query your database
    // const post = await db.blogPost.findUnique({ where: { slug } });
    
    if (slug !== mockPost.slug) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(mockPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();

    // In a real application, you would update the database
    // const updatedPost = await db.blogPost.update({
    //   where: { slug },
    //   data: { ...body, updatedAt: new Date() }
    // });

    // Auto-generate SEO metadata if not provided
    if (body.title && !body.seo?.metaTitle) {
      body.seo = {
        ...body.seo,
        metaTitle: `${body.title} | ZBK Luxury Car Rental Blog`,
      };
    }

    if (body.excerpt && !body.seo?.metaDescription) {
      body.seo = {
        ...body.seo,
        metaDescription: body.excerpt.substring(0, 160),
      };
    }

    // Recalculate reading time if content changed
    if (body.content) {
      const wordCount = body.content.split(/\s+/).length;
      body.readingTime = Math.ceil(wordCount / 200);
    }

    // Update timestamp
    body.updatedAt = new Date().toISOString();

    console.log('Blog post updated:', { slug, updates: body });

    return NextResponse.json({
      message: 'Blog post updated successfully',
      post: { ...mockPost, ...body }
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // In a real application, you would delete from database
    // await db.blogPost.delete({ where: { slug } });

    console.log('Blog post deleted:', slug);

    return NextResponse.json({
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
