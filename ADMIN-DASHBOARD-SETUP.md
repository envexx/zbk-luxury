# ZBK Admin Dashboard Setup Guide

## 🚀 Dashboard Terintegrasi ZBK

Dashboard admin telah terintegrasi langsung ke dalam project ZBK yang sudah ada. Tidak perlu project terpisah!

## 📁 Struktur yang Ditambahkan

```
zbk/
├── src/
│   ├── app/
│   │   ├── admin/                    # 🆕 Admin Dashboard
│   │   │   ├── layout.tsx           # Layout admin
│   │   │   ├── page.tsx             # Dashboard utama
│   │   │   ├── vehicles/            # Manajemen kendaraan
│   │   │   ├── bookings/            # Manajemen booking
│   │   │   └── ...
│   │   └── api/
│   │       ├── admin/               # 🆕 Admin API routes
│   │       │   ├── vehicles/
│   │       │   └── bookings/
│   │       └── booking/             # 🆕 Public booking API
│   ├── components/
│   │   └── admin/                   # 🆕 Admin components
│   │       ├── AdminSidebar.tsx
│   │       └── AdminHeader.tsx
│   └── lib/
│       ├── prisma.ts                # 🆕 Database client
│       └── email.ts                 # 🆕 Email service
├── prisma/
│   └── schema.prisma                # 🆕 Database schema
└── package.json                     # ✅ Updated dependencies
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

Dependencies yang ditambahkan:
- `@prisma/client` - Database ORM
- `prisma` - Database toolkit
- `nodemailer` - Email service
- `lucide-react` - Icons
- `next-auth` - Authentication
- `bcryptjs` - Password hashing
- `zod` - Validation
- `react-hook-form` - Form handling
- `recharts` - Charts

### 2. Setup Environment Variables

Buat file `.env.local` dengan konfigurasi berikut:

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
ADMIN_EMAIL="admin@zbk.com"

# Admin Settings
ADMIN_DEFAULT_EMAIL="admin@zbk.com"
ADMIN_DEFAULT_PASSWORD="admin123"
```

### 3. Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio
npm run db:studio
```

### 4. Seed Initial Data (Optional)

Buat file `prisma/seed.ts` untuk data awal:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.user.upsert({
    where: { email: 'admin@zbk.com' },
    update: {},
    create: {
      email: 'admin@zbk.com',
      name: 'Admin ZBK',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  // Create sample vehicles
  await prisma.vehicle.createMany({
    data: [
      {
        name: 'Toyota Alphard Executive',
        model: 'Alphard',
        year: 2025,
        category: 'ALPHARD_PREMIUM',
        plateNumber: 'B 1234 ZBK',
        capacity: 7,
        color: 'Pearl White',
        location: 'Jakarta Pusat',
        purchaseDate: new Date('2024-01-15'),
        purchasePrice: 375000,
        features: ['GPS Navigation', 'Leather Seats', 'Sunroof'],
        images: []
      }
      // Add more vehicles...
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Jalankan seed:
```bash
npx tsx prisma/seed.ts
```

### 5. Run Development Server

```bash
npm run dev
```

## 🎯 Akses Dashboard

- **Website ZBK**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/admin`

## 📧 Email Configuration

### Gmail Setup:
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password sebagai `SMTP_PASS`

### Custom SMTP:
```env
SMTP_HOST="your-smtp-server.com"
SMTP_PORT="587"
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-password"
```

## 🔧 Features Dashboard

### ✅ Yang Sudah Dibuat:

#### 1. **Dashboard Overview** (`/admin`)
- Statistics cards (vehicles, bookings, revenue)
- Recent bookings
- Quick actions
- System status

#### 2. **Vehicle Management** (`/admin/vehicles`)
- List semua kendaraan
- Filter by status, category
- Search functionality
- CRUD operations
- Performance tracking

#### 3. **Booking Management** (`/admin/bookings`)
- List semua booking
- Update status dengan email notification
- Filter dan search
- Customer contact info

#### 4. **API Routes**
- `GET/POST /api/admin/vehicles` - Vehicle CRUD
- `GET/POST /api/admin/bookings` - Booking management
- `PATCH /api/admin/bookings/[id]` - Update booking status
- `POST /api/booking` - Public booking dari website

#### 5. **Email System**
- Booking confirmation untuk customer
- Status update notifications
- Admin notifications untuk booking baru
- Template email yang responsive

### 🚧 Yang Perlu Ditambahkan:

#### 1. **Authentication**
```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// Implementation...
```

#### 2. **Maintenance Management** (`/admin/maintenance`)
- Schedule maintenance
- Track costs
- Service history

#### 3. **Blog Management** (`/admin/blog`)
- Create/edit blog posts
- Manage categories
- SEO settings

#### 4. **Messages** (`/admin/messages`)
- Contact form submissions
- Customer inquiries

#### 5. **Analytics** (`/admin/analytics`)
- Revenue charts
- Booking trends
- Vehicle performance

#### 6. **Settings** (`/admin/settings`)
- Site configuration
- Email templates
- User management

## 🔗 Integration dengan Website

### Booking Form di Website:
```typescript
// src/components/BookingForm.tsx
const handleSubmit = async (data) => {
  const response = await fetch('/api/booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (response.ok) {
    // Show success message
    // Redirect to confirmation page
  }
}
```

### Real-time Data:
- Dashboard menggunakan data dari database yang sama
- Website dan admin sinkron otomatis
- Email notifications untuk semua perubahan

## 🚨 Troubleshooting

### 1. Prisma Errors:
```bash
# Reset database
npx prisma db push --force-reset

# Regenerate client
npx prisma generate
```

### 2. Email Errors:
- Check SMTP credentials
- Verify firewall settings
- Test with Gmail first

### 3. Build Errors:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📱 Mobile Responsive

Dashboard sudah responsive untuk:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🎨 Customization

### Colors (Tailwind):
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'zbk-gold': '#D4AF37',
        'zbk-dark': '#1a1a1a'
      }
    }
  }
}
```

### Branding:
- Logo di `public/logo.png`
- Favicon di `public/favicon.ico`
- Email templates di `src/lib/email.ts`

## 🔐 Security

- Password hashing dengan bcryptjs
- Environment variables untuk sensitive data
- API route protection
- Input validation dengan Zod
- SQL injection protection dengan Prisma

## 📊 Database Schema

Lihat `prisma/schema.prisma` untuk:
- User management
- Vehicle data
- Booking system
- Maintenance records
- Blog posts
- Contact messages
- Settings

## 🎉 Ready to Use!

Dashboard siap digunakan dengan:
1. ✅ Vehicle management
2. ✅ Booking system dengan email
3. ✅ Responsive design
4. ✅ Database integration
5. ✅ API endpoints
6. ✅ Email notifications

Tinggal install dependencies dan setup environment variables!
