const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: mongoose.Schema.Types.ObjectId, ref: 'Breed' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  age: Number,
  photo: String
});

module.exports = mongoose.model('Dog', dogSchema);
