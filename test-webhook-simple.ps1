# Simple Webhook Test dengan cURL
# Usage: .\test-webhook-simple.ps1

$webhookUrl = "https://www.zbktransportservices.com/api/stripe/webhook"

Write-Host "🧪 Simple Webhook Test" -ForegroundColor Cyan
Write-Host "URL: $webhookUrl" -ForegroundColor Yellow
Write-Host ""

# Simple test dengan minimal payload
$json = '{"id":"evt_test_123","type":"checkout.session.completed","data":{"object":{"id":"cs_test","payment_status":"paid","status":"complete","metadata":{"bookingId":"test_123"}}}}'

Write-Host "Sending test event..." -ForegroundColor Green
curl.exe -X POST "$webhookUrl" `
    -H "Content-Type: application/json" `
    -H "stripe-signature: t=1234567890,v1=test" `
    -d $json

Write-Host "`n✅ Done! Check server logs for [STRIPE WEBHOOK] messages" -ForegroundColor Green

