# ZBK Limo - Booking Pricing Test Script

Script untuk testing dan verifikasi perhitungan harga booking di ZBK Limo.

## 📋 Fitur

Script ini akan melakukan testing untuk:

1. ✅ **Airport Transfer Pricing** - Verify perhitungan harga airport transfer
2. ✅ **Trip Pricing** - Verify perhitungan harga trip (one way)
3. ✅ **6 Hours Rental** - Verify perhitungan harga rental 6 jam
4. ✅ **12 Hours Rental** - Verify perhitungan harga rental 12 jam
5. ✅ **Tax Calculation** - Verify tax 10% ditambahkan dengan benar
6. ✅ **Edge Cases** - Test booking 8 jam (harus pakai harga 6 jam)

## 🚀 Cara Menjalankan

```bash
# Jalankan test script
npx ts-node scripts/test-booking-pricing.ts
```

## 📊 Output Script

Script akan menampilkan:

### 1. Vehicle Information
Informasi lengkap semua vehicle dan pricing:
```
━━━ TOYOTA ALPHARD (ALPHARD) ━━━
   Capacity: 6 pax, 4 luggage
   Airport Transfer: $80.00
   Trip:             $60.00
   6 Hours Rental:   $360.00
   12 Hours Rental:  $720.00
```

### 2. Test Results
Hasil testing untuk setiap service type:
```
✓ PASS TOYOTA ALPHARD - Airport Transfer
   Expected: $88.00
   Actual:   $88.00
   Details:  Base: $80.00 + Tax (10%): $8.00
```

### 3. Test Summary
Ringkasan hasil testing:
```
═══════════════════════════════════════════════════════════
  TEST SUMMARY
═══════════════════════════════════════════════════════════

Total Tests:  15
Passed:       15
Success Rate: 100.0%
```

### 4. Sample Booking Scenarios
Contoh perhitungan untuk scenario real:
```
TOYOTA ALPHARD:
  ✈️  Airport Transfer (Changi → Hotel):     $88.00
  🚗 Trip (Marina Bay → Sentosa):           $66.00
  ⏰ 6 Hours Rental (City Tour):             $396.00
  ⏰ 12 Hours Rental (Full Day):             $792.00
```

### 5. Price Comparison Table
Perbandingan harga antar vehicle:
```
Service Type         | Alphard | Noah    | Combi
---------------------|---------|---------|--------
Airport Transfer     | $88.00  | $82.50  | $99.00
Trip                 | $66.00  | $55.00  | $77.00
6 Hours Rental       | $396.00 | $396.00 | $429.00
12 Hours Rental      | $792.00 | $726.00 | $792.00
```

## 🧮 Formula Perhitungan

### Airport Transfer & Trip
```
Subtotal = Base Price (priceAirportTransfer atau priceTrip)
Tax = Subtotal × 10%
Total = Subtotal + Tax
```

### Rental (6 atau 12 Hours)
```
IF hours >= 12:
   Subtotal = price12Hours
ELSE IF hours >= 6:
   Subtotal = price6Hours
ELSE:
   Subtotal = price6Hours (minimum)

Tax = Subtotal × 10%
Total = Subtotal + Tax
```

## 📝 Current Pricing (Database)

### TOYOTA ALPHARD
- **Airport Transfer:** $80 → **Total: $88.00** (incl. tax)
- **Trip:** $60 → **Total: $66.00** (incl. tax)
- **6 Hours:** $360 → **Total: $396.00** (incl. tax)
- **12 Hours:** $720 → **Total: $792.00** (incl. tax)

### TOYOTA NOAH
- **Airport Transfer:** $75 → **Total: $82.50** (incl. tax)
- **Trip:** $50 → **Total: $55.00** (incl. tax)
- **6 Hours:** $360 → **Total: $396.00** (incl. tax)
- **12 Hours:** $660 → **Total: $726.00** (incl. tax)

### TOYOTA HIACE COMBI
- **Airport Transfer:** $90 → **Total: $99.00** (incl. tax)
- **Trip:** $70 → **Total: $77.00** (incl. tax)
- **6 Hours:** $390 → **Total: $429.00** (incl. tax)
- **12 Hours:** $720 → **Total: $792.00** (incl. tax)

## ✅ Expected Test Results

Semua test harus **PASS** dengan:
- ✅ Tax calculation: 10% ditambahkan ke semua harga
- ✅ Service type detection: AIRPORT_TRANSFER, TRIP, RENTAL
- ✅ Hour-based pricing: 6hrs dan 12hrs berbeda
- ✅ Edge cases: 8 hours menggunakan 6 hours price

## 🐛 Troubleshooting

### Test Failed
Jika ada test yang failed:
1. Cek database apakah pricing sudah sesuai
2. Verify tax calculation (harus 10%)
3. Cek logika di `OrderSummary.tsx`
4. Cek API `/api/bookings` dan `/api/public/booking`

### No Vehicles Found
Jika tidak ada vehicle di database:
```bash
# Jalankan seeder
npx ts-node prisma/seed-vehicles.ts
```

## 📞 Support

Jika menemukan issue:
1. Review output script dengan detail
2. Check database pricing menggunakan Prisma Studio
3. Verify frontend calculation di OrderSummary.tsx
4. Verify backend calculation di booking APIs

---

**Note:** Script ini harus dijalankan setiap kali ada perubahan pricing atau logika perhitungan untuk memastikan akurasi.
