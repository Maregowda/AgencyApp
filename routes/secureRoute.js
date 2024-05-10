
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

router.get('/secure', authenticate, (req, res) => {
  // Access authenticated user using req.user
  res.json({ message: 'Authenticated user', user: req.user });
});

module.exports = router;
