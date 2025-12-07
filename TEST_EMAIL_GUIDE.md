# 📧 Panduan Test Email - ZBK Limo Tours

## Cara Mengirim Test Email

### Metode 1: Menggunakan Script (Recommended)

1. **Setup Environment Variables**
   
   Pastikan file `.env.local` sudah ada dan berisi:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=ompekp@gmail.com
   SMTP_PASS=your-app-password-here
   ```

2. **Dapatkan Gmail App Password**
   
   Untuk Gmail, Anda perlu menggunakan App Password, bukan password biasa:
   - Buka: https://myaccount.google.com/apppasswords
   - Login dengan akun ompekp@gmail.com
   - Pilih "Mail" dan "Other (Custom name)"
   - Masukkan nama: "ZBK Limo Tours"
   - Copy App Password yang dihasilkan
   - Paste ke `SMTP_PASS` di `.env.local`

3. **Jalankan Script**
   ```bash
   npm run test:email
   ```

   Atau langsung:
   ```bash
   node scripts/send-test-email.js
   ```

### Metode 2: Menggunakan API Endpoint

1. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

2. **Kirim Request ke API**
   
   Menggunakan curl:
   ```bash
   curl -X POST http://localhost:3000/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"to": "zbklimo@gmail.com", "type": "test"}'
   ```
   
   Atau menggunakan browser/Postman:
   - URL: `http://localhost:3000/api/test-email`
   - Method: POST
   - Body (JSON):
     ```json
     {
       "to": "zbklimo@gmail.com",
       "type": "test"
     }
     ```

3. **Atau Gunakan Test Form**
   
   Buka di browser:
   ```
   http://localhost:3000/api/test-email
   ```
   
   Form akan muncul untuk mengirim test email.

## Email Details

- **From:** ompekp@gmail.com
- **To:** zbklimo@gmail.com
- **Subject:** ZBK Limo Tours - Test Email Configuration
- **Format:** HTML dengan design profesional

## Troubleshooting

### Error: Authentication failed (EAUTH)

**Solusi:**
1. Pastikan menggunakan App Password, bukan password biasa
2. Cek apakah 2-Step Verification sudah aktif di Gmail
3. Pastikan `SMTP_USER` dan `SMTP_PASS` benar

### Error: Connection failed (ECONNECTION)

**Solusi:**
1. Cek koneksi internet
2. Pastikan `SMTP_HOST` dan `SMTP_PORT` benar
3. Cek firewall/antivirus yang mungkin memblokir koneksi

### Email tidak sampai

**Solusi:**
1. Cek folder Spam/Junk di zbklimo@gmail.com
2. Tunggu beberapa menit (terkadang ada delay)
3. Cek apakah email masuk ke inbox ompekp@gmail.com (jika ada auto-forward)

## Format Email

Email test menggunakan format HTML profesional dengan:
- ✅ Header dengan gradient biru dan logo emas
- ✅ Design responsive dan modern
- ✅ Informasi lengkap tentang ZBK Limo Tours
- ✅ Alamat: Jurong West Street 65, Singapore 640635
- ✅ Footer dengan informasi kontak

## Catatan Penting

1. **Gmail App Password wajib digunakan** untuk akun Gmail
2. Pastikan `.env.local` tidak di-commit ke git (sudah ada di .gitignore)
3. Email akan dikirim dari `ompekp@gmail.com` ke `zbklimo@gmail.com`
4. Format email sudah dioptimalkan untuk berbagai email client (Gmail, Outlook, dll)

## Next Steps

Setelah test email berhasil:
1. Email booking confirmation akan otomatis menggunakan format yang sama
2. Email notification ke admin juga akan menggunakan format profesional
3. Semua email dari sistem akan menggunakan template yang konsisten

---

**Need Help?** 
Jika ada masalah, pastikan:
- ✅ Environment variables sudah di-set dengan benar
- ✅ Gmail App Password sudah dibuat dan digunakan
- ✅ Development server berjalan (untuk metode API)

