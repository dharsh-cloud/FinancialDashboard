import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

export const loginUser = async (req, res) => {
  const { email: rawEmail, password } = req.body;
  const email = rawEmail?.toLowerCase();
  console.log(`Login attempt for: ${email}`);

  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@findash.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let user = null;
    
    if (isDbConnected) {
      try {
        user = await User.findOne({ email });
      } catch (findError) {
        console.error('Error finding user in DB:', findError.message);
      }
    }

    // If user not found in DB, check against mock/env credentials
    if (!user) {
      if (email === adminEmail && password === adminPassword) {
        if (isDbConnected) {
          try {
            user = await User.create({
              name: 'Admin User',
              email: adminEmail,
              password: adminPassword,
              role: 'admin'
            });
          } catch (createError) {
            console.error('Could not create admin in DB, using mock response:', createError.message);
            return res.json({
              _id: 'mock_admin_id',
              name: 'Admin User',
              email: adminEmail,
              role: 'admin',
              token: generateToken('mock_admin_id')
            });
          }
        } else {
          return res.json({
            _id: 'mock_admin_id',
            name: 'Admin User',
            email: adminEmail,
            role: 'admin',
            token: generateToken('mock_admin_id')
          });
        }
      }
    } else {
      // User found in DB. If it's the admin email, check if env password matches
      if (email === adminEmail && password === adminPassword) {
        // Force success for admin if env credentials match
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        });
      }
    }

    if (user) {
      // If it's a Mongoose document, use matchPassword
      if (typeof user.matchPassword === 'function') {
        const isMatch = await user.matchPassword(password);
        if (isMatch) {
          return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
          });
        }
      } else {
        // If it's a mock object, just check the password directly (since it's not hashed in the mock)
        // Or if it was created in DB but returned as mock, we already verified it.
        // In the mock case, we already checked email/password before creating the mock object.
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        });
      }
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('Login Controller Critical Error:', error.message);
    res.status(500).json({ message: 'Internal server error during login', error: error.message });
  }
};
