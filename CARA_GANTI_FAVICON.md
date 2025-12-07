# 🔧 Cara Mengganti Favicon - Hilangkan Logo Vercel

## ⚠️ Masalah
Favicon masih menampilkan logo Vercel karena file `src/app/favicon.ico` masih menggunakan favicon default dari Next.js.

## ✅ Solusi Cepat

### Step 1: Buat/Gunakan Favicon ZBK

**Opsi A: Buat dari Logo Online (Paling Mudah)**
1. Buka: https://favicon.io/favicon-converter/
2. Upload logo ZBK Limo Tours (`Logo.png` atau logo lainnya)
3. Download `favicon.ico` yang dihasilkan

**Opsi B: Buat Manual**
1. Buka logo ZBK di image editor
2. Resize ke 32x32px atau 48x48px
3. Simplify (bisa hanya inisial "ZBK")
4. Export sebagai PNG
5. Convert ke ICO: https://convertio.co/png-ico/

### Step 2: Ganti File Favicon

**Lokasi File**: `src/app/favicon.ico`

```bash
# Hapus favicon lama (jika perlu)
rm src/app/favicon.ico

# Copy favicon baru
cp /path/to/zbk-favicon.ico src/app/favicon.ico
```

**Atau manual:**
1. Copy file favicon ZBK
2. Paste ke folder `src/app/`
3. Rename menjadi `favicon.ico` (replace yang lama)

### Step 3: Clear Cache & Restart

**PENTING**: Browser cache favicon dengan sangat agresif!

1. **Stop development server** (Ctrl+C)
2. **Start lagi**:
   ```bash
   npm run dev
   ```
3. **Clear browser cache**:
   - Tekan `Ctrl + Shift + Delete` (Windows) atau `Cmd + Shift + Delete` (Mac)
   - Pilih "Cached images and files"
   - Clear
4. **Hard refresh browser**:
   - Tekan `Ctrl + F5` (Windows) atau `Cmd + Shift + R` (Mac)
   - Atau buka tab baru dalam mode **incognito/private**

### Step 4: Verifikasi

Cek favicon di:
- ✅ Tab browser (favicon di tab)
- ✅ Bookmark (favicon di bookmark)
- ✅ Mobile home screen (jika ada)

---

## 🎨 Rekomendasi Desain Favicon

Untuk favicon yang baik:
- ✅ **Sederhana** - mudah dikenali di ukuran kecil (16x16px)
- ✅ **Kontras tinggi** - jelas di background putih/gelap
- ✅ **Bisa berupa**:
  - Inisial "ZBK" dalam font tebal
  - Simbol/icon dari logo ZBK
  - Versi simplified dari logo lengkap

**Ukuran Recommended**:
- 32x32px (standard)
- 48x48px (untuk kualitas lebih baik)

---

## 🔍 Troubleshooting

### Favicon masih logo Vercel?

1. ✅ **Pastikan file sudah diganti**:
   - Cek `src/app/favicon.ico` sudah file baru
   - Bukan file default Next.js

2. ✅ **Clear browser cache** (WAJIB!):
   - Browser cache favicon sangat agresif
   - Gunakan hard refresh: `Ctrl + F5`
   - Atau coba di mode incognito

3. ✅ **Restart development server**:
   ```bash
   # Stop (Ctrl+C)
   npm run dev
   ```

4. ✅ **Cek di mode incognito**:
   - Buka tab baru dalam mode incognito
   - Cek apakah favicon sudah berubah

### Favicon tidak muncul sama sekali?

1. ✅ Cek path file: harus `src/app/favicon.ico`
2. ✅ Cek format file: harus `.ico` (bisa juga `.png` tapi `.ico` lebih baik)
3. ✅ Cek ukuran file: tidak terlalu besar (max 100KB)
4. ✅ Cek console browser untuk error

---

## 📝 Quick Steps (TL;DR)

```bash
# 1. Buat favicon dari logo ZBK (gunakan favicon.io)

# 2. Ganti file
cp zbk-favicon.ico src/app/favicon.ico

# 3. Restart server
npm run dev

# 4. Clear browser cache & hard refresh (Ctrl+F5)
```

---

## ✅ Checklist

- [ ] Favicon ZBK sudah dibuat/disiapkan
- [ ] File `src/app/favicon.ico` sudah diganti dengan favicon ZBK
- [ ] Development server sudah di-restart
- [ ] Browser cache sudah di-clear
- [ ] Hard refresh sudah dilakukan (Ctrl+F5)
- [ ] Favicon sudah muncul dengan benar di tab browser

---

## 🛠️ Tools yang Bisa Digunakan

1. **Favicon Generator**:
   - https://favicon.io/favicon-converter/
   - https://realfavicongenerator.net/
   - https://www.favicon-generator.org/

2. **Image Converter**:
   - https://convertio.co/png-ico/
   - https://www.icoconverter.com/

3. **Image Editor**:
   - Photoshop / GIMP
   - Canva (untuk design sederhana)
   - Figma (untuk design)

---

**Catatan Penting**: 
- Browser cache favicon dengan sangat agresif
- **WAJIB** clear cache dan hard refresh setelah ganti favicon
- Jika masih tidak berubah, coba di mode incognito
- File harus di `src/app/favicon.ico` (bukan `public/favicon.ico`)
