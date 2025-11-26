# SMTP Configuration untuk ZBK Luxury Transport

## Environment Variables yang Diperlukan

Tambahkan variabel berikut ke file `.env.local` Anda:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin Email untuk Notifikasi
ADMIN_EMAIL=admin@zbkluxury.com

# Database URL (sudah ada)
DATABASE_URL=postgres://4512f0696eb059aedde102543b5bea0b49754b96861dc136f0f48fab8141ed7d:sk_KvAx1amozW7gn6ATQaMOU@db.prisma.io:5432/postgres?sslmode=require&pool=true

# JWT Secret (sudah ada)
JWT_SECRET=zbk-luxury-secret-key-2024

# Next.js URL
NEXTAUTH_URL=http://localhost:3000
```

## Setup Gmail SMTP

### 1. Enable 2-Factor Authentication
- Buka Google Account settings
- Security → 2-Step Verification → Turn On

### 2. Generate App Password
- Google Account → Security → App passwords
- Select app: Mail
- Select device: Other (Custom name) → "ZBK Booking System"
- Copy the generated 16-character password

### 3. Update Environment Variables
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=generated-app-password
ADMIN_EMAIL=your-admin-email@gmail.com
```

## Alternative SMTP Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo Mail
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

## Testing Email Configuration

Setelah setup, test dengan:
1. Buat booking baru melalui website
2. Check console logs untuk email status
3. Verify email diterima di inbox customer dan admin

## Email Flow

1. **Customer Books Vehicle** → Form submission
2. **API Creates Booking** → Save to database
3. **Send Customer Email** → Booking confirmation
4. **Send Admin Email** → New booking notification
5. **Admin Reviews** → Via admin dashboard

## Troubleshooting

- **Authentication Error**: Check app password
- **Connection Error**: Verify SMTP host/port
- **Email Not Received**: Check spam folder
- **SSL Error**: Ensure secure=false for port 587
