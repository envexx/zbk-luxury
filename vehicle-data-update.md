# 🚗 Vehicle Data Update - ZBK Luxury Transport

## 📝 Data Ekstraksi dari Gambar

Berdasarkan informasi yang diekstrak dari gambar, berikut adalah vehicle data yang telah ditambahkan:

### 1. Wedding Affairs - Toyota Alphard
```json
{
  "id": "1",
  "name": "TOYOTA ALPHARD",
  "model": "ALPHARD",
  "category": "Wedding Affairs",
  "capacity": 7,
  "price": 300.00,
  "minimumHours": 5,
  "description": "Wedding Function - Minimum 5 hours"
}
```

**Spesifikasi:**
- **Harga**: $300.00/hour
- **Minimum Booking**: 5 jam
- **Kapasitas**: 7 penumpang
- **Fungsi**: Khusus untuk acara pernikahan
- **Features**: Wedding decoration ready, professional chauffeur

### 2. Alphard Premium - Toyota Alphard/Vellfire
```json
{
  "id": "2", 
  "name": "TOYOTA ALPHARD / VELLFIRE",
  "model": "ALPHARD/VELLFIRE",
  "category": "Alphard",
  "capacity": 4,
  "price": 140.00,
  "minimumHours": 3,
  "description": "Premium executive seating for 4 passengers"
}
```

**Spesifikasi:**
- **Harga**: $140.00/hour
- **Minimum Booking**: 3 jam
- **Kapasitas**: 4 penumpang (executive seating)
- **Fungsi**: Business, airport transfer, luxury transport
- **Features**: Captain chairs, entertainment system, mini bar

## 🔄 Perubahan yang Dilakukan

### 1. Database Schema Update
```prisma
model Vehicle {
  // ... existing fields
  price            Float             // Hourly rental price
  minimumHours     Int?              // Minimum booking hours
  // ... rest of fields
}
```

### 2. Vehicle Data File
**File**: `src/data/vehicleData.ts`
- ✅ Wedding Affairs: $300/hour, min 5 hours
- ✅ Alphard/Vellfire: $140/hour, min 3 hours  
- ✅ Hiace Combi: $360/hour (existing)

### 3. API Updates
**File**: `src/app/api/vehicles/route.ts`
- ✅ Updated fallback data menggunakan vehicle data baru
- ✅ Pricing yang akurat sesuai ekstraksi gambar

### 4. Component Updates
**Files Updated:**
- ✅ `OrderSummary.tsx` - Updated pricing calculation
- ✅ `VehicleSelection.tsx` - Updated API endpoint

## 💰 Pricing Summary

| Vehicle | Price/Hour | Minimum Hours | Total Minimum |
|---------|------------|---------------|---------------|
| **Wedding Affairs** | $300.00 | 5 hours | $1,500.00 |
| **Alphard/Vellfire** | $140.00 | 3 hours | $420.00 |
| **Hiace Combi** | $360.00 | 4 hours | $1,440.00 |

## 🖼️ Image Placeholders

**Current**: Menggunakan `/4.-alphard-colors-black.png` sebagai placeholder

**Next Steps**: 
- Upload gambar asli untuk setiap vehicle
- Update path di `vehicleData.ts`
- Gambar yang dibutuhkan:
  - Wedding Alphard (3 angles)
  - Alphard/Vellfire Premium (3 angles)
  - Hiace Combi (3 angles)

## 🧪 Testing

### 1. Test Vehicle API
```bash
curl http://localhost:3000/api/vehicles
```

### 2. Test Booking Flow
1. Buka homepage
2. Klik "Book Now" pada vehicle
3. Pilih vehicle → Check pricing
4. Complete booking → Verify email

### 3. Expected Results
- ✅ Wedding Affairs shows $300/hour
- ✅ Alphard/Vellfire shows $140/hour
- ✅ Minimum hours enforced in calculation
- ✅ Email notifications work

## 🚀 Deployment Notes

**Database Migration Required:**
```bash
npx prisma migrate dev --name add-vehicle-pricing
npx prisma db seed
```

**Environment Variables:**
- Database harus terhubung untuk migration
- Fallback data akan digunakan jika database offline

## 📋 TODO Next

- [ ] Upload gambar vehicle yang sebenarnya
- [ ] Update image paths di vehicleData.ts
- [ ] Test booking dengan pricing baru
- [ ] Deploy ke production dengan migration
- [ ] Update admin dashboard untuk manage pricing

## ✅ Status

**Completed:**
- ✅ Vehicle data extracted dan diimplementasikan
- ✅ Pricing structure updated
- ✅ API endpoints updated
- ✅ Frontend components updated
- ✅ Booking flow supports new pricing

**Ready for:**
- 🖼️ Image upload dan replacement
- 🚀 Production deployment
- 📧 Email testing dengan data baru
