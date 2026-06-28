const mongoose = require('mongoose');

const groomingRecordSchema = new mongoose.Schema({
  dogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog' },
  event: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GroomingRecord', groomingRecordSchema);
