const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save user interests (attach to user doc)
router.post('/', async (req, res) => {
  const { email, categoryIds } = req.body;

  console.log('🔄 Saving interests');
  console.log('📧 Email:', email);
  console.log('📂 Categories:', categoryIds);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    user.interests = categoryIds;
    await user.save();

    console.log('✅ Interests saved successfully');
    res.json({ message: 'Interests saved' });

  } catch (error) {
    console.error('❌ Error saving interests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch user interests
router.get('/', async (req, res) => {
  const { email } = req.query;

  console.log('📥 Fetching interests for:', email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('⚠️ User not found. Returning empty interests.');
      return res.json({ categoryIds: [] });
    }

    console.log('✅ Returning user interests:', user.interests);
    res.json({ categoryIds: user.interests });

  } catch (error) {
    console.error('❌ Error fetching interests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
