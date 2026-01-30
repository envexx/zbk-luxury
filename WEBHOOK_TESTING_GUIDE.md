# Guide: Testing Stripe Webhook

## Webhook Configuration

- **Webhook URL**: `https://www.zbktransportservices.com/api/stripe/webhook`
- **Webhook Secret**: `whsec_T4w5S2Jn2MFdSdnpL8hApi6kFwqVFyEj`

## Method 1: Using Stripe CLI (Recommended)

### Install Stripe CLI
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows (using Scoop)
scoop install stripe

# Or download from: https://stripe.com/docs/stripe-cli
```

### Login to Stripe
```bash
stripe login
```

### Forward Webhooks to Local/Production
```bash
# For local testing
stripe listen --forward-to http://localhost:3000/api/stripe/webhook

# For production testing
stripe listen --forward-to https://www.zbktransportservices.com/api/stripe/webhook
```

### Trigger Test Event
```bash
# Trigger checkout.session.completed event
stripe trigger checkout.session.completed

# Trigger payment failed event
stripe trigger checkout.session.async_payment_failed
```

## Method 2: Using cURL

### Test with Mock Event
```bash
curl -X POST https://www.zbktransportservices.com/api/stripe/webhook \
  -H "Content-Type: application/json" \
  -H "stripe-signature: t=1234567890,v1=test_signature" \
  -d '{
    "id": "evt_test_123",
    "type": "checkout.session.completed",
    "data": {
      "object": {
        "id": "cs_test_123",
        "payment_status": "paid",
        "status": "complete",
        "amount_total": 10000,
        "currency": "usd",
        "customer_email": "test@example.com",
        "payment_intent": "pi_test_123",
        "metadata": {
          "bookingId": "test_booking_123"
        }
      }
    }
  }'
```

### Test with Node.js Script
```bash
# Set environment variables
export WEBHOOK_URL=https://www.zbktransportservices.com/api/stripe/webhook
export WEBHOOK_SECRET=whsec_T4w5S2Jn2MFdSdnpL8hApi6kFwqVFyEj

# Run test script
node scripts/test-webhook.js
```

## Method 3: Using Stripe Dashboard

### Step 1: Configure Webhook Endpoint
1. Go to: [Stripe Dashboard](https://dashboard.stripe.com) → Developers → Webhooks
2. Click "Add endpoint"
3. Enter endpoint URL: `https://www.zbktransportservices.com/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_failed`
5. Click "Add endpoint"

### Step 2: Get Webhook Secret
1. After creating endpoint, click on it
2. Click "Reveal" next to "Signing secret"
3. Copy the secret (should start with `whsec_`)
4. Add to your `.env` file:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_T4w5S2Jn2MFdSdnpL8hApi6kFwqVFyEj
   ```

### Step 3: Send Test Event
1. In the webhook endpoint page, click "Send test webhook"
2. Select event type: `checkout.session.completed`
3. Click "Send test webhook"
4. Check the response and logs

## Method 4: Using Test Endpoint

### Test Endpoint
```bash
# GET - Check if endpoint is available
curl https://www.zbktransportservices.com/api/stripe/test-webhook

# POST - Create test event
curl -X POST https://www.zbktransportservices.com/api/stripe/test-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "checkout.session.completed",
    "bookingId": "test_booking_123"
  }'
```

## Verification Steps

### 1. Check Webhook is Receiving Events
Look for logs with prefix `[STRIPE WEBHOOK]`:
```
🟢 [STRIPE WEBHOOK] Webhook received at: ...
🟢 [STRIPE WEBHOOK] Event type: checkout.session.completed
✅ [STRIPE WEBHOOK] Webhook processed successfully
```

### 2. Check Signature Verification
```
🟢 [STRIPE WEBHOOK] Webhook secret configured: true
🟢 [STRIPE WEBHOOK] Verifying webhook signature...
✅ [STRIPE WEBHOOK] Signature verified successfully
```

### 3. Check Booking Update
```
🟢 [STRIPE WEBHOOK] Updating booking payment status...
✅ [STRIPE WEBHOOK] Booking updated: { paymentStatus: 'PAID', status: 'CONFIRMED' }
```

### 4. Check Email Sending
```
🟢 [STRIPE WEBHOOK] Sending confirmation emails...
✅ [STRIPE WEBHOOK] Customer email sent successfully
✅ [STRIPE WEBHOOK] Admin notification sent successfully
```

## Troubleshooting

### Webhook Not Receiving Events
- ✅ Check CORS headers are set correctly
- ✅ Check webhook URL is accessible from internet
- ✅ Check firewall/security rules allow Stripe IPs
- ✅ Check logs for any errors

### Signature Verification Failed
- ✅ Verify `STRIPE_WEBHOOK_SECRET` matches the secret from Stripe Dashboard
- ✅ Ensure secret is from the correct webhook endpoint
- ✅ Check that raw body is not modified by middleware

### Payment Not Updating
- ✅ Check webhook logs for received events
- ✅ Verify `bookingId` is in session metadata
- ✅ Check database for booking updates
- ✅ Check fallback endpoint `/api/stripe/confirm-payment`

## Production Checklist

- [ ] Webhook endpoint configured in Stripe Dashboard
- [ ] `STRIPE_WEBHOOK_SECRET` set in production environment
- [ ] Webhook URL is accessible (test with curl)
- [ ] Events are being received (check logs)
- [ ] Signature verification is working
- [ ] Booking updates are happening
- [ ] Emails are being sent

## Security Notes

⚠️ **Important**: 
- Never expose webhook secret in client-side code
- Always verify webhook signatures in production
- Use HTTPS for webhook endpoints
- Monitor webhook logs for suspicious activity

