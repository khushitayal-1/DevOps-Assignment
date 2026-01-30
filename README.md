# 🐳 Docker Projects Collection

Welcome to the Docker Projects Collection! This repository contains two comprehensive Docker Compose projects demonstrating containerized applications, microservices orchestration, and modern development practices.

## 📚 Projects Overview

### 1. **Docker Compose Demo Application** 
A beginner-friendly introduction to Docker Compose with a simple Flask backend and HTML frontend.

**Quick Start**: `cd docker-compose-ass && docker-compose up --build`  
**Access**: http://localhost:3000

---

### 2. **RabbitMQ Authentication System**
An advanced microservices architecture with authentication, message queuing, and background workers.

**Quick Start**: `cd RabbitMQ-ass && docker-compose up --build`  
**Access**: http://localhost:3000 | RabbitMQ UI: http://localhost:15672

---

## 🎯 Quick Navigation

| Project | Description | Tech Stack | Complexity |
|---------|-------------|-----------|-----------|
| [docker-compose-ass](./docker-compose-ass) | Simple counter app | Flask, HTML, Docker Compose | Beginner |
| [RabbitMQ-ass](./RabbitMQ-ass) | Authentication system | Express.js, MongoDB, RabbitMQ | Advanced |

---

## 📁 Repository Structure

```
dockerdemo/
├── docker-compose-ass/           # Flask + Frontend Demo
│   ├── README.md                 # Detailed project documentation
│   ├── docker-compose.yml        # Container orchestration
│   ├── backend/
│   │   ├── app.py               # Flask API
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   └── frontend/
│       ├── index.html           # Web interface
│       └── Dockerfile
│
├── RabbitMQ-ass/                 # Microservices Authentication
│   ├── README.md                 # Detailed project documentation
│   ├── api/
│   │   ├── app.js               # Express.js API server
│   │   ├── producer.js          # RabbitMQ message producer
│   │   ├── rabbitmq.js          # RabbitMQ configuration
│   │   ├── models/User.js       # MongoDB User schema
│   │   ├── routes/auth.js       # Authentication routes
│   │   ├── routes/dashboard.js  # Dashboard endpoints
│   │   ├── public/index.html    # Frontend interface
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── worker/
│       ├── worker.js            # Background worker logic
│       ├── rabbitmqworker.js    # RabbitMQ consumer setup
│       ├── package.json
│       └── Dockerfile
│
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Docker**: v20.10 or higher
- **Docker Compose**: v1.29 or higher
- **Git**: For cloning/version control
- (Optional) **Node.js** and **Python** for local development

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd dockerdemo
   ```

2. **Choose a Project**
   ```bash
   # For beginners - Simple counter app
   cd docker-compose-ass
   
   # For advanced - Authentication system
   cd RabbitMQ-ass
   ```

3. **Build and Run**
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**
   - Check individual project README for specific URLs

---

## 📋 Project Summaries

### Project 1: Docker Compose Demo Application

**Purpose**: Learn Docker Compose basics with a simple full-stack application

**Architecture**:
- Flask Python backend (counter API)
- HTML/JavaScript frontend
- Internal Docker network communication
- Service dependency management

**Key Endpoints**:
```bash
# Increment counter
curl -X POST http://localhost:5000/increment
```

**Features**:
- ✅ Multi-container orchestration
- ✅ Simple REST API
- ✅ CORS support
- ✅ Real-time frontend updates
- ✅ Development hot-reload

**For Detailed Information**: See [docker-compose-ass/README.md](./docker-compose-ass/README.md)

---

### Project 2: RabbitMQ Authentication System

**Purpose**: Learn advanced microservices patterns with authentication and async processing

**Architecture**:
- Express.js REST API (authentication & user management)
- MongoDB (persistent user data)
- RabbitMQ (asynchronous message queue)
- Background Worker (email notifications & processing)
- Frontend web interface

**Key Endpoints**:
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register

# Login
curl -X POST http://localhost:3000/api/auth/login

# Get profile (requires JWT)
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/auth/profile
```

**Features**:
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Asynchronous message processing
- ✅ MongoDB persistence
- ✅ Role-based access control
- ✅ Email notifications
- ✅ RabbitMQ message queuing

**For Detailed Information**: See [RabbitMQ-ass/README.md](./RabbitMQ-ass/README.md)

---

## 🔧 Common Commands

### Manage Services

```bash
# Start services in background
docker-compose up -d

# Start with rebuild
docker-compose up --build

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View running containers
docker ps

# View all containers (including stopped)
docker ps -a
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f <service_name>

# Last 50 lines
docker-compose logs --tail=50
```

### Clean Up

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove volumes
docker volume prune

# Complete cleanup (use with caution!)
docker system prune -a --volumes
```

---

## 🔍 Monitoring & Debugging

### Check Service Status
```bash
docker-compose ps
```

### View Service Logs
```bash
docker-compose logs -f <service_name>
```

### Execute Commands in Container
```bash
docker-compose exec <service_name> bash
```

### RabbitMQ Management (Project 2 Only)
- URL: http://localhost:15672
- Username: guest
- Password: guest

### MongoDB Access (Project 2 Only)
- Connection: mongodb://localhost:27017
- Use MongoDB Compass GUI for visual inspection

---

## 🛠️ Development Workflow

### Making Code Changes

**With Docker (Recommended)**:
```bash
# Make changes to source code
# Restart services to apply changes
docker-compose restart

# Or rebuild if dependencies changed
docker-compose up --build
```

**Local Development**:
```bash
# Stop Docker services
docker-compose down

# Install dependencies locally
cd backend  # or api/worker
npm install  # or pip install -r requirements.txt

# Run locally
npm start  # or python app.py
```

### Environment Variables

Each project can use `.env` files for configuration:

**docker-compose-ass/.env**:
```env
FLASK_ENV=development
FLASK_DEBUG=true
```

**RabbitMQ-ass/.env** (API and Worker):
```env
PORT=3000
MONGO_URI=mongodb://root:password@mongodb:27017/auth_db?authSource=admin
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
JWT_SECRET=your_secret_key_here
```

---

## ⚠️ Troubleshooting

### General Issues

**Port Already in Use**
```bash
# Find process using port
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Kill process or change port in docker-compose.yml
```

**Cannot Connect Between Services**
- Ensure all containers are running: `docker-compose ps`
- Check service names in connection strings
- Verify CORS is enabled (Project 2)
- Review logs: `docker-compose logs`

**Container Won't Start**
```bash
# Check logs for errors
docker-compose logs <service_name>

# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

**Changes Not Applied**
```bash
# Rebuild containers
docker-compose up --build

# Or use detached mode
docker-compose up -d --build
```

### Project-Specific

**Docker Compose Demo**: See [docker-compose-ass/README.md](./docker-compose-ass/README.md#troubleshooting)

**RabbitMQ Auth System**: See [RabbitMQ-ass/README.md](./RabbitMQ-ass/README.md#troubleshooting)

---

## 📚 Learning Resources

### Docker & Docker Compose
- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Compose Overview](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

### Project Technologies
- **Flask**: https://flask.palletsprojects.com/
- **Express.js**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **RabbitMQ**: https://www.rabbitmq.com/documentation.html
- **JWT**: https://jwt.io/

---

## 📊 Technology Stack Summary

| Technology | Used In | Purpose |
|-----------|---------|---------|
| Docker | Both | Containerization |
| Docker Compose | Both | Container orchestration |
| Flask | Project 1 | Python web framework |
| Express.js | Project 2 | Node.js web framework |
| MongoDB | Project 2 | NoSQL database |
| RabbitMQ | Project 2 | Message broker |
| HTML/CSS/JS | Both | Frontend interface |
| JWT | Project 2 | Authentication |
| Bcrypt | Project 2 | Password hashing |

---

## 🎓 Learning Path

1. **Start Here**: docker-compose-ass (understand basic Docker Compose)
2. **Then Progress To**: RabbitMQ-ass (learn microservices patterns)
3. **Experiment**: Modify code, add features, scale services
4. **Deploy**: Apply knowledge to your own projects

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report issues
- Suggest improvements
- Add new projects
- Update documentation

---

## 📝 License

ISC

---

## 📞 Support

For issues or questions:
1. Check the project-specific README
2. Review Docker logs: `docker-compose logs`
3. Refer to troubleshooting sections
4. Check technology documentation links above

---

**Last Updated**: January 2026  
**Status**: ✅ Both projects fully functional and documented