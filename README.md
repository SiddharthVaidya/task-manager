# Task Manager API

This project implements a RESTful API using Node.js, Express.js, and npm packages. The API facilitates CRUD (Create, Read, Update, Delete) operations on tasks. Each task consists of a title, description, and completion status flag.

## Endpoints

- **GET /tasks**: Retrieve all tasks.
  
- **GET /tasks/:id**: Retrieve a single task by its ID.
  
- **POST /tasks**: Create a new task.
  
- **PUT /tasks/:id**: Update an existing task by its ID.
  
- **DELETE /tasks/:id**: Delete a task by its ID.

## Task Schema

Each task object contains the following properties:

- id: Unique identifier for the task.
- title: Title of the task.
- description: Description of the task.
- completed: Completion status of the task.
