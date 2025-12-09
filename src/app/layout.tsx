import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ZBK Limo Tours - Premium Luxury Transportation Services",
  description: "ZBK Limo Tours & Transportation Services - Premium luxury transportation in Singapore. Experience exceptional limousine and vehicle rental services for weddings, corporate events, airport transfers, and special occasions.",
  keywords: "zbk limo tours, luxury transportation singapore, limousine rental, premium car rental, wedding transport, corporate event transport, airport transfer singapore, zbk luxury",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "ZBK Limo Tours - Premium Luxury Transportation Services",
    description: "Premium luxury transportation in Singapore. Experience exceptional limousine and vehicle rental services.",
    url: "https://www.zbktransportservices.com",
    siteName: "ZBK Limo Tours",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "ZBK Limo Tours Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZBK Limo Tours - Premium Luxury Transportation Services",
    description: "Premium luxury transportation in Singapore. Experience exceptional limousine and vehicle rental services.",
    images: ["/Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
