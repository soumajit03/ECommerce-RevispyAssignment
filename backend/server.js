const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const userInterestRoutes = require('./routes/userInterestRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express(); // ✅ You must declare `app` before using it!
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/interests', userInterestRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  // Start server only after DB connects
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
