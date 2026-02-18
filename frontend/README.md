# 🦕 Dino Camp Roster

A full-stack web application for managing a summer camp roster.  
This project allows users to view, manage, and organize campers using a PostgreSQL database and a modern React frontend.

---

## 🚀 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express

### Database
- PostgreSQL

---

## ✨ Features

- View camp roster
- Store camper data in a PostgreSQL database
- Backend API for managing camper information
- Responsive, modern frontend UI

---

# 🛠️ Getting Started

Follow these steps to run the project locally.

---

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd dino-camp-roster
```

## 2️⃣ Set Up the Database
Make sure PostgreSQL is installed and running.

Create the database:
```bash
psql -U postgres -c "CREATE DATABASE dinocamp;"
Run schema and seed files:
psql -U postgres -d dinocamp -f db/schema.sql
psql -U postgres -d dinocamp -f db/seed.sql
```

## 3️⃣ Configure Environment Variables
Copy the example environment file:

```bash
cp .env.example .env
```

Update your .env file to include:

```bash
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/dinocamp
```

Replace YOUR_PASSWORD with your PostgreSQL password.

## 4️⃣ Install Dependencies
Backend
```bash
cd backend
npm install
```

Frontend
```bash
cd ..
npm install
```

## 5️⃣ Run the Application
Start the Backend
```bash
cd backend
npm start
```
Backend typically runs at:

http://localhost:3000
Start the Frontend
```bash
npm run dev
```
Frontend typically runs at:

http://localhost:5173
📂 Project Structure
backend/        → Express API and database connection
src/            → React frontend
db/             → Database schema and seed files
.env            → Environment variables
🧪 Troubleshooting
❗ Missing "dev" script?
Use:

```bash
npm start
```

for the backend.

❗ Database connection errors?
Verify:

PostgreSQL is running

The database exists

Your DATABASE_URL is correct

❗ psql not recognized?
Ensure PostgreSQL is added to your system PATH.

👩‍💻 Author
Olivia Springer
Information Systems Student
Brigham Young University