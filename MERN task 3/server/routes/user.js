const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// ─── GET /api/user/profile (protected) ───────────────────────────────────────
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile.' });
  }
});

// ─── PUT /api/user/profile (protected) ───────────────────────────────────────
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: 'Profile updated.', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile.' });
  }
});

module.exports = router;
