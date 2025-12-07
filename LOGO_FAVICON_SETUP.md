# 🎨 Panduan Setup Logo & Favicon - ZBK Limo Tours

## 📋 Daftar File yang Perlu Diganti

### 1. Logo Utama
- **File**: `public/Logo.png`
- **Ukuran Recommended**: 120x40px atau lebih besar (rasio 3:1)
- **Format**: PNG dengan transparansi (background transparent)
- **Lokasi Penggunaan**:
  - Header website (desktop & mobile)
  - Footer website
  - Email templates (jika ditambahkan)

### 2. Favicon
- **File**: `src/app/favicon.ico`
- **Ukuran**: 16x16px, 32x32px, atau 48x48px
- **Format**: ICO atau PNG
- **Lokasi**: Tab browser, bookmark, dll

### 3. Favicon PNG (Optional tapi Recommended)
- **File**: `public/favicon-16x16.png` (16x16px)
- **File**: `public/favicon-32x32.png` (32x32px)
- **File**: `public/apple-touch-icon.png` (180x180px untuk iOS)

---

## 🔧 Cara Mengganti Logo

### Step 1: Siapkan Logo ZBK Limo Tours

1. **Logo Header/Footer**:
   - Format: PNG dengan transparansi
   - Ukuran: Minimal 240x80px (untuk retina display)
   - Rasio: 3:1 (lebar:tinggi)
   - Background: Transparent
   - Nama file: `Logo.png`

2. **Logo untuk Dark Background**:
   - Jika logo gelap, bisa tambahkan versi putih
   - Atau gunakan CSS filter invert untuk footer

### Step 2: Ganti File Logo

1. Copy logo ZBK Limo Tours ke folder `public/`
2. Ganti file `public/Logo.png` dengan logo baru
3. Pastikan nama file tetap `Logo.png` (case sensitive)

### Step 3: Verifikasi

1. Restart development server: `npm run dev`
2. Cek di browser:
   - Logo di header (atas kiri)
   - Logo di footer (bawah kiri)
   - Logo di mobile menu

---

## 🔧 Cara Mengganti Favicon

### Step 1: Siapkan Favicon

**Opsi 1: Dari Logo (Recommended)**
1. Ambil logo ZBK Limo Tours
2. Resize ke 32x32px atau 48x48px
3. Simpan sebagai PNG atau ICO

**Opsi 2: Buat Favicon Online**
- Gunakan tool: https://favicon.io/favicon-converter/
- Upload logo ZBK
- Download semua ukuran yang dihasilkan

### Step 2: Ganti File Favicon

1. **Favicon ICO**:
   - Ganti `src/app/favicon.ico` dengan favicon baru
   - Atau buat file baru di `public/favicon.ico`

2. **Favicon PNG (Optional)**:
   - `public/favicon-16x16.png` (16x16px)
   - `public/favicon-32x32.png` (32x32px)
   - `public/apple-touch-icon.png` (180x180px untuk iOS)

### Step 3: Verifikasi

1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart development server
3. Cek favicon di:
   - Tab browser
   - Bookmark
   - Mobile home screen (iOS)

---

## 📝 File yang Sudah Dikonfigurasi

### Metadata di `src/app/layout.tsx`
```typescript
icons: {
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
}
```

### Logo di Komponen
- ✅ `src/components/organisms/Header.tsx` - Logo header
- ✅ `src/components/organisms/Footer.tsx` - Logo footer
- ✅ Alt text sudah diupdate: "ZBK Limo Tours & Transportation Services"

---

## 🎨 Rekomendasi Desain Logo

### Untuk Header (Light Background):
- Logo dengan warna gelap atau berwarna
- Background transparent
- Ukuran minimal 240x80px untuk kualitas tinggi

### Untuk Footer (Dark Background):
- Logo putih atau terang
- Atau gunakan CSS `filter: invert` untuk logo gelap
- Background transparent

### Untuk Favicon:
- Icon sederhana dan jelas
- Bisa berupa inisial "ZBK" atau simbol
- Ukuran kecil tapi tetap readable
- Background solid atau transparent

---

## 🛠️ Tools yang Bisa Digunakan

### Online Favicon Generator:
- https://favicon.io/favicon-converter/
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

### Image Editor:
- Photoshop / GIMP
- Canva (untuk logo sederhana)
- Figma (untuk design logo)

### Image Optimization:
- TinyPNG (compress PNG)
- Squoosh (optimize images)

---

## ✅ Checklist Setup

- [ ] Logo ZBK Limo Tours sudah disiapkan (PNG, transparent)
- [ ] Logo di-copy ke `public/Logo.png`
- [ ] Favicon sudah dibuat (ICO atau PNG)
- [ ] Favicon di-copy ke `src/app/favicon.ico` atau `public/favicon.ico`
- [ ] Favicon PNG (16x16, 32x32) sudah dibuat (optional)
- [ ] Apple touch icon (180x180) sudah dibuat (optional)
- [ ] Test di browser - logo muncul dengan benar
- [ ] Test di mobile - logo responsive
- [ ] Test favicon di tab browser

---

## 📱 Testing

### Desktop:
1. Buka website di browser
2. Cek logo di header (atas kiri)
3. Scroll ke bawah, cek logo di footer
4. Cek favicon di tab browser

### Mobile:
1. Buka website di mobile browser
2. Cek logo di header mobile menu
3. Cek logo di footer
4. Test responsive - logo tidak pecah

### Favicon:
1. Clear browser cache
2. Reload halaman
3. Cek favicon di tab browser
4. Bookmark halaman - cek favicon di bookmark

---

## 🔍 Troubleshooting

### Logo tidak muncul:
- ✅ Cek nama file: harus `Logo.png` (case sensitive)
- ✅ Cek path: harus di folder `public/`
- ✅ Restart development server
- ✅ Clear browser cache

### Favicon tidak muncul:
- ✅ Cek file favicon.ico ada di `src/app/` atau `public/`
- ✅ Clear browser cache (sangat penting!)
- ✅ Restart development server
- ✅ Cek metadata di `src/app/layout.tsx`

### Logo terlihat blur:
- ✅ Gunakan logo dengan resolusi lebih tinggi (2x atau 3x)
- ✅ Pastikan format PNG dengan kualitas tinggi
- ✅ Cek width/height di komponen Image

---

## 📞 Catatan

- Logo dan favicon sudah dikonfigurasi untuk ZBK Limo Tours
- Alt text sudah diupdate ke "ZBK Limo Tours & Transportation Services"
- Metadata sudah diupdate dengan informasi ZBK Limo Tours
- Tinggal ganti file logo dan favicon dengan file ZBK yang sebenarnya

---

**Need Help?** 
Jika logo atau favicon tidak muncul setelah diganti:
1. Pastikan nama file benar (case sensitive)
2. Restart development server
3. Clear browser cache
4. Cek console browser untuk error

