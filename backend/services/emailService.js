const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async ({ to, subject, html, text }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email service credentials not configured');
    return;
  }

  try {
    await transporter.sendMail({
      from: `Vehicle Showroom <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

const generateTestDriveEmailTemplate = (data) => {
  return `
    <div>
      <h2>Test Drive Confirmation</h2>
      <p>Hi ${data.name},</p>
      <p>Thank you for scheduling a test drive with us! Here are the details:</p>
      <ul>
        <li><strong>Vehicle:</strong> ${data.vehicleModel}</li>
        <li><strong>Date:</strong> ${data.preferredDate}</li>
        <li><strong>Time:</strong> ${data.preferredTime}</li>
      </ul>
      <p>Our team will reach out to you shortly to confirm the appointment.</p>
      <p>Best regards,<br/>Vehicle Showroom Team</p>
    </div>
  `;
};

const generateBookingEmailTemplate = (data) => {
  return `
    <div>
      <h2>Booking Confirmation</h2>
      <p>Hi ${data.name},</p>
      <p>Thank you for booking the ${data.model} with us! Here are your booking details:</p>
      <ul>
        <li><strong>Booking ID:</strong> ${data.bookingId}</li>
        <li><strong>Vehicle:</strong> ${data.model}</li>
        <li><strong>Color:</strong> ${data.color}</li>
        <li><strong>Variant:</strong> ${data.variant || 'Not specified'}</li>
      </ul>
      <p>Our sales representative will contact you soon to discuss the next steps.</p>
      <p>Best regards,<br/>Vehicle Showroom Team</p>
    </div>
  `;
};

module.exports = {
  sendEmail,
  generateTestDriveEmailTemplate,
  generateBookingEmailTemplate
};
