const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST: /api/schedule
app.post(
  "/api/schedule",
  upload.fields([{ name: "image" }, { name: "attachment" }]),
  async (req, res) => {
    const { subject, body, recipients, send_time, delay, recur } = req.body;
    const image = req.files?.image?.[0];
    const attachment = req.files?.attachment?.[0];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients.split(","),
      subject,
      html: `<p>${body}</p>${image ? `<img src="cid:image1"/>` : ""}`,
      attachments: [
        ...(image
          ? [{ filename: image.originalname, path: image.path, cid: "image1" }]
          : []),
        ...(attachment
          ? [{ filename: attachment.originalname, path: attachment.path }]
          : []),
      ],
    };

    const sendEmail = async () => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      try {
        await transporter.sendMail(mailOptions);
        console.log("📧 Email sent successfully.");
      } catch (error) {
        console.error("❌ Email error:", error);
      }
    };

    // Schedule logic
    if (delay) {
      setTimeout(sendEmail, parseInt(delay) * 1000);
    } else if (send_time) {
      const [hour, minute] = send_time.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute, 0);
      if (date < new Date()) date.setDate(date.getDate() + 1); // next day if time already passed
      const delayMs = date - new Date();
      setTimeout(sendEmail, delayMs);
    } else if (recur) {
      const rules = {
        "2s": "*/2 * * * * *",
        "10min": "*/10 * * * *",
        hourly: "0 * * * *",
        daily: "30 10 * * *",
        monday: "0 9 * * 1",
        wednesday: "15 13 * * 3",
      };
      const cronExp = rules[recur];
      if (cronExp) {
        schedule.scheduleJob(cronExp, sendEmail);
      }
    } else {
      await sendEmail(); // immediate
    }

    res.status(200).json({ message: "Scheduled successfully!" });
  }
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
