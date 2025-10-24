Battery Management System

A simple backend and frontend system for managing and monitoring battery data (voltage, current, temperature, etc.) from electric vehicles.
Built using Node.js + Express.js + MongoDB Atlas with a lightweight HTML frontend for data entry and search.

📦 Features

🚀 RESTful APIs for CRUD operations on battery data

☁️ MongoDB Atlas integration (persistent cloud database)

💻 Frontend UI for adding and searching data

📊 Search battery info by:

Battery ID

Field (voltage, current, temperature)

Date range

⚙️ Ready to deploy on Vercel

🧱 Project Structure
battery-api/
├── server.js          # Main backend server (Express + MongoDB)
├── index.html         # Frontend web UI (data entry + search)
├── package.json       # Node.js dependencies
├── README.md          # Documentation (this file)

🛠️ Technologies Used
Component	Technology
Backend Framework	Node.js (Express.js)
Database	MongoDB Atlas (Cloud)
Frontend	HTML, CSS, JavaScript
Deployment	Vercel
⚙️ Setup Instructions (Local)
1️⃣ Clone the Repository
git clone https://github.com/yourusername/battery-api.git
cd battery-api

2️⃣ Install Dependencies
npm install

3️⃣ Setup MongoDB Atlas

Go to MongoDB Atlas

Create a free cluster

Click on “Connect” → “Connect your application”

Copy the connection string like:

mongodb+srv://<username>:<password>@cluster0.mongodb.net/batteryDB


Replace <username> and <password> with your actual credentials.

4️⃣ Update server.js

Replace this line:

mongoose.connect("YOUR_MONGO_URI")


with:

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/batteryDB")

5️⃣ Run Locally
node server.js


✅ If successful, you’ll see:

🚀 Server running on http://localhost:3000
✅ Connected to MongoDB Atlas


Then open http://localhost:3000
 in your browser.

🧪 Test with Postman
➕ POST /api/battery/data

Stores new battery data.

URL:

http://localhost:3000/api/battery/data


Body (JSON):

{
  "battery_id": "1001",
  "current": 15.3,
  "voltage": 48.7,
  "temperature": 36.2,
  "time": "2025-10-24T10:00:00Z"
}


Response:

{ "success": true, "message": "Data saved successfully" }

🔍 GET /api/battery/:id

Fetch all data for a given battery.

GET http://localhost:3000/api/battery/1001

⚡ GET /api/battery/:id/:field

Fetch a specific field (e.g., voltage) for that battery.

GET http://localhost:3000/api/battery/1001/voltage

🕓 GET /api/battery/:id/:field?start=&end=

Fetch field data between two timestamps.

GET http://localhost:3000/api/battery/1001/voltage?start=2025-10-24T00:00:00Z&end=2025-10-24T23:59:59Z

💻 Frontend Interface

When you open http://localhost:3000, you’ll see:

📤 Add Battery Data form (for POST)

🔍 Retrieve Battery Data form (for GET)

Both appear side-by-side on desktop and stack on mobile.

You can:

Add new records

Search by ID / field / time range

See results displayed below the form

☁️ Deployment on Vercel

1️⃣ Push your project to GitHub

git add .
git commit -m "Ready for Vercel deploy"
git push


2️⃣ Go to https://vercel.com

3️⃣ Import your GitHub repo

4️⃣ In “Project Settings” → “Environment Variables”, add:

MONGO_URI = your MongoDB connection string


5️⃣ Build Command:

npm install


6️⃣ Output Directory: (leave blank)

7️⃣ Click Deploy

After a few seconds, your live app will be available at:

https://battery-api.vercel.app

📚 API Endpoints Summary
Method	Endpoint	Description
POST	/api/battery/data	Store new battery data
GET	/api/battery/:id	Retrieve all data for a battery
GET	/api/battery/:id/:field	Retrieve a specific field
GET	/api/battery/:id/:field?start=&end=	Retrieve field data in time range
📄 License

This project is open source and available under the MIT License
.

👨‍💻 Author

Vamshi
Built with ❤️ using Node.js, Express.js, and MongoDB Atlas.
