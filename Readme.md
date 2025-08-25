Employee Management System

A full-stack web application for managing employees, attendance, and roles. Built with Spring Boot (Java), React.js, and MySQL, it provides a professional dashboard with CRUD operations, reporting, and secure authentication.

🚀 Features

👥 Employee CRUD (Add, Edit, Delete, View)

📅 Attendance tracking & reports

🔑 Authentication & role-based access (Admin/User)

📊 Dashboard with search & filters

⚙️ Tech Stack
Backend: Spring Boot, Spring Data JPA, Hibernate

Frontend: React.js, Axios, Bootstrap

Database: MySQL


# Backend (Spring Boot)
cd backend
mvn spring-boot:run

# Frontend (React)
cd frontend
npm install
npm run dev


Backend: http://localhost:8080

Frontend: http://localhost:5173

📌 API Examples

POST /api/auth/register → Register user

GET /api/employees → List employees

POST /api/attendance → Mark attendance

🤝 Contribution

Fork the repo

Create a branch (feature-xyz)

Commit & push

Create a Pull Request
