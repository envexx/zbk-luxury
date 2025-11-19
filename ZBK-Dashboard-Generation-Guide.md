# ZBK Luxury Transport Dashboard - Generation Guide

## 📋 Overview

This document provides a comprehensive guide for generating an admin dashboard to manage the ZBK Luxury Transport website. The dashboard will enable complete content management, booking oversight, and business analytics for the Toyota Alphard & Hiace premium rental service.

## 🏗️ Current Website Architecture

### **Technology Stack**
- **Frontend**: Next.js 16.0.1 with React 19.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4.18
- **Build Tool**: Next.js with Turbopack
- **State Management**: React Context API
- **Icons**: Custom SVG icons
- **Fonts**: Inter (Google Fonts)

### **Project Structure**
```
zbk/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # About page
│   │   ├── api/               # API routes
│   │   ├── blog/              # Blog system
│   │   ├── booking-demo/      # Booking demonstration
│   │   ├── contact/           # Contact page
│   │   ├── fleet/             # Vehicle fleet showcase
│   │   ├── services/          # Services page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Component library
│   │   ├── atoms/             # Basic UI components
│   │   ├── molecules/         # Composite components
│   │   └── organisms/         # Complex components
│   ├── contexts/              # React contexts
│   ├── data/                  # Static data & mock content
│   ├── types/                 # TypeScript interfaces
│   └── utils/                 # Utility functions
├── public/                    # Static assets
└── tailwind.config.js         # Tailwind configuration
```

## 🎯 Dashboard Requirements

### **Core Management Features**

#### 1. **Vehicle Fleet Management**
- **CRUD Operations**: Create, Read, Update, Delete vehicles
- **Vehicle Properties**:
  ```typescript
  interface Vehicle {
    id: string;
    name: string;
    image: string;
    price: number;           // Per hour/day rate
    category: string;        // Wedding Affairs, Alphard, COMBI
    seats: number;
    transmission: 'Automatic' | 'Manual';
    year: number;
    rating: number;
    isLuxury: boolean;
    features?: string[];
    specialNote?: string;
    brand?: string;
    model?: string;
    engine?: string;
    fuel?: string;
    doors?: number;
  }
  ```
- **Categories**: Wedding Affairs, Alphard, COMBI
- **Image Management**: Upload and manage vehicle photos
- **Availability Calendar**: Track vehicle availability
- **Pricing Management**: Dynamic pricing based on season/demand

#### 2. **Booking Management System**
- **Booking Interface**:
  ```typescript
  interface BookingData {
    tripType: 'one-way' | 'round-trip';
    pickupDate: string;
    pickupTime: string;
    returnDate?: string;
    returnTime?: string;
    pickupLocation: string;
    dropOffLocation: string;
    hours: string;
    selectedVehicleId?: string;
    customerInfo?: {
      name: string;
      email: string;
      phone: string;
    };
  }
  ```
- **Booking Status**: Pending, Confirmed, In Progress, Completed, Cancelled
- **Customer Management**: Customer profiles and booking history
- **Payment Tracking**: Payment status and invoice generation
- **Driver Assignment**: Assign drivers to bookings
- **Real-time Notifications**: SMS/Email notifications

#### 3. **Content Management System (CMS)**
- **Blog Management**:
  ```typescript
  interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    author: BlogAuthor;
    category: BlogCategory;
    tags: string[];
    publishedAt: string;
    updatedAt: string;
    readingTime: number;
    seo: SEOData;
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
  }
  ```
- **SEO Management**: Meta titles, descriptions, keywords
- **Media Library**: Image and document management
- **Category Management**: Blog categories and tags
- **Content Scheduling**: Schedule posts for future publication

#### 4. **User Authentication & Authorization**
- **User Management**:
  ```typescript
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    role: 'admin' | 'manager' | 'staff';
    permissions: string[];
    createdAt: string;
    updatedAt: string;
  }
  ```
- **Role-Based Access Control (RBAC)**
- **Session Management**
- **Password Reset Functionality**

#### 5. **Analytics & Reporting**
- **Business Metrics**:
  - Total bookings (daily/weekly/monthly)
  - Revenue analytics
  - Vehicle utilization rates
  - Customer acquisition metrics
  - Popular routes and destinations
- **Performance Dashboards**:
  - Real-time booking status
  - Fleet availability overview
  - Revenue trends and forecasting
  - Customer satisfaction ratings

## 🛠️ Dashboard Generation Prompt

### **Complete Dashboard Generation Request**

```
Create a comprehensive admin dashboard for ZBK Luxury Transport that manages a Toyota Alphard & Hiace premium rental website. The dashboard should be built with modern web technologies and include the following specifications:

**TECHNOLOGY REQUIREMENTS:**
- Frontend: Vue.js 3 with TypeScript and Composition API
- Styling: Tailwind CSS v4 (latest syntax)
- Build Tool: Vite
- Charts: ApexCharts for data visualization
- Icons: Lucide Vue Next
- Router: Vue Router 4
- State Management: Pinia
- HTTP Client: Axios
- Authentication: JWT-based auth

**DESIGN SYSTEM:**
- Color Palette:
  - Primary: Luxury Gold (#D4AF37)
  - Secondary: Deep Navy (#111111)
  - Accent: Charcoal (#2D3436)
  - Success: #27AE60
  - Warning: #F39C12
  - Error: #E74C3C
- Typography: Inter font family
- Dark theme support
- Responsive design (mobile-first)
- Modern glassmorphism UI elements

**CORE MODULES TO IMPLEMENT:**

1. **Dashboard Overview**
   - Key performance indicators (KPIs)
   - Revenue charts (daily/weekly/monthly)
   - Booking statistics
   - Fleet utilization metrics
   - Recent activities feed
   - Quick action buttons

2. **Vehicle Fleet Management**
   - Vehicle CRUD operations
   - Image gallery management
   - Availability calendar
   - Maintenance scheduling
   - Pricing management
   - Category management (Wedding Affairs, Alphard, COMBI)
   - Vehicle specifications editor

3. **Booking Management**
   - Booking list with advanced filtering
   - Booking details view
   - Status management workflow
   - Customer information management
   - Payment tracking
   - Driver assignment
   - Route planning integration
   - Booking calendar view

4. **Content Management System**
   - Blog post editor (WYSIWYG)
   - Media library with upload functionality
   - SEO optimization tools
   - Content scheduling
   - Category and tag management
   - Featured content management
   - Content analytics

5. **Customer Management**
   - Customer profiles
   - Booking history
   - Communication logs
   - Loyalty program management
   - Customer feedback system
   - Export customer data

6. **User Management & Permissions**
   - Admin user CRUD
   - Role-based access control
   - Permission management
   - Activity logging
   - Session management
   - Password policies

7. **Analytics & Reports**
   - Revenue analytics dashboard
   - Booking trend analysis
   - Vehicle performance metrics
   - Customer behavior insights
   - Exportable reports (PDF/Excel)
   - Custom date range filtering

8. **Settings & Configuration**
   - General settings
   - Email templates
   - SMS notifications setup
   - Payment gateway configuration
   - Backup and restore
   - System maintenance

**DATA MODELS REQUIRED:**

Vehicle Model:
- id, name, brand, model, year, category
- seats, doors, transmission, engine, fuel
- price, isLuxury, features, images
- availability, maintenance_schedule
- rating, total_bookings

Booking Model:
- id, customer_id, vehicle_id, driver_id
- pickup/dropoff locations and times
- trip_type, duration, total_price
- status, payment_status, special_requests
- created_at, updated_at

Customer Model:
- id, first_name, last_name, email, phone
- address, date_of_birth, preferences
- total_bookings, total_spent, loyalty_points
- created_at, last_booking_date

Blog Model:
- id, title, slug, content, excerpt
- featured_image, author_id, category_id
- tags, status, seo_data, reading_time
- published_at, updated_at

**API ENDPOINTS NEEDED:**
- Authentication: /api/auth/*
- Vehicles: /api/vehicles/*
- Bookings: /api/bookings/*
- Customers: /api/customers/*
- Blog: /api/blog/*
- Analytics: /api/analytics/*
- Settings: /api/settings/*
- Upload: /api/upload/*

**SECURITY REQUIREMENTS:**
- JWT authentication with refresh tokens
- Input validation and sanitization
- CSRF protection
- Rate limiting
- File upload security
- SQL injection prevention
- XSS protection

**PERFORMANCE REQUIREMENTS:**
- Lazy loading for large datasets
- Image optimization and CDN integration
- Caching strategies
- Database query optimization
- Progressive web app (PWA) features
- Offline functionality for critical features

**ADDITIONAL FEATURES:**
- Real-time notifications (WebSocket)
- Export functionality (PDF/Excel/CSV)
- Bulk operations for data management
- Advanced search and filtering
- Audit trail for all changes
- Backup and restore functionality
- Multi-language support (English/Indonesian)
- Integration with Google Maps for routes
- WhatsApp Business API integration
- Email marketing integration

**UI/UX REQUIREMENTS:**
- Intuitive navigation with sidebar
- Breadcrumb navigation
- Loading states and error handling
- Confirmation dialogs for destructive actions
- Keyboard shortcuts for power users
- Accessibility compliance (WCAG 2.1)
- Print-friendly layouts
- Mobile-responsive design

**DEPLOYMENT CONFIGURATION:**
- Environment-based configuration
- Docker containerization
- CI/CD pipeline setup
- Database migration scripts
- Monitoring and logging setup
- SSL certificate configuration
- CDN setup for static assets

Generate a complete, production-ready admin dashboard with all the above specifications, ensuring clean code architecture, comprehensive documentation, and thorough testing coverage.
```

## 🔧 Technical Implementation Details

### **Backend API Requirements**

#### **Database Schema**
```sql
-- Vehicles Table
CREATE TABLE vehicles (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    category VARCHAR(100),
    seats INTEGER,
    doors INTEGER,
    transmission ENUM('Automatic', 'Manual'),
    engine VARCHAR(50),
    fuel VARCHAR(50),
    price DECIMAL(10,2),
    is_luxury BOOLEAN DEFAULT FALSE,
    features JSON,
    images JSON,
    special_note TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    total_bookings INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY,
    customer_id UUID,
    vehicle_id UUID,
    driver_id UUID,
    trip_type ENUM('one-way', 'round-trip'),
    pickup_date DATE,
    pickup_time TIME,
    return_date DATE,
    return_time TIME,
    pickup_location TEXT,
    dropoff_location TEXT,
    hours INTEGER,
    total_price DECIMAL(10,2),
    status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled'),
    payment_status ENUM('pending', 'paid', 'refunded'),
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Customers Table
CREATE TABLE customers (
    id UUID PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    total_bookings INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    loyalty_points INTEGER DEFAULT 0,
    preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog Posts Table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(500),
    author_id UUID,
    category_id UUID,
    tags JSON,
    status ENUM('draft', 'published', 'archived'),
    is_featured BOOLEAN DEFAULT FALSE,
    reading_time INTEGER,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords JSON,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### **API Endpoints Structure**

```typescript
// Authentication Endpoints
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me

// Vehicle Management
GET    /api/vehicles                 // List all vehicles
POST   /api/vehicles                 // Create new vehicle
GET    /api/vehicles/:id             // Get vehicle details
PUT    /api/vehicles/:id             // Update vehicle
DELETE /api/vehicles/:id             // Delete vehicle
GET    /api/vehicles/categories      // Get vehicle categories
POST   /api/vehicles/:id/images      // Upload vehicle images

// Booking Management
GET    /api/bookings                 // List all bookings
POST   /api/bookings                 // Create new booking
GET    /api/bookings/:id             // Get booking details
PUT    /api/bookings/:id             // Update booking
DELETE /api/bookings/:id             // Cancel booking
PUT    /api/bookings/:id/status      // Update booking status

// Customer Management
GET    /api/customers                // List all customers
POST   /api/customers                // Create new customer
GET    /api/customers/:id            // Get customer details
PUT    /api/customers/:id            // Update customer
DELETE /api/customers/:id            // Delete customer
GET    /api/customers/:id/bookings   // Get customer bookings

// Content Management
GET    /api/blog/posts               // List blog posts
POST   /api/blog/posts               // Create new post
GET    /api/blog/posts/:id           // Get post details
PUT    /api/blog/posts/:id           // Update post
DELETE /api/blog/posts/:id           // Delete post
GET    /api/blog/categories          // Get categories

// Analytics
GET    /api/analytics/overview       // Dashboard overview data
GET    /api/analytics/revenue        // Revenue analytics
GET    /api/analytics/bookings       // Booking analytics
GET    /api/analytics/vehicles       // Vehicle performance
GET    /api/analytics/customers      // Customer insights

// File Management
POST   /api/upload/image             // Upload single image
POST   /api/upload/multiple          // Upload multiple files
DELETE /api/upload/:filename         // Delete uploaded file
```

### **Frontend Component Architecture**

#### **Dashboard Layout Structure**
```
Dashboard/
├── Layout/
│   ├── Sidebar.vue              # Navigation sidebar
│   ├── Header.vue               # Top header with user menu
│   ├── Breadcrumb.vue           # Navigation breadcrumb
│   └── Footer.vue               # Dashboard footer
├── Pages/
│   ├── Overview/
│   │   └── DashboardOverview.vue
│   ├── Vehicles/
│   │   ├── VehicleList.vue
│   │   ├── VehicleForm.vue
│   │   ├── VehicleDetail.vue
│   │   └── VehicleCalendar.vue
│   ├── Bookings/
│   │   ├── BookingList.vue
│   │   ├── BookingForm.vue
│   │   ├── BookingDetail.vue
│   │   └── BookingCalendar.vue
│   ├── Customers/
│   │   ├── CustomerList.vue
│   │   ├── CustomerForm.vue
│   │   └── CustomerDetail.vue
│   ├── Content/
│   │   ├── BlogList.vue
│   │   ├── BlogEditor.vue
│   │   └── MediaLibrary.vue
│   └── Analytics/
│       ├── RevenueAnalytics.vue
│       ├── BookingAnalytics.vue
│       └── CustomerAnalytics.vue
├── Components/
│   ├── Charts/
│   │   ├── LineChart.vue
│   │   ├── BarChart.vue
│   │   ├── PieChart.vue
│   │   └── AreaChart.vue
│   ├── Forms/
│   │   ├── FormInput.vue
│   │   ├── FormSelect.vue
│   │   ├── FormTextarea.vue
│   │   ├── FormDatePicker.vue
│   │   └── FormImageUpload.vue
│   ├── Tables/
│   │   ├── DataTable.vue
│   │   ├── TablePagination.vue
│   │   └── TableFilters.vue
│   └── UI/
│       ├── Modal.vue
│       ├── Button.vue
│       ├── Card.vue
│       ├── Badge.vue
│       └── LoadingSpinner.vue
```

## 🚀 Integration Requirements

### **Website Integration Points**

#### **1. API Integration**
- **Booking System**: Connect dashboard booking management with website booking form
- **Vehicle Data**: Sync vehicle information between dashboard and website display
- **Content Management**: Blog posts created in dashboard appear on website
- **Customer Data**: Customer registrations from website sync to dashboard

#### **2. Real-time Synchronization**
```typescript
// WebSocket events for real-time updates
interface WebSocketEvents {
  'booking:created': BookingData;
  'booking:updated': BookingData;
  'vehicle:availability_changed': VehicleAvailability;
  'customer:registered': CustomerData;
  'payment:received': PaymentData;
}
```

#### **3. Authentication Bridge**
- Single Sign-On (SSO) between website and dashboard
- Customer account integration
- Admin access controls

### **Database Synchronization**
```typescript
// Shared database models between website and dashboard
interface SharedModels {
  vehicles: Vehicle[];
  bookings: Booking[];
  customers: Customer[];
  blog_posts: BlogPost[];
  categories: Category[];
}
```

## 📊 Analytics & Reporting Features

### **Key Performance Indicators (KPIs)**
1. **Revenue Metrics**
   - Daily/Weekly/Monthly revenue
   - Revenue per vehicle
   - Average booking value
   - Revenue growth rate

2. **Operational Metrics**
   - Total bookings
   - Booking conversion rate
   - Vehicle utilization rate
   - Customer retention rate

3. **Customer Metrics**
   - New customer acquisition
   - Customer lifetime value
   - Repeat booking rate
   - Customer satisfaction score

### **Report Types**
1. **Financial Reports**
   - Revenue summary
   - Profit & loss statement
   - Tax reports
   - Payment reconciliation

2. **Operational Reports**
   - Fleet utilization
   - Driver performance
   - Route analysis
   - Maintenance schedule

3. **Marketing Reports**
   - Customer acquisition channels
   - Campaign performance
   - Website analytics integration
   - Social media metrics

## 🔐 Security & Compliance

### **Security Measures**
1. **Authentication & Authorization**
   - Multi-factor authentication (MFA)
   - Role-based access control
   - Session timeout management
   - Password complexity requirements

2. **Data Protection**
   - Data encryption at rest and in transit
   - PII (Personally Identifiable Information) protection
   - GDPR compliance measures
   - Data backup and recovery

3. **System Security**
   - Regular security audits
   - Vulnerability scanning
   - Secure API endpoints
   - Input validation and sanitization

### **Compliance Requirements**
- **Data Privacy**: GDPR, CCPA compliance
- **Financial**: PCI DSS for payment processing
- **Accessibility**: WCAG 2.1 AA compliance
- **Industry**: Transportation industry regulations

## 🎨 Design System & Branding

### **Brand Colors (from current website)**
```css
:root {
  --luxury-gold: #D4AF37;
  --luxury-gold-hover: #C9A227;
  --deep-navy: #111111;
  --charcoal: #2D3436;
  --light-gray: #333333;
  --success-green: #27AE60;
  --alert-red: #E74C3C;
  --info-blue: #3498DB;
}
```

### **Typography**
- **Primary Font**: Inter (Google Fonts)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Font Sizes**: Responsive scale from 12px to 48px

### **Component Library Standards**
- **Buttons**: Primary, secondary, outline, ghost variants
- **Forms**: Consistent styling with validation states
- **Cards**: Shadow levels and border radius standards
- **Tables**: Sortable headers, pagination, filtering
- **Modals**: Consistent overlay and animation patterns

## 📱 Mobile & Responsive Design

### **Breakpoints**
```css
/* Mobile First Approach */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### **Mobile-Specific Features**
- **Touch-friendly Interface**: Larger touch targets
- **Swipe Gestures**: For navigation and actions
- **Offline Functionality**: Critical features work offline
- **Push Notifications**: Real-time booking updates
- **Mobile Menu**: Collapsible navigation

## 🔄 Integration Workflow

### **Dashboard to Website Data Flow**
1. **Content Creation**: Blog posts created in dashboard
2. **Content Sync**: API pushes content to website database
3. **Cache Invalidation**: Website cache refreshed
4. **SEO Update**: Sitemap and meta tags updated

### **Website to Dashboard Data Flow**
1. **Booking Submission**: Customer submits booking on website
2. **Data Validation**: Website validates and processes booking
3. **Dashboard Notification**: Real-time notification to dashboard
4. **Admin Review**: Admin reviews and confirms booking
5. **Customer Notification**: Confirmation sent to customer

## 📋 Implementation Checklist

### **Phase 1: Core Setup**
- [ ] Project initialization with Vue 3 + TypeScript
- [ ] Authentication system implementation
- [ ] Basic layout and navigation
- [ ] Database schema setup
- [ ] API endpoint structure

### **Phase 2: Vehicle Management**
- [ ] Vehicle CRUD operations
- [ ] Image upload functionality
- [ ] Availability calendar
- [ ] Category management
- [ ] Pricing management

### **Phase 3: Booking System**
- [ ] Booking list and filters
- [ ] Booking form and validation
- [ ] Status management workflow
- [ ] Customer management integration
- [ ] Payment tracking

### **Phase 4: Content Management**
- [ ] Blog post editor (WYSIWYG)
- [ ] Media library
- [ ] SEO optimization tools
- [ ] Content scheduling
- [ ] Category management

### **Phase 5: Analytics & Reporting**
- [ ] Dashboard overview with KPIs
- [ ] Revenue analytics charts
- [ ] Booking trend analysis
- [ ] Customer insights
- [ ] Export functionality

### **Phase 6: Advanced Features**
- [ ] Real-time notifications
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Testing and documentation

## 🚀 Deployment & Maintenance

### **Deployment Strategy**
1. **Development Environment**: Local development setup
2. **Staging Environment**: Pre-production testing
3. **Production Environment**: Live dashboard deployment
4. **CI/CD Pipeline**: Automated testing and deployment

### **Monitoring & Maintenance**
- **Application Monitoring**: Performance and error tracking
- **Database Monitoring**: Query performance and optimization
- **Security Monitoring**: Threat detection and prevention
- **Backup Strategy**: Regular automated backups
- **Update Schedule**: Regular security and feature updates

---

## 📞 Support & Documentation

### **Technical Documentation**
- API documentation (OpenAPI/Swagger)
- Component library documentation
- Database schema documentation
- Deployment guide
- Troubleshooting guide

### **User Documentation**
- Admin user manual
- Feature tutorials
- Best practices guide
- FAQ section
- Video tutorials

---

*This documentation provides a complete roadmap for generating a professional admin dashboard that seamlessly integrates with the ZBK Luxury Transport website. The dashboard will provide comprehensive management capabilities while maintaining the brand's luxury aesthetic and ensuring optimal user experience.*
