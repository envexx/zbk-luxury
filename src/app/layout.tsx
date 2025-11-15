import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ZBK Luxury Car Rental - Premium Vehicle Rentals",
  description: "Experience luxury travel with ZBK's premium car rental service. Choose from our fleet of luxury vehicles including Mercedes-Benz, BMW, Audi, and more.",
  keywords: "luxury car rental, premium vehicles, car hire, Mercedes-Benz rental, BMW rental, Audi rental, luxury travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
