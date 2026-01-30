# Webhook Debugging Guide

## Analisis Log Webhook dari Stripe Dashboard

Dari log yang Anda tunjukkan, ada beberapa event yang terkirim:

### Events yang Terkirim:
1. ✅ `checkout.session.completed` - 2 events (8:42:50 PM dan 8:37:25 PM)
2. ✅ `payment_intent.succeeded` - 2 events
3. ✅ `charge.succeeded` - 2 events
4. ⚠️ `payment_intent.payment_failed` - 1 event
5. ⚠️ `charge.failed` - 1 event

## Masalah yang Mungkin Terjadi

### 1. Webhook Tidak Sampai ke Server
- Check server logs untuk `[STRIPE WEBHOOK]` messages
- Jika tidak ada log, berarti webhook tidak sampai ke server
- Kemungkinan: CORS, network, atau webhook URL salah

### 2. Signature Verification Gagal
- Check logs untuk: `❌ [STRIPE WEBHOOK] Webhook signature verification failed`
- Pastikan `STRIPE_WEBHOOK_SECRET` benar di environment variables
- Secret harus match dengan yang ada di Stripe Dashboard

### 3. Booking ID Tidak Ada di Metadata
- Check logs untuk: `❌ [STRIPE WEBHOOK] No booking ID in session metadata`
- Pastikan saat create checkout session, metadata berisi `bookingId`

### 4. Database Update Gagal
- Check logs untuk: `❌ [STRIPE WEBHOOK] Booking not found in database`
- Atau: `❌ [STRIPE WEBHOOK] WARNING: Booking update may not have been saved correctly!`

## Cara Debugging

### Step 1: Check Server Logs
Cari logs dengan prefix `[STRIPE WEBHOOK]`:
```bash
# Di server logs, cari:
🟢 [STRIPE WEBHOOK] Webhook received
🟢 [STRIPE WEBHOOK] Event type: checkout.session.completed
🟢 [STRIPE WEBHOOK] Session metadata: { bookingId: 'xxx' }
✅ [STRIPE WEBHOOK] Booking updated successfully
```

### Step 2: Check Webhook Response di Stripe Dashboard
1. Go to: Stripe Dashboard → Webhooks
2. Click webhook endpoint Anda
3. Click event yang ingin dicek
4. Check "Response" tab
5. Pastikan response adalah `200 OK` dengan `{"received": true}`

### Step 3: Test dengan Debug Endpoint
```bash
GET /api/debug/booking-status?bookingId=YOUR_BOOKING_ID
```

### Step 4: Check Metadata di Checkout Session
Pastikan saat create checkout session, metadata berisi `bookingId`:
```typescript
metadata: {
  bookingId: bookingId,  // ← Pastikan ini ada
  ...
}
```

## Perbaikan yang Sudah Dilakukan

### 1. Enhanced Logging
✅ Log semua event details
✅ Log metadata dari session/payment_intent
✅ Log verification setelah update

### 2. Fallback Handler
✅ Handle `payment_intent.succeeded` sebagai fallback
✅ Update booking dari payment_intent metadata jika session metadata tidak ada

### 3. Verification
✅ Verify booking update setelah save
✅ Warning jika update tidak tersimpan

## Checklist untuk Fix

- [ ] **Webhook sampai ke server?**
  - Check server logs untuk `[STRIPE WEBHOOK] Webhook received`
  - Jika tidak ada, check webhook URL di Stripe Dashboard

- [ ] **Signature verification OK?**
  - Check logs: `✅ [STRIPE WEBHOOK] Signature verified successfully`
  - Pastikan `STRIPE_WEBHOOK_SECRET` benar

- [ ] **Booking ID ada di metadata?**
  - Check logs: `🟢 [STRIPE WEBHOOK] Session metadata: { bookingId: 'xxx' }`
  - Pastikan saat create checkout session, metadata diset

- [ ] **Booking exists di database?**
  - Check logs: `🟢 [STRIPE WEBHOOK] Existing booking status: ...`
  - Pastikan booking sudah dibuat sebelum payment

- [ ] **Update berhasil?**
  - Check logs: `✅ [STRIPE WEBHOOK] Booking updated successfully`
  - Check verification: `🔵 [STRIPE WEBHOOK] Verification - Booking status in DB`

## Next Steps

1. ✅ Deploy perubahan dengan enhanced logging
2. ✅ Test payment baru
3. ✅ Monitor server logs untuk `[STRIPE WEBHOOK]` messages
4. ✅ Check Stripe Dashboard → Webhooks → Recent events → Response
5. ✅ Verify booking status dengan `/api/debug/booking-status?bookingId=xxx`

## Troubleshooting

### Jika Webhook Tidak Sampai
- Check webhook URL di Stripe Dashboard
- Check server accessibility dari internet
- Check firewall/security rules
- Test dengan Stripe CLI: `stripe listen --forward-to https://yourdomain.com/api/stripe/webhook`

### Jika Signature Verification Gagal
- Verify `STRIPE_WEBHOOK_SECRET` di environment variables
- Pastikan secret dari webhook endpoint yang benar
- Check apakah secret ada whitespace atau newline

### Jika Booking ID Tidak Ada
- Check saat create checkout session, pastikan metadata diset
- Verify booking sudah dibuat sebelum create checkout session
- Check logs di `[STRIPE CHECKOUT]` untuk melihat metadata yang dikirim

### Jika Update Gagal
- Check database connection
- Check booking exists di database
- Check database constraints
- Check Prisma Client version

