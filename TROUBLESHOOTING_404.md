# Troubleshooting 404 Error pada Stripe Payment

## Masalah
Error 404 ketika user menekan tombol "Confirm Payment" dan seharusnya diarahkan ke Stripe Checkout.

## Solusi yang Sudah Diterapkan

### 1. Error Handling yang Lebih Baik
✅ Menambahkan error handling di `OrderSummary.tsx` untuk menampilkan error message yang lebih jelas

### 2. Test Endpoint
✅ Menambahkan GET method di `/api/stripe/create-checkout-session` untuk testing

## Langkah Troubleshooting

### 1. Cek Apakah Route Terdaftar
Test endpoint dengan membuka browser:
```
http://localhost:3000/api/stripe/create-checkout-session
```

Jika berhasil, akan muncul JSON:
```json
{
  "success": true,
  "message": "Stripe checkout session endpoint is available",
  "endpoint": "/api/stripe/create-checkout-session"
}
```

### 2. Cek Console Browser
Buka Developer Tools (F12) dan cek:
- **Console tab**: Apakah ada error JavaScript?
- **Network tab**: Apakah request ke `/api/stripe/create-checkout-session` muncul?
  - Status code: 404, 500, atau lainnya?
  - Response body: Apa isinya?

### 3. Cek Server Logs
Cek terminal dimana `npm run dev` berjalan:
- Apakah ada error saat route diakses?
- Apakah ada error saat import module?

### 4. Restart Dev Server
Kadang Next.js perlu restart setelah membuat route baru:
```bash
# Stop server (Ctrl+C)
# Start lagi
npm run dev
```

### 5. Cek Struktur Folder
Pastikan struktur folder benar:
```
src/app/api/stripe/create-checkout-session/route.ts
```

### 6. Cek Environment Variables
Pastikan `STRIPE_SECRET_KEY` sudah di-set di `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_51OLDyuA3wfYYkixjiJRzLy36QtMYZ5MAyDyKEvjYPocJzcnFPtspDplD4XxRSd8g1KmWnnBR5CW5eUMyDj1rgMIO00hOtIfaJY
```

### 7. Cek Network Request
Di browser DevTools > Network tab, cek:
- Request URL: Apakah benar `/api/stripe/create-checkout-session`?
- Request Method: Apakah `POST`?
- Request Headers: Apakah `Content-Type: application/json`?
- Request Body: Apakah ada `bookingId`?

## Common Issues

### Issue 1: Route Not Found (404)
**Penyebab**: Next.js belum rebuild atau route belum terdaftar
**Solusi**: Restart dev server

### Issue 2: Method Not Allowed (405)
**Penyebab**: Route tidak memiliki method yang dipanggil
**Solusi**: Pastikan route export function `POST`

### Issue 3: Internal Server Error (500)
**Penyebab**: Error di dalam route handler
**Solusi**: Cek server logs untuk detail error

### Issue 4: CORS Error
**Penyebab**: Request dari domain berbeda
**Solusi**: Tidak perlu, karena request dari same origin

## Testing Manual

### Test 1: GET Request (Browser)
```
http://localhost:3000/api/stripe/create-checkout-session
```
Expected: JSON response dengan success: true

### Test 2: POST Request (cURL)
```bash
curl -X POST http://localhost:3000/api/stripe/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"bookingId":"test-id"}'
```
Expected: Error "Booking not found" (karena test-id tidak ada)

### Test 3: POST Request dengan Booking ID Valid
1. Buat booking dulu
2. Gunakan booking ID yang valid
3. Test POST request

## Debug Checklist

- [ ] Route file ada di lokasi yang benar
- [ ] Route export function POST
- [ ] Dev server sudah restart
- [ ] Test GET endpoint berhasil
- [ ] Console browser tidak ada error
- [ ] Network tab menunjukkan request
- [ ] Environment variables sudah di-set
- [ ] Booking ID valid dan ada di database

## Next Steps

Jika masih error 404:
1. Cek apakah route file benar-benar ada
2. Restart dev server
3. Cek console untuk error detail
4. Test dengan GET request dulu
5. Jika GET berhasil tapi POST tidak, cek request body

