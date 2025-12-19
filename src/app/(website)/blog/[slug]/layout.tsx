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
    author: 'ZBK Luxury Team',
    images: ['/Hero.jpg'], // Changed to array
    tags: ['toyota-alphard', 'toyota-hiace', 'luxury-mpv', 'premium-rental', 'business', 'family', 'zbk-luxury'],
    publishedAt: '2025-11-15T10:00:00Z',
    createdAt: '2025-11-15T10:00:00Z',
    updatedAt: '2025-11-15T10:00:00Z',
    isPublished: true,
    readingTime: 12
  };

  return slug === mockPost.slug ? mockPost : null;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
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
