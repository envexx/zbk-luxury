/**
 * Script untuk mengirim test email ke zbklimo@gmail.com
 * 
 * Usage:
 * node scripts/send-test-email.js
 * 
 * Pastikan environment variables sudah di-set:
 * - SMTP_HOST=smtp.gmail.com
 * - SMTP_PORT=587
 * - SMTP_USER=ompekp@gmail.com
 * - SMTP_PASS=your-app-password
 */

require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'zbklimo@gmail.com',
    pass: process.env.SMTP_PASS,
  },
});

// Test email HTML template
const testEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ZBK Limo Tours - Test Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
    <tr>
      <td style="padding: 20px 0; text-align: center;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #D4AF37; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">
                ZBK LIMO TOURS
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                & Transportation Services
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #D4AF37, #F7DC6F); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 40px; color: white;">✓</span>
                </div>
                <h2 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 28px; font-weight: 600;">
                  Email Configuration Test
                </h2>
                <p style="color: #666666; margin: 0; font-size: 16px; line-height: 1.6;">
                  This is a test email to verify that your SMTP configuration is working correctly.
                </p>
              </div>
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0; border-radius: 5px;">
                <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                  Test Details
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 40%;"><strong>From Email:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">ompekp@gmail.com</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>To Email:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">zbklimo@gmail.com</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Timestamp:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore', dateStyle: 'full', timeStyle: 'long' })}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Status:</strong></td>
                    <td style="padding: 8px 0; color: #28a745; font-size: 14px; font-weight: 600;">✓ Successfully Sent</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 25px; border-radius: 8px; margin: 30px 0; text-align: center;">
                <p style="color: #1a1a2e; margin: 0; font-size: 16px; line-height: 1.8;">
                  <strong style="color: #D4AF37;">Congratulations!</strong><br>
                  If you are reading this email, it means your email configuration is working perfectly. 
                  You can now send booking confirmations, notifications, and other important communications to your customers.
                </p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 30px; border-top: 2px solid #e9ecef;">
                <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                  About ZBK Limo Tours
                </h3>
                <p style="color: #666666; margin: 0 0 15px 0; font-size: 14px; line-height: 1.8;">
                  ZBK Limo Tours & Transportation Services is a premium luxury transportation company 
                  based in Singapore, providing exceptional limousine and vehicle rental services for 
                  weddings, corporate events, airport transfers, and special occasions.
                </p>
                <div style="background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 5px; padding: 15px; margin-top: 20px;">
                  <p style="margin: 0; color: #1a1a2e; font-size: 14px; line-height: 1.8;">
                    <strong style="color: #D4AF37;">📍 Address:</strong><br>
                    Jurong West Street 65<br>
                    ZBK Limo Tours & Transportation Services<br>
                    Singapore 640635
                  </p>
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
              <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 14px;">
                <strong>ZBK Limo Tours & Transportation Services</strong>
              </p>
              <p style="color: #D4AF37; margin: 0 0 15px 0; font-size: 14px;">
                Premium Luxury Transportation in Singapore
              </p>
              <div style="margin: 20px 0;">
                <p style="color: #999999; margin: 5px 0; font-size: 12px;">
                  📧 Email: zbklimo@gmail.com
                </p>
                <p style="color: #999999; margin: 5px 0; font-size: 12px;">
                  📍 Jurong West Street 65, Singapore 640635
                </p>
              </div>
              <p style="color: #666666; margin: 20px 0 0 0; font-size: 11px; border-top: 1px solid #333; padding-top: 15px;">
                This is an automated test email. Please do not reply to this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

async function sendTestEmail() {
  try {
    console.log('📧 Preparing to send test email...');
    console.log('From: zbklimo@gmail.com');
    console.log('To: zbklimo@gmail.com');
    
    if (!process.env.SMTP_PASS) {
      console.error('❌ Error: SMTP_PASS is not set in environment variables');
      console.log('\nPlease set the following in your .env.local file:');
      console.log('SMTP_HOST=smtp.gmail.com');
      console.log('SMTP_PORT=587');
      console.log('SMTP_USER=zbklimo@gmail.com');
      console.log('SMTP_PASS=your-app-password');
      console.log('\nNote: For Gmail, you need to use an App Password, not your regular password.');
      console.log('Get it from: https://myaccount.google.com/apppasswords');
      process.exit(1);
    }

    const info = await transporter.sendMail({
      from: '"ZBK Limo Tours" <zbklimo@gmail.com>',
      to: 'zbklimo@gmail.com',
      subject: 'ZBK Limo Tours - Test Email Configuration',
      html: testEmailHTML,
      text: `ZBK Limo Tours - Test Email\n\nThis is a test email to verify SMTP configuration.\n\nTimestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' })}\n\nIf you receive this email, your SMTP configuration is working correctly!`,
    });

    console.log('\n✅ Test email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('📧 Check zbklimo@gmail.com inbox for the email.');
    console.log('\n✨ Email should arrive within a few seconds.');
    
  } catch (error) {
    console.error('\n❌ Error sending test email:');
    console.error(error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Authentication failed. Please check:');
      console.log('1. SMTP_USER and SMTP_PASS are correct');
      console.log('2. For Gmail, use App Password (not regular password)');
      console.log('3. Enable "Less secure app access" or use App Password');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n💡 Connection failed. Please check:');
      console.log('1. SMTP_HOST and SMTP_PORT are correct');
      console.log('2. Internet connection is working');
    }
    
    process.exit(1);
  }
}

// Run the script
sendTestEmail();

