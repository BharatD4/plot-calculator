# 🗺️ Plot Details Calculator

A full-stack GIS web application for measuring land plots using an interactive map. Mark plot boundaries, calculate area and perimeter, convert units, save plots, and export PDF reports.

### 🔗 Links

- **Live App:** https://plot-calculator-lemon.vercel.app
- **Backend API:** https://plot-calculator.onrender.com
- **GitHub:** https://github.com/BharatD4/plot-calculator

> **Note:** The backend runs on Render's free tier and may take 30–50 seconds to wake up after inactivity.

---

## ✨ Features

- 📍 Interactive map with Leaflet & OpenStreetMap
- 🔍 Location search using Nominatim
- 📐 Area & perimeter calculation using Turf.js
- 🔄 Unit conversion: m², ft², yd², acres & hectares
- 🔐 JWT-based authentication
- 💾 Save and manage plots
- 📊 Personal dashboard with plot statistics
- 📄 PDF report generation

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, React-Leaflet  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT, bcrypt  
**GIS:** Leaflet, Turf.js, OpenStreetMap  
**PDF:** jsPDF  
**Deployment:** Vercel, Render, MongoDB Atlas

---

## 📁 Project Structure

```text
plot-calculator/
├── client/                 # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── utils/
│
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
│
└── README.md
```

---

## 🚀 Local Setup

### 1. Clone

```bash
git clone https://github.com/BharatD4/plot-calculator.git
cd plot-calculator
```

### 2. Backend

```bash
cd server
npm install
```

Create `.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run:

```bash
npm run dev
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 📡 API

**Base URL:** `https://plot-calculator.onrender.com/api`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Create account |
| POST | `/auth/login` | User login |
| POST | `/plots/calculate` | Calculate plot measurements |
| POST | `/plots/save` | Save plot |
| GET | `/plots/my-plots` | Get saved plots |
| DELETE | `/plots/:id` | Delete plot |

---

## 🏗️ Architecture

```text
React + Vercel
      │
      ▼
Node.js + Express + Render
      │
      ▼
MongoDB Atlas
```

---

## 📌 Resume Description

> Built and deployed a full-stack GIS land measurement application using React, Node.js, MongoDB, Leaflet, and Turf.js, featuring interactive plot mapping, geospatial calculations, JWT authentication, plot management, and PDF report generation.

---

## 👨‍💻 Author

**Bharat Dewangan**

- GitHub: https://github.com/BharatD4
- Portfolio: https://portfolio-bu28ezytb-bharatd4s-projects.vercel.app