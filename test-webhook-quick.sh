#!/bin/bash

# Quick Webhook Test Script
# Usage: ./test-webhook-quick.sh

WEBHOOK_URL="https://www.zbktransportservices.com/api/stripe/webhook"
WEBHOOK_SECRET="whsec_T4w5S2Jn2MFdSdnpL8hApi6kFwqVFyEj"

echo "🧪 Testing Stripe Webhook"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 URL: $WEBHOOK_URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test 1: Check if endpoint is accessible
echo "📡 Test 1: Checking endpoint accessibility..."
response=$(curl -s -o /dev/null -w "%{http_code}" -X OPTIONS "$WEBHOOK_URL")
if [ "$response" == "200" ] || [ "$response" == "405" ]; then
    echo "✅ Endpoint is accessible (Status: $response)"
else
    echo "⚠️  Endpoint returned status: $response"
fi
echo ""

# Test 2: Send test webhook event
echo "📤 Test 2: Sending test webhook event..."
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "stripe-signature: t=$(date +%s),v1=test_signature" \
  -d '{
    "id": "evt_test_'$(date +%s)'",
    "type": "checkout.session.completed",
    "data": {
      "object": {
        "id": "cs_test_'$(date +%s)'",
        "payment_status": "paid",
        "status": "complete",
        "amount_total": 10000,
        "currency": "usd",
        "customer_email": "test@example.com",
        "payment_intent": "pi_test_'$(date +%s)'",
        "metadata": {
          "bookingId": "test_booking_'$(date +%s)'"
        }
      }
    }
  }' \
  -w "\n\nStatus: %{http_code}\n" \
  -v

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Test completed!"
echo ""
echo "💡 Tips:"
echo "   - Check server logs for [STRIPE WEBHOOK] messages"
echo "   - For proper signature verification, use Stripe CLI"
echo "   - See WEBHOOK_TESTING_GUIDE.md for more methods"

