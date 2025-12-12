# 📚 Dokumentasi Proyek ZBK Transport Services

## 📋 Daftar Isi
1. [Ringkasan Proyek](#ringkasan-proyek)
2. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
3. [Fitur yang Sudah Tersedia](#fitur-yang-sudah-tersedia)
4. [Fitur yang Belum Tersedia](#fitur-yang-belum-tersedia)
5. [Prioritas Pengembangan](#prioritas-pengembangan)
6. [Struktur Database](#struktur-database)
7. [API Endpoints](#api-endpoints)
8. [Catatan Penting](#catatan-penting)

---

## 🎯 Ringkasan Proyek

**ZBK Transport Services** adalah platform booking kendaraan mewah (limousine) berbasis web yang menyediakan layanan rental kendaraan premium dengan sistem booking online, pembayaran terintegrasi, dan dashboard admin untuk manajemen.

**Status Proyek**: ✅ **Production Ready** (dengan beberapa fitur tambahan yang direncanakan)

---

## 🛠 Teknologi yang Digunakan

### Frontend
- **Next.js 16** - React Framework dengan App Router
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Recharts** - Data Visualization
- **React Hook Form** - Form Management
- **Zod** - Schema Validation

### Backend
- **Next.js API Routes** - Serverless API
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Nodemailer** - Email Service

### Payment & Services
- **Stripe** - Payment Gateway
- **Email Service** - Nodemailer dengan SMTP

### Development Tools
- **ESLint** - Code Linting
- **Prisma Studio** - Database Management
- **TypeScript** - Type Checking

---

## ✅ Fitur yang Sudah Tersedia

### 🌐 Website Public (Frontend)

#### 1. **Halaman Utama (Homepage)**
- ✅ Hero Section dengan CTA
- ✅ Fleet Preview Section
- ✅ Services Overview
- ✅ Testimonials Section
- ✅ SEO Optimization (Schema.org markup)
- ✅ Responsive Design

#### 2. **Halaman Fleet**
- ✅ Daftar semua kendaraan
- ✅ Filter berdasarkan kategori:
  - Wedding Affairs
  - Alphard Premium
  - Combi Transport
  - City Tour
- ✅ Detail kendaraan dengan gambar
- ✅ Informasi harga dan spesifikasi
- ✅ Booking langsung dari halaman fleet

#### 3. **Halaman Services**
- ✅ Daftar layanan yang tersedia:
  - Airport Transfer
  - City Tour
  - Wedding Service
  - Corporate Events
  - Hourly Rental
  - Concierge Service
- ✅ Detail setiap layanan
- ✅ Fitur-fitur layanan

#### 4. **Halaman Booking**
- ✅ Form booking multi-step:
  - Step 1: Pilih kendaraan & tanggal
  - Step 2: Informasi lokasi
  - Step 3: Ringkasan & informasi customer
- ✅ Validasi form real-time
- ✅ Kalkulasi harga otomatis
- ✅ Integrasi dengan Stripe Payment
- ✅ Halaman konfirmasi booking
- ✅ Halaman sukses/kembali pembayaran

#### 5. **Halaman Blog**
- ✅ Daftar artikel blog
- ✅ Detail artikel dengan slug
- ✅ SEO-friendly URLs
- ✅ Published/Unpublished status
- ✅ Tags dan kategori

#### 6. **Halaman About**
- ✅ Informasi tentang perusahaan
- ✅ Visi & Misi
- ✅ Tim

#### 7. **Halaman Contact**
- ✅ Form kontak
- ✅ Informasi kontak
- ✅ Peta lokasi (jika ada)

#### 8. **Authentication**
- ✅ Login/Register Modal
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ User Context Management

### 🔐 Admin Panel

#### 1. **Dashboard Admin**
- ✅ Overview statistics:
  - Total Vehicles
  - Total Bookings
  - Monthly Revenue
  - Completion Rate
- ✅ Real-time Statistics:
  - Active Bookings
  - Today's Revenue
  - Pending Approvals
- ✅ Analytics & Performance:
  - Monthly Trends (Chart)
  - Vehicle Status Distribution
  - Booking Status Overview
  - Popular Vehicles
  - Key Performance Indicators
- ✅ Time Range Filter (1 month, 3 months, 6 months, 1 year)
- ✅ Data dari database (bukan mock data)

#### 2. **Manajemen Bookings**
- ✅ Daftar semua bookings
- ✅ Tabel compact dengan informasi:
  - Customer Info
  - Vehicle
  - Service
  - Date & Time
  - Amount
  - Payment Status
  - Booking Status
- ✅ Filter berdasarkan status
- ✅ Search bookings
- ✅ Detail booking modal
- ✅ Update status booking
- ✅ Kirim email ke customer
- ✅ Statistics cards:
  - Total Bookings
  - Confirmed
  - Pending
  - This Month

#### 3. **Manajemen Vehicles**
- ✅ Daftar semua kendaraan
- ✅ CRUD operations:
  - Create Vehicle
  - Read/View Vehicle
  - Update Vehicle
  - Delete Vehicle
- ✅ Upload gambar kendaraan
- ✅ Filter berdasarkan:
  - Status (Available, In Use, Maintenance, Reserved)
  - Category
  - Search
- ✅ Informasi lengkap:
  - Name, Model, Year
  - Category, Status
  - Location, Plate Number
  - Capacity, Color
  - Price, Minimum Hours
  - Maintenance Info
  - Features, Images
  - Description

#### 4. **Manajemen Blog**
- ✅ Daftar artikel blog
- ✅ CRUD operations:
  - Create Blog Post
  - Edit Blog Post
  - Delete Blog Post
- ✅ Rich text editor
- ✅ Upload gambar
- ✅ Published/Unpublished status
- ✅ Tags management
- ✅ SEO fields (slug, excerpt)

#### 5. **Analytics & Reports**
- ✅ Analytics Dashboard
- ✅ Revenue tracking:
  - Total Revenue (dari PAID bookings)
  - Monthly Revenue
  - Revenue per vehicle
- ✅ Booking statistics:
  - Booking by status
  - Booking trends
  - Popular vehicles
- ✅ Performance metrics:
  - Average Booking Value
  - Completion Rate
  - Vehicle Utilization Rate
- ✅ Charts & Visualizations:
  - Line Chart (Monthly Trends)
  - Bar Chart (Booking Status)
  - Donut Chart (Vehicle Distribution)

#### 6. **Settings**
- ✅ General Settings
- ✅ Email Configuration
- ✅ System Settings

### 💳 Payment System

#### 1. **Stripe Integration**
- ✅ Create Checkout Session
- ✅ Payment Confirmation
- ✅ Webhook Handler
- ✅ Payment Receipt
- ✅ Deposit System (20% deposit)
- ✅ Full Payment Support

#### 2. **Payment Status**
- ✅ PENDING
- ✅ PAID
- ✅ FAILED
- ✅ REFUNDED

### 📧 Email System

#### 1. **Email Templates**
- ✅ Booking Confirmation (Customer)
- ✅ Admin Notification (New Booking)
- ✅ Payment Confirmation
- ✅ Booking Status Update

#### 2. **Email Features**
- ✅ SMTP Configuration
- ✅ HTML Email Templates
- ✅ Automated Emails

### 🗄 Database

#### 1. **Models**
- ✅ User (Admin/Manager)
- ✅ Vehicle
- ✅ Booking
- ✅ MaintenanceRecord
- ✅ Service
- ✅ BlogPost
- ✅ ContactMessage
- ✅ Settings

#### 2. **Relations**
- ✅ Vehicle ↔ Booking
- ✅ Vehicle ↔ MaintenanceRecord

### 🔌 API Endpoints

#### Public APIs
- ✅ `GET /api/public/vehicles` - Get vehicles
- ✅ `POST /api/public/booking` - Create booking
- ✅ `GET /api/vehicles` - Get all vehicles
- ✅ `GET /api/vehicles/[id]` - Get vehicle by ID
- ✅ `POST /api/booking` - Create booking
- ✅ `GET /api/bookings` - Get bookings
- ✅ `GET /api/blog` - Get blog posts
- ✅ `GET /api/blog/[id]` - Get blog post by ID

#### Admin APIs
- ✅ `GET /api/admin/bookings` - Get all bookings (admin)
- ✅ `POST /api/admin/bookings` - Create booking (admin)
- ✅ `GET /api/admin/bookings/[id]` - Get booking detail
- ✅ `PATCH /api/admin/bookings/[id]` - Update booking
- ✅ `POST /api/admin/bookings/[id]/email` - Send email
- ✅ `GET /api/admin/vehicles` - Get vehicles (admin)
- ✅ `POST /api/admin/vehicles` - Create vehicle
- ✅ `GET /api/admin/realtime-stats` - Real-time statistics

#### Auth APIs
- ✅ `POST /api/auth/login` - Login
- ✅ `POST /api/auth/logout` - Logout
- ✅ `GET /api/auth/me` - Get current user
- ✅ `POST /api/auth/create-admin` - Create admin
- ✅ `POST /api/auth/setup-admin` - Setup admin
- ✅ `POST /api/auth/reset-admin` - Reset admin

#### Analytics APIs
- ✅ `GET /api/analytics` - Get analytics data

#### Payment APIs
- ✅ `POST /api/stripe/create-checkout-session` - Create checkout
- ✅ `POST /api/stripe/confirm-payment` - Confirm payment
- ✅ `POST /api/stripe/webhook` - Stripe webhook
- ✅ `GET /api/stripe/receipt` - Get receipt

#### Other APIs
- ✅ `POST /api/upload` - Upload files
- ✅ `GET /api/settings` - Get settings
- ✅ `POST /api/settings` - Update settings

### 🔒 Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (Bcrypt)
- ✅ Role-based Access Control (Admin/Manager)
- ✅ Protected API Routes
- ✅ Protected Admin Pages
- ✅ CORS Configuration

### 📱 Responsive Design

- ✅ Mobile-friendly
- ✅ Tablet-friendly
- ✅ Desktop-optimized
- ✅ Dark Mode Support (partial)

### 🎨 UI/UX Features

- ✅ Modern Design
- ✅ Loading States
- ✅ Error Handling
- ✅ Form Validation
- ✅ Toast Notifications (partial)
- ✅ Modal Dialogs
- ✅ Responsive Tables

---

## ❌ Fitur yang Belum Tersedia

### 🔴 Prioritas Tinggi (High Priority)

#### 1. **Customer Dashboard/Portal**
- ❌ Customer login/register
- ❌ Customer dashboard untuk melihat booking history
- ❌ Customer dapat melihat status booking mereka
- ❌ Customer dapat cancel booking (dengan policy)
- ❌ Customer dapat request perubahan booking
- ❌ Customer profile management

#### 2. **Notification System**
- ❌ Real-time notifications (WebSocket/SSE)
- ❌ Email notifications untuk status changes
- ❌ SMS notifications (opsional)
- ❌ Push notifications (browser)
- ❌ In-app notification center

#### 3. **Review & Rating System**
- ❌ Customer dapat memberikan review setelah booking selesai
- ❌ Rating system (1-5 stars)
- ❌ Review moderation di admin
- ❌ Display reviews di website
- ❌ Average rating per vehicle

#### 4. **Advanced Booking Features**
- ❌ Calendar view untuk availability
- ❌ Recurring bookings
- ❌ Group bookings
- ❌ Booking cancellation policy
- ❌ Booking modification requests
- ❌ Waitlist untuk kendaraan yang tidak tersedia

#### 5. **Payment Improvements**
- ❌ Multiple payment methods (selain Stripe):
  - Bank Transfer
  - E-wallet (OVO, GoPay, DANA, dll)
  - Credit Card (selain Stripe)
- ❌ Payment plans/installments
- ❌ Refund management system
- ❌ Payment history untuk customer
- ❌ Invoice generation & download

#### 6. **Maintenance Management**
- ❌ Maintenance scheduling system
- ❌ Maintenance calendar
- ❌ Maintenance alerts/reminders
- ❌ Maintenance cost tracking
- ❌ Maintenance history per vehicle
- ❌ Auto-update vehicle status saat maintenance

#### 7. **Reporting System**
- ❌ Financial reports (Revenue, Expenses, Profit)
- ❌ Booking reports (by date range, vehicle, service)
- ❌ Customer reports
- ❌ Export reports (PDF, Excel, CSV)
- ❌ Scheduled reports (email)
- ❌ Custom report builder

### 🟡 Prioritas Sedang (Medium Priority)

#### 8. **Multi-language Support**
- ❌ English/Indonesian language toggle
- ❌ Content translation management
- ❌ RTL support (jika diperlukan)

#### 9. **Advanced Search & Filter**
- ❌ Advanced search dengan multiple criteria
- ❌ Saved searches
- ❌ Search history
- ❌ Filter by price range
- ❌ Filter by availability date

#### 10. **Loyalty Program**
- ❌ Points system
- ❌ Rewards program
- ❌ Discount codes/coupons
- ❌ Referral program
- ❌ Membership tiers

#### 11. **Inventory Management**
- ❌ Stock management untuk accessories
- ❌ Fuel tracking
- ❌ Driver assignment
- ❌ Equipment tracking

#### 12. **Communication Features**
- ❌ Live chat support
- ❌ WhatsApp integration
- ❌ In-app messaging
- ❌ Customer support ticket system

#### 13. **Marketing Features**
- ❌ Email marketing campaigns
- ❌ Newsletter subscription
- ❌ Promotional banners management
- ❌ Social media integration
- ❌ SEO tools & analytics

#### 14. **Mobile App**
- ❌ React Native app untuk iOS
- ❌ React Native app untuk Android
- ❌ Push notifications
- ❌ Mobile booking experience

#### 15. **Advanced Analytics**
- ❌ Customer behavior analytics
- ❌ Conversion tracking
- ❌ A/B testing
- ❌ Heatmaps
- ❌ Funnel analysis

### 🟢 Prioritas Rendah (Low Priority)

#### 16. **Additional Features**
- ❌ Gift cards/vouchers
- ❌ Corporate accounts
- ❌ API for third-party integrations
- ❌ Webhook system untuk integrations
- ❌ Multi-currency support
- ❌ Tax calculation per region
- ❌ Insurance management
- ❌ Driver management system
- ❌ Route optimization
- ❌ GPS tracking integration

#### 17. **Content Management**
- ❌ Advanced CMS untuk content pages
- ❌ Media library management
- ❌ Content versioning
- ❌ Content scheduling

#### 18. **Integration Features**
- ❌ Google Maps integration (advanced)
- ❌ Calendar integration (Google Calendar, Outlook)
- ❌ Accounting software integration (QuickBooks, Xero)
- ❌ CRM integration
- ❌ Social media auto-posting

---

## 🎯 Prioritas Pengembangan

### Phase 1: Core Features (Selesai ✅)
- [x] Website public dengan booking system
- [x] Admin panel dasar
- [x] Payment integration (Stripe)
- [x] Email notifications
- [x] Basic analytics

### Phase 2: Customer Experience (Prioritas Tinggi 🔴)
**Target: 2-3 bulan**

1. **Customer Dashboard** (4-6 minggu)
   - Customer registration/login
   - Booking history
   - Profile management
   - Status tracking

2. **Review & Rating System** (2-3 minggu)
   - Review submission
   - Rating system
   - Review moderation

3. **Notification System** (2-3 minggu)
   - Email notifications
   - In-app notifications
   - SMS (opsional)

4. **Advanced Booking** (3-4 minggu)
   - Calendar availability
   - Booking modifications
   - Cancellation policy

### Phase 3: Business Operations (Prioritas Tinggi 🔴)
**Target: 2-3 bulan**

1. **Maintenance Management** (3-4 minggu)
   - Scheduling system
   - Alerts & reminders
   - Cost tracking

2. **Reporting System** (4-5 minggu)
   - Financial reports
   - Booking reports
   - Export functionality

3. **Payment Improvements** (2-3 minggu)
   - Multiple payment methods
   - Refund management
   - Invoice generation

### Phase 4: Growth Features (Prioritas Sedang 🟡)
**Target: 3-4 bulan**

1. **Loyalty Program** (4-5 minggu)
2. **Marketing Features** (3-4 minggu)
3. **Advanced Analytics** (3-4 minggu)
4. **Multi-language** (2-3 minggu)

### Phase 5: Expansion (Prioritas Rendah 🟢)
**Target: 4-6 bulan**

1. **Mobile App** (8-12 minggu)
2. **Third-party Integrations** (4-6 minggu)
3. **Advanced Features** (ongoing)

---

## 📊 Struktur Database

### Models Overview

#### User
```prisma
- id: String
- email: String (unique)
- name: String?
- password: String (hashed)
- role: Role (ADMIN | MANAGER)
- createdAt: DateTime
- updatedAt: DateTime
```

#### Vehicle
```prisma
- id: String
- name: String
- model: String
- year: Int
- category: VehicleCategory
- status: VehicleStatus
- location: String
- plateNumber: String (unique)
- capacity: Int
- color: String
- price: Float
- minimumHours: Int?
- lastMaintenance: DateTime?
- nextMaintenance: DateTime?
- purchaseDate: DateTime
- purchasePrice: Float
- mileage: String?
- features: String[]
- images: String[]
- description: String?
- bookings: Booking[]
- maintenanceRecords: MaintenanceRecord[]
```

#### Booking
```prisma
- id: String
- customerName: String
- customerEmail: String
- customerPhone: String
- vehicleId: String
- service: String
- startDate: DateTime
- endDate: DateTime
- startTime: String
- duration: String
- pickupLocation: String
- dropoffLocation: String?
- totalAmount: Float
- depositAmount: Float?
- status: BookingStatus
- paymentStatus: PaymentStatus
- stripeSessionId: String? (unique)
- stripePaymentId: String?
- notes: String?
- vehicle: Vehicle
- createdAt: DateTime
- updatedAt: DateTime
```

#### MaintenanceRecord
```prisma
- id: String
- vehicleId: String
- date: DateTime
- type: MaintenanceType
- description: String
- workshop: String
- cost: Float
- status: MaintenanceStatus
- nextServiceDate: DateTime?
- mileage: String?
- technician: String?
- vehicle: Vehicle
- createdAt: DateTime
- updatedAt: DateTime
```

#### BlogPost
```prisma
- id: String
- title: String
- slug: String (unique)
- excerpt: String
- content: String
- image: String?
- author: String
- publishedAt: DateTime?
- isPublished: Boolean
- tags: String[]
- createdAt: DateTime
- updatedAt: DateTime
```

#### ContactMessage
```prisma
- id: String
- name: String
- email: String
- phone: String?
- subject: String
- message: String
- isRead: Boolean
- createdAt: DateTime
- updatedAt: DateTime
```

#### Settings
```prisma
- id: String
- key: String (unique)
- value: String
```

---

## 🔌 API Endpoints Detail

### Public Endpoints

#### Vehicles
- `GET /api/public/vehicles` - Get all available vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/[id]` - Get vehicle by ID

#### Booking
- `POST /api/public/booking` - Create booking (public)
- `POST /api/booking` - Create booking
- `GET /api/bookings` - Get bookings

#### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/[id]` - Get blog post by ID

### Admin Endpoints

#### Bookings
- `GET /api/admin/bookings` - Get all bookings (with filters)
- `POST /api/admin/bookings` - Create booking
- `GET /api/admin/bookings/[id]` - Get booking detail
- `PATCH /api/admin/bookings/[id]` - Update booking
- `POST /api/admin/bookings/[id]/email` - Send email to customer

#### Vehicles
- `GET /api/admin/vehicles` - Get vehicles (with filters)
- `POST /api/admin/vehicles` - Create vehicle
- `PATCH /api/admin/vehicles/[id]` - Update vehicle
- `DELETE /api/admin/vehicles/[id]` - Delete vehicle

#### Analytics
- `GET /api/analytics` - Get analytics data
- `GET /api/admin/realtime-stats` - Get real-time statistics

### Auth Endpoints

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/create-admin` - Create admin user
- `POST /api/auth/setup-admin` - Setup admin
- `POST /api/auth/reset-admin` - Reset admin password

### Payment Endpoints

- `POST /api/stripe/create-checkout-session` - Create Stripe checkout
- `POST /api/stripe/confirm-payment` - Confirm payment
- `POST /api/stripe/webhook` - Stripe webhook handler
- `GET /api/stripe/receipt` - Get payment receipt

### Other Endpoints

- `POST /api/upload` - Upload files
- `GET /api/settings` - Get settings
- `POST /api/settings` - Update settings
- `GET /api/status` - Health check

---

## 📝 Catatan Penting

### Environment Variables
Pastikan file `.env` berisi:
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_BASE_URL=https://...
JWT_SECRET=...
STRIPE_SECRET_KEY=...
STRIPE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_WEBHOOK_SECRET=...
EMAIL_HOST=...
EMAIL_PORT=...
EMAIL_USER=...
EMAIL_PASS=...
```

### Database Setup
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Run migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

### Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Testing
- Database connection: `npm run test:db`
- Create test data: `npm run test:create-data`
- Test email: `npm run test:email`

### Deployment Checklist
- [ ] Set all environment variables
- [ ] Run database migrations
- [ ] Build production bundle
- [ ] Configure Stripe webhook
- [ ] Configure email SMTP
- [ ] Set up SSL certificate
- [ ] Configure domain
- [ ] Set up backup system
- [ ] Configure monitoring
- [ ] Test all critical flows

---

## 📞 Support & Maintenance

### Regular Maintenance Tasks
1. **Daily**
   - Monitor booking status
   - Check payment confirmations
   - Review customer inquiries

2. **Weekly**
   - Review analytics reports
   - Check system health
   - Update vehicle availability

3. **Monthly**
   - Generate financial reports
   - Review maintenance schedules
   - Update content/blog

### Backup Strategy
- Database: Daily automated backups
- Files: Weekly backup of uploads
- Settings: Version controlled

### Monitoring
- Server uptime
- API response times
- Error rates
- Payment success rates
- Booking conversion rates

---

## 🚀 Roadmap Summary

### Completed ✅
- Core booking system
- Admin panel
- Payment integration
- Email system
- Basic analytics

### In Progress 🚧
- Improved analytics calculations
- Table optimization

### Planned 📅
- Customer dashboard
- Review system
- Advanced notifications
- Maintenance management
- Reporting system

---

**Last Updated**: {{ current_date }}
**Version**: 1.0.0
**Status**: Production Ready

---

*Dokumen ini akan diperbarui secara berkala sesuai dengan perkembangan proyek.*

