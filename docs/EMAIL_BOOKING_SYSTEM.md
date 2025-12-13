# Email Notification System - Booking Flow

## Overview
Sistem email otomatis untuk mengirim notifikasi kepada customer dan admin setelah pembayaran booking berhasil.

## Email Flow

### 1. Customer Makes Booking
```
User → Fills booking form → Proceeds to payment (Stripe)
```

### 2. Payment Completed
```
Stripe Payment Success → Webhook Triggered → Emails Sent
```

### 3. Two Emails Sent Automatically:

#### Email #1: Customer Confirmation (Bahasa Inggris)
- **To:** Customer's email (dari form booking)
- **When:** Setelah pembayaran berhasil (payment status = PAID)
- **Subject:** `Payment Confirmed - Booking {ID} | ZBK Limo Tours`
- **Content:**
  - Payment confirmation badge
  - Booking details (ID, vehicle, date, time, location)
  - What to expect (driver arrival info)
  - Contact information
  - Professional design with logo

#### Email #2: Admin Notification
- **To:** zbklimo@gmail.com (PERMANENT - tidak bisa diubah)
- **When:** Setelah pembayaran berhasil (payment status = PAID)
- **Subject:** `🔔 New Paid Booking - {ID} | {Customer Name}`
- **Content:**
  - Payment confirmed badge
  - Customer information (name, email, phone - clickable)
  - Booking details (vehicle, date, time, duration, amount)
  - Location details (pickup, drop-off)
  - Special notes (if any)
  - Link to admin dashboard
  - Action required reminder

## Technical Implementation

### Files Modified:

#### 1. `/src/lib/email.ts`
**Email Templates & Send Function**

```typescript
// SMTP Configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,  // noreplayzbk@gmail.com
    pass: process.env.SMTP_PASS,  // App password
  },
})

// Email Templates
emailTemplates.bookingConfirmation()  // Customer email
emailTemplates.adminNotification()    // Admin email
```

**Features:**
- Logo ZBK menggunakan URL API: `/api/logo`
- Responsive design (mobile-friendly)
- Professional styling
- Bahasa Inggris untuk customer
- Clickable phone & email links untuk admin

#### 2. `/src/app/api/stripe/webhook/route.ts`
**Primary Email Trigger**

Sends emails when Stripe webhook receives `checkout.session.completed` event:

```typescript
if (event.type === 'checkout.session.completed') {
  // Update booking status to PAID
  // Send customer confirmation email
  // Send admin notification to zbklimo@gmail.com
}
```

#### 3. `/src/app/api/stripe/confirm-payment/route.ts`
**Fallback Email Trigger**

Sends emails if webhook hasn't fired (backup mechanism):

```typescript
if (session.payment_status === 'paid') {
  // Update booking status
  // Send both emails (customer + admin)
}
```

## Environment Variables Required

```env
# SMTP Configuration (Email Sending)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreplayzbk@gmail.com
SMTP_PASS=your-app-password-here

# Base URL (for logo and links)
NEXT_PUBLIC_BASE_URL=https://www.zbktransportservices.com

# Admin Email (hardcoded but can override)
ADMIN_EMAIL=zbklimo@gmail.com  # Not used, hardcoded to zbklimo@gmail.com
```

## Email Design Specifications

### Customer Email
- **Header:** Dark navy with ZBK logo (from `/api/logo`)
- **Badge:** Green success badge
- **Content Sections:**
  - Greeting with customer name
  - Booking details table
  - What to expect (yellow info box)
  - Contact information
- **Footer:** Light gray with company info
- **Style:** Clean, professional, not excessive

### Admin Email
- **Header:** Green gradient with money icon (💰)
- **Badge:** Success badge "Payment received"
- **Content Sections:**
  - Customer info (blue box) - Priority section
  - Booking details (gray box)
  - Location details (yellow box)
  - Special notes (red box - if exists)
  - Action required with dashboard link
- **Footer:** Light gray with notification info
- **Style:** Business-oriented, actionable

## Testing

### Test Email Sending (without booking)
```bash
npm run test:email
```

### Test Complete Booking Flow
1. Start development server:
   ```bash
   npm run dev
   ```

2. Make a test booking:
   - Go to: http://localhost:3000
   - Select a vehicle
   - Fill booking form
   - Complete payment (use Stripe test card: `4242 4242 4242 4242`)

3. Check emails:
   - Customer email in customer's inbox
   - Admin email in zbklimo@gmail.com

### Test Stripe Webhook Locally
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

## Email Delivery Flow

### Success Path:
```
Payment Success 
  → Stripe Webhook Triggered
  → Update Booking (status = CONFIRMED, paymentStatus = PAID)
  → Send Customer Email ✓
  → Send Admin Email (zbklimo@gmail.com) ✓
  → Log success
```

### Fallback Path (if webhook fails):
```
User lands on success page
  → Frontend calls /api/stripe/confirm-payment
  → Check if already paid (skip if yes)
  → Update booking if not updated
  → Send both emails ✓
  → Log success
```

### Error Handling:
```
If email sending fails:
  → Log error to console
  → Continue (don't fail payment confirmation)
  → Manual follow-up may be needed
```

## Monitoring & Logs

### Success Logs:
```
✅ Payment confirmed and emails sent
   - Customer email sent to: customer@example.com
   - Admin notification sent to: zbklimo@gmail.com
```

### Error Logs:
```
❌ Failed to send payment confirmation emails: [error message]
```

## Important Notes

### 🔴 Critical Rules:

1. **Admin Email is PERMANENT**
   - Always sends to: `zbklimo@gmail.com`
   - Cannot be changed via environment variable
   - Hardcoded in both webhook and confirm-payment routes

2. **Customer Email Timing**
   - Only sent AFTER payment is confirmed (paymentStatus = PAID)
   - Never sent for pending bookings
   - Requires successful Stripe payment

3. **Language**
   - Customer email: English only
   - Admin email: English (business context)

4. **Logo**
   - Must use API route: `/api/logo`
   - Fallback to public URL if API fails
   - Logo hosted at: `https://www.zbktransportservices.com/api/logo`

### 📧 SMTP Configuration:

**Gmail App Password Setup:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Create new app password for "Mail"
5. Copy password to `.env.local` as `SMTP_PASS`

**Security Notes:**
- Never commit `.env.local` to git
- Use app-specific password, not Gmail password
- Keep `SMTP_PASS` secret

## Troubleshooting

### Emails Not Sending

**Check 1: SMTP Credentials**
```bash
# Verify environment variables are set
echo $SMTP_USER
echo $SMTP_PASS
```

**Check 2: Gmail Settings**
- App password created?
- 2-Step verification enabled?
- "Less secure app access" not needed (using app password)

**Check 3: Server Logs**
```bash
# Look for these logs in console
✅ Payment confirmed and emails sent
❌ Failed to send payment confirmation emails
```

### Webhook Not Triggering

**Check 1: Stripe Webhook Configuration**
- Webhook endpoint added in Stripe Dashboard?
- Webhook secret configured in `.env.local`?

**Check 2: Webhook Events**
- Event type: `checkout.session.completed`
- Webhook status: Active

**Check 3: Fallback Mechanism**
- Confirm-payment route will send emails if webhook fails
- Check browser console for errors

### Logo Not Showing in Email

**Check 1: API Route**
```bash
curl http://localhost:3000/api/logo -o test-logo.png
```

**Check 2: Base URL**
- `NEXT_PUBLIC_BASE_URL` set correctly?
- Using production URL in production?

**Check 3: Email Client**
- Some email clients block external images
- Check spam folder
- Try different email client

## Production Deployment

### Pre-deployment Checklist:
- [ ] SMTP credentials configured in production
- [ ] `NEXT_PUBLIC_BASE_URL` set to production URL
- [ ] Stripe webhook endpoint configured
- [ ] Stripe webhook secret added to env vars
- [ ] Test booking on staging first
- [ ] Verify zbklimo@gmail.com receives test email

### Environment Variables (Production):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreplayzbk@gmail.com
SMTP_PASS=production-app-password
NEXT_PUBLIC_BASE_URL=https://www.zbktransportservices.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Support & Maintenance

### Regular Checks:
- Monitor zbklimo@gmail.com for admin notifications
- Check email delivery rates
- Review SMTP logs for errors
- Update email templates as needed

### Common Updates:
1. **Change Company Info:**
   - Edit `/src/lib/email.ts`
   - Update footer sections

2. **Update Logo:**
   - Replace `/public/logo-website.png`
   - Logo auto-updates via `/api/logo`

3. **Change Email Design:**
   - Edit template in `/src/lib/email.ts`
   - Test with `npm run test:email`

## Related Documentation
- [Logo API Documentation](./LOGO_API_DOCUMENTATION.md)
- [SMTP Configuration](../EMAIL_CONFIGURATION.md)
- [Stripe Integration](./STRIPE_INTEGRATION.md)

---

**Last Updated:** December 2024  
**Maintained By:** ZBK Development Team

