const express = require('express');
const router = express.Router();
const Vaccination = require('../models/Vaccination');

// GET vaccinations for a dog
router.get('/:dogId', async (req, res) => {
  const records = await Vaccination.find({ dogId: req.params.dogId });
  res.json(records);
});

// POST a new vaccine record
router.post('/', async (req, res) => {
  const vacc = new Vaccination(req.body);
  await vacc.save();
  res.json(vacc);
});

module.exports = router;
