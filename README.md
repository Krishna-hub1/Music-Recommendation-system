# 🎵 Music Recommendation System

A full-stack **Music Recommendation Web App** built using **React** (Frontend) and **Python Flask** (Backend).  
This project allows users to **search songs** and get **recommended songs** using backend API endpoints.

---

## 🚀 Features

- 🔍 Search songs instantly
- 🎯 Get music recommendations
- 🧩 Modular UI (LeftPanel + RightPanel)
- ⚡ React + Flask API integration
- 🧼 Clean project structure

---

## 🛠️ Technologies Used

- **React**
- **JavaScript**
- **HTML / CSS**
- **Python**
- **Flask**
- **REST API**

---

```bash


⚙️ Installation & Setup
1) Clone the repository
git clone https://github.com/Krishna-hub1/music-recommendation-system.git
cd music-recommendation-system

🐍 Backend Setup (Flask)

2) Go to backend folder
cd backend

3) Install dependencies
pip install -r requirements.txt

4) Run backend server
python app.py

Backend runs on:

http://127.0.0.1:5000

⚛️ Frontend Setup (React)
1) Go to frontend folder
cd ../frontend

2) Install packages
npm install

4) Run frontend
npm run dev

Frontend runs on:

http://localhost:5173

🔗 API Endpoints
Endpoint	Method	Description
/search?song=<song_name>	GET	Search songs
/recommend?song=<song_name>	GET	Get recommendations

🧠 How It Works
User searches for a song from the React UI

React sends a request to Flask using src/lib/api.js

Flask processes the request and returns results

UI displays searched songs and recommended songs
