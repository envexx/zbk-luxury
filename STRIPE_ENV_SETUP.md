# Stripe Environment Variable Setup

## Masalah yang Terjadi

Error: `This API call cannot be made with a publishable API key. Please use a secret API key.`

Error ini terjadi karena:
1. Environment variable `STRIPE_SECRET_KEY` tidak ter-set di file `.env.local`
2. Atau menggunakan publishable key (`pk_`) sebagai gantinya secret key (`sk_`)

## Solusi

### 1. Buat File `.env.local`

Buat file `.env.local` di root directory project (sama level dengan `package.json`):

```bash
# Di Windows PowerShell
New-Item -Path .env.local -ItemType File

# Atau buat manual dengan text editor
```

### 2. Tambahkan Stripe Secret Key

Tambahkan baris berikut ke file `.env.local`:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51OLDyuA3wfYYkixjiJRzLy36QtMYZ5MAyDyKEvjYPocJzcnFPtspDplD4XxRSd8g1KmWnnBR5CW5eUMyDj1rgMIO00hOtIfaJY

# Optional: Stripe Publishable Key (untuk frontend, jika diperlukan)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51OLDyuA3wfYYkixjEeUM3OByMP5PmdXdfq9wzmPEhdDAv3bZvrEtmFr7myAfSV0n3rXcy1mrFAUXSw19G1uYw1PO00R9ZGrqAY

# Optional: Stripe Webhook Secret (untuk production)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Pastikan Key yang Benar

**Secret Key (untuk backend/server):**
- Harus dimulai dengan `sk_test_` (test mode) atau `sk_live_` (production)
- Contoh: `sk_test_51OLDyuA3wfYYkixjiJRzLy36QtMYZ5MAyDyKEvjYPocJzcnFPtspDplD4XxRSd8g1KmWnnBR5CW5eUMyDj1rgMIO00hOtIfaJY`

**Publishable Key (untuk frontend):**
- Harus dimulai dengan `pk_test_` (test mode) atau `pk_live_` (production)
- JANGAN gunakan ini sebagai `STRIPE_SECRET_KEY`!

### 4. Restart Development Server

Setelah menambahkan environment variable, **restart development server**:

```bash
# Stop server (Ctrl+C)
# Kemudian jalankan lagi
npm run dev
```

**PENTING:** Next.js hanya membaca `.env.local` saat server start. Perubahan environment variable tidak akan ter-load tanpa restart.

### 5. Verifikasi Konfigurasi

Setelah restart, coba buat booking baru. Jika masih error, periksa:

1. **File `.env.local` ada di root directory** (sama level dengan `package.json`)
2. **Key dimulai dengan `sk_test_`** (bukan `pk_test_`)
3. **Tidak ada spasi atau karakter aneh** di sekitar key
4. **Server sudah di-restart** setelah menambahkan environment variable

## Cara Mendapatkan Stripe Keys

1. Login ke [Stripe Dashboard](https://dashboard.stripe.com/)
2. Klik **Developers** → **API keys**
3. Di bagian **Secret key**, klik **Reveal test key** atau **Reveal live key**
4. Copy key yang dimulai dengan `sk_test_` atau `sk_live_`
5. Paste ke file `.env.local` sebagai `STRIPE_SECRET_KEY`

## Troubleshooting

### Error: "STRIPE_SECRET_KEY environment variable is not set"

**Solusi:** Pastikan file `.env.local` ada dan berisi `STRIPE_SECRET_KEY=sk_test_...`

### Error: "Invalid Stripe secret key. Must start with 'sk_'"

**Solusi:** Pastikan key dimulai dengan `sk_test_` atau `sk_live_`, bukan `pk_test_` atau `pk_live_`

### Error: "You are using a publishable key (pk_) instead of a secret key (sk_)"

**Solusi:** Anda menggunakan publishable key. Gunakan secret key yang dimulai dengan `sk_`

### Masih Error Setelah Setup?

1. Pastikan file `.env.local` ada di root directory
2. Pastikan tidak ada typo: `STRIPE_SECRET_KEY` (bukan `STRIPE_SECRET` atau lainnya)
3. Restart development server dengan `npm run dev`
4. Clear cache browser dan coba lagi

## File Structure

```
zbk/
├── .env.local          ← File ini harus ada!
├── package.json
├── src/
└── ...
```

## Contoh `.env.local` Lengkap

```env
# Database
DATABASE_URL="postgres://..."

# Stripe (WAJIB untuk payment)
STRIPE_SECRET_KEY=sk_test_51OLDyuA3wfYYkixjiJRzLy36QtMYZ5MAyDyKEvjYPocJzcnFPtspDplD4XxRSd8g1KmWnnBR5CW5eUMyDj1rgMIO00hOtIfaJY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51OLDyuA3wfYYkixjEeUM3OByMP5PmdXdfq9wzmPEhdDAv3bZvrEtmFr7myAfSV0n3rXcy1mrFAUXSw19G1uYw1PO00R9ZGrqAY

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=zbklimo@gmail.com
EMAIL_PASS=your-app-password

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Catatan Penting

- **JANGAN commit file `.env.local` ke Git!** File ini sudah ada di `.gitignore`
- **Secret key harus dirahasiakan** - jangan share ke publik
- **Test key** (`sk_test_`) hanya untuk development/testing
- **Live key** (`sk_live_`) untuk production - gunakan dengan hati-hati

