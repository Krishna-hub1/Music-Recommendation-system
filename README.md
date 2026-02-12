🎵 Music Recommendation System (Full Stack)

A full-stack Music Recommendation Web App that allows users to search songs and get music recommendations.
Built with a modern frontend and a Flask backend, this project demonstrates real-world skills like API integration, UI component design, backend routing, and recommendation logic.

🚀 Features

✅ Search songs instantly
✅ Get music recommendations based on search
✅ Clean UI with Left Panel + Right Panel layout
✅ Flask backend API integration
✅ Modular frontend structure
✅ Easy to run locally

🛠️ Tech Stack
Frontend

React.js

JavaScript

HTML5 + CSS3

Backend

Python

Flask

REST API


⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Krishna-hub1/music-recommendation-system.git
cd music-recommendation-system

🖥️ Backend Setup (Flask)
2️⃣ Go to backend folder
cd backend

3️⃣ Create virtual environment
python -m venv venv

4️⃣ Activate environment
Windows
venv\Scripts\activate

Mac/Linux
source venv/bin/activate

5️⃣ Install dependencies
pip install -r requirements.txt

6️⃣ Run Flask server
python app.py


Backend runs on:

http://127.0.0.1:5000

🌐 Frontend Setup (React)
7️⃣ Go to frontend folder
cd ../frontend

8️⃣ Install packages
npm install

9️⃣ Start React app
npm run dev


Frontend runs on:

http://localhost:5173

🔗 API Endpoints
🔍 Search Songs

GET

/search?song=<song_name>

🎯 Get Recommendations

GET

/recommend?song=<song_name>

📌 How It Works

User searches for a song from the UI

Frontend calls backend API using api.js

Flask receives request and processes the song query

Recommendation logic returns a list of similar songs

UI displays the results on the right panel
