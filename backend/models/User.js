const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  interests:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Password comparison
userSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model('User', userSchema);
