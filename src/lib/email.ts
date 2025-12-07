import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text, from }: EmailOptions & { from?: string }) {
  try {
    // Default to zbklimo@gmail.com if not specified
    const fromEmail = from || process.env.SMTP_USER || 'zbklimo@gmail.com'
    const fromName = 'ZBK Limo Tours'
    
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      text,
      html,
    })

    console.log('Email sent: %s', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: (error as Error).message }
  }
}

// Email templates
export const emailTemplates = {
  // Email untuk Customer - Konfirmasi booking sudah diterima
  bookingConfirmation: (
    customerName: string, 
    bookingId: string, 
    vehicleName: string, 
    date: string,
    pickupLocation?: string,
    pickupTime?: string
  ) => ({
    subject: `Booking Request Received - ${bookingId} | ZBK Limo Tours`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                      <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #28a745, #20c997); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 40px; color: white;">✓</span>
                      </div>
                      <h2 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 28px; font-weight: 600;">
                        Booking Request Received!
                      </h2>
                      <p style="color: #666666; margin: 0; font-size: 16px; line-height: 1.6;">
                        Thank you for choosing ZBK Limo Tours
                      </p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #e8f5e9, #c8e6c9); padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #28a745;">
                      <p style="color: #1a1a2e; margin: 0; font-size: 16px; line-height: 1.8; text-align: center;">
                        <strong style="color: #28a745; font-size: 18px;">Dear ${customerName},</strong><br><br>
                        Your booking request has been successfully received! Our team at ZBK Limo Tours will review your request and contact you shortly to confirm the details.
                      </p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0; border-radius: 5px;">
                      <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                        Your Booking Details
                      </h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 40%;"><strong>Booking ID:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${bookingId}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Vehicle:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${vehicleName}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Date:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${date}</td>
                        </tr>
                        ${pickupTime ? `
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Pickup Time:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${pickupTime}</td>
                        </tr>
                        ` : ''}
                        ${pickupLocation ? `
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Pickup Location:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${pickupLocation}</td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #fff3cd, #ffeaa7); padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #D4AF37;">
                      <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; text-align: center;">
                        What Happens Next?
                      </h3>
                      <div style="color: #1a1a2e; font-size: 14px; line-height: 1.8;">
                        <p style="margin: 10px 0;">
                          <strong style="color: #D4AF37;">1. Review Process</strong><br>
                          Our team will review your booking request within 24 hours.
                        </p>
                        <p style="margin: 10px 0;">
                          <strong style="color: #D4AF37;">2. Confirmation Call</strong><br>
                          We will contact you via phone or email to confirm all details and answer any questions.
                        </p>
                        <p style="margin: 10px 0;">
                          <strong style="color: #D4AF37;">3. Final Confirmation</strong><br>
                          Once confirmed, you will receive a final confirmation email with all the details.
                        </p>
                      </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 30px; border-top: 2px solid #e9ecef;">
                      <p style="color: #666666; margin: 0; font-size: 14px; line-height: 1.8;">
                        If you have any urgent questions or need to make changes to your booking,<br>
                        please don't hesitate to contact us directly.
                      </p>
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
                      Thank you for choosing ZBK Limo Tours. We look forward to serving you!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  }),

  bookingStatusUpdate: (customerName: string, bookingId: string, status: string) => ({
    subject: `Booking Update - ${bookingId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D4AF37, #F7DC6F); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">ZBK Luxury Transport</h1>
        </div>
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">Booking Status Update</h2>
          <p>Dear ${customerName},</p>
          <p>Your booking status has been updated:</p>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>New Status:</strong> <span style="color: #D4AF37; font-weight: bold;">${status}</span></p>
          </div>
          <p>If you have any questions, please don't hesitate to contact us.</p>
        </div>
        <div style="background: #333; color: white; padding: 15px; text-align: center;">
          <p>ZBK Luxury Transport | Jakarta, Indonesia</p>
        </div>
      </div>
    `
  }),

  // Email untuk Admin (zbklimo@gmail.com) - Notifikasi ada booking baru
  adminNotification: (
    bookingId: string, 
    customerName: string, 
    customerEmail: string,
    customerPhone: string,
    vehicleName: string,
    vehicleModel: string,
    service: string,
    startDate: string,
    startTime: string,
    pickupLocation: string,
    dropoffLocation: string,
    duration: string,
    totalAmount: number,
    notes?: string
  ) => ({
    subject: `🔔 New Booking Request - ${bookingId} | Action Required`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
          <tr>
            <td style="padding: 20px 0; text-align: center;">
              <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #dc3545 0%, #c82333 50%, #bd2130 100%); padding: 40px 30px; text-align: center;">
                    <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 30px; color: white;">🔔</span>
                    </div>
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                      NEW BOOKING REQUEST
                    </h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                      Action Required - Review & Confirm
                    </p>
                  </td>
                </tr>
                
                <!-- Alert Banner -->
                <tr>
                  <td style="background: #fff3cd; padding: 15px 30px; border-left: 4px solid #ffc107;">
                    <p style="margin: 0; color: #856404; font-size: 14px; font-weight: 600;">
                      ⚠️ A new booking has been submitted and requires your immediate attention.
                    </p>
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <div style="background-color: #f8f9fa; border-left: 4px solid #dc3545; padding: 20px; margin-bottom: 30px; border-radius: 5px;">
                      <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                        Booking Information
                      </h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 35%;"><strong>Booking ID:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${bookingId}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Service Type:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${service}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Vehicle:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${vehicleName} ${vehicleModel ? `(${vehicleModel})` : ''}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Date:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${startDate}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Time:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${startTime}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Duration:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${duration}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Total Amount:</strong></td>
                          <td style="padding: 8px 0; color: #28a745; font-size: 14px; font-weight: 600;">$${totalAmount.toFixed(2)}</td>
                        </tr>
                      </table>
                    </div>
                    
                    <div style="background-color: #e7f3ff; border-left: 4px solid #007bff; padding: 20px; margin-bottom: 30px; border-radius: 5px;">
                      <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                        Customer Information
                      </h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 35%;"><strong>Name:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">${customerName}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Email:</strong></td>
                          <td style="padding: 8px 0; color: #007bff; font-size: 14px;">
                            <a href="mailto:${customerEmail}" style="color: #007bff; text-decoration: none;">${customerEmail}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Phone:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">
                            <a href="tel:${customerPhone}" style="color: #1a1a2e; text-decoration: none;">${customerPhone}</a>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <div style="background-color: #f8f9fa; border-left: 4px solid #6c757d; padding: 20px; margin-bottom: 30px; border-radius: 5px;">
                      <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                        Location Details
                      </h3>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 35%; vertical-align: top;"><strong>Pickup:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${pickupLocation}</td>
                        </tr>
                        ${dropoffLocation ? `
                        <tr>
                          <td style="padding: 8px 0; color: #666666; font-size: 14px; vertical-align: top;"><strong>Drop-off:</strong></td>
                          <td style="padding: 8px 0; color: #1a1a2e; font-size: 14px;">${dropoffLocation}</td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>
                    
                    ${notes ? `
                    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin-bottom: 30px; border-radius: 5px;">
                      <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                        Additional Notes
                      </h3>
                      <p style="color: #856404; margin: 0; font-size: 14px; line-height: 1.6;">
                        ${notes}
                      </p>
                    </div>
                    ` : ''}
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 30px; border-top: 2px solid #e9ecef;">
                      <p style="color: #666666; margin: 0 0 20px 0; font-size: 14px; line-height: 1.8;">
                        Please review this booking request and contact the customer to confirm all details.
                      </p>
                      <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/bookings" 
                         style="background: #D4AF37; color: #1a1a2e; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: 600; font-size: 14px;">
                        View in Admin Dashboard
                      </a>
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
                      Admin Notification System
                    </p>
                    <p style="color: #666666; margin: 20px 0 0 0; font-size: 11px; border-top: 1px solid #333; padding-top: 15px;">
                      This is an automated notification. Please respond to the customer within 24 hours.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  })
}
