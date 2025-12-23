# Panduan Deployment di Coolify

## 📋 Daftar Isi
1. [Setup Database PostgreSQL](#1-setup-database-postgresql)
2. [Konfigurasi Environment Variables](#2-konfigurasi-environment-variables)
3. [Build & Deploy Configuration](#3-build--deploy-configuration)
4. [Menjalankan Migrations](#4-menjalankan-migrations)
5. [Menjalankan Seeders](#5-menjalankan-seeders)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Setup Database PostgreSQL

### Di Coolify Dashboard:

1. **Buat Database Service:**
   - Masuk ke Coolify Dashboard
   - Klik **"New Resource"** → **"Database"** → **"PostgreSQL"**
   - Isi nama database (contoh: `zbk-db`)
   - Pilih versi PostgreSQL (disarankan: `15` atau `16`)
   - Klik **"Deploy"**

2. **Catat Connection String:**
   - Setelah database dibuat, catat connection string yang diberikan
   - Format biasanya: `postgresql://user:password@host:port/database?sslmode=require`

---

## 2. Konfigurasi Environment Variables

### Di Application Settings (Coolify):

Masuk ke aplikasi Next.js Anda di Coolify, lalu tambahkan environment variables berikut:

#### **Database:**
```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

#### **JWT & Auth:**
```env
JWT_SECRET=your-super-secret-jwt-key-here-min-32-chars
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-secret-here
```

#### **Email (SMTP):**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@your-domain.com
```

#### **Stripe (jika digunakan):**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### **Node Environment:**
```env
NODE_ENV=production
```

---

## 3. Build & Deploy Configuration

### Di Coolify Application Settings:

#### **Build Command:**
```bash
npm install && npx prisma generate && npm run build
```

Atau jika menggunakan yarn:
```bash
yarn install && npx prisma generate && yarn build
```

#### **Start Command:**
```bash
npm start
```

Atau:
```bash
next start
```

#### **Port:**
```
3000
```

#### **Health Check Path (Optional):**
```
/api/health
```

---

## 4. Menjalankan Migrations

### Opsi 1: Post-Deploy Command (Recommended)

Di Coolify, tambahkan **Post-Deploy Command**:

```bash
npx prisma migrate deploy
```

Ini akan otomatis menjalankan migrations setelah deployment selesai.

### Opsi 2: Manual via Coolify Terminal

1. Masuk ke aplikasi di Coolify
2. Klik **"Terminal"** atau **"Execute Command"**
3. Jalankan:
   ```bash
   npx prisma migrate deploy
   ```

### Opsi 3: Via Build Command (Not Recommended)

Bisa juga ditambahkan di build command, tapi tidak disarankan karena akan run setiap build:
```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```

---

## 5. Menjalankan Seeders

### Opsi 1: Post-Deploy Command (Sekali Saja)

**⚠️ PERHATIAN:** Seeder hanya dijalankan sekali saat setup awal. Jangan tambahkan di post-deploy command permanen karena akan duplikasi data.

**Untuk setup awal:**
1. Setelah migration selesai, masuk ke **Terminal** di Coolify
2. Jalankan seeder:
   ```bash
   npm run db:seed
   ```

Atau secara manual:
```bash
npx tsx prisma/seed-complete.ts
```

### Opsi 2: Via Coolify Terminal (Recommended)

1. Masuk ke aplikasi di Coolify Dashboard
2. Klik **"Terminal"** atau **"Execute Command"**
3. Jalankan seeder:
   ```bash
   npm run db:seed
   ```

### Opsi 3: Setup Script Otomatis

Buat file `scripts/setup-production.sh`:
```bash
#!/bin/bash
echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database..."
npm run db:seed

echo "✅ Setup complete!"
```

Lalu jalankan sekali via terminal:
```bash
chmod +x scripts/setup-production.sh
./scripts/setup-production.sh
```

---

## 6. Troubleshooting

### Error: "Prisma Client not generated"

**Solusi:**
Pastikan build command include `npx prisma generate`:
```bash
npm install && npx prisma generate && npm run build
```

### Error: "Database connection failed"

**Solusi:**
1. Pastikan `DATABASE_URL` sudah benar di environment variables
2. Pastikan database service sudah running di Coolify
3. Cek apakah database accessible dari aplikasi (network settings)

### Error: "Migration failed"

**Solusi:**
1. Pastikan database sudah dibuat dan accessible
2. Cek apakah ada migration yang conflict:
   ```bash
   npx prisma migrate status
   ```
3. Jika perlu reset (HATI-HATI, akan hapus semua data):
   ```bash
   npx prisma migrate reset
   ```

### Error: "Seeder failed"

**Solusi:**
1. Pastikan migrations sudah dijalankan terlebih dahulu
2. Cek apakah data sudah ada (seeder akan error jika data duplikat):
   ```bash
   npx prisma studio
   ```
3. Jika perlu reset database:
   ```bash
   npx prisma migrate reset
   npm run db:seed
   ```

### Error: "Module not found: tsx"

**Solusi:**
Pastikan `tsx` ada di dependencies (bukan hanya devDependencies) atau install global:
```bash
npm install -g tsx
```

Atau gunakan node dengan loader:
```bash
node --loader tsx prisma/seed-complete.ts
```

---

## 📝 Checklist Deployment

- [ ] Database PostgreSQL sudah dibuat di Coolify
- [ ] `DATABASE_URL` sudah di-set di environment variables
- [ ] Semua environment variables sudah di-set (JWT, SMTP, Stripe, dll)
- [ ] Build command sudah include `npx prisma generate`
- [ ] Migrations sudah dijalankan (`npx prisma migrate deploy`)
- [ ] Seeder sudah dijalankan sekali (`npm run db:seed`)
- [ ] Aplikasi sudah running dan bisa diakses
- [ ] Health check endpoint berfungsi (jika ada)

---

## 🔄 Workflow Deployment Lengkap

1. **Setup Database:**
   ```bash
   # Di Coolify: Buat PostgreSQL database
   ```

2. **Setup Environment Variables:**
   ```bash
   # Di Coolify: Tambahkan semua env vars
   ```

3. **Deploy Application:**
   ```bash
   # Coolify akan otomatis build dan deploy
   ```

4. **Run Migrations (Post-Deploy):**
   ```bash
   # Via Terminal di Coolify:
   npx prisma migrate deploy
   ```

5. **Run Seeder (Sekali Saja):**
   ```bash
   # Via Terminal di Coolify:
   npm run db:seed
   ```

6. **Verify:**
   - Cek aplikasi bisa diakses
   - Cek database via Prisma Studio atau admin panel
   - Test login dan fitur utama

---

## 💡 Tips

1. **Gunakan Post-Deploy Command untuk Migrations:**
   - Otomatis run setelah setiap deployment
   - Memastikan schema selalu up-to-date

2. **Seeder Hanya Sekali:**
   - Jangan tambahkan seeder di post-deploy command
   - Jalankan manual via terminal saat setup awal

3. **Backup Database:**
   - Coolify biasanya punya fitur backup otomatis
   - Atau setup manual backup via cron job

4. **Monitor Logs:**
   - Selalu cek logs di Coolify untuk error
   - Prisma akan log semua query dan error

5. **Development vs Production:**
   - Pastikan `NODE_ENV=production` di production
   - Gunakan production database (bukan local)

---

## 📚 Referensi

- [Coolify Documentation](https://coolify.io/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

