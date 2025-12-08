# Cara Membuat Favicon.ico dari Logo.png

Favicon sudah dikonfigurasi untuk menggunakan Logo.png. Untuk kompatibilitas maksimal, Anda bisa membuat file favicon.ico dari Logo.png.

## Opsi 1: Menggunakan Tool Online (Paling Mudah)

1. Buka https://favicon.io/favicon-converter/
2. Upload file `public/Logo.png`
3. Download file favicon.ico yang dihasilkan
4. Simpan sebagai `public/favicon.ico`

## Opsi 2: Menggunakan ImageMagick (Jika Terinstall)

```bash
magick convert public/Logo.png -resize 32x32 public/favicon.ico
```

## Opsi 3: Menggunakan Online Converter Lain

- https://convertio.co/png-ico/
- https://www.icoconverter.com/

## Catatan

Next.js sudah dikonfigurasi untuk menggunakan Logo.png sebagai favicon melalui metadata. File favicon.ico opsional tapi direkomendasikan untuk kompatibilitas browser lama.

