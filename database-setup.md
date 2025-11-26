# 🗄️ Database Setup - ZBK Luxury Transport

## 📝 Update Database Connection

**Database Baru:**
```
postgres://postgres:1mrDIlZV8Fq9CkQqacAJ0Dd3GQIkS5KJnlG77Qo2qIWODqM5hK5cm1g2oA6BuCbW@fwoowcssgoocckcckcc444so:5432/postgres
```

## 🔧 Steps to Update

### 1. Update .env.local
Buka file `.env.local` dan update DATABASE_URL:

```env
# Database Configuration
DATABASE_URL="postgres://postgres:1mrDIlZV8Fq9CkQqacAJ0Dd3GQIkS5KJnlG77Qo2qIWODqM5hK5cm1g2oA6BuCbW@fwoowcssgoocckcckcc444so:5432/postgres"

# SMTP Configuration (existing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@zbkluxury.com

# JWT Secret (existing)
JWT_SECRET=zbk-luxury-secret-key-2024

# Next.js URL (existing)
NEXTAUTH_URL=http://localhost:3000
```

### 2. Test Database Connection
```bash
# Test connection
npm run test-db

# Or manual test
curl http://localhost:3000/api/test-db-connection
```

### 3. Run Migrations
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name initial-setup

# Check database status
npx prisma db push
```

### 4. Seed Database
```bash
# Seed with vehicle data
npx prisma db seed

# Or run custom seed
npm run seed-vehicles
```

## 🧪 Testing Commands

### Test Database Connection
```bash
# Test API endpoint
curl http://localhost:3000/api/test-db-connection

# Expected response:
{
  "success": true,
  "message": "Database connected successfully",
  "timestamp": "2024-11-26T06:39:00.000Z"
}
```

### Test Vehicle API
```bash
# Get vehicles from database
curl http://localhost:3000/api/vehicles

# Expected: Real data from database (not fallback)
```

### Test Booking API
```bash
# Test booking creation
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test Customer",
    "customerEmail": "test@example.com",
    "customerPhone": "+62812345678",
    "vehicleId": "1",
    "service": "RENTAL",
    "startDate": "2024-12-01",
    "endDate": "2024-12-01",
    "startTime": "09:00",
    "duration": 5,
    "pickupLocation": "Jakarta Airport",
    "dropoffLocation": "Hotel Indonesia"
  }'
```

## 🔄 Migration Steps

### 1. Initial Migration
```bash
npx prisma migrate dev --name initial-setup
```

### 2. Add Vehicle Pricing (if needed)
```bash
npx prisma migrate dev --name add-vehicle-pricing
```

### 3. Verify Schema
```bash
npx prisma db pull
npx prisma generate
```

## 📊 Expected Tables

After migration, database should have:
- ✅ `users` - Admin users
- ✅ `vehicles` - Vehicle fleet with pricing
- ✅ `bookings` - Customer bookings
- ✅ `blog_posts` - Blog articles
- ✅ `contact_messages` - Contact form submissions
- ✅ `maintenance_records` - Vehicle maintenance
- ✅ `services` - Service offerings
- ✅ `settings` - App settings

## 🚗 Vehicle Data to Seed

```sql
-- Wedding Affairs Toyota Alphard
INSERT INTO vehicles (name, model, category, price, minimumHours, capacity, ...)

-- Alphard/Vellfire Premium  
INSERT INTO vehicles (name, model, category, price, minimumHours, capacity, ...)

-- Hiace Combi
INSERT INTO vehicles (name, model, category, price, minimumHours, capacity, ...)
```

## ⚠️ Troubleshooting

### Connection Error
```
Error: P1001 - Can't reach database server
```
**Solution**: Check DATABASE_URL format and network access

### Migration Error
```
Error: P3009 - migrate found failed migration
```
**Solution**: Reset database and re-run migrations
```bash
npx prisma migrate reset
npx prisma migrate dev
```

### Prisma Client Error
```
PrismaClientInitializationError
```
**Solution**: Regenerate client
```bash
npx prisma generate
```

## ✅ Success Indicators

- ✅ Database connection successful
- ✅ All tables created
- ✅ Vehicle data seeded with correct pricing
- ✅ Booking API works with real database
- ✅ Email notifications functional
- ✅ Admin dashboard shows real data

## 🚀 Next Steps After Setup

1. **Test Booking Flow** - End-to-end with real database
2. **Upload Vehicle Images** - Replace placeholder images
3. **Configure SMTP** - For email notifications
4. **Deploy to Production** - With new database
5. **Setup Admin User** - Create first admin account
