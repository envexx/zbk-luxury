# 🧪 ZBK Luxury Transport - Testing Guide

Panduan lengkap untuk testing input dan pengambilan data dari database.

## 📋 Overview

Aplikasi ZBK Luxury Transport sekarang **100% menggunakan data dari database** tanpa data dummy. Semua halaman admin mengambil data real-time dari API endpoints.

## 🚀 Quick Start Testing

### 1. Start Development Server
```bash
cd zbk
npm run dev
```
Server akan berjalan di: `http://localhost:3000`

### 2. Open Testing Suite
Buka file: `test-data-insertion.html` di browser atau akses:
```
file:///path/to/zbk/test-data-insertion.html
```

### 3. Run Tests
- **Current Stats**: Lihat jumlah data saat ini
- **Create Test Data**: Buat 1 data test untuk vehicle, booking, blog
- **Individual Tests**: Test masing-masing API endpoint
- **Manual Input**: Test input manual via API
- **Run All Tests**: Jalankan semua test sekaligus

## 🔗 API Endpoints

### Vehicle Management
- `GET /api/admin/vehicles` - Get all vehicles
- `POST /api/admin/vehicles` - Create vehicle
- `PUT /api/vehicles/[id]` - Update vehicle
- `DELETE /api/vehicles/[id]` - Delete vehicle

### Booking Management
- `GET /api/admin/bookings` - Get all bookings
- `POST /api/public/booking` - Create booking (public)
- `PATCH /api/admin/bookings/[id]` - Update booking status
- `DELETE /api/admin/bookings/[id]` - Delete booking

### Blog Management
- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Create blog post
- `PUT /api/blog/[id]` - Update blog post
- `DELETE /api/blog/[id]` - Delete blog post

### Testing Endpoints
- `GET /api/test-data` - Get database stats
- `POST /api/test-data` - Create test data
- `GET /api/test-db` - Database connection test

## 📊 Admin Dashboard Pages

### 1. Vehicles Page (`/admin/vehicles`)
- ✅ **Real-time data** dari `/api/admin/vehicles`
- ✅ **Dynamic statistics** berdasarkan status vehicle
- ✅ **CRUD operations** (Create, Read, Update, Delete)
- ✅ **Loading states** dan error handling

### 2. Bookings Page (`/admin/bookings`)
- ✅ **Real-time data** dari `/api/admin/bookings`
- ✅ **Customer information** dengan vehicle details
- ✅ **Status management** (PENDING, CONFIRMED, COMPLETED, etc.)
- ✅ **Date and location** information

### 3. Blog Page (`/admin/blog`)
- ✅ **Real-time data** dari `/api/blog`
- ✅ **Content management** dengan rich editor
- ✅ **Publishing workflow** (draft/published)
- ✅ **SEO features** (slug, tags, excerpt)

## 🧪 Testing Scenarios

### Scenario 1: Fresh Database Test
1. Jalankan `GET /api/test-data` untuk cek stats awal
2. Buka admin dashboard - semua halaman kosong
3. Jalankan `POST /api/test-data` untuk create test data
4. Refresh admin pages - data muncul
5. Verify semua CRUD operations berfungsi

### Scenario 2: Manual Data Entry Test
1. Buka admin vehicles page
2. Click "Add Vehicle" - input data manual
3. Verify data tersimpan dan muncul di list
4. Repeat untuk bookings dan blog

### Scenario 3: API Integration Test
1. Test semua endpoints via testing suite
2. Verify response format dan data consistency
3. Test error handling (invalid data, missing fields)
4. Test database constraints (unique plate numbers, etc.)

### Scenario 4: End-to-End Workflow Test
1. Create vehicle via admin
2. Create booking menggunakan vehicle tersebut
3. Update booking status
4. Create blog post tentang service
5. Verify semua data terintegrasi dengan benar

## 📝 Test Data Examples

### Vehicle Test Data
```json
{
  "name": "Toyota Alphard Executive Test",
  "model": "Alphard",
  "year": 2024,
  "category": "WEDDING_AFFAIRS",
  "status": "AVAILABLE",
  "location": "Jakarta Pusat",
  "plateNumber": "B 1111 TEST",
  "capacity": 7,
  "color": "Pearl White",
  "features": ["Leather Seats", "Sunroof", "Premium Audio"],
  "description": "Test vehicle for validation"
}
```

### Booking Test Data
```json
{
  "customerName": "Test Customer",
  "customerEmail": "test@zbkluxury.com",
  "customerPhone": "+6281234567890",
  "service": "Wedding Transport",
  "startDate": "2024-12-15",
  "startTime": "08:00",
  "duration": "12 hours",
  "pickupLocation": "Grand Indonesia Hotel",
  "dropoffLocation": "Ritz Carlton Jakarta",
  "totalAmount": 3000000
}
```

### Blog Test Data
```json
{
  "title": "Ultimate Guide to Luxury Wedding Transportation",
  "slug": "ultimate-guide-luxury-wedding-transportation-jakarta",
  "excerpt": "Complete guide for luxury wedding transportation in Jakarta",
  "content": "Full article content...",
  "author": "ZBK Luxury Team",
  "isPublished": true,
  "tags": ["wedding", "luxury", "jakarta", "transportation"]
}
```

## ✅ Validation Checklist

### Database Integration
- [ ] All admin pages load data from database
- [ ] No hardcoded/dummy data in components
- [ ] Real-time updates when data changes
- [ ] Proper error handling for API failures

### CRUD Operations
- [ ] Create: New data dapat ditambahkan
- [ ] Read: Data ditampilkan dengan benar
- [ ] Update: Data dapat dimodifikasi
- [ ] Delete: Data dapat dihapus

### Data Consistency
- [ ] Foreign key relationships berfungsi
- [ ] Data validation di API endpoints
- [ ] Proper status transitions
- [ ] Unique constraints enforced

### User Experience
- [ ] Loading states saat fetch data
- [ ] Error messages yang informatif
- [ ] Responsive UI untuk semua screen sizes
- [ ] Smooth transitions dan animations

## 🐛 Troubleshooting

### Common Issues

1. **"vehicles.filter is not a function"**
   - ✅ **Fixed**: Added array validation di semua components

2. **API returns empty data**
   - Check database connection
   - Verify Prisma client generation
   - Check API endpoint URLs

3. **CORS errors**
   - Ensure same origin (localhost:3000)
   - Check API route configurations

4. **Database connection errors**
   - Verify DATABASE_URL di .env.local
   - Check Prisma Accelerate connection
   - Run `npm run db:generate`

## 📈 Performance Testing

### Load Testing
- Test dengan 100+ vehicles
- Test dengan 500+ bookings
- Monitor response times
- Check memory usage

### Database Performance
- Query optimization
- Index usage
- Connection pooling
- Cache strategies

## 🔒 Security Testing

### Input Validation
- SQL injection prevention
- XSS protection
- Data sanitization
- File upload security

### Authentication
- Admin access control
- API endpoint protection
- Session management
- CSRF protection

## 📚 Next Steps

1. **Add Authentication**: Implement proper admin login
2. **Add Pagination**: For large datasets
3. **Add Search/Filter**: Advanced filtering options
4. **Add Export**: CSV/PDF export functionality
5. **Add Notifications**: Real-time updates
6. **Add Analytics**: Usage statistics and reports

## 🎯 Success Criteria

✅ **Database Integration**: 100% data dari database
✅ **No Dummy Data**: Semua hardcoded data dihapus
✅ **CRUD Operations**: Create, Read, Update, Delete berfungsi
✅ **Error Handling**: Robust error handling
✅ **Testing Suite**: Comprehensive testing tools
✅ **Documentation**: Complete testing guide

---

**Status**: ✅ **COMPLETED**
**Last Updated**: November 23, 2024
**Version**: 1.0.0
