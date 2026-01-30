# Stripe Webhook Fix untuk Next.js App Router

## Perbandingan dengan Dokumentasi Resmi

### Dokumentasi Resmi (Pages Router)
- Menggunakan `./pages/api/webhooks/index.ts`
- Menggunakan `micro-cors` untuk CORS
- Menggunakan `buffer` untuk raw body
- Menggunakan `bodyParser: false` di config

### Implementasi Kita (App Router) ✅
- Menggunakan `src/app/api/stripe/webhook/route.ts`
- Menggunakan `request.text()` untuk raw body ✅
- Menambahkan CORS headers manual ✅
- Menggunakan `export const runtime = 'nodejs'` ✅

## Perbaikan yang Sudah Dilakukan

### 1. CORS Headers
✅ Menambahkan `OPTIONS` handler untuk preflight requests
✅ Menambahkan CORS headers di semua response
✅ Allow `stripe-signature` header

### 2. Enhanced Logging
✅ Log request headers
✅ Log body preview
✅ Log semua step processing

### 3. Error Handling
✅ CORS headers di error responses
✅ Detailed error logging

## Checklist untuk Live Production

### Environment Variables
- [ ] `STRIPE_SECRET_KEY` = `sk_live_...` (bukan `sk_test_...`)
- [ ] `STRIPE_WEBHOOK_SECRET` = `whsec_...` (dari Stripe Dashboard)
- [ ] `NEXT_PUBLIC_APP_URL` = domain production Anda

### Stripe Dashboard Configuration
1. **Webhook Endpoint**
   - [ ] Go to: Stripe Dashboard → Developers → Webhooks
   - [ ] Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - [ ] Select events:
     - [ ] `checkout.session.completed`
     - [ ] `checkout.session.async_payment_failed`
   - [ ] Copy webhook secret → Add to `STRIPE_WEBHOOK_SECRET`

2. **API Keys**
   - [ ] Go to: Stripe Dashboard → Developers → API keys
   - [ ] Use **Live mode** (toggle di kanan atas)
   - [ ] Copy **Secret key** (bukan Publishable key)
   - [ ] Add to `STRIPE_SECRET_KEY`

### Testing Webhook di Live

1. **Test Webhook Endpoint**
   ```bash
   curl -X POST https://yourdomain.com/api/stripe/webhook \
     -H "Content-Type: application/json" \
     -H "stripe-signature: test" \
     -d '{"type":"test"}'
   ```

2. **Check Logs**
   - Cari logs dengan prefix `[STRIPE WEBHOOK]`
   - Pastikan webhook terima request
   - Cek signature verification

3. **Test dari Stripe Dashboard**
   - Go to: Webhook → Test webhook
   - Send test event: `checkout.session.completed`
   - Cek logs apakah event terproses

## Troubleshooting

### Webhook tidak terima request
- ✅ Cek CORS headers sudah ditambahkan
- ✅ Cek domain sudah di-whitelist di hosting
- ✅ Cek firewall/security rules

### Signature verification failed
- ✅ Pastikan `STRIPE_WEBHOOK_SECRET` sudah benar
- ✅ Pastikan menggunakan secret dari webhook endpoint yang benar
- ✅ Pastikan raw body tidak di-modify oleh middleware

### Payment tidak terupdate
- ✅ Cek logs `[STRIPE WEBHOOK]` apakah event terima
- ✅ Cek logs `[STRIPE CONFIRM]` sebagai fallback
- ✅ Cek database apakah booking terupdate

## Perbedaan App Router vs Pages Router

| Feature | Pages Router | App Router (Kita) |
|---------|-------------|-------------------|
| File Location | `pages/api/` | `app/api/` |
| CORS | `micro-cors` | Manual headers |
| Raw Body | `buffer(req)` | `request.text()` |
| Config | `export const config` | `export const runtime` |
| Request Type | `NextApiRequest` | `NextRequest` |
| Response Type | `NextApiResponse` | `NextResponse` |

## Next Steps

1. ✅ Deploy perubahan ke production
2. ✅ Update environment variables
3. ✅ Configure webhook di Stripe Dashboard
4. ✅ Test dengan real payment
5. ✅ Monitor logs untuk debugging

