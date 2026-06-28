const express = require('express');
const router = express.Router();
const Dog = require('../models/Dog');

// GET all dogs for a user
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const dogs = await Dog.find({ owner: req.params.ownerId }).populate('breed');
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// POST a new dog
router.post('/', async (req, res) => {
  try {
    const dog = new Dog(req.body);
    await dog.save();
    res.json(dog);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add dog' });
  }
});

module.exports = router;
