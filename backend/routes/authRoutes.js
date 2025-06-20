const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Optional: Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Explicitly construct user to trigger validation and hashing
    const user = new User({ name, email, password, interests: [] });
    await user.save();

    res.status(201).json({ message: 'User registered' });
  } catch (e) {
    console.error('Registration error:', e);
    res.status(400).json({ error: e.message });
  }
});

// Login existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', userId: user._id, name: user.name });
});

module.exports = router;
