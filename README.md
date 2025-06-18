# ⭐ AI Tools Explorer

An interactive full-stack web app to browse, search, and favorite AI tools.

---

## 🔧 Tech Stack

- 🖥️ Frontend: React (Vite or CRA)
- 🔗 Backend: Node.js + Express
- 📦 Data: Static JSON
- ⚙️ Chart Library: Recharts
- 🎉 Extras: Confetti, Dark Mode, Favorites

---

## 🚀 Features

- 🔍 Browse & filter AI tools by category
- ❤️ Favorite tools (stored in memory)
- 💡 Dark Mode toggle
- 📊 Chart showing number of tools by category
- 🔠 Search tools by name
- 🎉 Confetti animation on adding to favorites
- 📱 Mobile responsive UI
- ⚠️ Full error handling and loading spinners

---

## 📁 Project Structure

/client # React frontend
/server # Express backend

---

## 🖼️ Screenshots

### 🏠 Home Page
"C:\Users\91998\Pictures\Screenshots\Screenshot 2025-06-18 162533.png"

### ❤️ Favorites Page
![Home](./screenshots/home.png)

### 🌙 Dark Mode
![Dark Mode](./screenshots/dark-mode.png)

### 📊 Category Chart
![Chart](./screenshots/chart.png)


---

## 📦 How to Run

### 🔹 Backend (server)

```bash
cd server
npm install
node index.js
# Runs on http://localhost:5000
🔹 Frontend (client)
bash
Copy
Edit
cd client
npm install
npm start
# Runs on http://localhost:3000
🔄 API Endpoints
GET /api/tools — Get all tools

GET /api/tools?category=Writing — Filter tools

POST /api/favorites — Add to favorites

GET /api/favorites — List favorites

DELETE /api/favorites/:id — Remove from favorite
