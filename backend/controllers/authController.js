import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for: ${email}`);

  try {
    // Check if DB is connected
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      console.warn('Database not connected during login attempt. Falling back to mock users.');
    }

    // Check if user exists in DB
    let user = null;
    if (isDbConnected) {
      user = await User.findOne({ email });
    } else {
      console.warn('Database not connected, skipping findOne');
    }

    // If DB is not connected or user not found, handle mock users from env
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@findash.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const viewerEmail = process.env.VIEWER_EMAIL || 'viewer@findash.com';
    const viewerPassword = process.env.VIEWER_PASSWORD || 'viewer123';

    if (!user) {
      if (email === adminEmail && password === adminPassword) {
        // Try to create the admin user in DB if possible
        try {
          user = await User.create({
            name: 'Admin User',
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
          });
        } catch (dbError) {
          // If DB creation fails, return mock response
          return res.json({
            _id: 'mock_admin_id',
            name: 'Admin User',
            email: adminEmail,
            role: 'admin',
            token: generateToken('mock_admin_id')
          });
        }
      } else if (email === viewerEmail && password === viewerPassword) {
        try {
          user = await User.create({
            name: 'Viewer User',
            email: viewerEmail,
            password: viewerPassword,
            role: 'viewer'
          });
        } catch (dbError) {
          return res.json({
            _id: 'mock_viewer_id',
            name: 'Viewer User',
            email: viewerEmail,
            role: 'viewer',
            token: generateToken('mock_viewer_id')
          });
        }
      }
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Controller Error:', error.message, error.stack);
    // Fallback to purely mock if everything fails
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@findash.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const viewerEmail = process.env.VIEWER_EMAIL || 'viewer@findash.com';
    const viewerPassword = process.env.VIEWER_PASSWORD || 'viewer123';

    if (email === adminEmail && password === adminPassword) {
      return res.json({
        _id: 'mock_admin_id',
        name: 'Admin User',
        email: adminEmail,
        role: 'admin',
        token: generateToken('mock_admin_id')
      });
    }
    if (email === viewerEmail && password === viewerPassword) {
      return res.json({
        _id: 'mock_viewer_id',
        name: 'Viewer User',
        email: viewerEmail,
        role: 'viewer',
        token: generateToken('mock_viewer_id')
      });
    }
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
