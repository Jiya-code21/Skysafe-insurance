const nodemailer = require('nodemailer');

// ================= TRANSPORT =================
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS
  }
});

// ================= COMMON TEMPLATE WRAPPER =================
function baseTemplate(title, content, footerNote = "") {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="520" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#1a73e8,#0d47a1);padding:30px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-size:24px;">✈️ SkySafe</h1>
                <p style="margin:5px 0 0;color:#dfe6ff;font-size:13px;">AI-powered income protection</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:35px;">
                <h2 style="margin-top:0;color:#1a73e8;">${title}</h2>
                ${content}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8f9fa;padding:20px;text-align:center;font-size:12px;color:#888;">
                ${footerNote || "© 2026 SkySafe. All rights reserved."}
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

// ================= OTP EMAIL =================
async function sendOTPEmail(toEmail, toName, otp) {
  try {
    const content = `
      <p>Hello <b>${toName}</b>,</p>
      <p>Your verification code is:</p>

      <div style="text-align:center;margin:25px 0;">
        <span style="display:inline-block;background:#f0f7ff;padding:18px 40px;
        border-radius:10px;font-size:32px;font-weight:bold;letter-spacing:8px;color:#1a73e8;">
          ${otp}
        </span>
      </div>

      <p>This OTP is valid for <b>10 minutes</b>.</p>
      <p style="color:#999;font-size:13px;">If you didn’t request this, ignore this email.</p>
    `;

    await transporter.sendMail({
      from: `"${process.env.BREVO_SENDER_NAME}" <${process.env.BREVO_SENDER_EMAIL}>`,
      to: toEmail,
      subject: "SkySafe - OTP Verification",
      html: baseTemplate("Verify Your Account", content)
    });

    console.log("✅ OTP email sent");
    return true;
  } catch (err) {
    console.error("❌ OTP email error:", err.message);
    return false;
  }
}

// ================= WELCOME EMAIL =================
async function sendWelcomeEmail(toEmail, toName) {
  try {
    const content = `
      <p>Hey <b>${toName}</b>,</p>
      <p>Welcome to <b>SkySafe</b> 🚀</p>

      <p>You are now protected against unexpected income loss caused by disruptions like:</p>

      <ul style="line-height:1.8;">
        <li>🌧️ Heavy Rain</li>
        <li>🌫️ Air Pollution</li>
        <li>🔥 Extreme Heat</li>
        <li>🚫 Curfews / Strikes</li>
      </ul>

    
    `;

    await transporter.sendMail({
      from: `"${process.env.BREVO_SENDER_NAME}" <${process.env.BREVO_SENDER_EMAIL}>`,
      to: toEmail,
      subject: "Welcome to SkySafe 🎉",
      html: baseTemplate("Welcome Aboard!", content)
    });

    console.log("✅ Welcome email sent");
    return true;
  } catch (err) {
    console.error("❌ Welcome email error:", err.message);
    return false;
  }
}

// ================= FORGOT PASSWORD =================
async function sendForgotPasswordEmail(toEmail, toName, otp) {
  try {
    const content = `
      <p>Hello <b>${toName}</b>,</p>
      <p>We received a password reset request.</p>

      <div style="text-align:center;margin:25px 0;">
        <span style="display:inline-block;background:#fff5f5;padding:18px 40px;
        border-radius:10px;font-size:32px;font-weight:bold;letter-spacing:8px;color:#e53935;">
          ${otp}
        </span>
      </div>

      <p>This OTP is valid for <b>10 minutes</b>.</p>
      <p style="color:#999;font-size:13px;">If you didn’t request this, ignore this email.</p>
    `;

    await transporter.sendMail({
      from: `"${process.env.BREVO_SENDER_NAME}" <${process.env.BREVO_SENDER_EMAIL}>`,
      to: toEmail,
      subject: "Reset Your Password - SkySafe",
      html: baseTemplate("Password Reset", content)
    });

    console.log("✅ Forgot password email sent");
    return true;
  } catch (err) {
    console.error("❌ Forgot password error:", err.message);
    return false;
  }
}

// ================= EXPORT =================
module.exports = {
  sendOTPEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail
};