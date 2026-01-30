# Test Database Connection Script
# Usage: .\test-db-connection.ps1

Write-Host "🔵 Testing Database Connection..." -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (Test-Path .env.local) {
    Write-Host "✅ .env.local found" -ForegroundColor Green
    
    # Check if DATABASE_URL exists
    $dbUrl = Get-Content .env.local | Select-String "DATABASE_URL" | Where-Object { $_.Line -notmatch "^#" }
    
    if ($dbUrl) {
        Write-Host "✅ DATABASE_URL found in .env.local" -ForegroundColor Green
        $urlPreview = ($dbUrl.Line -split "=")[1].Trim()
        if ($urlPreview.Length -gt 50) {
            $urlPreview = $urlPreview.Substring(0, 50) + "..."
        }
        Write-Host "   URL preview: $urlPreview" -ForegroundColor Gray
    } else {
        Write-Host "❌ DATABASE_URL not found or commented out" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ .env.local not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔵 Testing connection via API endpoint..." -ForegroundColor Cyan

# Test connection via API
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/test-db-connection" -Method GET -ErrorAction Stop
    
    if ($response.success) {
        Write-Host ""
        Write-Host "✅ Database connection successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Database Stats:" -ForegroundColor Cyan
        Write-Host "   Users: $($response.data.userCount)" -ForegroundColor White
        Write-Host "   Vehicles: $($response.data.vehicleCount)" -ForegroundColor White
        Write-Host "   Bookings: $($response.data.bookingCount)" -ForegroundColor White
        Write-Host "   Database Version: $($response.data.dbVersion)" -ForegroundColor White
        Write-Host ""
        Write-Host "✅ Connection test completed successfully!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Database connection failed!" -ForegroundColor Red
        Write-Host "   Error: $($response.message)" -ForegroundColor Yellow
        if ($response.error) {
            Write-Host "   Details: $($response.error.message)" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host ""
    Write-Host "❌ Failed to connect to API endpoint" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Make sure:" -ForegroundColor Cyan
    Write-Host "   1. Server is running (npm run dev)" -ForegroundColor White
    Write-Host "   2. Server is accessible at http://localhost:3000" -ForegroundColor White
    Write-Host "   3. DATABASE_URL is set correctly in .env.local" -ForegroundColor White
}

