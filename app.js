const express = require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/auth'); // Import authentication middleware
const agencyRoutes = require('./routes/agencyRoutes');
const clientRoutes = require('./routes/clientRoutes');
const clientagency = require('./routes/agencyClientRoutes');
const topClients = require('./routes/topClientRoutes');
require('dotenv').config();

// Initialize Express app
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/agencies', authMiddleware); // Apply authentication middleware to all agency routes
app.use('/api/agencies', agencyRoutes);
app.use('/api/agencies', topClients);
app.use('/api/agencies', clientagency);
app.use('/api/clients', authMiddleware); // Apply authentication middleware to all client routes
app.use('/api/clients', clientRoutes);

// Login endpoint to generate and return token
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
    console.log(username+" "+password)
    console.log(process.env.AUTH_USERNAME)
    console.log(process.env.AUTH_PASSWORD)
  // Check username and password (replace this with your own authentication logic)
  if (username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD) {
    // Generate token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
