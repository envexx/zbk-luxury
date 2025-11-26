import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, emailTemplates } from '@/lib/email'

// Test email endpoint
export async function POST(request: NextRequest) {
  try {
    const { to, type = 'test' } = await request.json()

    if (!to) {
      return NextResponse.json({
        success: false,
        error: 'Email address is required'
      }, { status: 400 })
    }

    let emailResult;

    switch (type) {
      case 'booking':
        // Test booking confirmation email
        const customerTemplate = emailTemplates.bookingConfirmation(
          'Test Customer',
          'TEST-001',
          'Toyota Alphard',
          new Date().toLocaleDateString()
        )
        
        emailResult = await sendEmail({
          to,
          subject: customerTemplate.subject,
          html: customerTemplate.html
        })
        break;

      case 'admin':
        // Test admin notification email
        const adminTemplate = emailTemplates.adminNotification(
          'TEST-001',
          'Test Customer',
          'Toyota Alphard'
        )
        
        emailResult = await sendEmail({
          to,
          subject: adminTemplate.subject,
          html: adminTemplate.html
        })
        break;

      default:
        // Test basic email
        emailResult = await sendEmail({
          to,
          subject: 'ZBK Luxury Transport - Email Test',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #D4AF37, #F7DC6F); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">ZBK Luxury Transport</h1>
              </div>
              <div style="padding: 20px; background: #f9f9f9;">
                <h2 style="color: #333;">Email Configuration Test</h2>
                <p>This is a test email to verify SMTP configuration.</p>
                <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                <p>If you receive this email, your SMTP configuration is working correctly!</p>
              </div>
              <div style="background: #333; color: white; padding: 15px; text-align: center;">
                <p>ZBK Luxury Transport | Jakarta, Indonesia</p>
              </div>
            </div>
          `
        })
    }

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        messageId: emailResult.messageId
      })
    } else {
      return NextResponse.json({
        success: false,
        error: emailResult.error
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error sending test email:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to send test email'
    }, { status: 500 })
  }
}

// GET endpoint to show test form
export async function GET() {
  return new Response(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>ZBK Email Test</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #D4AF37; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #C9A227; }
        .result { margin-top: 20px; padding: 10px; border-radius: 4px; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
      </style>
    </head>
    <body>
      <h1>🚗 ZBK Luxury Transport - Email Test</h1>
      <p>Test your SMTP configuration by sending test emails.</p>
      
      <form id="emailForm">
        <div class="form-group">
          <label for="email">Email Address:</label>
          <input type="email" id="email" name="email" required placeholder="test@example.com">
        </div>
        
        <div class="form-group">
          <label for="type">Email Type:</label>
          <select id="type" name="type">
            <option value="test">Basic Test Email</option>
            <option value="booking">Booking Confirmation</option>
            <option value="admin">Admin Notification</option>
          </select>
        </div>
        
        <button type="submit">Send Test Email</button>
      </form>
      
      <div id="result"></div>
      
      <script>
        document.getElementById('emailForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const email = document.getElementById('email').value;
          const type = document.getElementById('type').value;
          const resultDiv = document.getElementById('result');
          
          resultDiv.innerHTML = '<p>Sending email...</p>';
          
          try {
            const response = await fetch('/api/test-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ to: email, type })
            });
            
            const result = await response.json();
            
            if (result.success) {
              resultDiv.innerHTML = \`<div class="result success">
                <strong>✅ Success!</strong><br>
                Email sent to: \${email}<br>
                Message ID: \${result.messageId || 'N/A'}
              </div>\`;
            } else {
              resultDiv.innerHTML = \`<div class="result error">
                <strong>❌ Error!</strong><br>
                \${result.error}
              </div>\`;
            }
          } catch (error) {
            resultDiv.innerHTML = \`<div class="result error">
              <strong>❌ Network Error!</strong><br>
              \${error.message}
            </div>\`;
          }
        });
      </script>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  })
}
