# Payment Conditions & Validations

## Payment Conditions yang Diimplementasikan

### 1. Booking Creation
- ✅ Booking dibuat dengan status `PENDING` dan `paymentStatus: PENDING`
- ✅ Email **TIDAK** langsung dikirim saat booking dibuat
- ✅ User harus melakukan payment deposit 20% terlebih dahulu

### 2. Payment Checkout Session
Validasi sebelum membuat Stripe checkout session:

```typescript
// Payment condition: Check if booking already has payment
if (booking.paymentStatus === 'PAID') {
  return error: 'This booking has already been paid'
}

// Payment condition: Check if booking is cancelled
if (booking.status === 'CANCELLED') {
  return error: 'Cannot process payment for cancelled booking'
}
```

### 3. Booking Confirmation (Admin)
Validasi sebelum admin bisa mengkonfirmasi booking:

```typescript
// Payment condition: Cannot confirm booking without payment
if (status === 'CONFIRMED' && currentBooking.paymentStatus !== 'PAID') {
  return error: 'Cannot confirm booking without payment. Payment status must be PAID before confirming.'
}
```

**Ini berarti:**
- Admin **TIDAK BISA** mengkonfirmasi booking jika payment belum dilakukan
- Booking harus memiliki `paymentStatus: 'PAID'` sebelum bisa dikonfirmasi
- Ini memastikan semua booking yang dikonfirmasi sudah dibayar depositnya

### 4. Email Confirmation
- ✅ Email konfirmasi hanya dikirim setelah payment berhasil (via webhook)
- ✅ Email dikirim ke customer dan admin setelah `paymentStatus` berubah menjadi `PAID`
- ✅ Booking status otomatis berubah menjadi `CONFIRMED` setelah payment

## Payment Flow dengan Conditions

```
1. User creates booking
   ↓
   Status: PENDING
   PaymentStatus: PENDING
   Email: NOT SENT
   
2. User redirected to Stripe Checkout
   ↓
   Validations:
   - Check if already paid → Error if PAID
   - Check if cancelled → Error if CANCELLED
   
3. User completes payment
   ↓
   Stripe Webhook triggered
   
4. Webhook updates booking
   ↓
   Status: CONFIRMED
   PaymentStatus: PAID
   Email: SENT (Customer + Admin)
   
5. Admin tries to confirm manually
   ↓
   Validation:
   - Check if PaymentStatus === PAID
   - Error if not PAID
```

## Vehicle Data Update

✅ Vehicle data sudah diupdate dengan ZBK Price List:

### Alphard
- Capacity: **6 pax, 4 luggage**
- Airport Transfer: $80
- 6 hrs: $360
- 12 hrs: $720

### Noah
- Capacity: **6 pax, 4 luggage**
- Airport Transfer: $75
- 6 hrs: $360
- 12 hrs: $660

### Combi
- Capacity: **9 pax, 8 luggage**
- Airport Transfer: $90
- 6 hrs: $390
- 12 hrs: $720

## Testing Payment Conditions

### Test Case 1: Normal Flow
1. Create booking → Status: PENDING, PaymentStatus: PENDING ✅
2. Create checkout session → Success ✅
3. Complete payment → Status: CONFIRMED, PaymentStatus: PAID ✅
4. Email sent → Customer + Admin ✅

### Test Case 2: Double Payment Prevention
1. Create booking ✅
2. Complete payment → PaymentStatus: PAID ✅
3. Try to create checkout session again → Error: "Already paid" ✅

### Test Case 3: Admin Confirmation Without Payment
1. Create booking → PaymentStatus: PENDING ✅
2. Admin tries to confirm → Error: "Cannot confirm without payment" ✅

### Test Case 4: Cancel Booking
1. Create booking ✅
2. Cancel booking → Status: CANCELLED ✅
3. Try to create checkout session → Error: "Cannot process payment for cancelled booking" ✅

## API Endpoints dengan Payment Conditions

### POST `/api/stripe/create-checkout-session`
**Conditions:**
- Booking must exist
- PaymentStatus must NOT be PAID
- Booking status must NOT be CANCELLED

### PATCH `/api/admin/bookings/[id]`
**Conditions:**
- Cannot set status to CONFIRMED if PaymentStatus !== PAID
- Returns error with payment status information

### POST `/api/stripe/webhook`
**Actions:**
- Updates PaymentStatus to PAID
- Updates Status to CONFIRMED
- Sends confirmation emails

## Error Messages

| Condition | Error Message |
|----------|--------------|
| Already paid | "This booking has already been paid" |
| Cancelled booking | "Cannot process payment for cancelled booking" |
| Confirm without payment | "Cannot confirm booking without payment. Payment status must be PAID before confirming." |

