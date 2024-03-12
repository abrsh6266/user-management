# User Management Backend API

This Node.js and Express.js backend API provides authentication, user profile management, and post management functionalities.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the project, you need to have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB (or MongoDB Atlas account)

### Installing

1. Clone the repository to your local machine:

2. Navigate to the project directory:

3. Install dependencies:

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:
     ```
     PORT=3000
     DB=<your_mongodb_connection_string>
     ACCESS_TOKEN_PRIVATE_KEY=<your_access_token_private_key>
     REFRESH_TOKEN_PRIVATE_KEY=<your_refresh_token_private_key>
     SALT=<salt_rounds_for_password_hashing>
     ```

### Running the Server

Once you have installed the dependencies and set up the environment variables, you can start the server:

The server should now be running on http://localhost:3000.

## Endpoints

- **User Authentication:**

  - `POST /api/signup`: Register a new user.
  - `POST /api/login` : Log in a user and generate access and refresh tokens.

- **User Profile Management:**

  - `GET /api/user/get`: Get user profile information.
  - `PUT /api/user/update`: Update user profile information.

- **Post Management:**
  - `POST /api/post/create`: Create a new post.
  - `GET /api/post/get`: Fetch all posts.
  - `GET /api/post/get/:id`: Fetch a specific post by ID.

## Built With

- Node.js - JavaScript runtime environment
- Express.js - Web application framework for Node.js
- MongoDB - NoSQL database
- JSON Web Tokens (JWT) - Authentication mechanism

## Authors

- [ Abrham Belayineh ](https://github.com/abrsh6266) - Initial work
