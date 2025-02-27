# Bicycle Store Application

## Project Overview
The Bicycle Store Application is a full-stack e-commerce platform for buying bicycles. It features role-based authentication, product management, and secure checkout. The application ensures a smooth user experience with responsive design, error handling, and efficient state management.

## Features
### Public Features:
- **Home Page:**
  - Navigation bar with logo and links
  - Featured bicycle showcase
  - Testimonials and footer
- **All Bicycles Page:**
  - Search and filter options
  - Dynamic bicycle listings with detailed views
- **Bicycle Details Page:**
  - Product specifications and images
  - "Buy Now" button for checkout
- **About Page:**
  - Information about the shop and mission

### Private Features:
- **User Authentication:**
  - Secure user registration and login with JWT-based authentication
  - Logout functionality
- **Checkout Page:**
  - Order bicycles with real-time stock validation
  - Secure payment via SurjoPay or other gateways
- **Dashboard (Role-Based):**
  - **Admin:** Manage users, products, and orders (CRUD operations)
  - **User:** View order history, update profile, and change passwords

### Additional Features:
- **Responsive UI:** Optimized for all screen sizes
- **Error Handling:** Meaningful messages for failed operations
- **Loading States & Toasts:** Enhance user experience with feedback notifications

## Tech Stack
### Frontend:
- React.js with TypeScript
- Tailwind CSS amd Antd for styling
- React Router for navigation

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose for database management
- JSON Web Tokens (JWT) for authentication

### Payment Integration:
- SSLCommerz

## Installation & Setup
### Prerequisites:
- Node.js & npm installed
- MongoDB running (local or cloud)

### Steps:
1. **Clone the repository:**
   ```sh
   https://github.com/CodeBuddy07/bicycle-store-client.git
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Setup environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   SURJOPAY_KEY=your_payment_api_key
   ```
4. **Run the backend server:**
   ```sh
   npm run dev
   ```
5. **Navigate to the frontend directory and install dependencies:**
   ```sh
   cd client
   npm install
   ```
6. **Start the frontend:**
   ```sh
   npm run dev
   ```

### Running in Production:
- Use `pm2` to manage the backend server
- Deploy the frontend using Vercel or Netlify
- Use MongoDB Atlas for database hosting

## API Endpoints
### Authentication:
- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/logout` - Logout user

### Bicycle Management:
- `GET /api/bicycles` - Get all bicycles with filtering
- `GET /api/bicycles/:id` - Get bicycle details
- `POST /api/bicycles` - Add a new bicycle (Admin only)
- `PUT /api/bicycles/:id` - Update bicycle details (Admin only)
- `DELETE /api/bicycles/:id` - Remove a bicycle (Admin only)

### Order Management:
- `POST /api/orders` - Place a new order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/admin` - Get all orders (Admin only)



