const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number },
  weight: { type: Number },
  symptoms: { type: String },
  medicalHistory: { type: String },
  allergies: { type: String },
  medications: { type: String },
  vetContact: { type: String },
  emergencyContact: { type: String },
  breedType: { type: String },
  vaccinationReminders: [{
    name: String,
    dueDate: Date,
    notes: String
  }],
  groomingReminders: [{
    task: String,
    dueDate: Date,
    notes: String
  }],
  healthNotes: [{
    title: String,
    note: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
petSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Pet', petSchema);

