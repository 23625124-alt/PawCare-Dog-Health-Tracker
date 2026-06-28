const express = require('express');
const router = express.Router();
const GroomingRecord = require('../models/GroomingRecord');

// GET all grooming records for a dog
router.get('/:dogId', async (req, res) => {
  try {
    const records = await GroomingRecord.find({ dogId: req.params.dogId });
    res.json(records);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch records'});
  }
});

// POST a new grooming record
router.post('/', async (req, res) => {
  try {
    const record = new GroomingRecord(req.body);
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(400).json({error: 'Failed to add record'});
  }
});

module.exports = router;
