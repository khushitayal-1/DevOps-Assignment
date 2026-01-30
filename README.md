🐳 Multi-Service Docker Projects

This repository contains two separate Docker Compose projects demonstrating containerized applications and microservices orchestration:

Docker Compose Demo Application – Flask backend + HTML frontend counter app.

RabbitMQ Authentication Project – Microservices-based authentication system using Express.js, MongoDB, and RabbitMQ.

📂 Project 1: Docker Compose Demo Application (Flask + HTML)

A simple multi-container app showing frontend-backend interaction with Docker Compose.

Project Structure
docker-compose-ass/
├── docker-compose.yml
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
└── frontend/
    ├── index.html
    └── Dockerfile

Features

Flask API backend (port 5000)

HTML frontend (port 80 → mapped to 3000)

Counter example showing frontend-backend communication

CORS support

Hot-reload in development

Quick Start
cd docker-compose-ass
docker-compose up --build


Frontend: http://localhost:3000

Backend API: http://localhost:5000

Stop services:

docker-compose down

API Endpoint
Method	Endpoint	Description
POST	/increment	Increment counter

Example:

curl -X POST http://localhost:5000/increment
# Response: {"count": 1}

Local Development (Without Docker)

Backend:

cd backend
pip install -r requirements.txt
python app.py


Frontend:

cd frontend
python -m http.server 8000

📂 Project 2: RabbitMQ Authentication System

A distributed authentication system demonstrating microservices with Express.js, MongoDB, and RabbitMQ.

Project Structure
RabbitMQ-ass/
├── api/
│   ├── app.js
│   ├── package.json
│   ├── Dockerfile
│   ├── producer.js
│   ├── rabbitmq.js
│   ├── models/User.js
│   ├── routes/auth.js
│   ├── routes/dashboard.js
│   └── public/index.html
└── worker/
    ├── worker.js
    ├── package.json
    ├── Dockerfile
    └── rabbitmqworker.js

Features

Express.js API with JWT authentication

Background worker processing RabbitMQ messages

MongoDB for persistent storage

Email notifications via worker

Role-based access control

Quick Start with Docker Compose
cd RabbitMQ-ass
docker-compose up --build


Access:

Frontend/API: http://localhost:3000

RabbitMQ Management UI: http://localhost:15672
 (guest:guest)

MongoDB: localhost:27017

API Endpoints

Authentication (/api/auth):

Method	Endpoint	Description
POST	/register	Register new user
POST	/login	Authenticate and get JWT
GET	/profile	Get user profile (JWT required)
POST	/logout	Logout user

Dashboard (/api/dashboard):

Method	Endpoint	Description
GET	/	Get dashboard data (JWT required)
RabbitMQ Queues

auth_queue – Authentication messages

notification_queue – Email notifications

Worker consumes messages asynchronously

Environment Variables (.env)
PORT=3000
MONGO_URI=mongodb://root:password@mongodb:27017/auth_db?authSource=admin
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
JWT_SECRET=your_secret_key_here

Local Development
# API
cd api
npm install
npm start

# Worker
cd ../worker
npm install
npm start

Logs & Monitoring
docker-compose logs -f
docker ps


RabbitMQ Management UI: http://localhost:15672

MongoDB Compass: Connect to mongodb://localhost:27017

⚠️ Troubleshooting (Both Projects)

Port conflicts → Change ports in docker-compose.yml

Service unreachable → Ensure container running (docker ps) and check logs

Changes not applied → Rebuild containers: docker-compose up --build

Clear containers & volumes:

docker-compose down -v
docker system prune -a
docker-compose up --build

📦 Dependencies

Flask Demo Backend: flask, flask-cors
RabbitMQ Auth API: express, mongoose, amqplib, bcryptjs, jsonwebtoken, dotenv
Worker: amqplib, mongoose, nodemailer, dotenv
Frontend: HTML5 + Vanilla JS