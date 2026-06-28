const express = require('express');
const router = express.Router();
const HealthRecord = require('../models/HealthRecord');

// GET health records for a dog
router.get('/:dogId', async (req, res) => {
  try {
    const records = await HealthRecord.find({ dogId: req.params.dogId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch health records' });
  }
});

// POST a new health record
router.post('/', async (req, res) => {
  try {
    const record = new HealthRecord(req.body);
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add health record' });
  }
});

module.exports = router;
