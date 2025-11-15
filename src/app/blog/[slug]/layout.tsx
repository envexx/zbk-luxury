import type { Metadata } from "next";
import { generateBlogPostSEO, generateStructuredData } from "@/utils/seo";
import { BlogPost } from "@/types/blog";

// Mock function to get blog post data - replace with actual API call
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // This would be replaced with actual API call
  const mockPost: BlogPost = {
    id: '1',
    title: 'Luxury Experience with Toyota Alphard: Premium Vehicle for Business and Family Travel',
    slug: 'luxury-experience-toyota-alphard-premium',
    excerpt: 'Discover why Toyota Alphard has become the top choice for luxury travel worldwide. From advanced features to unparalleled comfort, learn everything you need to know about this premium MPV.',
    content: 'Full content here...',
    featuredImage: '/Hero.jpg',
    author: {
      name: 'ZBK Luxury Team',
      avatar: '/Logo.png',
      bio: 'Expert luxury vehicle rental team with over 10 years of experience serving premium clients worldwide'
    },
    category: {
      name: 'Premium Vehicles',
      slug: 'premium-vehicles'
    },
    tags: ['toyota alphard', 'luxury mpv', 'premium rental', 'business', 'family', 'zbk luxury'],
    publishedAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z',
    readingTime: 12,
    seo: {
      metaTitle: 'Toyota Alphard Premium Rental - Ultimate Luxury Experience | ZBK Luxury',
      metaDescription: 'Rent Toyota Alphard premium for business and family travel. Enjoy unparalleled comfort, advanced features, and the best service from ZBK Luxury.',
      keywords: ['toyota alphard rental', 'luxury mpv rental', 'premium vehicle rental', 'business travel', 'luxury car rental', 'zbk luxury']
    },
    status: 'published',
    featured: true
  };

  return slug === mockPost.slug ? mockPost : null;
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | ZBK Luxury Car Rental Blog',
      description: 'The article you are looking for could not be found.',
    };
  }

  return generateBlogPostSEO(post);
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);
  
  return (
    <>
      {children}
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData(post)),
          }}
        />
      )}
    </>
  );
}
