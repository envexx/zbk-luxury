# Quick Fix Guide: Booking Service Type Issue

## Masalah
Saat testing booking dari airport, sistem masih menampilkan harga rental per hours ($360, $720) padahal seharusnya menampilkan harga airport transfer ($80, $75, $90).

## Solusi: Langkah-langkah Fix

### Step 1: Check Vehicle Prices di Database

Jalankan script untuk mengecek apakah semua vehicles memiliki price fields yang benar:

```bash
node scripts/check-and-fix-vehicle-prices.js
```

**Output yang diharapkan:**
```
✅ Toyota Alphard (AVAILABLE)
   Airport Transfer: $80
   Trip: $75
   6 Hours: $360
   12 Hours: $720
```

**Jika ada missing prices:**
```
❌ Toyota Alphard (AVAILABLE)
   Missing: priceAirportTransfer, priceTrip
   Suggested fixes (alphard pricing):
   - priceAirportTransfer: $80
   - priceTrip: $75
```

### Step 2: Fix Vehicle Prices (Jika Ada yang Missing)

Jika ada vehicles dengan missing prices, run dengan flag `--fix`:

```bash
node scripts/check-and-fix-vehicle-prices.js --fix
```

Script akan konfirmasi sebelum update:
```
⚠️  About to update 3 vehicle(s). Continue? (y/n): y
```

Ketik `y` dan Enter untuk melanjutkan.

### Step 3: Test Booking Flow dengan Console Logging

1. **Buka Browser (Chrome/Edge)**

2. **Buka Developer Tools**
   - Tekan `F12` atau `Ctrl+Shift+I`
   - Pilih tab "Console"

3. **Clear Console**
   - Klik ikon 🚫 atau tekan `Ctrl+L`

4. **Mulai Booking Process**
   - Klik "Book Now" atau buka booking modal
   - Step 1: Input lokasi pickup: **"Ngurah Rai International Airport"**
   - Step 1: Input tujuan: **"Seminyak"**
   - Step 1: Pilih **"One Way"**
   - Klik **Continue**

5. **Periksa Console Output**

   Anda harus melihat log seperti ini:

   ```
   ✅ RideDetailsForm - Submitting data: {
     tripType: "one-way",
     pickupLocation: "Ngurah Rai International Airport",
     dropOffLocation: "Seminyak",
     ...
   }
   
   🔍 VehicleSelection - Checking locations:
     - Pickup: Ngurah Rai International Airport → ngurah rai international airport
     - Dropoff: Seminyak → seminyak
     - Trip Type: one-way
     - Is Airport Service: true  ← HARUS TRUE!
   
   🎯 VehicleSelection - Service Type: AIRPORT_TRANSFER | Label: Airport Transfer
   
   💰 Getting price for Toyota Alphard:
     tripType: "one-way"
     isAirportService: true
     priceAirportTransfer: 80  ← HARUS ADA NILAI!
     priceTrip: 75
     price6Hours: 360
     ✈️ Airport Transfer price: $80  ← INI HARGA YANG DITAMPILKAN
   ```

6. **Periksa UI**
   - Harus ada badge: **"ℹ️ Service Type: Airport Transfer"**
   - Alphard harus menunjukkan: **$80** (bukan $360)
   - Noah harus menunjukkan: **$75** (bukan $360)
   - Combi harus menunjukkan: **$90** (bukan $390)

### Step 4: Diagnosa Berdasarkan Console Log

#### Scenario A: "Is Airport Service: false"

```
🔍 VehicleSelection - Checking locations:
  - Is Airport Service: false  ❌
```

**Penyebab:** Lokasi tidak mengandung keyword airport.

**Solusi:** 
- Pastikan pickup atau destination mengandung salah satu:
  - `airport` (case-insensitive)
  - `terminal`
  - `bandara`

**Contoh yang BENAR:**
- ✅ "Ngurah Rai Airport"
- ✅ "International Airport Terminal 1"
- ✅ "Bandara Internasional Ngurah Rai"
- ✅ "DPS Airport"
- ✅ "Terminal 2"

**Contoh yang SALAH:**
- ❌ "DPS" (hanya kode airport)
- ❌ "Bali Flight" (tidak ada keyword)

#### Scenario B: "priceAirportTransfer: null"

```
💰 Getting price for Toyota Alphard:
  priceAirportTransfer: null  ❌
  priceTrip: null
```

**Penyebab:** Database vehicle tidak punya price fields.

**Solusi:** 
1. Jalankan script fix (Step 2 di atas)
2. Atau update manual via admin panel
3. Atau update langsung ke database:

```sql
UPDATE vehicles 
SET 
  "priceAirportTransfer" = 80,
  "priceTrip" = 75,
  "price6Hours" = 360,
  "price12Hours" = 720
WHERE name LIKE '%Alphard%';
```

#### Scenario C: "Trip Type: round-trip"

```
🔍 VehicleSelection - Checking locations:
  - Trip Type: round-trip  ❌
```

**Penyebab:** User memilih "Round Trip" bukan "One Way".

**Solusi:**
- Ini adalah behavior yang benar!
- Round trip selalu menggunakan rental pricing (6hrs/12hrs)
- Airport transfer hanya untuk "One Way"

### Step 5: Test All Scenarios

Setelah fix, test semua scenarios:

#### ✅ Test 1: Airport Transfer
- Pickup: "Ngurah Rai Airport"
- Destination: "Seminyak"  
- Trip Type: "One Way"
- **Expected:** Badge "Airport Transfer", Alphard $80

#### ✅ Test 2: General Trip
- Pickup: "Seminyak"
- Destination: "Ubud"
- Trip Type: "One Way"
- **Expected:** Badge "Trip", Alphard $75

#### ✅ Test 3: Rental 6hrs
- Pickup: "Seminyak"
- Destination: "Ubud"
- Trip Type: "Round Trip"
- Duration: "6 hours"
- **Expected:** No badge, Alphard $360

#### ✅ Test 4: Rental 12hrs
- Same as Test 3, duration "12 hours"
- **Expected:** No badge, Alphard $720

## Masih Bermasalah?

### Option 1: Hard Refresh Browser

Kadang browser cache perlu di-clear:

1. Tekan `Ctrl+Shift+R` (Windows) atau `Cmd+Shift+R` (Mac)
2. Atau buka Incognito/Private mode
3. Test lagi

### Option 2: Restart Dev Server

```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf .next

# Restart
npm run dev
```

### Option 3: Check Code Changes Applied

Pastikan file-file berikut sudah updated:

1. **VehicleSelection.tsx**
   - Check ada function `getVehiclePrice()`
   - Check ada `console.log` statements

2. **BookingForm.tsx**
   - Check passing `bookingData={bookingData}` ke VehicleSelection

3. Run build untuk check errors:
   ```bash
   npm run build
   ```

### Option 4: Manual Database Update

Jika script tidak work, update manual via Prisma Studio:

```bash
npx prisma studio
```

Atau SQL direct:

```sql
-- Update Alphard
UPDATE vehicles 
SET 
  "priceAirportTransfer" = 80,
  "priceTrip" = 75,
  "price6Hours" = 360,
  "price12Hours" = 720
WHERE name LIKE '%Alphard%';

-- Update Noah
UPDATE vehicles 
SET 
  "priceAirportTransfer" = 75,
  "priceTrip" = 70,
  "price6Hours" = 360,
  "price12Hours" = 660
WHERE name LIKE '%Noah%';

-- Update Combi/Hiace
UPDATE vehicles 
SET 
  "priceAirportTransfer" = 90,
  "priceTrip" = 85,
  "price6Hours" = 390,
  "price12Hours" = 720
WHERE name LIKE '%Combi%' OR name LIKE '%Hiace%';
```

## Summary Checklist

- [ ] Run `node scripts/check-and-fix-vehicle-prices.js`
- [ ] Fix any missing prices with `--fix` flag
- [ ] Test booking with console open (F12)
- [ ] Verify "Is Airport Service: true" in console
- [ ] Verify badge shows "Airport Transfer"
- [ ] Verify Alphard shows $80 (not $360)
- [ ] Test all 4 scenarios above
- [ ] Clear browser cache if needed
- [ ] Restart dev server if needed

## Files yang Telah Dimodifikasi

Untuk reference, files yang telah diperbaiki:

1. ✅ `src/components/molecules/VehicleSelection.tsx` - Added service type detection
2. ✅ `src/components/organisms/BookingForm.tsx` - Pass bookingData prop
3. ✅ `src/components/molecules/OrderSummary.tsx` - Use detected service type
4. ✅ `src/components/molecules/RideDetailsForm.tsx` - Added debug logging
5. ✅ `src/app/api/bookings/route.ts` - Support bandara keyword
6. ✅ `src/app/api/stripe/create-checkout-session/route.ts` - Consistent pricing logic

## Dokumentasi

- 📖 `docs/BOOKING_SERVICE_TYPE_LOGIC.md` - Complete logic documentation
- 📖 `docs/BOOKING_FLOW_DIAGRAM.md` - Visual flow diagram
- 📖 `docs/TROUBLESHOOTING_BOOKING_SERVICE_TYPE.md` - Detailed troubleshooting
- 📖 `CHANGELOG_BOOKING_LOGIC_FIX.md` - Summary of changes
- 📖 `QUICK_FIX_GUIDE.md` - This file

---

**Need Help?**

Share console logs atau screenshots jika masih ada masalah!

**Last Updated:** December 16, 2025
