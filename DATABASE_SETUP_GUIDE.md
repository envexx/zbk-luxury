# 🗄️ ZBK Luxury Transport - Database Setup Guide

Panduan lengkap untuk setup database PostgreSQL connection yang baru.

## 🚀 Quick Setup (Recommended)

### 1. Update Environment Variables
Copy connection string ke file `.env.local`:

```bash
# Buka file .env.local dan update DATABASE_URL
DATABASE_URL="postgres://4512f0696eb059aedde102543b5bea0b49754b96861dc136f0f48fab8141ed7d:sk_FFgsWYYn3L_IkLhkJaDj2@db.prisma.io:5432/postgres?sslmode=require&pool=true"

# Tambahkan juga (jika belum ada)
NEXT_PUBLIC_DASHBOARD_API_URL=http://localhost:3000
```

### 2. Run Database Setup Script
```bash
npm run db:setup
```

### 3. Test Connection
```bash
npm run test:db
```

## 📋 Manual Setup Steps

### Step 1: Environment Configuration
1. Buka file `.env.local` di root project
2. Update atau tambahkan `DATABASE_URL` dengan connection string baru
3. Pastikan format sesuai dengan yang diberikan

### Step 2: Generate Prisma Client
```bash
npm run db:generate
```

### Step 3: Push Database Schema
```bash
npm run db:push
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Test Connection
Buka: `database-connection-test.html` di browser

## 🧪 Testing Tools

### 1. Database Connection Test Page
```
File: database-connection-test.html
URL: file:///path/to/zbk/database-connection-test.html
```

**Features:**
- ✅ Real-time connection status
- 📊 Database information display
- 📈 Quick statistics
- ⚙️ Environment check
- 🎯 Comprehensive test suite

### 2. API Endpoints untuk Testing
```bash
# Test connection
GET http://localhost:3000/api/test-connection

# Force reconnect
POST http://localhost:3000/api/test-connection

# Get database stats
GET http://localhost:3000/api/test-data

# Create test data
POST http://localhost:3000/api/test-data
```

### 3. NPM Scripts
```bash
# Database operations
npm run db:generate      # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:setup        # Complete setup (generate + push + test)
npm run db:reset        # Reset database (force)
npm run db:studio       # Open Prisma Studio

# Testing
npm run test:db         # Quick connection test
npm run test:create-data # Create sample data
```

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. "Database connection failed"
**Symptoms:**
- API returns connection errors
- Admin dashboard shows no data
- Test connection fails

**Solutions:**
```bash
# Check environment variables
cat .env.local

# Regenerate Prisma client
npm run db:generate

# Push schema
npm run db:push

# Test connection
npm run test:db
```

#### 2. "Prisma Client not generated"
**Symptoms:**
- Import errors for @prisma/client
- Build fails

**Solutions:**
```bash
# Generate client
npm run db:generate

# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run db:generate
```

#### 3. "SSL connection required"
**Symptoms:**
- Connection timeout
- SSL errors

**Solutions:**
- Ensure `?sslmode=require` in connection string
- Check firewall settings
- Verify database server supports SSL

#### 4. "Authentication failed"
**Symptoms:**
- Login errors
- Permission denied

**Solutions:**
- Verify username and password in connection string
- Check database user permissions
- Ensure database exists

### Environment Variables Check
```bash
# Required variables in .env.local:
DATABASE_URL="postgres://..."
NEXT_PUBLIC_DASHBOARD_API_URL=http://localhost:3000

# Optional variables:
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 📊 Database Schema Overview

### Tables Created:
- `users` - Admin users
- `vehicles` - Vehicle fleet
- `bookings` - Customer bookings
- `blog_posts` - Blog content
- `maintenance_records` - Vehicle maintenance
- `services` - Service offerings
- `contact_messages` - Contact form submissions
- `settings` - Application settings

### Key Features:
- ✅ **Foreign Key Relationships**
- ✅ **Cascade Deletes**
- ✅ **Unique Constraints**
- ✅ **Enum Types**
- ✅ **JSON Arrays**
- ✅ **Timestamps**

## 🎯 Validation Checklist

### Pre-Setup
- [ ] `.env.local` file exists
- [ ] DATABASE_URL is configured
- [ ] Node.js and npm are installed
- [ ] Internet connection available

### Post-Setup
- [ ] Prisma client generated successfully
- [ ] Database schema pushed
- [ ] Connection test passes
- [ ] Admin dashboard loads data
- [ ] API endpoints respond correctly

### Data Validation
- [ ] Can create vehicles
- [ ] Can create bookings
- [ ] Can create blog posts
- [ ] Foreign key relationships work
- [ ] Data persists after server restart

## 🚀 Next Steps After Setup

### 1. Create Initial Data
```bash
# Create test data
npm run test:create-data

# Or use the testing suite
open test-data-insertion.html
```

### 2. Access Admin Dashboard
```
http://localhost:3000/admin/vehicles
http://localhost:3000/admin/bookings
http://localhost:3000/admin/blog
```

### 3. Verify Data Flow
1. Create a vehicle via admin dashboard
2. Create a booking using that vehicle
3. Create a blog post
4. Verify all data appears correctly

### 4. Production Deployment
- Update `DATABASE_URL` for production
- Run `npm run build` to test build
- Deploy to Vercel/Netlify
- Run database migrations in production

## 📈 Performance Optimization

### Connection Pooling
Database connection string sudah include `?pool=true` untuk connection pooling.

### Query Optimization
- Use `select` untuk limit fields
- Use `include` untuk relations
- Add database indexes jika diperlukan

### Caching Strategy
- Implement Redis untuk session caching
- Use Next.js ISR untuk static content
- Cache API responses

## 🔒 Security Considerations

### Database Security
- ✅ SSL connection required
- ✅ Environment variables protected
- ✅ No hardcoded credentials
- ✅ Parameterized queries (Prisma)

### API Security
- Add authentication middleware
- Implement rate limiting
- Validate input data
- Sanitize user inputs

## 📚 Additional Resources

### Documentation
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

### Tools
- **Prisma Studio**: Visual database browser
- **pgAdmin**: PostgreSQL administration
- **Postman**: API testing

---

## ✅ Success Criteria

**Database Setup Complete When:**
- ✅ Connection test passes
- ✅ All tables created
- ✅ Admin dashboard shows real data
- ✅ CRUD operations work
- ✅ No dummy data visible
- ✅ Performance is acceptable

**Status**: 🎯 **READY FOR TESTING**
**Last Updated**: November 24, 2024
**Version**: 2.0.0
