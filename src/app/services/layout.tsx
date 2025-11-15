import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Services - ZBK Luxury Car Rental | Chauffeur, Insurance & More",
  description: "Discover our comprehensive premium services including professional chauffeur, flexible timing, premium insurance, delivery service, and concierge assistance.",
  keywords: "luxury car services, chauffeur service, premium insurance, car delivery, concierge service, 24/7 support, professional drivers, luxury travel",
  openGraph: {
    title: "Premium Services - ZBK Luxury Car Rental",
    description: "Discover our comprehensive premium services including professional chauffeur, flexible timing, premium insurance, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Services - ZBK Luxury Car Rental",
    description: "Discover our comprehensive premium services including professional chauffeur, flexible timing, premium insurance, and more.",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
