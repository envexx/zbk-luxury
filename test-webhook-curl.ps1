# Test Stripe Webhook dengan cURL
# Usage: .\test-webhook-curl.ps1

$webhookUrl = "https://www.zbktransportservices.com/api/stripe/webhook"
$timestamp = [Math]::Floor([decimal](Get-Date -UFormat %s))

Write-Host "🧪 Testing Stripe Webhook dengan cURL" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📍 URL: $webhookUrl" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check OPTIONS (CORS preflight)
Write-Host "📡 Test 1: Checking CORS (OPTIONS request)..." -ForegroundColor Green
$optionsResponse = curl.exe -X OPTIONS "$webhookUrl" -s -o $null -w "%{http_code}"
Write-Host "   Status Code: $optionsResponse" -ForegroundColor $(if ($optionsResponse -eq "200" -or $optionsResponse -eq "405") { "Green" } else { "Yellow" })
Write-Host ""

# Test 2: Send test webhook event
Write-Host "📤 Test 2: Sending test webhook event..." -ForegroundColor Green
Write-Host "   Event Type: checkout.session.completed" -ForegroundColor Gray
Write-Host "   Timestamp: $timestamp" -ForegroundColor Gray
Write-Host ""

$testEvent = @{
    id = "evt_test_$timestamp"
    type = "checkout.session.completed"
    data = @{
        object = @{
            id = "cs_test_$timestamp"
            payment_status = "paid"
            status = "complete"
            amount_total = 10000
            currency = "usd"
            customer_email = "test@example.com"
            payment_intent = "pi_test_$timestamp"
            metadata = @{
                bookingId = "test_booking_$timestamp"
            }
        }
    }
} | ConvertTo-Json -Depth 10

Write-Host "📋 Request Body:" -ForegroundColor Cyan
Write-Host $testEvent -ForegroundColor Gray
Write-Host ""

# Send POST request
Write-Host "⏳ Sending request..." -ForegroundColor Yellow
$response = curl.exe -X POST "$webhookUrl" `
    -H "Content-Type: application/json" `
    -H "stripe-signature: t=$timestamp,v1=test_signature" `
    -H "User-Agent: Stripe-Webhook-Test/1.0" `
    -d $testEvent `
    -w "`n`nHTTP Status: %{http_code}`nTime: %{time_total}s`n" `
    -v 2>&1

Write-Host ""
Write-Host "📥 Response:" -ForegroundColor Cyan
Write-Host $response

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ Test completed!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   - Check server logs for [STRIPE WEBHOOK] messages" -ForegroundColor Gray
Write-Host "   - Status 200 = Success" -ForegroundColor Gray
Write-Host "   - Status 400 = Signature verification failed (expected for test)" -ForegroundColor Gray
Write-Host "   - For proper testing, use Stripe Dashboard → Send test webhook" -ForegroundColor Gray

