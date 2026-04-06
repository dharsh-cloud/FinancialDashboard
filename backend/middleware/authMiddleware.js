import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Handle guest token explicitly for demo purposes
      if (token === 'guest_token') {
        req.user = { _id: 'guest_viewer_id', name: 'Guest Viewer', email: 'guest@findash.com', role: 'viewer' };
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      
      // Handle mock users
      if (decoded.id === 'mock_admin_id') {
        req.user = { _id: 'mock_admin_id', name: 'Admin User', email: 'admin@findash.com', role: 'admin' };
        return next();
      }
      if (decoded.id === 'mock_viewer_id' || token === 'guest_token') {
        req.user = { _id: 'mock_viewer_id', name: 'Viewer User', email: 'viewer@findash.com', role: 'viewer' };
        return next();
      }

      if (mongoose.Types.ObjectId.isValid(decoded.id)) {
        if (mongoose.connection.readyState !== 1) {
          // If DB is not connected, we can't verify the user in DB
          // But we can still allow mock users if they were verified by JWT
          // However, for real users, we need the DB.
          // Let's log it and return 503
          console.warn('Database not connected during auth verification');
          return res.status(503).json({ message: 'Database not connected' });
        }
        req.user = await User.findById(decoded.id).select('-password');
      }
      
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
