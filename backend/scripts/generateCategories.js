const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Category = require('../models/Category');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
  seedCategories();
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

async function seedCategories() {
  try {
    await Category.deleteMany(); // optional: clean old data
    const categories = [];

    for (let i = 0; i < 100; i++) {
      categories.push({ name: faker.commerce.department() });
    }

    await Category.insertMany(categories);
    console.log('✅ Successfully inserted 100 categories');
    process.exit();
  } catch (error) {
    console.error('Error inserting categories:', error);
    process.exit(1);
  }
}
