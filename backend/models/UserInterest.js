const mongoose = require('mongoose');

const UserInterestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  categoryIds: {
    type: [String], // Stores an array of category _ids
    default: []
  }
});

module.exports = mongoose.model('UserInterest', UserInterestSchema);
