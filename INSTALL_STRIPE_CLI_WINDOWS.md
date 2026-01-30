# Install Stripe CLI di Windows

## Method 1: Menggunakan Scoop (Recommended)

### Step 1: Install Scoop (jika belum ada)
```powershell
# Buka PowerShell sebagai Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

### Step 2: Install Stripe CLI
```powershell
scoop install stripe
```

### Step 3: Verify Installation
```powershell
stripe --version
```

## Method 2: Download Manual

### Step 1: Download Stripe CLI
1. Buka: https://github.com/stripe/stripe-cli/releases/latest
2. Download file: `stripe_X.X.X_windows_x86_64.zip` (atau versi terbaru)
3. Extract ZIP file ke folder (misalnya: `C:\stripe-cli\`)

### Step 2: Add to PATH
1. Buka "Environment Variables"
   - Tekan `Win + R`, ketik `sysdm.cpl`, Enter
   - Klik tab "Advanced" → "Environment Variables"
2. Edit "Path" variable
   - Pilih "Path" → "Edit"
   - Klik "New" → Tambahkan path ke folder stripe (misalnya: `C:\stripe-cli`)
   - Klik "OK" di semua dialog
3. Restart PowerShell

### Step 3: Verify Installation
```powershell
stripe --version
```

## Method 3: Menggunakan Chocolatey (jika sudah install)

```powershell
choco install stripe-cli
```

## Setup Stripe CLI

### Step 1: Login
```powershell
stripe login
```
Ini akan membuka browser untuk autentikasi.

### Step 2: Test Connection
```powershell
stripe config --list
```

## Menggunakan Stripe CLI untuk Test Webhook

### Forward Webhook ke Production
```powershell
stripe listen --forward-to https://www.zbktransportservices.com/api/stripe/webhook
```

### Di Terminal Lain, Trigger Test Event
```powershell
# Trigger checkout.session.completed
stripe trigger checkout.session.completed

# Trigger payment failed
stripe trigger checkout.session.async_payment_failed
```

## Alternative: Test Tanpa Stripe CLI

Jika tidak ingin install Stripe CLI, gunakan metode lain:

### 1. Menggunakan cURL (sudah ada di Windows 10/11)
```powershell
curl -X POST https://www.zbktransportservices.com/api/stripe/webhook `
  -H "Content-Type: application/json" `
  -H "stripe-signature: t=1234567890,v1=test" `
  -d '{\"id\":\"evt_test\",\"type\":\"checkout.session.completed\",\"data\":{\"object\":{\"id\":\"cs_test\",\"payment_status\":\"paid\",\"status\":\"complete\",\"metadata\":{\"bookingId\":\"test_123\"}}}}'
```

### 2. Menggunakan PowerShell Script
```powershell
# test-webhook.ps1
$webhookUrl = "https://www.zbktransportservices.com/api/stripe/webhook"
$body = @{
    id = "evt_test_$(Get-Date -Format 'yyyyMMddHHmmss')"
    type = "checkout.session.completed"
    data = @{
        object = @{
            id = "cs_test_$(Get-Date -Format 'yyyyMMddHHmmss')"
            payment_status = "paid"
            status = "complete"
            amount_total = 10000
            currency = "usd"
            customer_email = "test@example.com"
            payment_intent = "pi_test_$(Get-Date -Format 'yyyyMMddHHmmss')"
            metadata = @{
                bookingId = "test_booking_$(Get-Date -Format 'yyyyMMddHHmmss')"
            }
        }
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $body -ContentType "application/json" -Headers @{"stripe-signature"="t=$(Get-Date -UFormat %s),v1=test"}
```

### 3. Menggunakan Stripe Dashboard (Paling Mudah)
1. Buka: https://dashboard.stripe.com → Developers → Webhooks
2. Klik webhook endpoint Anda
3. Klik "Send test webhook"
4. Pilih event dan kirim

## Troubleshooting

### "stripe: command not found"
- Pastikan Stripe CLI sudah di PATH
- Restart PowerShell setelah install
- Coba gunakan full path: `C:\stripe-cli\stripe.exe --version`

### "Permission denied"
- Jalankan PowerShell sebagai Administrator
- Atau install ke user directory, bukan system directory

### Webhook tidak terima event
- Pastikan webhook URL accessible dari internet
- Cek firewall/security rules
- Cek logs di server untuk error messages

