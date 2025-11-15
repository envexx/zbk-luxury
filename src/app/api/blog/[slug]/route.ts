import { NextRequest, NextResponse } from 'next/server';
import { BlogPost } from '@/types/blog';

// Mock data - replace with actual database queries
const mockPost: BlogPost = {
  id: '1',
  title: 'Toyota Alphard & Hiace: Premium Vehicle Rental Guide 2025',
  slug: 'toyota-alphard-hiace-premium-rental-guide',
  excerpt: 'Discover everything you need to know about renting Toyota Alphard and Hiace vehicles, from luxury features to group transportation solutions.',
  content: `
    <h2>Toyota Alphard & Hiace: Our Premium Fleet</h2>
    <p>ZBK Luxury specializes in Toyota Alphard and Hiace rentals, offering the perfect vehicles for luxury travel and group transportation needs...</p>
    <!-- Full content would be here -->
  `,
  featuredImage: '/Hero.jpg',
  author: {
    name: 'ZBK Luxury Team',
    avatar: '/Logo.png',
    bio: 'Expert in Toyota Alphard and Hiace rental services with 10+ years experience'
  },
  category: {
    name: 'Premium Vehicles',
    slug: 'premium-vehicles'
  },
  tags: ['toyota alphard', 'toyota hiace', 'luxury rental', 'group transportation'],
  publishedAt: '2025-01-15T10:00:00Z',
  updatedAt: '2025-01-15T10:00:00Z',
  readingTime: 10,
  seo: {
    metaTitle: 'Toyota Alphard & Hiace Rental Guide 2025 | ZBK Luxury',
    metaDescription: 'Complete guide to Toyota Alphard and Hiace rental with expert tips and premium service from ZBK Luxury.',
    keywords: ['toyota alphard rental', 'toyota hiace rental', 'premium vehicle rental', 'luxury transportation']
  },
  status: 'published',
  featured: true
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

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
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

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
