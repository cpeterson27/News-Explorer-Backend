# NewsExplorer Backend API

RESTful API backend for the NewsExplorer news aggregation application. Provides user authentication, article management, and news search functionality.

---

## 🌟 Overview

The NewsExplorer Backend API is a Node.js/Express server that handles user authentication, article storage, and news aggregation. It integrates with the News API to fetch current articles and provides secure endpoints for managing user data and saved articles.

### Key Features

- 🔐 **JWT-based authentication** - Secure user login and session management
- 👤 **User management** - Registration, login, profile management
- 📰 **News aggregation** - Proxy endpoint for News API with error handling
- 💾 **Article storage** - Save and manage user's favorite articles
- ✅ **Request validation** - Comprehensive input validation with Celebrate
- 🔒 **Security** - Password hashing, rate limiting, CORS configuration
- 📝 **Logging** - Request/error logging with Winston
- ⚡ **Rate limiting** - Protection against abuse and DDoS

---

## 🚀 Live API

**Base URL**: `https://api.newsexplorer28.crabdance.com`

**GitHub**: [https://github.com/cpeterson27/News-Explorer-Backend](https://github.com/cpeterson27/News-Explorer-Backend)

---

## 🛠️ Tech Stack

### Core Technologies

- **Node.js** (v18.20.8) - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Security & Authentication

- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation and verification
- **helmet** - Security headers middleware
- **cors** - Cross-Origin Resource Sharing configuration

### Validation & Error Handling

- **celebrate** - Request validation middleware (Joi)
- **validator** - String validation and sanitization
- **Custom error classes** - Structured error handling

### Utilities

- **dotenv** - Environment variable management
- **winston** - Logging library
- **express-rate-limit** - Rate limiting middleware

---

## 📋 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/signin` | Login user | No |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user/me` | Get current user info | Yes |

### Articles

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/articles` | Get user's saved articles | Yes |
| POST | `/api/articles` | Save new article | Yes |
| DELETE | `/api/articles/:id` | Delete saved article | Yes |

### News Search

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/news?q={query}` | Search news articles | No |

---

## 📖 API Documentation

### POST /api/auth/signup

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "name": "John Doe"
}
```

**Validation:**
- `email`: Valid email format, required
- `password`: Minimum 8 characters, must contain uppercase, lowercase, and number
- `name`: 2-30 characters, required

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Error Responses:**
- `400` - Validation error
- `409` - Email already exists
- `500` - Internal server error

---

### POST /api/auth/signin

Login to existing account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Incorrect email or password
- `500` - Internal server error

---

### GET /api/user/me

Get current user profile information.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Error Responses:**
- `401` - Unauthorized (invalid/missing token)
- `404` - User not found
- `500` - Internal server error

---

### GET /api/articles

Get all articles saved by the current user.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Article Title",
    "description": "Article description...",
    "urlToImage": "https://example.com/image.jpg",
    "author": "John Smith",
    "content": "Full article content...",
    "url": "https://example.com/article",
    "owner": "507f1f77bcf86cd799439012"
  }
]
```

---

### POST /api/articles

Save a new article to user's collection.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request Body:**
```json
{
  "title": "Article Title",
  "description": "Article description",
  "urlToImage": "https://example.com/image.jpg",
  "author": "John Smith",
  "content": "Full article content",
  "url": "https://example.com/article",
  "name": "Short name"
}
```

**Validation:**
- `title`: Minimum 2 characters, required
- `description`: Minimum 2 characters, required
- `urlToImage`: Valid URL, required
- `author`: Minimum 2 characters, required
- `content`: Required
- `url`: Valid URL, required
- `name`: 2-30 characters, required

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Article Title",
  "description": "Article description...",
  "urlToImage": "https://example.com/image.jpg",
  "author": "John Smith",
  "content": "Full article content...",
  "url": "https://example.com/article",
  "owner": "507f1f77bcf86cd799439012"
}
```

## 🗂️ Project Structure

```
News-Explorer-Backend/
├── controllers/
│   ├── articles.js      # Article CRUD operations
│   └── user.js          # User authentication & profile
├── middleware/
│   ├── auth.js          # JWT authentication middleware
│   ├── logger.js        # Winston request/error logging
│   └── validation.js    # Celebrate validation schemas
├── models/
│   ├── article.js       # Article Mongoose schema
│   └── user.js          # User Mongoose schema
├── routes/
│   ├── articles.js      # Article routes
│   ├── auth.js          # Authentication routes
│   ├── news.js          # News API proxy routes
│   ├── user.js          # User routes
│   └── index.js         # Route aggregator
├── utils/
│   ├── errors/          # Custom error classes
│   │   ├── BadRequestError.js
│   │   ├── ConflictError.js
│   │   ├── ForbiddenError.js
│   │   ├── InternalServerError.js
│   │   ├── NotFoundError.js
│   │   └── UnauthorizedError.js
│   ├── config.js        # Environment configuration
│   ├── errorHandler.js  # Centralized error handling
│   └── rateLimit.js     # Rate limiting configuration
├── .env                 # Environment variables
├── .gitignore
├── app.js              # Express app configuration
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- News API key from [newsapi.org](https://newsapi.org/)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/cpeterson27/News-Explorer-Backend.git
   cd News-Explorer-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/database
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   NEWS_API_KEY=your-newsapi-key-here
   FRONTEND_URL=http://localhost:5000
   SALT_ROUNDS=10
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   # macOS (using Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The server will start on `http://localhost:5001`

6. **For production**
   ```bash
   npm start
   ```

### Production Deployment

1. **Set production environment variables**
   ```env
   NODE_ENV=production
   PORT=5001
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/News-Explorer-App?appName=News-Explorer-App
   JWT_SECRET=your-production-secret-key
   NEWS_API_KEY=your-newsapi-key
   FRONTEND_URL=https://newsexplorer28.crabdance.com
   ```

2. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start app.js --name newsexplorer-api
   pm2 save
   pm2 startup
   ```

3. **Configure nginx as reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name 	api.newsexplorer28.crabdance.com;
       
       location / {
           proxy_pass http://localhost:5001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 🗄️ Database Schema

### User Model

```javascript
{
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: true,
    select: false 
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  }
}
```

### Article Model

```javascript
{
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  },
  urlToImage: {
    type: String,
    required: true,
    validate: validator.isURL
  },
  author: {
    type: String,
    required: true,
    minlength: 2
  },
  content: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    validate: validator.isURL
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}
```

---

## 🔒 Security Features

### Authentication
- JWT tokens with 7-day expiration
- Bcrypt password hashing with configurable salt rounds
- Password requirements enforced (min 8 chars, uppercase, lowercase, number)

### Middleware Protection
- **Helmet**: Sets security HTTP headers
- **CORS**: Configured for specific frontend origin
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Auth Middleware**: Protects routes requiring authentication

### Input Validation
- All inputs validated using Celebrate (Joi)
- Email validation using validator library
- URL validation for article links and images
- MongoDB ObjectId validation for route parameters

### Error Handling
- Custom error classes for different error types
- Centralized error handler
- No sensitive data in error responses
- Proper HTTP status codes

---

## 📊 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment (development/production) | No | development |
| `PORT` | Server port | No | 5001 |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `NEWS_API_KEY` | News API key | Yes | - |
| `FRONTEND_URL` | Frontend URL for CORS | Yes | - |
| `SALT_ROUNDS` | Bcrypt salt rounds | No | 10 |

---

## 🧪 Testing

### Manual Testing with cURL

**Register a new user:**
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "name": "Test User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

**Get user profile:**
```bash
curl -X GET http://localhost:5001/api/user/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Search news:**
```bash
curl "http://localhost:5001/api/news?q=tesla"
```

### Future Testing Plans
- Unit tests with Jest
- Integration tests with Supertest
- MongoDB memory server for test database
- CI/CD pipeline with automated testing

---

## 🚧 Development Journey

### Challenges Overcome

**Authentication System**
- Implemented secure JWT-based authentication
- Created custom authentication middleware
- Handled token expiration and refresh logic

**Password Security**
- Used bcrypt for password hashing
- Implemented password validation with multiple requirements
- Protected password field from being returned in queries

**Error Handling**
- Created custom error classes for different scenarios
- Implemented centralized error handler
- Provided clear, user-friendly error messages

**Database Design**
- Structured schemas for users and articles
- Implemented proper relationships using ObjectId references
- Added validation at the database level

**CORS Configuration**
- Configured CORS for specific frontend origin
- Handled preflight requests properly
- Set up credentials support for cookie/token handling

**Rate Limiting**
- Implemented rate limiting to prevent abuse
- Configured appropriate limits for different endpoints
- Added clear error messages when limits exceeded

**Logging**
- Set up Winston for request and error logging
- Created separate log files for different log types
- Implemented log rotation to manage file sizes

---

## 📈 Performance Optimizations

- **Database Indexing**: Indexed email field for faster user lookups
- **Password Selection**: Used `select: false` to avoid returning passwords
- **Connection Pooling**: MongoDB connection pooling for better performance
- **Rate Limiting**: Prevents server overload from excessive requests

---

## 🔄 API Versioning

Current version: **v1**

All endpoints are currently under the base path. Future versions will be namespaced:
- v1: `/api/v1/...`
- v2: `/api/v2/...`

---

## 📝 Logging

### Log Files
- `request.log` - HTTP request logs (method, URL, status, response time)
- `error.log` - Error logs with stack traces

### Log Format
```
2024-01-15T10:30:00.000Z info: HTTP POST /api/auth/signin
2024-01-15T10:30:00.500Z error: Database connection failed
```

---

## 👤 Author

**Cassandra Peterson**
- GitHub: [@cpeterson27](https://github.com/cpeterson27)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/cassandra-peterson)

Created as part of the **TripleTen Software Engineering Bootcamp**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **TripleTen** for the comprehensive backend development curriculum
- **News API** for providing access to news data
- **MongoDB** for the excellent NoSQL database
- **Express.js community** for the robust web framework

---

- **Frontend Repository**: [News-Explorer-Frontend](https://github.com/cpeterson27/News-Explorer-Frontend)
- **Live Application**: [newsexplorer28.crabdance.com](https://newsexplorer28.crabdance.com)

