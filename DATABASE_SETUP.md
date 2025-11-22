# Database Setup Guide

## Current Status: ❌ NOT CONNECTED

Aplikasi ZBK Dashboard belum terhubung ke database. Berikut langkah-langkah untuk setup database:

## 1. Database Configuration

### Option A: PostgreSQL (Recommended)
```env
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/zbk_luxury"
```

### Option B: Prisma Accelerate (Cloud)
```env
# .env.local
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

### Option C: Supabase (Free PostgreSQL)
```env
# .env.local
DATABASE_URL="postgresql://postgres:password@db.supabase.co:5432/postgres"
```

## 2. Setup Steps

### Step 1: Create .env.local file
```bash
# Copy and modify
cp .env.example .env.local
```

### Step 2: Install PostgreSQL (if using local)
- Download PostgreSQL from https://www.postgresql.org/download/
- Create database: `zbk_luxury`
- Update DATABASE_URL with your credentials

### Step 3: Generate Prisma Client
```bash
npx prisma generate
```

### Step 4: Run Database Migration
```bash
npx prisma db push
```

### Step 5: Seed Sample Data
```bash
# Visit: http://localhost:3000/api/test-db
# This will create sample vehicles, bookings, and blog posts
```

## 3. Current Schema

Database sudah dikonfigurasi dengan tables:
- ✅ users (Admin authentication)
- ✅ vehicles (Vehicle management)
- ✅ bookings (Booking management)
- ✅ blog_posts (Blog CMS)
- ✅ maintenance_records (Vehicle maintenance)
- ✅ services (Service offerings)
- ✅ contact_messages (Contact form)
- ✅ settings (App configuration)

## 4. API Endpoints Ready

### Admin CRUD APIs:
- `/api/vehicles` - Vehicle management
- `/api/bookings` - Booking management  
- `/api/blog` - Blog management
- `/api/settings` - Settings management

### Public APIs:
- `/api/public/vehicles` - Available vehicles
- `/api/public/booking` - Submit booking

### Test API:
- `/api/test-db` - Test connection & create sample data

## 5. Features Ready

### ✅ Vehicle Management
- Complete CRUD operations
- Image upload support
- Status management
- Maintenance tracking

### ✅ Booking Management  
- Customer booking from website
- Email notifications (SMTP)
- Status updates
- Admin management

### ✅ Blog Management
- Rich text editor
- Image upload
- SEO optimization
- Publish/draft system

### ✅ Settings
- SMTP configuration
- Email templates
- System settings

## Next Steps

1. **Setup Database**: Choose PostgreSQL, Supabase, or Prisma Accelerate
2. **Configure .env.local**: Add DATABASE_URL
3. **Run Migrations**: `npx prisma db push`
4. **Test Connection**: Visit `/api/test-db`
5. **Create Admin User**: Use Prisma Studio or API

## Troubleshooting

### Error: EPERM operation not permitted
- Run PowerShell as Administrator
- Or use: `npx prisma generate --force`

### Error: Database connection failed
- Check DATABASE_URL format
- Verify database server is running
- Check firewall/network settings

### Error: Table doesn't exist
- Run: `npx prisma db push`
- This creates tables from schema

## Production Deployment

For production, consider:
- **Supabase**: Free PostgreSQL with dashboard
- **PlanetScale**: Serverless MySQL
- **Railway**: PostgreSQL hosting
- **Vercel Postgres**: Integrated with Vercel

## Status Check

Current status: **Database NOT connected**
- ❌ No .env.local with DATABASE_URL
- ❌ Prisma client generation failed
- ❌ API endpoints return 500 errors
- ❌ No sample data

After setup:
- ✅ Database connected
- ✅ Sample data created
- ✅ All CRUD operations working
- ✅ Email notifications ready
