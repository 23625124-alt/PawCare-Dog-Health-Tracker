const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  dogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog' },
  vaccine: { type: String, required: true },
  date: { type: Date, default: Date.now },
  due: Date
});

module.exports = mongoose.model('Vaccination', vaccinationSchema);
