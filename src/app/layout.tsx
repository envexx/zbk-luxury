import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "ZBK Limo Tours - Premium Luxury Transportation Services",
  description: "Premium Toyota Alphard & Hiace rental for Airport Transfers, City Tours, and Special Events. Experience luxury transportation tailored to your needs. Book Your Premium Ride Today!",
  keywords: "zbk limo tours, zbk transport services, luxury transportation, toyota alphard rental, toyota hiace rental, airport transfer, city tour singapore, premium car rental, wedding transport, corporate transport, zbk limo",
  authors: [{ name: "ZBK Limo Tours" }],
  creator: "ZBK Limo Tours",
  publisher: "ZBK Limo Tours",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://www.zbktransportservices.com'),
  alternates: {
    canonical: 'https://www.zbktransportservices.com',
  },
  openGraph: {
    title: "ZBK Limo Tours - Premium Luxury Transportation Services",
    description: "Premium Toyota Alphard & Hiace rental for Airport Transfers, City Tours, and Special Events.",
    url: "https://www.zbktransportservices.com",
    siteName: "ZBK Limo Tours",
    images: [
      {
        url: "/api/logo",
        width: 800,
        height: 600,
        alt: "ZBK Limo Tours - Premium Luxury Transportation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZBK Limo Tours - Premium Luxury Transportation Services",
    description: "Premium Toyota Alphard & Hiace rental for Airport Transfers, City Tours, and Special Events.",
    images: ["/api/logo"],
    creator: "@zbklimotours",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
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
