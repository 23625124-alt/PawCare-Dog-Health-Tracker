const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Breed', breedSchema);
