# Cara Membuat Favicon dari Logo ZBK

Logo ZBK Anda ada di:
- `public/logo-website.png`
- `public/Logo.png`

## Langkah-langkah

### Opsi 1: Menggunakan Online Tool (Tercepat)

1. Buka https://favicon.io/favicon-converter/ atau https://realfavicongenerator.net/

2. Upload file `public/logo-website.png` atau `public/Logo.png`

3. Generate dan download semua ukuran favicon:
   - favicon.ico
   - favicon-16x16.png
   - favicon-32x32.png
   - apple-touch-icon.png (180x180)
   - android-chrome-192x192.png
   - android-chrome-512x512.png

4. Replace file-file di folder `public/` dengan file baru yang didownload

### Opsi 2: Menggunakan ImageMagick (Command Line)

```bash
# Install ImageMagick terlebih dahulu
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Buat favicon dari logo
magick public/logo-website.png -resize 16x16 public/favicon-16x16.png
magick public/logo-website.png -resize 32x32 public/favicon-32x32.png
magick public/logo-website.png -resize 180x180 public/apple-touch-icon.png
magick public/logo-website.png -resize 192x192 public/android-chrome-192x192.png
magick public/logo-website.png -resize 512x512 public/android-chrome-512x512.png
magick public/logo-website.png -resize 32x32 public/favicon.ico
```

### Opsi 3: Manual dengan Photoshop/GIMP

1. Buka `logo-website.png` di Photoshop/GIMP
2. Export dengan ukuran:
   - 16x16px → favicon-16x16.png
   - 32x32px → favicon-32x32.png
   - 180x180px → apple-touch-icon.png
   - 192x192px → android-chrome-192x192.png
   - 512x512px → android-chrome-512x512.png
   - 32x32px → favicon.ico

## Setelah Favicon Dibuat

1. **Clear Cache Browser**
   ```
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Cmd+Option+E
   ```

2. **Verify di Google Search Console**
   - Buka https://search.google.com/search-console
   - Submit URL untuk re-indexing
   - Tunggu 24-48 jam untuk Google update

3. **Test Favicon**
   - Buka: https://www.zbktransportservices.com/favicon.ico
   - Harus menampilkan logo ZBK

## Tips untuk Google Search

Logo yang muncul di Google Search memerlukan:
- ✅ Favicon berkualitas baik (minimal 48x48px)
- ✅ Logo di Open Graph (1200x630px)
- ✅ Structured Data (schema.org)
- ✅ Website terverifikasi di Google Search Console
- ⏰ Waktu: 1-2 minggu untuk Google update hasil pencarian

## File Yang Perlu Diganti

Replace semua file ini dengan favicon baru dari logo ZBK:
```
public/
├── favicon.ico ← Generate dari logo ZBK
├── favicon-16x16.png ← Generate dari logo ZBK
├── favicon-32x32.png ← Generate dari logo ZBK
├── apple-touch-icon.png ← Generate dari logo ZBK
├── android-chrome-192x192.png ← Generate dari logo ZBK
└── android-chrome-512x512.png ← Generate dari logo ZBK
```

Logo yang bagus untuk Open Graph (hasil share di sosmed):
```
public/Logo.png atau public/logo-website.png
```

