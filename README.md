🩺 PRECRIPTO

Precripto is a full‑stack healthcare appointment and prescription management platform built using the MERN stack. It enables patients to book doctor appointments, doctors to manage schedules and prescriptions, and admins to control and monitor the entire system — all from dedicated dashboards.

This project was built as a team effort with a strong focus on real‑world healthcare workflows, scalability, and clean system architecture.

---

👥 Team
- Vikas A R
- Sampreeth C H
- Saroj Kumar Sah
- Sanjan R

---

🚀 Features

👤 Patient (Frontend)
- User authentication (signup / login)  
- Browse doctors by specialization  
- Book & manage appointments  
- Online payment integration using Razorpay  
- View appointment history  

👨‍⚕️ Doctor Dashboard
- Doctor authentication  
- View scheduled appointments  
- Mark appointments as completed or cancelled  
- Manage availability  

🛠️ Admin Dashboard
- Admin authentication  
- Add and manage doctors  
- View all users and appointments  
- Platform‑wide control and monitoring  

---

🧱 Tech Stack

Frontend & Admin  
- React (Vite)  
- React Router  
- Context API  
- Axios  
- Tailwind CSS  

Backend  
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JWT Authentication  

Other Services  
- Cloudinary – Image uploads  
- Razorpay – Online payments  
- Render – Backend deployment  
- Vercel – Frontend & Admin deployment  

---

🗂️ Project Structure
`
PRECRIPTO/
│
├── frontend/     # Patient‑side application
├── admin/        # Admin dashboard
├── backend/      # Express server & APIs
└── README.md
`

---

⚙️ Environment Variables

Backend (backend/.env)  
`
MONGODB_URI=
CLOUDINARY_NAME=
CLOUDINARYAPIKEY=
CLOUDINARYSECRETKEY=
ADMIN_EMAIL=
ADMIN_PASSWORD=
JWT_SECRET=
RAZORPAYKEYID=
RAZORPAYKEYSECRET=
CURRENCY=INR
NODE_ENV=production
PORT=4000
`

Frontend (frontend/.env)  
`
VITEBACKENDURL=
VITERAZORPAYKEY_ID=
`

Admin (admin/.env)  
`
VITEBACKENDURL=
`

⚠️ Never commit .env files to GitHub. All secrets are configured in deployment platforms.

---

▶️ Running Locally

1. Clone the repository  
   `bash
   git clone <repo-url>
   cd PRECRIPTO
   `
2. Start Backend  
   `bash
   cd backend
   npm install
   npm start
   `
3. Start Frontend  
   `bash
   cd frontend
   npm install
   npm run dev
   `
4. Start Admin  
   `bash
   cd admin
   npm install
   npm run dev
   `

---

🌐 Deployment (Vercel Setup)

When deploying the frontend on Vercel:

- Vercel Team: Vicky's projects  
- Scope: Hobby  
- Project Name: precripto  
- Framework Preset: Vite  
- Root Directory: frontend  
- Build Command:  
  `bash
  vite build
  `
- Output Directory:  
  `
  dist
  `
- Install Command:  
  `
  npm install
  `
  (alternatively: yarn install, pnpm install, bun install)  

Environment variables are configured directly in Vercel dashboard.

---

🎯 Key Highlights
- Clean role‑based architecture (Patient / Doctor / Admin)  
- Secure JWT‑based authentication  
- Real‑time appointment status handling  
- Payment workflow integration  
- Scalable monorepo structure  

---

📌 Future Enhancements
- Email & SMS notifications  
- Doctor availability calendar  
- Prescription PDF generation  
- Analytics dashboard for admin  

---

📄 License
This project is for educational and demonstration purposes.  

Built with ❤️ by Team Vikas A R, Sampreeth C H, Saroj Kumar Sah & Sanjan R

---
