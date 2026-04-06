import dotenv from 'dotenv';
// Load environment variables at the very top
dotenv.config();

console.log('--- Server Starting ---');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('ADMIN_EMAIL configured:', !!process.env.ADMIN_EMAIL);
console.log('JWT_SECRET configured:', !!process.env.JWT_SECRET);

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

// Ensure body is parsed
app.use((req, res, next) => {
  if (req.method === 'POST' && !req.body) {
    console.warn('WARNING: POST request with empty body!');
  }
  next();
});

// Request Logger for Vercel
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!mongoURI || mongoURI.includes('username:password')) {
    console.warn('MONGODB_URI is not configured. Running in Mock Mode.');
    return null;
  }

  console.log('Attempting to connect to MongoDB...');
  try {
    // Use a shorter timeout for serverless
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    console.log('Continuing in Mock Mode...');
  }
};

// Initialize connection
connectDB();

// Middleware to ensure DB connection (Optimized for Serverless)
app.use((req, res, next) => {
  // Don't await here! Just let it connect in the background.
  // Controllers will handle the state via mongoose.connection.readyState
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Fallback for Vercel rewrites
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    env: process.env.NODE_ENV,
    time: new Date().toISOString()
  });
});

// Static Files & SPA Fallback
const distPath = path.join(process.cwd(), 'dist');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Vite Middleware for Development
  const setupVite = async () => {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      console.log('Vite middleware loaded');
    } catch (e) {
      console.error('Failed to load Vite middleware:', e);
    }
  };
  setupVite();
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server (Local only)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
