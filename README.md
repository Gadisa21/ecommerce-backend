# E-Commerce REST API

This project is a  REST API for an e-commerce platform. It provides core functionalities including user authentication, product catalog management for admins, and a complete order placement and history viewing system for users.

The API is built with a clean, scalable, and maintainable architecture, separating concerns into distinct layers for routing, controllers, business logic (use cases), and data access (repositories).

---

## Core Features

-   **User Authentication**: Secure user registration and login system using JWT (JSON Web Tokens).
-   **Role-Based Access Control**: Differentiates between standard `USER` and `ADMIN` roles to protect sensitive endpoints.
-   **Product Management (Admin)**: Admins can perform full CRUD (Create, Read, Update, Delete) operations on the product catalog.
-   **Product Browsing (Public)**: Publicly accessible endpoints for viewing and searching the product catalog with pagination.
-   **Order Management (User)**: Authenticated users can place new orders and view their complete order history.
-   **Transactional Order Placement**: Ensures that placing an order (checking stock, updating stock, creating the order record) is an atomic operation that either fully succeeds or fully fails, preventing data inconsistency.
-   **Robust Validation**: All incoming requests are validated using Zod to ensure data integrity and provide clear error messages.

---

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Validation**: Zod
-   **Authentication**: JSON Web Tokens (JWT) & bcrypt (for password hashing)

---

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
-   [Node.js](https://nodejs.org/) 
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   A running instance of [PostgreSQL](https://www.postgresql.org/)

---

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/Gadisa21/ecommerce-backend
cd ecommerce-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of the project by copying the example file.

```bash
cp .env.example .env
```
Now, open the newly created `.env` file and fill in your actual PostgreSQL database connection URL,port and a strong, secret string for the `JWT_SECRET`.

### 4. Set Up the Database
This command will run all the migrations to create the necessary tables in your database.

```bash
npm run db:migrate
```


### 5. Seed the Database
This essential step creates a default **Admin** user in the database so you can test the admin-protected endpoints.

-   **Email**: `admin@example.com`
-   **Password**: `AdminPassword1!`

```bash
npx prisma db seed
```

---

## Running the Application

To start the server in development mode with automatic hot-reloading:

```bash
npm run dev
```
The server will start and be accessible at `http://localhost:4000` (or the port you specify).

---

## API Endpoint Reference

### Authentication (`/api/auth`)
| Method | Endpoint         | Description                   | Access  |
| :----- | :--------------- | :---------------------------- | :------ |
| `POST` | `/register`      | Registers a new standard user | Public  |
| `POST` | `/login`         | Logs in a user, returns a JWT | Public  |

### Products (`/api/products`)
| Method   | Endpoint       | Description                                  | Access  |
| :------- | :------------- | :------------------------------------------- | :------ |
| `POST`     | `/`            | Creates a new product                        | Admin   |
| `GET`      | `/`            | Gets a paginated list of all products (`?page=1&pageSize=10&search=term`) | Public  |
| `GET`      | `/:id`         | Gets the details of a single product         | Public  |
| `PUT`      | `/:id`         | Updates an existing product                  | Admin   |
| `DELETE`   | `/:id`         | Deletes a product                            | Admin   |

### Orders (`/api/orders`)
| Method | Endpoint | Description                               | Access |
| :----- | :------- | :---------------------------------------- | :----- |
| `POST` | `/`      | Places a new order for the logged-in user | User   |
| `GET`  | `/`      | Gets the order history of the logged-in user | User   |