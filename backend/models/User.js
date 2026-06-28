const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  password: String // Always hash in production!
});

module.exports = mongoose.model('User', userSchema);
