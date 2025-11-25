import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, service, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { 
        rejectUnauthorized: false
      }
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `New Website Contact Form Submission - ${service || 'General Inquiry'}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%); padding: 40px 20px; min-height: 500px;">
          <div style="background-color: white; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="border-bottom: 3px solid #DC2626; padding-bottom: 20px; margin-bottom: 30px;">
              <h2 style="color: #1E3A8A; margin: 0; font-size: 24px;">🎯 New Contact Form Submission</h2>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">From Prodigy Logistics Website</p>
            </div>
            
            <!-- Contact Information -->
            <div style="margin-bottom: 30px;">
              <div style="display: flex; margin-bottom: 15px;">
                <span style="color: #DC2626; font-weight: bold; min-width: 120px;">Name:</span>
                <span style="color: #333;">${name}</span>
              </div>
              <div style="display: flex; margin-bottom: 15px;">
                <span style="color: #DC2626; font-weight: bold; min-width: 120px;">Email:</span>
                <span style="color: #333;"><a href="mailto:${email}" style="color: #DC2626; text-decoration: none;">${email}</a></span>
              </div>
              <div style="display: flex; margin-bottom: 15px;">
                <span style="color: #DC2626; font-weight: bold; min-width: 120px;">Phone:</span>
                <span style="color: #333;">${phone || "Not provided"}</span>
              </div>
              <div style="display: flex;">
                <span style="color: #DC2626; font-weight: bold; min-width: 120px;">Service:</span>
                <span style="color: #333; background-color: #fef2f2; padding: 4px 12px; border-radius: 20px;">${service || "Not specified"}</span>
              </div>
            </div>

            <!-- Message -->
            <div style="background-color: #f9fafb; padding: 20px; border-left: 4px solid #1E3A8A; border-radius: 6px; margin-bottom: 30px;">
              <p style="color: #DC2626; font-weight: bold; margin: 0 0 15px 0;">Message:</p>
              <p style="color: #333; white-space: pre-wrap; margin: 0; line-height: 1.6;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>

            <!-- Footer -->
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 6px; text-align: center; border-top: 2px solid #e5e7eb;">
              <p style="color: #666; margin: 0; font-size: 14px;">
                <strong>Prodigy Logistics & Procurement Services</strong><br>
                Supply Chain Solutions for Modern Businesses<br>
                <a href="https://prodigyconsults.com.ng" style="color: #DC2626; text-decoration: none;">Visit our website</a>
              </p>
            </div>

          </div>

          <!-- Auto-reply note -->
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>This email was sent from the Prodigy Logistics website contact form at ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Auto-reply to user
    const userAutoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "We received your message - Prodigy Logistics",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
          <div style="background-color: white; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #DC2626; margin-bottom: 20px;">✓ We've received your message!</h2>
            <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
              Hi ${name},<br><br>
              Thank you for reaching out to Prodigy Logistics. We've received your message and appreciate your interest in our services.
            </p>
            <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
              Our team will review your inquiry and get back to you as soon as possible, typically within 24 business hours.
            </p>
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #666; margin: 0;"><strong>In the meantime:</strong></p>
              <ul style="color: #666; margin: 10px 0 0 20px;">
                <li>Explore our <a href="https://prodigyconsults.com.ng/services/" style="color: #DC2626;">services</a></li>
                <li>Check out our <a href="https://prodigyconsults.com.ng/portfolio/" style="color: #DC2626;">portfolio</a></li>
                <li>Learn <a href="https://prodigyconsults.com.ng/about/" style="color: #DC2626;">about us</a></li>
              </ul>
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
              © 2024 Prodigy Logistics & Procurement Services. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(userAutoReplyOptions);

    return res.status(200).json({ 
      success: true, 
      message: "Message sent successfully! We'll get back to you soon."
    });

  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({ 
      error: "Failed to send email", 
      details: err.message 
    });
  }
}