import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.zbktransportservices.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/*.json',
          '/_next/',
          '/api/blog/', // PENTING: Mengizinkan Google mengambil data blog dari API
        ],
        disallow: [
          '/api/',      // Tetap memblokir API sistem lainnya
          '/admin/',
          '/private/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}