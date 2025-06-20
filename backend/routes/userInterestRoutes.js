const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

// Save user interests (attach to user doc)
router.post('/', async (req, res) => {
  const { email, categoryIds } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.interests = categoryIds;
  await user.save();
  res.json({ message: 'Interests saved' });
});

// Fetch user interests
router.get('/', async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (!user) return res.json({ categoryIds: [] });
  res.json({ categoryIds: user.interests });
});

module.exports = router;
