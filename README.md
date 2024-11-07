# EG Auth Repo

This repository contains a full-stack authentication system built with NestJS for the backend and React for the frontend. It provides user registration and login functionalities, adhering to best practices in security and scalability.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

## Features

- User Registration and Login
- Password Validation
- JWT Authentication
- Protected Routes
- Dockerized Setup

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.x or later)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/zohaib01khan/eg-auth-repo.git
   cd eg-auth-repo

1. **Set Up Environment Variables:**
   Create a .env file in both the server and client directories with the necessary environment variables as specified in the Environment Variables README files.
   
## Usage
1. **Once the application is running:**
  - The backend API is available at http://localhost:3000.
  - Access the frontend at http://localhost:3001.
  - For detailed API documentation, access the Swagger UI at http://localhost:3000/api-docs after starting the server.

## Environment Variables
The application requires specific environment variables for proper configuration.

1. **Backend `(server/.env)`:**
     ```bash
    PORT=3001
    MONGODB_URI=mongodb://mongo:27017/your_database_name
    JWT_SECRET=Tr7ing-tO-make-EG-@s5esm3nt-s3cure-then-0ther5
    JWT_EXPIRATION=1d


  2. **Frontend `(client/.env)`:**
     ```bash
      PORT=3001
      REACT_APP_ENV=development
      REACT_APP_API_URL=http://localhost:3000

  Ensure these variables are set correctly before running the application.

## Testing
To run tests for the backend:
   - Navigate to the server directory.
   - Run tests:
        ```bash
        npm run test

