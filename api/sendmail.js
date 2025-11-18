import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { name, email, phone, service, message } = req.body || {};

  // Basic server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Name, email and message are required." });
  }

  // Build email content (both text and HTML)
  const subject = `Website inquiry from ${name}`;
  const textBody = `
New inquiry from website:

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Service: ${service || "N/A"}

Message:
${message}
  `;

  const htmlBody = `
    <h2>New website inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "N/A")}</p>
    <p><strong>Service:</strong> ${escapeHtml(service || "N/A")}</p>
    <hr/>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    // Create transporter using Office365 SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // TLS will be used
      auth: {
        user: process.env.MAIL_USER, // e.g. info@prodigyconsults.com.ng
        pass: process.env.MAIL_PASS  // app password or mailbox password if allowed
      },
      tls: {
        ciphers: "TLSv1.2"
      }
    });

    // send the message
    const info = await transporter.sendMail({
      from: `"Prodigy Consults" <${process.env.MAIL_USER}>`, // sender
      to: process.env.MAIL_TO || process.env.MAIL_USER,     // recipient(s)
      replyTo: email,                                      // user's email for easy reply
      subject,
      text: textBody,
      html: htmlBody
    });

    return res.status(200).json({ success: true, messageId: info.messageId });

  } catch (err) {
    console.error("sendmail error:", err);
    return res.status(500).json({ success: false, error: "Failed to send email" });
  }
}

/* Simple helper to avoid HTML injection in email body */
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
