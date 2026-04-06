import dotenv from 'dotenv';
// Load environment variables at the very top
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from '../backend/routes/authRoutes.js';
import transactionRoutes from '../backend/routes/transactionRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  console.log('Attempting to connect to MongoDB...');
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Don't throw error here, let the app handle disconnected state
  }
};

// Initialize connection
if (mongoURI && !mongoURI.includes('username:password')) {
  connectDB();
} else {
  console.warn('MONGODB_URI is not configured or is using the default placeholder.');
}

// Middleware to ensure DB connection on each request if not connected
app.use(async (req, res, next) => {
  if (mongoURI && mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Finance Dashboard API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    readyState: mongoose.connection.readyState,
    env: process.env.NODE_ENV,
    adminEmailConfigured: !!process.env.ADMIN_EMAIL,
    jwtSecretConfigured: !!process.env.JWT_SECRET
  });
});

// Vite Middleware for Development
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

// Only listen if this file is run directly
if (process.env.NODE_ENV !== 'production') {
  setupVite().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
} else {
  // In production (Vercel), static files are served by the build output
  // but we still need to handle the SPA fallback if not handled by vercel.json
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
}

export default app;
