# ZBK Seeder (Admin + Vehicles)

Seeder untuk menambahkan admin user dan 3 vehicle utama ZBK ke database dengan harga terbaru.

## Admin User

**Email**: zbklimo@gmail.com  
**Password**: Zbkpassword2025  
**Role**: ADMIN

## Vehicles

### 1. Toyota Alphard Executive Lounge
- **Capacity**: 6 passengers, 4 luggage
- **Pricing**:
  - Airport Transfer: $80
  - 6 Hours Booking: $360
  - 12 Hours Booking: $720
- **Services**: Trip/Airport Transfer, Rent
- **Category**: ALPHARD_PREMIUM

### 2. Toyota Noah Si GR Sport
- **Capacity**: 6 passengers, 4 luggage
- **Pricing**:
  - Airport Transfer: $75
  - 6 Hours Booking: $360
  - 12 Hours Booking: $660
- **Services**: Trip/Airport Transfer, Rent
- **Category**: COMBI_TRANSPORT

### 3. Toyota Combi (Hiace Premium)
- **Capacity**: 9 passengers, 8 luggage
- **Pricing**:
  - Airport Transfer: $90
  - 6 Hours Booking: $390
  - 12 Hours Booking: $720
- **Services**: Trip/Airport Transfer, Rent
- **Category**: COMBI_TRANSPORT

## Cara Menggunakan

### 1. Install Dependencies (jika belum)
```bash
npm install bcryptjs
```

### 2. Generate Prisma Client (jika belum)
```bash
npx prisma generate
```

### 3. Jalankan Seeder
```bash
node scripts/seed-zbk-vehicles.js
```

Seeder akan otomatis membuat:
- ✅ Admin user (zbklimo@gmail.com)
- ✅ 3 Vehicles dengan harga ZBK

### 4. Verifikasi
- Login ke admin panel dengan kredensial di atas
- Cek vehicles di database atau admin panel

## Catatan

**Admin User:**
- Seeder akan mengecek apakah admin sudah ada
- Jika sudah ada, akan **update** password
- Jika belum ada, akan **create** admin baru
- Password di-hash menggunakan bcrypt

**Vehicles:**
- Seeder akan otomatis mengecek apakah vehicles sudah ada
- Jika sudah ada, akan **update** harga dan capacity
- Jika belum ada, akan **create** vehicle baru
- Gambar vehicle menggunakan file yang ada di folder `public/`
- Plate numbers: B 1234 ZBK, B 5678 ZBK, B 9012 ZBK

## Field yang Di-seed

✅ name, model, year, category, status, location, plateNumber
✅ capacity, luggage (field baru)
✅ color, mileage
✅ priceAirportTransfer, price6Hours, price12Hours (field baru)
✅ services (array: TRIP, RENT)
✅ price (legacy hourly rate sebagai fallback)
✅ minimumHours
✅ features (array)
✅ images (array)
✅ description
✅ purchaseDate, purchasePrice
✅ lastMaintenance, nextMaintenance

## Troubleshooting

### Error: Table 'vehicles' doesn't exist
Jalankan migration terlebih dahulu:
```bash
npx prisma migrate dev
```

### Error: Column 'priceAirportTransfer' doesn't exist
Generate Prisma client dan jalankan migration:
```bash
npx prisma generate
npx prisma migrate dev
```

### Error: EPERM
Tutup development server dan coba lagi.

