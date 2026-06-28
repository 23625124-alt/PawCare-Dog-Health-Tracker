const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  dogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog' },
  recordType: String, // Vaccination, Checkup, Surgery, etc.
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
