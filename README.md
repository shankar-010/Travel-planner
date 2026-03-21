# Travel Planner – Smart Trip Management Platform

A modern **full-stack travel planning application** that helps users plan, manage, and experience trips efficiently.  
Built with **Spring Boot + React**, focusing on **clean architecture, real-world features, and premium UI/UX**.

---

## 🚀 Key Features

### 🔐 Authentication
- Secure login using **JWT authentication**
- Protected routes for authenticated users
- Token stored securely in `localStorage`

---

### 🧳 Trip Management
- Create, edit, and delete trips
- Auto trip status:
  - **Upcoming**
  - **Ongoing**
  - **Completed**
- Trip type support:
  - Beach
  - Leisure
  - Work
  - International

---

### 📊 Dashboard
- Active trip overview
- Countdown to trip start
- Quick access to:
  - Itinerary
  - Checklist
  - Map
  - Emergency helper
- Clean, premium UI (desktop & mobile responsive)

---

### 📅 Itinerary & Timeline
- Auto-generate day-wise trip timeline
- Day-based planning view
- Vertical timeline on mobile
- Editable descriptions per day

---

### 📦 Smart Packing Checklist
- Rule-based auto checklist:
  - Beach → Sunscreen, Slippers
  - Cold → Jacket, Gloves
  - International → Passport, Adapter
- Manual checklist items
- Mark items as packed/unpacked

---

### 🚗 Transport Notes
- Add transportation details:
  - Flight
  - Train
  - Bus
- Store ticket info, timings, and notes per trip

---

### ⭐ Favorite / Must-Visit Places
- Add places you want to visit
- Mark places as visited
- Add notes per place
- Integrated with map view

---

### 🗺️ Interactive Map
- Destination marker
- Favorite places markers
- Visited place highlighting
- Built using **OpenStreetMap + Leaflet**

---

### 🚨 Emergency Helper
- City-based emergency contacts
- Static fallback emergency numbers:
  - 🚓 Police – 100
  - 🚑 Ambulance – 108
  - 🔥 Fire – 101
  - ☎ Emergency – 112
- Panic-friendly UI with large buttons
- Designed for real emergency scenarios

---

##  Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security + JWT
- JPA / Hibernate
- MySQL
- REST APIs

### Frontend
- React (CRA)
- React Router
- Tailwind CSS
- Lucide Icons
- Leaflet Maps

---

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup
1. Open backend in **Spring Tool Suite / IntelliJ**
2. Configure `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/travel_planner
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=your_jwt_secret
jwt.expiration=86400000


Run the Spring Boot application

Backend runs on:
👉 http://localhost:8080

cd frontend
npm install
npm start


Frontend runs on:
👉 http://localhost:3000

<img width="1557" height="851" alt="Screenshot 2026-03-21 212439" src="https://github.com/user-attachments/assets/a6c1a1c3-e67a-4fd1-aa69-666f174ba6f6" />

