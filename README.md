# 📧 Automated Email Scheduler (MERN Stack)

This is a full-stack Email Scheduler built using the **MERN** stack (MongoDB, Express.js, React, Node.js) that allows users to:

- Schedule one-time or recurring emails 🕐
- Add image or file attachments 📎
- Choose delay, time-based, or recurring schedule 🌀

---

## 🌐 Live Demo

- **Frontend (Vercel)**: [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
- **Backend (Render)**: [https://your-backend.onrender.com](https://your-backend.onrender.com)

---

## 🚀 Features

- ✅ Schedule email at a specific time
- ⏳ Send email after delay (in seconds)
- 🔁 Recurring scheduling (e.g., every hour, every Monday)
- 🖼️ Add image/file as attachment
- 🧾 Easy-to-use React-based form
- 🛡️ Uses Gmail SMTP for email sending

---

## 🧰 Tech Stack

- **Frontend**: React + Vite + Tailwind (optional)
- **Backend**: Node.js + Express + Nodemailer + node-cron
- **Database**: MongoDB (future enhancement)
- **Deployment**: 
  - Frontend → Vercel
  - Backend → Render

---

## 📂 Project Structure

Email Sender/
├── client/ # React frontend (Vercel)
│ └── src/
│ └── components/
│ └── EmailScheduler.jsx
├── server/ # Express backend (Render)
│ └── server.js
├── .gitignore
├── README.md

yaml
Copy
Edit

---

## 🛠️ Setup Instructions (Local)

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/automated-emails-scheduler.git
cd automated-emails-scheduler
2. Setup Backend (server)
bash
Copy
Edit
cd server
npm install
🔐 Create .env file:
env
Copy
Edit
EMAIL=your-email@gmail.com
PASS=your-app-password
bash
Copy
Edit
node server.js
3. Setup Frontend (client)
bash
Copy
Edit
cd ../client
npm install
npm run dev
4. Open in browser:
arduino
Copy
Edit
http://localhost:5173
🌍 Deployment
🔹 Backend (Render)
Go to https://render.com

Create new Web Service

Set root directory to server

Add environment variables:

EMAIL

PASS

Start command: node server.js

🔹 Frontend (Vercel)
Go to https://vercel.com

Import GitHub repo

Set root directory to client

Environment variables (if any)

Deploy 🎉

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.

📜 License
MIT License

👨‍💻 Author
Made with ❤️ by @Shrish Gupta

