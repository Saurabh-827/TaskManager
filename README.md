# Task Manager

A full-stack task management application built with Node.js, Express, PostgreSQL, and vanilla JavaScript. Features secure authentication, RESTful API design, and clean separation of concerns following MVC architecture patterns.

## 🔗 Live Demo

- **Frontend:** https://task-manager-rho-woad.vercel.app
- **Backend API:** https://taskmanager-backend-kn46.onrender.com
- **API Health:** https://taskmanager-backend-kn46.onrender.com/api/health
- **GitHub:** https://github.com/Saurabh-827/TaskManager

> ⚠️ **Note:** Backend is hosted on Render's free tier. First request after inactivity may take ~30 seconds (cold start).

## ✨ Features

### Core Functionality

- **User Authentication** - Secure JWT-based registration and login
- **Task Management** - Full CRUD operations (Create, Read, Update, Delete)
- **User Isolation** - Users can only view and manage their own tasks
- **Task Properties** - Title, description, priority (Low/Medium/High), status (Pending/In Progress/Review/Completed), and due dates
- **Real-time Updates** - Instant UI updates after task operations

### Technical Highlights

- **Secure Password Hashing** using bcrypt
- **JWT Token Authentication** with protected routes
- **Input Validation** using express-validator
- **Centralized Error Handling** middleware
- **Service-Repository Pattern** for clean architecture
- **RESTful API Design** following industry standards

## 🛠 Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Supabase)
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** express-validator
- **Security:** bcrypt for password hashing

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern responsive design with Grid and Flexbox
- **Vanilla JavaScript** - ES6+ with Fetch API
- **No frameworks** - Lightweight and fast

### Deployment

- **Backend Hosting:** Render
- **Frontend Hosting:** Vercel
- **Database:** Supabase (Managed PostgreSQL)

## 🏗 Architecture

The backend follows **MVC + Service-Repository Pattern** (Laravel-inspired layered architecture), ensuring maintainability and scalability.

### Request Flow

```
HTTP Request → Route → Middleware → Controller → Service → Repository → Model → Database
```

### Directory Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/      # Handle HTTP requests/responses
│   │   ├── Middlewares/      # Auth, validation, error handling
│   │   └── Requests/         # Validation rules
│   ├── Models/               # Sequelize models
│   ├── Services/             # Business logic
│   └── Repositories/         # Database operations
├── config/
│   └── database.js           # Database configuration
├── routes/
│   └── api.js                # API routes
├── app.js                    # Express app setup
└── server.js                 # Server entry point

frontend/
├── css/
│   └── styles.css            # Application styles
├── js/
│   ├── auth.js               # Login logic
│   ├── register.js           # Registration logic
│   └── dashboard.js          # Task management logic
├── index.html                # Login page
├── register.html             # Registration page
└── dashboard.html            # Task dashboard
```

### Layer Responsibilities

| Layer            | Responsibility                                           |
| ---------------- | -------------------------------------------------------- |
| **Controllers**  | Handle HTTP requests, call services, return responses    |
| **Services**     | Implement business logic and validation rules            |
| **Repositories** | Abstract database operations and queries                 |
| **Middlewares**  | Handle cross-cutting concerns (auth, validation, errors) |
| **Models**       | Define database schema and relationships                 |

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | ❌            |
| POST   | `/api/auth/login`    | Login user        | ❌            |

### Tasks

| Method | Endpoint         | Description          | Auth Required |
| ------ | ---------------- | -------------------- | ------------- |
| GET    | `/api/tasks`     | Get all user's tasks | ✅            |
| POST   | `/api/tasks`     | Create new task      | ✅            |
| GET    | `/api/tasks/:id` | Get single task      | ✅            |
| PUT    | `/api/tasks/:id` | Update task          | ✅            |
| DELETE | `/api/tasks/:id` | Delete task          | ✅            |

### Health Check

| Method | Endpoint      | Description       | Auth Required |
| ------ | ------------- | ----------------- | ------------- |
| GET    | `/api/health` | API health status | ❌            |

## 🗄 Database Schema

### Users Table

```sql
- id (UUID, Primary Key)
- name (String)
- email (String, Unique)
- password (String, Hashed)
- role (ENUM: Admin, Manager, Intern)
- createdAt (Timestamp)
- updatedAt (Timestamp)
```

### Tasks Table

```sql
- id (UUID, Primary Key)
- title (String)
- description (Text)
- status (ENUM: Pending, In_Progress, Review, Completed)
- priority (ENUM: Low, Medium, High)
- due_date (Date)
- assignee_id (UUID, Foreign Key → Users)
- createdAt (Timestamp)
- updatedAt (Timestamp)
```

**Relationships:**

- One User has Many Tasks
- One Task belongs to One User (assignee)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. **Clone the repository**

```bash
git clone https://github.com/Saurabh-827/TaskManager.git
cd TaskManager/backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the backend directory:

```env
PORT=5000
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_secure_random_secret_key
NODE_ENV=development
```

4. **Start the server**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

```bash
cd frontend
```

2. **Update API URL** (if running locally)

In `js/auth.js`, `js/register.js`, and `js/dashboard.js`, change:

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

3. **Open in browser**

- Simply open `index.html` in your browser
- Or use a local server (e.g., Live Server extension in VS Code)

## 🧪 Testing the Application

### Using the Live Demo

1. Visit https://task-manager-rho-woad.vercel.app
2. Register a new account
3. Login with your credentials
4. Create, edit, and delete tasks
5. Test different priority levels and statuses

### Using Postman/Thunder Client

**1. Register a User**

```http
POST https://taskmanager-backend-kn46.onrender.com/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "Admin"
}
```

**2. Login**

```http
POST https://taskmanager-backend-kn46.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

**3. Create Task** (use token from login response)

```http
POST https://taskmanager-backend-kn46.onrender.com/api/tasks
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Complete Documentation",
  "description": "Write comprehensive README",
  "priority": "High",
  "status": "Pending",
  "due_date": "2024-12-31"
}
```

**4. Get All Tasks**

```http
GET https://taskmanager-backend-kn46.onrender.com/api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
```

**5. Update Task**

```http
PUT https://taskmanager-backend-kn46.onrender.com/api/tasks/{task_id}
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "status": "Completed",
  "priority": "Low"
}
```

**6. Delete Task**

```http
DELETE https://taskmanager-backend-kn46.onrender.com/api/tasks/{task_id}
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🔒 Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Authentication:** Secure token-based auth with expiration (1 day)
- **Input Validation:** Server-side validation using express-validator
- **SQL Injection Prevention:** Sequelize ORM with parameterized queries
- **CORS Configuration:** Controlled cross-origin access
- **Environment Variables:** Sensitive data stored securely
- **User Isolation:** Users can only access their own tasks
- **Protected Routes:** All task endpoints require valid JWT token

## 📱 Responsive Design

The frontend is fully responsive and works seamlessly across:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Design Decisions

### Why Service-Repository Pattern?

- **Separation of Concerns:** Business logic separated from data access
- **Testability:** Easy to mock repositories for unit testing
- **Maintainability:** Changes to database don't affect business logic
- **Reusability:** Services can be used across multiple controllers

### Why Vanilla JavaScript?

- **Performance:** No framework overhead
- **Learning:** Demonstrates core JavaScript skills
- **Simplicity:** Lightweight and fast for this use case
- **Compatibility:** Works everywhere without build tools

### Why PostgreSQL?

- **Reliability:** ACID compliance and data integrity
- **Scalability:** Handles complex queries efficiently
- **Features:** Rich data types, JSON support, full-text search
- **Industry Standard:** Widely used in production environments

## 🔮 Future Enhancements

- [ ] Role-based access control (RBAC) for team collaboration
- [ ] Task filtering and sorting (by status, priority, date)
- [ ] Search functionality across tasks
- [ ] Task assignment to other users
- [ ] Email notifications for due dates
- [ ] Task comments and activity log
- [ ] File attachments for tasks
- [ ] Dashboard analytics and statistics
- [ ] Pagination for large task lists
- [ ] Dark mode theme
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Saurabh**

- GitHub: [@Saurabh-827](https://github.com/Saurabh-827)
- Backend-focused Full Stack Developer

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- Sequelize team for the powerful ORM
- Vercel and Render for free hosting tiers
- Supabase for managed PostgreSQL database

---

**Built with ❤️ using Node.js and modern web technologies**
