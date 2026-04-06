import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

export const loginUser = async (req, res) => {
  const { email: rawEmail, password } = req.body;
  const email = rawEmail?.toLowerCase()?.trim();
  
  console.log(`--- Login Attempt ---`);
  console.log(`Email: ${email}`);
  
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@findash.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    console.log(`DB Connected: ${isDbConnected}`);
    console.log(`Admin Match: ${email === adminEmail}`);

    // 1. PRIORITY: Check against Environment/Default Credentials first
    if (email === adminEmail && password === adminPassword) {
      console.log('Admin credentials matched (Env/Default) - FORCING SUCCESS');
      
      return res.json({
        _id: 'admin_id_fixed',
        name: 'Admin User',
        email: adminEmail,
        role: 'admin',
        token: generateToken('admin_id_fixed')
      });
    }

    // 2. REGULAR USER LOGIN: Check Database
    if (!isDbConnected) {
      console.warn('Login failed: Database not connected for regular user');
      return res.status(503).json({ message: 'Database connecting... please try again in a moment.' });
    }

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      console.log('User authenticated via DB');
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    }

    console.warn('Login failed: Invalid credentials');
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('CRITICAL LOGIN ERROR:', error.message);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};
