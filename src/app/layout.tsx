import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// Konfigurasi font dengan optimasi performa
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  style: 'normal',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Konfigurasi viewport untuk responsif dan mobile-friendly
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
  colorScheme: 'light',
} as const;

export const metadata: Metadata = {
  title: {
    default: "ZBK Limousine Tours - Layanan Limousine Premium di Singapore",
    template: "%s | ZBK Limousine Tours"
  },
  description: "Layanan limousine profesional di Singapore dengan armada Toyota Alphard & Hiace mewah. Layanan antar-jemput bandara, sewa limo tur kota, layanan limo korporat, dan acara spesial. Pesan perjalanan limo elegan Anda sekarang!",
  keywords: [
    "layanan limousine singapore", 
    "sewa limo singapore", 
    "limousine singapore",
    "layanan limo",
    "sewa limousine",
    "antar jemput bandara limo",
    "limo korporat",
    "tur kota dengan limo",
    "limo pernikahan",
    "limo premium",
    "zbk limousine tours",
    "toyota alphard limo",
    "toyota hiace limo",
    "sopir profesional singapore"
  ],
  authors: [{ 
    name: "ZBK Limousine Tours",
    url: "https://zbktransportservices.com" 
  }],
  creator: "ZBK Limousine Tours",
  publisher: "ZBK Limousine Tours",
  metadataBase: new URL('https://www.zbktransportservices.com'),
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
      { url: '/logo-google.png', sizes: 'any', type: 'image/png' },
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
  alternates: {
    canonical: 'https://www.zbktransportservices.com',
  },
  openGraph: {
    title: "ZBK Limousine Tours - Premium Limousine Service in Singapore",
    description: "Professional limousine service in Singapore with premium Toyota Alphard & Hiace limos. Airport limo transfers, city tours, corporate events, and special occasions.",
    url: "https://www.zbktransportservices.com",
    siteName: "ZBK Limousine Tours",
    images: [
      {
        url: "/logo-google.png",
        width: 800,
        height: 600,
        alt: "ZBK Limousine Tours - Premium Limousine Service Singapore",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZBK Limousine Tours - Premium Limousine Service in Singapore",
    description: "Professional limousine service in Singapore with premium Toyota Alphard & Hiace limos. Airport limo transfers, city tours, corporate events, and special occasions.",
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
  children: ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <CustomerAuthProvider>
            <GoogleAnalytics />
            {children}
          </CustomerAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
