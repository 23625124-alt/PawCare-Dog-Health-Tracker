const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple registration endpoint
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({error: 'Registration failed'});
  }
});

// Simple login endpoint (add JWT for real projects)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password }); // **Don't use plain text in real code!**
  if (!user) return res.status(401).json({error: 'Invalid credentials'});
  res.json({message: 'Login successful'});
});

module.exports = router;
