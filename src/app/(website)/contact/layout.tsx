import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - ZBK Luxury Car Rental | Get in Touch for Bookings",
  description: "Contact ZBK Luxury Car Rental for bookings, inquiries, and support. Available 24/7 with emergency assistance. Visit our showroom or call us today.",
  keywords: "contact ZBK luxury, car rental booking, customer support, emergency assistance, luxury showroom, luxury car inquiry, 24/7 support",
  openGraph: {
    title: "Contact Us - ZBK Luxury Car Rental",
    description: "Contact ZBK Luxury Car Rental for bookings, inquiries, and support. Available 24/7 with emergency assistance.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - ZBK Luxury Car Rental",
    description: "Contact ZBK Luxury Car Rental for bookings, inquiries, and support. Available 24/7 with emergency assistance.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
