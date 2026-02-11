// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// Catch-all route for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const nodemailer = require("nodemailer");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Katalyst IT Solutions site running on http://localhost:${PORT}`);
});