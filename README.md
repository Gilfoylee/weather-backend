# 🌤️ Weather API - Backend Case Study

This is a full-featured backend system built as part of a software engineering case study. It includes user and admin authentication, weather data retrieval via OpenWeather API, Redis-based caching, Prisma ORM with MySQL, test coverage, Swagger documentation, and a CircleCI-based CI/CD simulation for GCP deployment.

---

## 🧰 Tech Stack

- **Node.js + Express**
- **TypeScript**
- **Prisma ORM**
- **MySQL** (database)
- **Redis** (caching)
- **JWT** (authentication and authorization)
- **Jest + Supertest** (testing)
- **Swagger UI** (API documentation)
- **CircleCI** (CI/CD with GCP deployment simulation)

---

## 🚀 Features

- ✅ User & Admin role-based access control (RBAC)
- ✅ Weather data from OpenWeather API
- ✅ Caching via Redis (1-min TTL for easy check, you can change it)
- ✅ Users can view their own weather query history
- ✅ Admins can view all weather queries
- ✅ Admins can create new users
- ✅ Swagger UI for interactive API docs
- ✅ CircleCI pipeline with test, build, deploy steps
- ✅ Jest-based unit and integration test coverage

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/weather-backend.git
cd weather-backend
```
### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a .env file:

    DATABASE_URL="mysql://user:password@localhost:3306/weatherdb"

    REDIS_HOST=127.0.0.1

    REDIS_PORT=6379

    OPENWEATHER_API_KEY=your_openweather_api_key

    JWT_SECRET=your_jwt_secret

### 4. Set up environment variables
npx prisma generate

npx prisma migrate dev --name init

### 5. Run the server
npm run dev

Visit: http://localhost:3000

---

## 🧪 Testing
```bash
npm run test
```

## API Endpoints
Auth
POST /api/auth/register

POST /api/auth/login

Weather
GET /api/weather?city=London(auth required)

GET /api/weather/history (auth required)

Admin
POST /api/users (admin only)(auth required)


## 📚 Swagger API Docs
API docs available at:
👉 http://localhost:3000/api/docs

Includes:
Auth
Weather
User creation
Query history
Role-based security

## ⚙️ CircleCI CI/CD (GCP Simulated)
File: .circleci/config.yml

Pipeline steps:
install-deps
run-tests
build
deploy (simulated)

## ⚙️ CircleCI CI/CD (GCP Simulated)
<pre lang="md">
weather-backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── prisma/
│   ├── app.ts
│   └── server.ts
├── __tests__/
├── .circleci/
│   └── config.yml
├── README.md
└── package.json
 </code> </pre>


## Evaluation Criteria Checklist
 ✅Clean, modular TypeScript project structure

 ✅RESTful API & Prisma with MySQL

 ✅Role-based access control

 ✅OpenWeather API integration

 ✅Redis-based caching

 ✅JWT authentication

 ✅Swagger API docs

 ✅Postman API collection

 ✅CircleCI pipeline simulation (not tested)

 ✅Unit & integration tests with Jest

 
## 👨‍💻 Author
Case Study developed by Tuğrul Yüksel

Contact: tugrulyuksel77@gmail.com