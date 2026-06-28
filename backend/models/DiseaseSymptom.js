const mongoose = require('mongoose');

const diseaseSymptomSchema = new mongoose.Schema({
  dogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog' },
  symptoms: [String], // Array of symptom strings
  possibleDisease: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DiseaseSymptom', diseaseSymptomSchema);
