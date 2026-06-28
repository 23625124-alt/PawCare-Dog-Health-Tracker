const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// Get all pets for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    console.error('Error fetching pets:', err);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// Get a specific pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    console.error('Error fetching pet:', err);
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
});

// Create a new pet
router.post('/', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error('Error creating pet:', err);
    res.status(400).json({ error: 'Failed to create pet' });
  }
});

// Replace reminders and notes for a pet dashboard record
router.patch('/:id/dashboard', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    console.error('Error updating pet dashboard data:', err);
    res.status(400).json({ error: 'Failed to update pet dashboard data' });
  }
});

// Update a pet
router.put('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    console.error('Error updating pet:', err);
    res.status(400).json({ error: 'Failed to update pet' });
  }
});

// Delete a pet
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully' });
  } catch (err) {
    console.error('Error deleting pet:', err);
    res.status(500).json({ error: 'Failed to delete pet' });
  }
});

// Get pet statistics for a user
router.get('/stats/:userId', async (req, res) => {
  try {
    const totalPets = await Pet.countDocuments({ userId: req.params.userId });
    const petsByType = await Pet.aggregate([
      { $match: { userId: req.params.userId } },
      { $group: { _id: '$petType', count: { $sum: 1 } } }
    ]);
    
    res.json({
      totalPets,
      petsByType
    });
  } catch (err) {
    console.error('Error fetching pet stats:', err);
    res.status(500).json({ error: 'Failed to fetch pet statistics' });
  }
});

module.exports = router;

