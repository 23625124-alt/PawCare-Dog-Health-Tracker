const express = require('express');
const router = express.Router();
const Breed = require('../models/Breed');

// GET all breeds
router.get('/', async (req, res) => {
  try {
    const breeds = await Breed.find();
    res.json(breeds);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch breeds'});
  }
});

// POST a new breed
router.post('/', async (req, res) => {
  try {
    const breed = new Breed(req.body);
    await breed.save();
    res.json(breed);
  } catch (err) {
    res.status(400).json({error: 'Failed to add breed'});
  }
});

module.exports = router;
