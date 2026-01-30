# RabbitMQ Authentication Project

A microservices-based authentication system using RabbitMQ message queue, Express.js API, MongoDB database, and asynchronous worker processing.

## 📋 Project Overview

This project demonstrates a distributed authentication system with the following architecture:
- **API Service**: Express.js REST API handling authentication routes and user management
- **Worker Service**: Background worker processing messages from RabbitMQ
- **Message Queue**: RabbitMQ for asynchronous communication between services
- **Database**: MongoDB for persistent data storage
- **Frontend**: HTML interface for user interaction

### Key Features
- User authentication with JWT (JSON Web Tokens)
- Password hashing with bcrypt
- Asynchronous message processing via RabbitMQ
- MongoDB integration for user data persistence
- Role-based access control
- Email notifications (via Nodemailer in worker)

## 📁 Project Structure

```
RabbitMQ-ass/
├── api/                      # Express API Server
│   ├── app.js               # Main application entry point
│   ├── package.json         # API dependencies
│   ├── Dockerfile           # Docker configuration for API
│   ├── producer.js          # RabbitMQ message producer
│   ├── rabbitmq.js          # RabbitMQ connection & setup
│   ├── models/
│   │   └── User.js          # MongoDB User schema
│   ├── routes/
│   │   ├── auth.js          # Authentication endpoints
│   │   └── dashboard.js     # Dashboard endpoints
│   └── public/
│       └── index.html       # Frontend interface
│
└── worker/                   # Background Worker
    ├── worker.js            # Main worker entry point
    ├── package.json         # Worker dependencies
    ├── Dockerfile           # Docker configuration for worker
    ├── rabbitmqworker.js    # RabbitMQ consumer setup
    └── worker.js            # Business logic for processing messages
```

## 🔧 Prerequisites

- Docker & Docker Compose
- Node.js (v14 or higher)
- MongoDB (or Docker MongoDB image)
- RabbitMQ (or Docker RabbitMQ image)

## 🚀 Getting Started

### Option 1: Using Docker Compose (Recommended)

1. **Clone/Navigate to the project**
   ```bash
   cd RabbitMQ-ass
   ```

2. **Create a docker-compose.yml** (if not already present)
   ```yaml
   version: '3.8'
   
   services:
     rabbitmq:
       image: rabbitmq:3-management
       ports:
         - "5672:5672"
         - "15672:15672"
       environment:
         RABBITMQ_DEFAULT_USER: guest
         RABBITMQ_DEFAULT_PASS: guest
       healthcheck:
         test: ["CMD", "rabbitmq-diagnostics", "ping"]
         interval: 10s
         timeout: 5s
         retries: 5
   
     mongodb:
       image: mongo:latest
       ports:
         - "27017:27017"
       environment:
         MONGO_INITDB_ROOT_USERNAME: root
         MONGO_INITDB_ROOT_PASSWORD: password
       healthcheck:
         test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
         interval: 10s
         timeout: 5s
         retries: 5
   
     api:
       build: ./api
       ports:
         - "3000:3000"
       depends_on:
         rabbitmq:
           condition: service_healthy
         mongodb:
           condition: service_healthy
       environment:
         PORT: 3000
         MONGO_URI: mongodb://root:password@mongodb:27017/auth_db?authSource=admin
         RABBITMQ_URL: amqp://guest:guest@rabbitmq:5672
       volumes:
         - ./api:/app
       command: node app.js
   
     worker:
       build: ./worker
       depends_on:
         rabbitmq:
           condition: service_healthy
       environment:
         RABBITMQ_URL: amqp://guest:guest@rabbitmq:5672
         MONGO_URI: mongodb://root:password@mongodb:27017/auth_db?authSource=admin
       volumes:
         - ./worker:/app
       command: node worker.js
   ```

3. **Build and Start Services**
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api
   - RabbitMQ Management: http://localhost:15672 (guest:guest)
   - MongoDB: localhost:27017

### Option 2: Local Development

1. **Install Dependencies**
   ```bash
   # API
   cd api
   npm install
   
   # Worker
   cd ../worker
   npm install
   ```

2. **Start RabbitMQ and MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   docker run -d -p 27017:27017 mongo:latest
   ```

3. **Configure Environment Variables**
   Create `.env` file in both `api` and `worker` directories:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/auth_db
   RABBITMQ_URL=amqp://guest:guest@localhost:5672
   JWT_SECRET=your_secret_key_here
   ```

4. **Start Services**
   ```bash
   # Terminal 1 - API
   cd api
   npm start
   
   # Terminal 2 - Worker
   cd ../worker
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Authenticate user and get JWT token
- `GET /profile` - Get current user profile (requires JWT)
- `POST /logout` - Logout user

### Dashboard Routes (`/api/dashboard`)
- `GET /` - Get dashboard data (requires JWT)
- Additional dashboard endpoints as defined

## 🐰 RabbitMQ Queue Structure

### Message Flow
1. **Producer** (API) sends messages to RabbitMQ queues
2. **Consumer** (Worker) listens to queues and processes messages
3. **Processing** includes tasks like:
   - User registration confirmation
   - Email notifications
   - Data synchronization
   - Log aggregation

### Queues
- `auth_queue` - Authentication-related messages
- `notification_queue` - User notifications
- Additional queues as needed

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **MongoDB**: Persistent, encrypted data storage
- **Environment Variables**: Sensitive data management via `.env`

## 📊 Database Schema

### User Model (MongoDB)
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Development

### Logs and Debugging

View API logs:
```bash
docker logs -f rabbitmq-ass-api-1
```

View Worker logs:
```bash
docker logs -f rabbitmq-ass-worker-1
```

View RabbitMQ logs:
```bash
docker logs -f rabbitmq
```

### Monitoring

- **RabbitMQ Management UI**: http://localhost:15672
- **MongoDB Compass**: Connect to mongodb://localhost:27017 for database inspection

## 🐛 Troubleshooting

### Connection Issues
- Ensure all services are running: `docker ps`
- Check environment variables in `.env`
- Verify port availability (3000, 5672, 27017, 15672)

### RabbitMQ Issues
- Reset RabbitMQ: `docker-compose down && docker-compose up --build`
- Clear message queues via Management UI

### MongoDB Issues
- Verify database is running: `docker logs mongodb`
- Check connection string in environment variables
- Ensure authentication credentials are correct

## 📦 Dependencies

### API
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `amqplib` - RabbitMQ client
- `bcrypt/bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment configuration

### Worker
- `amqplib` - RabbitMQ client
- `mongoose` - MongoDB ODM
- `nodemailer` - Email notifications
- `dotenv` - Environment configuration

## 🚦 Status Checks

Health check endpoints (if implemented):
```bash
curl http://localhost:3000/health
```

## 📝 License

ISC

## 👤 Author

Your Name

## 🤝 Contributing

Feel free to submit issues and enhancement requests.

---

**Last Updated**: January 2026
