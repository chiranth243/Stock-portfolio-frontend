# Stock-portfolio-Frontend

This is the **React.js frontend** for the **Asset View Product** platform, a full-stack application to manage portfolios, track asset prices in real time, and provide dynamic insights with Redis-powered data.

## 🚀 Live Demo

🔗 [Frontend Live on Render](https://stock-portfolio-frontend-zxb0.onrender.com)

---

## 🧩 Features

- 💡 Responsive and modern UI using **React.js** and **external scoped CSS**
- 🔐 JWT-based user authentication (Login, Signup, Protected Routes)
- 📈 Dynamic portfolio and asset views
- 🔁 Real-time asset price updates using **WebSocket/Redis**
- 🌐 Seamless integration with **Node.js** backend API
- 📦 External API integration for real-time asset data (CRON jobs via backend)
- 📱 Mobile-friendly layout and animations

---

## 📁 Project Structure
src/
├── assets/ # Icons, images
├── components/ # Reusable components (Header, Sidebar, etc.)
├── pages/ # Page-level components (Dashboard, Login, etc.)
├── services/ # API calls using Axios
├── styles/ # External CSS files (scoped module-wise)
├── utils/ # Helper functions
├── Main.js # Routing (React Router)
└── App.js # Entry wrapper

---

## 🛠️ Tech Stack

- **Frontend**: React.js, External CSS (Modular or Component-based)
- **Routing**: React Router v6
- **State Management**: React Hooks
- **Auth**: JWT (Token stored in localStorage)
- **API Calls**: Axios
- **WebSocket**: Socket.io-client for live updates

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/asset-view-frontend.git
cd asset-view-frontend
npm install
npm start

Create a .env file in the root:
REACT_APP_BASE_URL=https://your-backend-url.onrender.com

📤 Deployment on Render
Go to https://render.com

Create new Static Site

Connect to your GitHub repo

Set:

Build Command: npm run build

Publish Directory: build

Environment Variable: REACT_APP_BASE_URL=https://your-backend-url.onrender.com
