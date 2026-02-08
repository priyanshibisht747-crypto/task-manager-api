# Secure Task Manager API (MERN + JWT)

A Node.js & Express backend API for managing tasks with **JWT authentication**.  
Users can **register, login, and manage their own tasks securely**.

---

## Features

- User registration & login with hashed passwords (bcrypt)  
- JWT authentication & protected task routes  
- Authorization: users can only access their own tasks  
- Task CRUD: Create, Read, Update, Delete  
- Filter, pagination, and sorting for tasks  
- Meaningful error messages for auth failures  

---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/<username>/task-manager-api.git
cd task-manager-api
Install dependencies

npm install
Configure environment variables (.env):

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start server

node server.js
Server runs at http://localhost:5000.

API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login & get JWT
Tasks (Protected)
Method	Endpoint	Description
POST	/api/tasks	Create task
GET	/api/tasks	Get all tasks (user only)
GET	/api/tasks/:id	Get single task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
All task routes require Authorization: Bearer <JWT_TOKEN>

Authentication Flow
User registers → password hashed and stored in DB

User logs in → JWT token returned

JWT used in Authorization header to access protected routes

Middleware validates token → only allows task access if token is valid and belongs to the user

Postman
Import TaskManager.postman_collection.json

Run Register → Login → Task routes

Token automatically used for protected routes via {{jwt_token}} variable


