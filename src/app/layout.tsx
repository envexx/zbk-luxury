import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "ZBK Limousine Tours - Premium Limousine Service in Singapore | Limo Rental",
  description: "Professional limousine service in Singapore with premium Toyota Alphard & Hiace limos. Airport limo transfers, city tour limousine rental, corporate limo service, and special events. Book your elegant limousine ride today!",
  keywords: "limousine service singapore, limo rental singapore, limousine singapore, limo service, limousine rental, airport limo transfer, corporate limousine, city tour limo, wedding limousine, premium limo, zbk limousine tours, toyota alphard limo, toyota hiace limo, professional chauffeur singapore",
  authors: [{ name: "ZBK Limousine Tours" }],
  creator: "ZBK Limousine Tours",
  publisher: "ZBK Limousine Tours",
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
  metadataBase: new URL('https://www.zbktransportservices.com'),
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <AuthProvider>
          <CustomerAuthProvider>
            {children}
          </CustomerAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
