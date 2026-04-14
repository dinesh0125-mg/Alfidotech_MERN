const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ─── Cookie options ───────────────────────────────────────────────────────────
const cookieOptions = {
  httpOnly: true,          // JS cannot access the cookie (XSS protection)
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'strict',      // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

// Helper: sign JWT
const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// ─── POST /api/auth/register ──────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check duplicate email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Create user (password hashed by pre-save hook)
    const user = await User.create({ name, email, password });

    // Issue JWT in httpOnly cookie
    const token = signToken(user._id);
    res.cookie('token', token, cookieOptions);

    res.status(201).json({
      message: 'Registration successful.',
      user,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user (include password for comparison)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Issue JWT in httpOnly cookie
    const token = signToken(user._id);
    res.cookie('token', token, cookieOptions);

    // Remove password from response
    const userObj = user.toJSON();
    res.status(200).json({ message: 'Login successful.', user: userObj });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
  res.status(200).json({ message: 'Logged out successfully.' });
});

// ─── GET /api/auth/check ──────────────────────────────────────────────────────
// Used by frontend to check if user is still authenticated on page refresh
router.get('/check', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ authenticated: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ authenticated: false });

    res.status(200).json({ authenticated: true, user });
  } catch {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
