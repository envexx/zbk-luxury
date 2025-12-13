# Logo API Route untuk Email & SEO

## Overview
API route ini dibuat untuk menyediakan logo ZBK yang dapat diakses melalui URL untuk keperluan:
- Email templates (SMTP notifications)
- Schema.org markup untuk Google Search
- Open Graph & Twitter Cards
- Sharing di social media

## Endpoint

### GET `/api/logo`

**Response:**
- Content-Type: `image/png`
- Cache-Control: `public, max-age=31536000, immutable`
- Returns: Logo ZBK dalam format PNG

**Contoh Penggunaan:**

```html
<!-- Di Email Template -->
<img src="https://www.zbktransportservices.com/api/logo" alt="ZBK Limo Tours" />

<!-- Di Schema Markup -->
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "logo": "https://www.zbktransportservices.com/api/logo"
}
```

## Implementasi

### 1. API Route
File: `src/app/api/logo/route.ts`

Endpoint ini membaca file `public/logo-website.png` dan mengirimkannya dengan proper headers untuk caching.

### 2. Email Template
File: `scripts/send-test-email.js`

Logo digunakan di header email:
```javascript
<img src="${baseUrl}/api/logo" alt="ZBK Limo Tours" />
```

### 3. Schema Markup (SEO)
File: `src/app/(website)/page.tsx`

Organization schema untuk Google Search:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": "https://www.zbktransportservices.com",
  "logo": "https://www.zbktransportservices.com/api/logo",
  "name": "ZBK Limo Tours",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jurong West Street 65",
    "addressLocality": "Singapore",
    "postalCode": "640635",
    "addressCountry": "SG"
  }
}
```

### 4. Meta Tags (Open Graph & Twitter)
File: `src/app/layout.tsx`

Logo digunakan di meta tags:
```typescript
openGraph: {
  images: [
    {
      url: "/api/logo",
      width: 800,
      height: 600,
      alt: "ZBK Limo Tours - Premium Luxury Transportation",
    },
  ],
}
```

## Benefits

### ✅ SEO Benefits
1. **Google Knowledge Panel**: Logo akan muncul di Google Knowledge Panel
2. **Search Results**: Logo tampil di hasil pencarian Google
3. **Rich Snippets**: Mendukung rich snippets dengan organization data

### ✅ Email Benefits
1. **Professional Branding**: Logo konsisten di semua email
2. **Brand Recognition**: Meningkatkan brand awareness
3. **Centralized**: Update logo di 1 tempat, langsung update di semua email

### ✅ Technical Benefits
1. **Caching**: Logo di-cache 1 tahun untuk performa optimal
2. **CDN-Ready**: Siap untuk CDN deployment
3. **Consistent URL**: URL tetap sama meskipun file logo berubah

## Testing

### Test Email
```bash
npm run test:email
```

### Test API Endpoint
```bash
curl http://localhost:3000/api/logo -o logo-test.png
```

### Verify Schema Markup
1. Jalankan dev server: `npm run dev`
2. Buka: https://search.google.com/test/rich-results
3. Masukkan URL: https://www.zbktransportservices.com
4. Cek apakah Organization schema terdeteksi dengan logo

## Configuration

### Environment Variables
```env
# .env.local
BASE_URL=https://www.zbktransportservices.com

# Atau untuk development
BASE_URL=http://localhost:3000
```

### Production Deployment
Pastikan environment variable `NEXT_PUBLIC_BASE_URL` di-set di hosting platform:
```
NEXT_PUBLIC_BASE_URL=https://www.zbktransportservices.com
```

## Troubleshooting

### Logo tidak muncul di email
1. Cek apakah BASE_URL sudah di-set dengan benar
2. Pastikan file `public/logo-website.png` exists
3. Verify email client mendukung external images

### Logo tidak muncul di Google Search
1. Submit sitemap ke Google Search Console
2. Request indexing untuk homepage
3. Tunggu 1-2 minggu untuk Google crawl & update
4. Verify schema markup di Rich Results Test

### API Route Error 404
1. Restart development server
2. Cek file `src/app/api/logo/route.ts` exists
3. Build ulang: `npm run build`

## Maintenance

### Update Logo
1. Replace file: `public/logo-website.png`
2. Restart server (production akan auto-update karena cache busting)
3. Logo akan otomatis update di:
   - Email templates
   - Schema markup
   - Meta tags
   - Search engines (setelah re-crawl)

## Related Files
- `/src/app/api/logo/route.ts` - API endpoint
- `/src/app/(website)/page.tsx` - Schema markup
- `/src/app/layout.tsx` - Meta tags
- `/scripts/send-test-email.js` - Email template
- `/public/logo-website.png` - Logo source file

## Support
Untuk pertanyaan atau issues, silakan kontak development team.

