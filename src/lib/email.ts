import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransporter({
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

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"ZBK Luxury Transport" <${process.env.SMTP_USER}>`,
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
  bookingConfirmation: (customerName: string, bookingId: string, vehicleName: string, date: string) => ({
    subject: `Booking Confirmation - ${bookingId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D4AF37, #F7DC6F); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">ZBK Luxury Transport</h1>
        </div>
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">Booking Confirmed!</h2>
          <p>Dear ${customerName},</p>
          <p>Your booking has been confirmed. Here are the details:</p>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Vehicle:</strong> ${vehicleName}</p>
            <p><strong>Date:</strong> ${date}</p>
          </div>
          <p>We will contact you 24 hours before your scheduled pickup time.</p>
          <p>Thank you for choosing ZBK Luxury Transport!</p>
        </div>
        <div style="background: #333; color: white; padding: 15px; text-align: center;">
          <p>ZBK Luxury Transport | Jakarta, Indonesia</p>
        </div>
      </div>
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

  adminNotification: (bookingId: string, customerName: string, vehicleName: string) => ({
    subject: `New Booking Received - ${bookingId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #333; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">ZBK Admin Notification</h1>
        </div>
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">New Booking Received</h2>
          <p>A new booking has been submitted and requires your attention:</p>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Vehicle:</strong> ${vehicleName}</p>
          </div>
          <p>Please log in to the admin dashboard to review and confirm this booking.</p>
          <a href="${process.env.NEXTAUTH_URL}/admin/bookings" style="background: #D4AF37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">
            View Booking
          </a>
        </div>
      </div>
    `
  })
}
