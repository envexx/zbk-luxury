export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: {
    name: string;
    slug: string;
  };
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
    canonicalUrl?: string;
  };
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  postCount: number;
}

export interface BlogListResponse {
  posts: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  categories: BlogCategory[];
  featuredPosts: BlogPost[];
}
