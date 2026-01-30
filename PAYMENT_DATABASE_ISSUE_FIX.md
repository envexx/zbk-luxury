# Fix: Payment Berhasil Tapi Tidak Ter-record ke Database

## Masalah yang Ditemukan

Ketika payment berhasil di Stripe:
- ✅ Payment berhasil di Stripe
- ❌ Booking tidak terupdate ke status PAID/CONFIRMED di database
- ⚠️ Data muncul di dashboard tapi tidak persist

## Kemungkinan Penyebab

### 1. Webhook Tidak Terpanggil
- Webhook dari Stripe tidak sampai ke server
- Webhook secret tidak match
- CORS atau network issue

### 2. Database Connection Issue
- Prisma Client tidak terhubung ke database yang benar
- DATABASE_URL tidak match dengan database production
- Connection pool issue

### 3. Transaction Rollback
- Update database gagal tapi tidak throw error
- Database constraint violation
- Connection timeout

## Perbaikan yang Sudah Dilakukan

### 1. Enhanced Logging di Webhook
✅ Menambahkan logging detail untuk:
- Booking existence check sebelum update
- Status sebelum dan sesudah update
- Verification query setelah update
- Warning jika update tidak tersimpan

### 2. Enhanced Logging di Confirm Payment
✅ Menambahkan logging detail untuk:
- Current booking status
- Update verification
- Database verification setelah update

### 3. Debug Endpoint
✅ Membuat endpoint `/api/debug/booking-status?bookingId=xxx` untuk:
- Check booking status di database
- Compare dengan related bookings
- Verify database connection

## Cara Debugging

### Step 1: Check Webhook Logs
Cari logs dengan prefix `[STRIPE WEBHOOK]`:
```bash
# Di server logs, cari:
🟢 [STRIPE WEBHOOK] Webhook received
🟢 [STRIPE WEBHOOK] Processing checkout.session.completed
✅ [STRIPE WEBHOOK] Booking updated successfully
🔵 [STRIPE WEBHOOK] Verification - Booking status in DB
```

### Step 2: Check Confirm Payment Logs
Cari logs dengan prefix `[STRIPE CONFIRM]`:
```bash
🟡 [STRIPE CONFIRM] Payment is successful, updating booking
✅ [STRIPE CONFIRM] Booking update verified successfully
```

### Step 3: Check Database Connection
Test endpoint:
```bash
GET /api/test-db-connection
```

### Step 4: Check Booking Status
Debug endpoint:
```bash
GET /api/debug/booking-status?bookingId=YOUR_BOOKING_ID
```

## Checklist untuk Fix

- [ ] **Webhook terpanggil?**
  - Check logs untuk `[STRIPE WEBHOOK] Webhook received`
  - Check Stripe Dashboard → Webhooks → Recent events

- [ ] **Booking ID ada di metadata?**
  - Check logs: `🟢 [STRIPE WEBHOOK] Booking ID to update: xxx`
  - Verify booking exists di database

- [ ] **Update berhasil?**
  - Check logs: `✅ [STRIPE WEBHOOK] Booking updated successfully`
  - Check verification: `🔵 [STRIPE WEBHOOK] Verification - Booking status in DB`

- [ ] **Database connection OK?**
  - Test: `/api/test-db-connection`
  - Verify DATABASE_URL di environment variables

- [ ] **Prisma Client connected?**
  - Check logs saat startup: `[PRISMA] DATABASE_URL exists: true`
  - Verify Prisma Client generated: `npx prisma generate`

## Troubleshooting Steps

### Jika Webhook Tidak Terpanggil
1. Check webhook URL di Stripe Dashboard
2. Check webhook secret di environment variables
3. Test webhook dari Stripe Dashboard → Send test webhook
4. Check server logs untuk error

### Jika Update Gagal
1. Check database connection
2. Check booking ID exists
3. Check database constraints
4. Check Prisma Client version

### Jika Data Tidak Persist
1. Check database transaction
2. Check connection pool
3. Verify DATABASE_URL points to correct database
4. Check for multiple database instances

## Next Steps

1. ✅ Deploy perubahan dengan enhanced logging
2. ✅ Monitor logs saat payment berhasil
3. ✅ Check apakah webhook terpanggil
4. ✅ Verify booking update di database
5. ✅ Check dashboard query apakah dari database yang benar

## Testing

Setelah deploy, test dengan:
1. Buat booking baru
2. Complete payment di Stripe
3. Check logs untuk `[STRIPE WEBHOOK]` atau `[STRIPE CONFIRM]`
4. Verify booking status dengan: `/api/debug/booking-status?bookingId=xxx`
5. Check dashboard apakah booking muncul

