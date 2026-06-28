const express = require('express');
const router = express.Router();
const DiseaseSymptom = require('../models/DiseaseSymptom');

// GET all disease symptoms for a dog
router.get('/:dogId', async (req, res) => {
  try {
    const records = await DiseaseSymptom.find({ dogId: req.params.dogId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch disease symptoms' });
  }
});

// POST a new disease symptom report
router.post('/', async (req, res) => {
  try {
    const record = new DiseaseSymptom(req.body);
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add disease symptom record' });
  }
});

module.exports = router;
