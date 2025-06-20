// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Paginated category fetch
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const categories = await Category.find().skip(skip).limit(limit);
    const total = await Category.countDocuments();

    res.json({ categories, total });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
