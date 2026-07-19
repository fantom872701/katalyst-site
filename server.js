// server.js
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Health check (Render uses this to keep service alive)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Static files
app.use(express.static(path.join(__dirname)));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contact form
app.post("/contact", async (req, res) => {
  const { name, email, company, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Katalyst IT Solutions" <${process.env.MAIL_USER}>`,
      to: "fantom872701@gmail.com",
      subject: "New Contact Form Submission",
      text: `
Name: ${name}
Email: ${email}
Company: ${company}
Message:
${message}
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false });
  }
});

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Crash protection
process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Katalyst IT Solutions running on http://localhost:${PORT}`);
});
