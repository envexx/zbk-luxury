# Stripe Payment Integration Setup

## Overview
Sistem pembayaran Stripe telah diintegrasikan untuk booking system ZBK. Pembayaran deposit 20% diperlukan untuk konfirmasi booking, dan email akan dikirim setelah pembayaran berhasil.

## Fitur yang Diimplementasikan

### 1. Database Schema Updates
- ✅ Menambahkan field `paymentStatus` (PENDING, PAID, FAILED, REFUNDED)
- ✅ Menambahkan field `depositAmount` (20% dari total)
- ✅ Menambahkan field `stripeSessionId` dan `stripePaymentId`

### 2. API Endpoints

#### `/api/stripe/create-checkout-session` (POST)
- Membuat Stripe checkout session untuk pembayaran deposit 20%
- Menggunakan booking ID untuk menghubungkan dengan booking
- Redirect ke Stripe hosted checkout page

#### `/api/stripe/webhook` (POST)
- Menangani webhook dari Stripe untuk payment confirmation
- Update booking status menjadi CONFIRMED setelah payment berhasil
- Mengirim email konfirmasi ke customer dan admin setelah payment

#### `/api/bookings` (POST)
- Membuat booking baru dengan status PENDING
- Menghitung total amount menggunakan pricing utility
- **TIDAK** langsung mengirim email (tunggu payment confirmation)

#### `/api/bookings/[id]` (GET)
- Mengambil detail booking berdasarkan ID

### 3. Pricing System

Pricing berdasarkan ZBK Price List:

**Alphard:**
- Airport Transfer: $80
- 6 hours: $360
- 12 hours: $720
- Capacity: 6 pax, 4 luggage

**Noah:**
- Airport Transfer: $75
- 6 hours: $360
- 12 hours: $660
- Capacity: 6 pax, 4 luggage

**Combi:**
- Airport Transfer: $90
- 6 hours: $390
- 12 hours: $720
- Capacity: 9 pax, 8 luggage

### 4. Frontend Pages

#### `/payment/success`
- Halaman konfirmasi setelah payment berhasil
- Menampilkan detail booking dan deposit yang dibayar

#### `/payment/cancel`
- Halaman jika user membatalkan payment
- Memberikan opsi untuk mencoba lagi

### 5. Component Updates

#### `OrderSummary.tsx`
- Update untuk redirect ke Stripe payment setelah booking dibuat
- Menampilkan deposit amount (20%) di UI
- Button text: "Pay Deposit (20%) - $X.XX"

## Setup Instructions

### 1. Install Dependencies
```bash
npm install stripe
```

### 2. Environment Variables
Tambahkan ke `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_51OLDyuA3wfYYkixjiJRzLy36QtMYZ5MAyDyKEvjYPocJzcnFPtspDplD4XxRSd8g1KmWnnBR5CW5eUMyDj1rgMIO00hOtIfaJY
STRIPE_PUBLISHABLE_KEY=pk_test_51OLDyuA3wfYYkixjEeUM3OByMP5PmdXdfq9wzmPEhdDAv3bZvrEtmFr7myAfSV0n3rXcy1mrFAUXSw19G1uYw1PO00R9ZGrqAY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51OLDyuA3wfYYkixjEeUM3OByMP5PmdXdfq9wzmPEhdDAv3bZvrEtmFr7myAfSV0n3rXcy1mrFAUXSw19G1uYw1PO00R9ZGrqAY
STRIPE_WEBHOOK_SECRET=whsec_... # Untuk production, dapatkan dari Stripe Dashboard
```

### 3. Update Database Schema
```bash
npx prisma generate
npx prisma db push
```

### 4. Webhook Setup (Production)

Untuk production, setup webhook di Stripe Dashboard:
1. Buka Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_failed`
4. Copy webhook signing secret ke `STRIPE_WEBHOOK_SECRET`

## Testing

### Test Cards
- **Success**: `4242 4242 4242 4242`
- **3D Secure**: `4000 0000 0000 3220`
- **Declined**: `4000 0000 0000 9995`

### Test Flow
1. User membuat booking melalui form
2. User diarahkan ke Stripe checkout untuk membayar deposit 20%
3. Setelah payment berhasil, user diarahkan ke `/payment/success`
4. Email konfirmasi dikirim ke customer dan admin
5. Booking status berubah menjadi CONFIRMED

## Payment Flow

```
1. User fills booking form
   ↓
2. POST /api/bookings → Create booking (status: PENDING, paymentStatus: PENDING)
   ↓
3. POST /api/stripe/create-checkout-session → Create Stripe session
   ↓
4. Redirect to Stripe Checkout
   ↓
5. User completes payment
   ↓
6. Stripe webhook → POST /api/stripe/webhook
   ↓
7. Update booking (status: CONFIRMED, paymentStatus: PAID)
   ↓
8. Send confirmation emails (customer + admin)
   ↓
9. Redirect to /payment/success
```

## Important Notes

1. **Email hanya dikirim setelah payment berhasil** - Ini memastikan booking yang dikonfirmasi sudah dibayar depositnya
2. **Deposit 20%** - Sisa pembayaran dapat dikelola secara manual oleh admin
3. **Development Mode** - Saat ini menggunakan test keys, untuk production perlu update ke live keys
4. **Webhook Verification** - Di development, webhook verification di-skip jika `STRIPE_WEBHOOK_SECRET` tidak ada

## Files Modified/Created

### Created:
- `src/app/api/stripe/create-checkout-session/route.ts`
- `src/app/api/stripe/webhook/route.ts`
- `src/app/(website)/payment/success/page.tsx`
- `src/app/(website)/payment/cancel/page.tsx`
- `src/app/api/bookings/[id]/route.ts`
- `src/utils/pricing.ts`

### Modified:
- `prisma/schema.prisma` - Added payment fields
- `src/app/api/bookings/route.ts` - Updated to use pricing utility, removed immediate email sending
- `src/components/molecules/OrderSummary.tsx` - Added Stripe payment redirect

