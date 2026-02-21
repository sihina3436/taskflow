# 📝 Modern Todo Management App

A full-stack **Todo Management System** built using **React, Redux Toolkit, Node.js, Express, and MongoDB**.

This application allows users to manage daily tasks with authentication, modern dashboard UI, reminders, and real-time updates.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- Login with JWT Authentication
- Forgot Password (OTP Email)
- Reset Password
- Update Password
- Protected Routes

### 📋 Todo Management
- Create Tasks
- Update Task Status
- Delete Tasks
- Mark Tasks as Completed
- Priority Levels (Low / Medium / High)
- Due Date Tracking
- Overdue & Urgent Alerts

### 🎨 Dashboard UI
- Modern Task Cards
- Status Dropdown UI
- Task Statistics
- Responsive Layout
- Clean Tailwind Design

### ⚡ Advanced
- Reminder System
- Socket Integration
- RTK Query API Handling
- Secure Password Hashing (bcrypt)

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Redux Toolkit + RTK Query
- React Router
- Tailwind CSS
- Remix Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Nodemailer (OTP Email)
- Socket.io

---

## 📂 Project Structure

### Backend
backend/
│
├── src/
│ ├── config/
│ ├── controller/
│ ├── middleware/
│ ├── models/
│ ├── router/
│ ├── types/
│ └── utils/
│
├── index.ts
├── package.json
└── tsconfig.json


---

### Frontend
frontend/
│
├── src/
│ ├── assets/
│ ├── componets/
│ │ ├── dashboard/
│ │ ├── Layout.tsx
│ │ ├── Navbar.tsx
│ │ └── Sidebar.tsx
│ │
│ ├── pages/
│ ├── redux/
│ │ ├── authentication/
│ │ ├── category/
│ │ └── todo/
│ │
│ ├── router/
│ ├── util/
│ ├── App.tsx
│ └── main.tsx



---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/todo-management-app.git

cd backend
npm install

cd frontend
npm install

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password

---

## 🎉 Done
