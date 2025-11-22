import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ZBK Luxury - Toyota Alphard & Hiace Premium Rental",
  description: "Experience luxury travel with ZBK's premium Toyota rental service. Choose from our fleet featuring Toyota Alphard luxury MPV and Toyota Hiace group transportation.",
  keywords: "toyota alphard rental, toyota hiace rental, luxury mpv rental, premium vehicle rental, group transportation, business travel, zbk luxury",
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
