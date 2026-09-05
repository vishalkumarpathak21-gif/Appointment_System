import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER || 'vishalkumarpathak21@gmail.com';
const EMAIL_PASS = (process.env.EMAIL_PASS || 'nnur uqxh qyqw ewrb').replace(/\s+/g, '');

// Create Gmail SMTP Transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.warn('⚠️ Nodemailer Transporter Notice:', error.message);
  } else {
    console.log('✅ Nodemailer Gmail Transporter is ready to send emails from:', EMAIL_USER);
  }
});

/**
 * Send OTP for Sign In or Registration
 */
export async function sendAuthOtpEmail(toEmail, userName, otp, type = 'Sign In') {
  const mailOptions = {
    from: `"DocPulse India Health" <${EMAIL_USER}>`,
    to: toEmail,
    subject: `🔐 Your DocPulse Verification Code: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px 20px; max-width: 550px; margin: 0 auto; border-radius: 16px; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #0d9488; margin: 0; font-size: 26px; font-weight: 900;">DocPulse <span style="color: #14b8a6;">India 🇮🇳</span></h1>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Top Specialists & National Telehealth Network</p>
        </div>

        <div style="background-color: #1e293b; border-radius: 12px; padding: 25px; border: 1px solid #475569; text-align: center;">
          <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">${type} Verification Code</h2>
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.5;">
            Hello <strong>${userName || 'User'}</strong>, use the one-time security code below to complete your ${type.toLowerCase()} request.
          </p>

          <div style="background-color: #0f172a; border: 2px dashed #0d9488; border-radius: 12px; padding: 18px; margin: 25px auto; width: fit-content; min-width: 200px;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #2dd4bf; font-family: monospace;">${otp}</span>
          </div>

          <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">
            ⏳ This code is valid for <strong>10 minutes</strong>. Do NOT share this code with anyone.
          </p>
        </div>

        <div style="margin-top: 25px; text-align: center; color: #64748b; font-size: 11px;">
          <p>© 2026 DocPulse India Health Platform. NMC & ABHA Certified.</p>
          <p>National Emergency Helpline: Dial 108 | 1800-200-5555</p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ ${type} OTP (${otp}) sent to ${toEmail}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Failed to send email to ${toEmail}:`, error.message);
    return { success: false, error: error.message, otp };
  }
}

/**
 * Send OTP for Doctor Appointment Booking
 */
export async function sendBookingOtpEmail(toEmail, patientName, doctorName, date, timeSlot, fee, otp) {
  const mailOptions = {
    from: `"DocPulse India Health" <${EMAIL_USER}>`,
    to: toEmail,
    subject: `🩺 Appointment Booking OTP: ${otp} (Dr. ${doctorName})`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px 20px; max-width: 550px; margin: 0 auto; border-radius: 16px; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #0d9488; margin: 0; font-size: 26px; font-weight: 900;">DocPulse <span style="color: #14b8a6;">India 🇮🇳</span></h1>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Doctor Consultation Slot Verification</p>
        </div>

        <div style="background-color: #1e293b; border-radius: 12px; padding: 25px; border: 1px solid #475569;">
          <h2 style="color: #ffffff; font-size: 18px; margin-top: 0; text-align: center;">Confirm Your Doctor Appointment</h2>
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.5; text-align: center;">
            Hello <strong>${patientName}</strong>, please enter the OTP below to confirm your scheduled consultation.
          </p>

          <div style="background-color: #0f172a; border-radius: 10px; padding: 15px; margin: 15px 0; border: 1px solid #334155; font-size: 13px;">
            <div style="color: #94a3b8; margin-bottom: 5px;">Doctor: <strong style="color: #ffffff;">${doctorName}</strong></div>
            <div style="color: #94a3b8; margin-bottom: 5px;">Slot: <strong style="color: #2dd4bf;">${date} at ${timeSlot}</strong></div>
            <div style="color: #94a3b8;">Consultation Fee: <strong style="color: #4ade80;">₹${fee}</strong></div>
          </div>

          <div style="background-color: #0f172a; border: 2px dashed #0d9488; border-radius: 12px; padding: 16px; margin: 20px auto; width: fit-content; text-align: center; min-width: 200px;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #2dd4bf; font-family: monospace;">${otp}</span>
          </div>

          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-bottom: 0;">
            ⏳ OTP is valid for <strong>10 minutes</strong>.
          </p>
        </div>

        <div style="margin-top: 25px; text-align: center; color: #64748b; font-size: 11px;">
          <p>© 2026 DocPulse India Health Platform. NMC Verified Network.</p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Booking OTP (${otp}) sent to ${toEmail}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Failed to send booking email to ${toEmail}:`, error.message);
    return { success: false, error: error.message, otp };
  }
}

/**
 * Send Booking Confirmation Email
 */
export async function sendBookingConfirmationEmail(toEmail, apt) {
  const mailOptions = {
    from: `"DocPulse India Health" <${EMAIL_USER}>`,
    to: toEmail,
    subject: `✅ Booking Confirmed: ${apt.appointmentCode} (${apt.doctorName})`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px 20px; max-width: 550px; margin: 0 auto; border-radius: 16px; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #0d9488; margin: 0; font-size: 26px; font-weight: 900;">DocPulse <span style="color: #14b8a6;">India 🇮🇳</span></h1>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Appointment Confirmed Successfully</p>
        </div>

        <div style="background-color: #1e293b; border-radius: 12px; padding: 25px; border: 1px solid #475569;">
          <h2 style="color: #4ade80; font-size: 18px; margin-top: 0; text-align: center;">✅ Consultation Booking Confirmed</h2>
          <p style="color: #cbd5e1; font-size: 13px; text-align: center;">
            Booking Reference ID: <strong style="color: #2dd4bf; font-family: monospace;">${apt.appointmentCode}</strong>
          </p>

          <div style="background-color: #0f172a; border-radius: 10px; padding: 15px; margin: 15px 0; border: 1px solid #334155; font-size: 13px;">
            <div style="color: #94a3b8; margin-bottom: 6px;">Doctor: <strong style="color: #ffffff;">${apt.doctorName} (${apt.doctorSpecialty})</strong></div>
            <div style="color: #94a3b8; margin-bottom: 6px;">Hospital: <strong style="color: #ffffff;">${apt.doctorHospital}</strong></div>
            <div style="color: #94a3b8; margin-bottom: 6px;">Date & Time: <strong style="color: #2dd4bf;">${apt.date} at ${apt.timeSlot}</strong></div>
            <div style="color: #94a3b8; margin-bottom: 6px;">Mode: <strong style="color: #38bdf8;">${apt.consultationMode}</strong></div>
            <div style="color: #94a3b8;">Fee Paid: <strong style="color: #4ade80;">₹${apt.fee} (${apt.paymentMethod})</strong></div>
          </div>

          <p style="color: #cbd5e1; font-size: 12px; line-height: 1.5;">
            You can view this appointment and download your digital e-prescription after consultation from your <strong>DocPulse Patient Portal</strong>.
          </p>
        </div>

        <div style="margin-top: 25px; text-align: center; color: #64748b; font-size: 11px;">
          <p>© 2026 DocPulse India Health. 24/7 Helpline: 1800-200-5555 | Dial 108</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send confirmation email:', error.message);
  }
}
