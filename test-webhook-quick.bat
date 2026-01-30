@echo off
REM Quick Webhook Test Script for Windows
REM Usage: test-webhook-quick.bat

set WEBHOOK_URL=https://www.zbktransportservices.com/api/stripe/webhook
set WEBHOOK_SECRET=whsec_T4w5S2Jn2MFdSdnpL8hApi6kFwqVFyEj

echo 🧪 Testing Stripe Webhook
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📍 URL: %WEBHOOK_URL%
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Test 1: Check if endpoint is accessible
echo 📡 Test 1: Checking endpoint accessibility...
curl -s -o nul -w "%%{http_code}" -X OPTIONS "%WEBHOOK_URL%"
echo.
echo.

REM Test 2: Send test webhook event
echo 📤 Test 2: Sending test webhook event...
curl -X POST "%WEBHOOK_URL%" ^
  -H "Content-Type: application/json" ^
  -H "stripe-signature: t=%time:~0,2%%time:~3,2%%time:~6,2%,v1=test_signature" ^
  -d "{\"id\":\"evt_test_123\",\"type\":\"checkout.session.completed\",\"data\":{\"object\":{\"id\":\"cs_test_123\",\"payment_status\":\"paid\",\"status\":\"complete\",\"amount_total\":10000,\"currency\":\"usd\",\"customer_email\":\"test@example.com\",\"payment_intent\":\"pi_test_123\",\"metadata\":{\"bookingId\":\"test_booking_123\"}}}}" ^
  -w "\n\nStatus: %%{http_code}\n" ^
  -v

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ Test completed!
echo.
echo 💡 Tips:
echo    - Check server logs for [STRIPE WEBHOOK] messages
echo    - For proper signature verification, use Stripe CLI
echo    - See WEBHOOK_TESTING_GUIDE.md for more methods

pause

