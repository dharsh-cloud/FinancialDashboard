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

// Initialize connection (Non-blocking)
if (mongoURI && !mongoURI.includes('username:password')) {
  connectDB(); // Start connection in background
} else {
  console.warn('MONGODB_URI is not configured or is using the default placeholder.');
}

// Middleware to ensure DB connection (Optimized for Serverless)
app.use((req, res, next) => {
  // Don't await here! Just let it connect in the background.
  // Controllers will handle the state via mongoose.connection.readyState
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Fallback for Vercel rewrites (if /api is stripped or doubled)
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/api/api/auth', authRoutes); // Just in case of weird double rewrites

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Finance Dashboard API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    readyState: mongoose.connection.readyState,
    env: process.env.NODE_ENV,
    adminEmailConfigured: !!process.env.ADMIN_EMAIL,
    jwtSecretConfigured: !!process.env.JWT_SECRET,
    adminEmail: (process.env.ADMIN_EMAIL || 'admin@findash.com').replace(/(.{2}).*@(.*)/, '$1***@$2'),
    time: new Date().toISOString()
  });
});

// 404 Handler
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err);
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: process.env.NODE_ENV === 'production' ? 'Check server logs' : err.message 
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

// Start Server
async function startServer() {
  await setupVite();
  
  let currentPort = PORT;
  const server = app.listen(currentPort, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${currentPort}`);
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port ${currentPort} is busy, trying ${parseInt(currentPort) + 1}...`);
      currentPort = parseInt(currentPort) + 1;
      server.listen(currentPort, '0.0.0.0');
    } else {
      console.error('Server error:', e);
    }
  });
}

if (process.env.NODE_ENV !== 'production') {
  startServer();
} else {
  // In production (Vercel), static files are served by the build output
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
}

export default app;
