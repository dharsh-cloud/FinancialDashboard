# FinDash - Premium Finance Dashboard

A modern, professional MERN stack finance dashboard with real-time analytics, role-based access, and advanced visualizations.

## Features

- **Modern UI/UX**: Glassmorphism design, smooth animations with Framer Motion, and responsive layout.
- **Real-time Analytics**: Dynamic charts using Recharts for balance trends and spending breakdown.
- **Role-Based Access Control**:
  - **Admin**: Full CRUD permissions for transactions.
  - **Viewer**: Read-only access to dashboard and insights.
- **Advanced Insights**: AI-powered financial analysis and budget optimization suggestions.
- **Full-Stack Architecture**: Node.js/Express backend with MongoDB Atlas integration.

## Technology Stack

- **Frontend**: React, Vite, TailwindCSS, Framer Motion, Recharts, Zustand, Axios.
- **Backend**: Node.js, Express, Mongoose, JWT, BcryptJS.
- **Database**: MongoDB Atlas.

## Folder Structure

- `server.js`: Main entry point (Express + Vite Middleware).
- `backend/`:
  - `controllers/`: Auth and Transaction logic.
  - `models/`: Mongoose schemas.
  - `routes/`: API endpoints.
  - `middleware/`: Auth and Role protection.
- `src/`:
  - `components/`: Reusable UI components.
  - `pages/`: Login and Dashboard pages.
  - `store/`: Zustand state management.
  - `services/`: API configuration.

## Setup Instructions

1. **Environment Variables**:
   Create a `.env` file based on `.env.example` and provide your `MONGODB_URI` and `JWT_SECRET`.

2. **Installation**:
   ```bash
   npm install
   ```

3. **Running the App**:
   ```bash
   npm run dev
   ```

## Demo Credentials

- **Admin**: `admin@findash.com` / `admin123`
- **Viewer**: `viewer@findash.com` / `viewer123`
