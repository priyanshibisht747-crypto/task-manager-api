# Task Manager API (MERN Backend Assignment)

## Description
Backend REST API for Task Manager using Node.js, Express.js & MongoDB with CRUD operations, filtering, pagination, sorting, validation, and error handling.

---

## Tech Stack
Node.js, Express.js, MongoDB, Mongoose, Dotenv, Nodemon

---

## Project Structure
task-manager-project/
models/
Task.js
routes/
taskRoutes.js
server.js
package.json
.gitignore
README.md
TaskManager.postman_collection.json


---

## Setup Instructions

1. Clone repository
git clone <your-github-repo-url>


2. Go to project folder
cd task-manager-project


3. Install dependencies
npm install


4. Create `.env` file
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000


---

## Run Project

Development mode:
npm run dev


OR

Normal run:
node server.js


Server should show:
MongoDB Connected
Server running on port 5000


---

## API Endpoints

POST    /api/tasks  
GET     /api/tasks  
GET     /api/tasks/:id  
PUT     /api/tasks/:id  
DELETE  /api/tasks/:id  

---

## Query Features

Filter:
/api/tasks?completed=true


Pagination:
/api/tasks?page=1&limit=10


Sorting:
/api/tasks?sortBy=createdAt
/api/tasks?sortBy=title


---

## Postman

Import file:
TaskManager.postman_collection.json


---

## Author
Priyanshi Bisht
