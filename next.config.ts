import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Disable image optimization for uploaded files (they're served via API route)
    unoptimized: false,
    // Allow images from our own domain
    domains: [],
  },
};

export default nextConfig;
