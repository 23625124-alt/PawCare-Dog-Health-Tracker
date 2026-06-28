const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pawcare';

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

// Import route files according to your directory
const authRoutes = require('./routes/auth');
const breedRoutes = require('./routes/breeds');
const symptomRoutes = require('./routes/DiseaseSymptom');
const dogRoutes = require('./routes/dogs');
const groomingRoutes = require('./routes/grooming');
const healthRoutes = require('./routes/health');
const vaccineRoutes = require('./routes/Vaccination');
const petRoutes = require('./routes/pets');

// Use routes (the path part after /api/ is up to you)
app.use('/api/auth', authRoutes);
app.use('/api/breeds', breedRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/grooming', groomingRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/vaccine', vaccineRoutes);
app.use('/api/pets', petRoutes);

// Example home route
app.get('/', (req, res) => {
  res.send("PawCare backend is running!");
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', service: 'PawCare API' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
