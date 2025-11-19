import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: "New Website Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Message sent successfully!" });

  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({ error: "Failed to send email", details: err.message });
  }
}