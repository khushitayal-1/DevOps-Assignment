# Docker Compose Demo Application

A simple multi-container application demonstrating Docker Compose orchestration with a Flask backend and HTML frontend communicating via REST API.

## 📋 Project Overview

This is a basic demonstration of Docker Compose that showcases:
- **Backend Service**: Python Flask API running on port 5000
- **Frontend Service**: Static HTML interface served on port 80 (mapped to 3000)
- **Service Communication**: Frontend communicates with backend via REST API
- **CORS Support**: Cross-Origin Resource Sharing enabled for frontend-backend communication

### Key Features
- Simple counter application showing backend and frontend interaction
- Containerized services with Docker
- Service orchestration using Docker Compose
- Automatic service discovery and networking
- Hot-reload capability during development

## 📁 Project Structure

```
docker-compose-ass/
├── docker-compose.yml       # Docker Compose configuration
├── backend/                 # Python Flask API
│   ├── app.py              # Flask application with counter endpoint
│   ├── Dockerfile          # Docker image configuration for backend
│   └── requirements.txt     # Python dependencies
│
└── frontend/               # HTML Frontend
    ├── index.html          # Single-page application
    └── Dockerfile          # Docker image configuration for frontend
```

## 🔧 Prerequisites

- Docker (v20.10 or higher)
- Docker Compose (v1.29 or higher)
- (Optional) Python 3.8+ and Node.js for local development

## 🚀 Getting Started

### Quick Start with Docker Compose

1. **Navigate to Project Directory**
   ```bash
   cd docker-compose-ass
   ```

2. **Build and Start Services**
   ```bash
   docker-compose up --build
   ```
   
   Or in detached mode:
   ```bash
   docker-compose up -d --build
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

4. **Stop Services**
   ```bash
   docker-compose down
   ```

### What Happens

- Docker Compose creates and starts both services
- Frontend waits for backend to be ready (depends_on)
- Services communicate through an internal Docker network
- Logs from both services are displayed in the console

## 📡 API Endpoints

### Backend Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/increment` | Increments the counter and returns the current count |

**Request Example**:
```bash
curl -X POST http://localhost:5000/increment
```

**Response Example**:
```json
{
  "count": 1
}
```

## 🖥️ Frontend Interaction

The frontend is a simple HTML page with:
- **Display**: Shows current counter value
- **Button**: "Increase" button to increment counter
- **JavaScript**: Fetches POST request to backend and updates display

### How It Works
1. User clicks "Increase" button
2. Frontend sends POST request to `http://localhost:5000/increment`
3. Backend increments global counter
4. Backend returns JSON with new count
5. Frontend updates display with new value

## 🐳 Docker Compose Configuration

The `docker-compose.yml` file defines:

```yaml
version: "3.9"

services:
  backend:
    build: ./backend          # Build from Dockerfile in backend/
    ports:
      - "5000:5000"          # Maps port 5000 (container) to 5000 (host)

  frontend:
    build: ./frontend         # Build from Dockerfile in frontend/
    ports:
      - "3000:80"            # Maps port 80 (container) to 3000 (host)
    depends_on:
      - backend              # Waits for backend to start first
```

## 🛠️ Development

### Run Locally (Without Docker)

**Backend (Python)**:
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs on http://localhost:5000

**Frontend (HTML)**:
```bash
cd frontend
# Start a simple HTTP server
python -m http.server 8000
# Or use any other HTTP server
```
Frontend runs on http://localhost:8000

### View Logs

View all logs:
```bash
docker-compose logs -f
```

View specific service logs:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild Containers

After making changes to code:
```bash
docker-compose up --build
```

### Remove Everything

Clean up containers and networks:
```bash
docker-compose down
```

Remove volumes as well:
```bash
docker-compose down -v
```

## 📦 Dependencies

### Backend (Python)
- `flask` - Web framework for Python
- `flask-cors` - CORS support for cross-origin requests

### Frontend
- HTML5
- Vanilla JavaScript
- Fetch API for HTTP requests

## 🔧 Configuration

### Backend Configuration
- **Host**: 0.0.0.0 (listens on all interfaces)
- **Port**: 5000
- **Debug Mode**: Enabled (set to False in production)

### Frontend Configuration
- **Port**: 80 (inside container)
- **Protocol**: HTTP

## 🚦 Health Checks

Monitor running services:
```bash
docker ps
```

Check service status:
```bash
docker-compose ps
```

## 📝 Dockerfile Details

### Backend Dockerfile
- Uses Python base image
- Installs dependencies from requirements.txt
- Exposes port 5000
- Runs Flask application

### Frontend Dockerfile
- Uses Node.js or lightweight HTTP server
- Copies HTML files
- Exposes port 80
- Serves static content

## ⚠️ Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use:
```bash
# Change ports in docker-compose.yml
# Change "3000:80" to "3001:80" or desired port
# Change "5000:5000" to "5001:5000" or desired port
```

### Cannot Connect to Backend from Frontend
- Ensure backend service is running: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`
- Verify CORS is enabled in Flask app
- Use service name `backend` instead of `localhost` in internal requests

### Changes Not Reflected
Rebuild containers:
```bash
docker-compose up --build
```

### Clear Everything and Start Fresh
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## 📊 Next Steps

Potential enhancements:
- Add database service (MongoDB, PostgreSQL)
- Implement user authentication
- Add persistence to counter (database storage)
- Create multiple backend instances with load balancing
- Add environment configuration files
- Implement automated tests
- Add CI/CD pipeline

## 📝 License

ISC

## 👤 Author

Your Name

---

**Last Updated**: January 2026
