# 📧 Konfigurasi Email - ZBK Limo Tours

## Penjelasan Konfigurasi Email

### Setup Sederhana - Menggunakan 1 Email Saja ✅

**Menggunakan `zbklimo@gmail.com` untuk SEMUA:**
- **SMTP_USER**: `zbklimo@gmail.com` (untuk mengirim email)
- **SMTP_PASS**: App Password dari `zbklimo@gmail.com`
- **From Email**: `zbklimo@gmail.com` (email pengirim)
- **Admin Email**: `zbklimo@gmail.com` (menerima notifikasi booking)

**Keuntungan:**
- ✅ Lebih sederhana - hanya perlu 1 email
- ✅ Email admin langsung masuk ke inbox yang sama
- ✅ Tidak perlu manage 2 email berbeda

**Email untuk MENERIMA (Recipient):**
- **Customer**: Email customer yang melakukan booking
- **Admin**: `zbklimo@gmail.com` (menerima notifikasi booking baru)

---

## ⚠️ PENTING: SMTP_PASS

**SMTP_PASS adalah App Password dari email yang digunakan untuk MENGIRIM email.**

### Konfigurasi Saat Ini:
```env
SMTP_USER = zbklimo@gmail.com
SMTP_PASS = App Password dari zbklimo@gmail.com
ADMIN_EMAIL = zbklimo@gmail.com
```

Jadi:
- ✅ SMTP_USER: `zbklimo@gmail.com`
- ✅ SMTP_PASS: App Password dari `zbklimo@gmail.com`
- ✅ Email dikirim dari: `zbklimo@gmail.com`
- ✅ Email admin ke: `zbklimo@gmail.com` (kirim ke diri sendiri)

**Cara mendapatkan App Password dari zbklimo@gmail.com:**
1. Login ke https://myaccount.google.com dengan akun `zbklimo@gmail.com`
2. Buka: https://myaccount.google.com/apppasswords
3. Pilih "Mail" dan "Other (Custom name)"
4. Masukkan nama: "ZBK Limo Tours Website"
5. Copy App Password yang dihasilkan
6. Paste ke `SMTP_PASS` di file `.env.local`

---

## 📋 Setup Environment Variables

### File `.env.local`:

**Setup Sederhana - 1 Email untuk Semua (Recommended)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=zbklimo@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=zbklimo@gmail.com
```

**Catatan:** 
- Email dikirim dari `zbklimo@gmail.com`
- Email admin juga ke `zbklimo@gmail.com` (kirim ke diri sendiri)
- Lebih sederhana dan mudah di-manage

---

## 📧 Alur Email Booking

### 1. Email ke Customer
- **From**: `zbklimo@gmail.com`
- **To**: Email customer yang booking
- **Subject**: "Booking Request Received - [ID] | ZBK Limo Tours"
- **Isi**: Konfirmasi bahwa booking sudah diterima, akan dihubungi oleh tim

### 2. Email ke Admin (zbklimo@gmail.com)
- **From**: `zbklimo@gmail.com`
- **To**: `zbklimo@gmail.com` (kirim ke diri sendiri)
- **Subject**: "🔔 New Booking Request - [ID] | Action Required"
- **Isi**: Notifikasi lengkap tentang booking baru yang perlu ditinjau

---

## 🔐 Cara Mendapatkan Gmail App Password

### Untuk zbklimo@gmail.com (Recommended):
1. Login ke: https://myaccount.google.com dengan akun `zbklimo@gmail.com`
2. Pastikan 2-Step Verification sudah aktif
3. Buka: https://myaccount.google.com/apppasswords
4. Pilih:
   - **App**: Mail
   - **Device**: Other (Custom name)
   - **Name**: "ZBK Website System"
5. Klik "Generate"
6. Copy password yang muncul
7. Paste ke `SMTP_PASS` di `.env.local`

---

## ✅ Checklist Setup

- [ ] Pastikan 2-Step Verification aktif di `zbklimo@gmail.com`
- [ ] Buat App Password dari `zbklimo@gmail.com`
- [ ] Update `.env.local` dengan:
  - [ ] SMTP_USER = zbklimo@gmail.com
  - [ ] SMTP_PASS = App Password dari zbklimo@gmail.com
  - [ ] ADMIN_EMAIL = zbklimo@gmail.com
- [ ] Test dengan: `npm run test:email`

---

## 🧪 Testing

Setelah setup, test email dengan:

```bash
npm run test:email
```

Atau buat booking baru melalui website, dan cek:
1. Email customer (di inbox customer)
2. Email admin (di inbox zbklimo@gmail.com)

---

## ❓ FAQ

**Q: Bisa pakai 1 email saja untuk semua?**
A: ✅ Ya! Lebih sederhana. Gunakan `zbklimo@gmail.com` untuk sender dan admin.

**Q: SMTP_PASS harus dari email mana?**
A: Dari email yang digunakan sebagai `SMTP_USER` (zbklimo@gmail.com)

**Q: Bisa pakai password biasa?**
A: ❌ Tidak! Harus pakai App Password, bukan password Gmail biasa

**Q: Email admin ke mana?**
A: Ke `zbklimo@gmail.com` (kirim ke diri sendiri - lebih sederhana)

**Q: Kalau kirim ke diri sendiri, emailnya masuk?**
A: ✅ Ya! Email akan masuk ke inbox zbklimo@gmail.com dengan normal

---

## 📝 Catatan

- **SMTP_USER** = `zbklimo@gmail.com` (email untuk mengirim)
- **SMTP_PASS** = App Password dari `zbklimo@gmail.com`
- **ADMIN_EMAIL** = `zbklimo@gmail.com` (kirim ke diri sendiri)
- Harus menggunakan **App Password**, bukan password Gmail biasa
- Email dikirim dari `zbklimo@gmail.com` ke customer dan ke `zbklimo@gmail.com` (admin)
- **Lebih sederhana** - hanya perlu manage 1 email saja!

