Travel Planner – Smart Trip Management Platform

A modern full-stack travel planning application that helps users plan, manage, and experience trips effortlessly.
From itinerary creation to emergency support, everything is designed with real-world usability and clean UX in mind.

🚀 Features Overview
🔐 Authentication

Secure login using JWT authentication

Protected routes for logged-in users only

🧳 Trip Management

Create, edit, and delete trips

Auto trip status:

Upcoming

Ongoing

Completed

Trip type support (Beach, Work, Leisure, International, etc.)

📊 Dashboard

Current active trip overview

Countdown to trip start

Quick access to itinerary, checklist, map, and emergency tools

Clean, premium UI (desktop & mobile responsive)

📅 Itinerary & Timeline

Auto-generate day-wise timeline

Day-based planning view

Horizontal / vertical timeline UI

Editable descriptions for each day

📦 Smart Packing Checklist

Auto-generated checklist based on trip type:

Beach → Sunscreen, Slippers

Cold → Jacket, Gloves

International → Passport, Adapter

Manual checklist items

Mark items as packed/unpacked

🚗 Transport Notes

Add travel details:

Flight

Train

Bus

Store tickets, timings, and notes per trip

⭐ Favorite / Must-Visit Places

Add places you want to visit

Mark places as visited

Notes for each place

Integrated with map view

🗺️ Interactive Map

Destination location

Favorite places markers

Visited place highlights

Built using OpenStreetMap + Leaflet

🚨 Emergency Helper

City-based emergency contacts

Static fallback numbers:

Police – 100

Ambulance – 108

Fire – 101

Emergency – 112

Panic-friendly UI with large buttons

Designed for real emergency scenarios

🛠️ Tech Stack
Backend (Spring Boot)

Java + Spring Boot

Spring Security + JWT

JPA / Hibernate

MySQL

RESTful APIs

Frontend (React)

React (CRA)

React Router

Tailwind CSS

Lucide Icons

Leaflet Maps

🧱 Project Structure
travel-planner/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   └── security/
│
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── api/
│   ├── App.js
│   └── index.css
│
└── README.md

⚙️ Setup Instructions
🔧 Backend Setup

Open backend in Spring Tool Suite / IntelliJ

Configure application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/travel_planner
spring.datasource.username=root
spring.datasource.password=yourpassword


Run the Spring Boot application

💻 Frontend Setup
cd frontend
npm install
npm start


Frontend runs on:
👉 http://localhost:3000

Backend runs on:
👉 http://localhost:8080

🔐 Authentication Flow

User logs in

JWT token is stored in localStorage

Token is sent via Authorization header

Protected routes are secured using a PrivateRoute component

📱 Responsive Design

Desktop-first layout

Fully optimized for mobile devices

Clean tab-based UI on small screens

Touch-friendly buttons & spacing

🌟 Why This Project Stands Out

Real-world travel use cases

Clean architecture (Controller → Service → Repository)

Smart automation (checklist & timeline)

Modern UI / UX design

Scalable for future AI integrations

🔮 Future Enhancements

Weather API integration

AI-based itinerary suggestions

Expense tracking

Document upload (tickets, IDs)

Offline mode for emergencies

👨‍💻 Author

Shankar Namaji
Full Stack Developer (Java | Spring Boot | React)