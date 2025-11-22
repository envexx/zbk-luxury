import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | ZBK Luxury Car Rental - Latest News & Insights",
  description: "Stay updated with the latest luxury car trends, travel tips, and industry insights from ZBK Luxury Car Rental experts. Discover premium vehicle guides and travel advice.",
  keywords: "luxury car blog, premium vehicle news, car rental tips, luxury travel, automotive insights, ZBK luxury, travel guides, business travel",
  openGraph: {
    title: "Blog | ZBK Luxury Car Rental - Latest News & Insights",
    description: "Stay updated with the latest luxury car trends, travel tips, and industry insights from ZBK Luxury Car Rental experts.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | ZBK Luxury Car Rental - Latest News & Insights",
    description: "Stay updated with the latest luxury car trends, travel tips, and industry insights from ZBK Luxury Car Rental experts.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
