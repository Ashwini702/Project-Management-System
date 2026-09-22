# Project Management System

React/Vite frontend with a Flask, JWT, and MySQL backend. The existing BrowserRouter UI and routes are preserved.

## Backend setup

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
Copy-Item .env.example .env
```

Create MySQL database `project_management_db`, import `database/schema.sql`, then seed and run:

```powershell
python database/seed_demo_users.py
python app.py
```

Backend: `http://localhost:5000`

## Frontend setup

```powershell
npm install
npm run dev -- --port 5175
```

Frontend: `http://localhost:5175`

Demo accounts: `admin@pms.com / Admin@123`, `manager@pms.com / Manager@123`, `team@pms.com / Team@123`, and `client@pms.com / Client@123`.
