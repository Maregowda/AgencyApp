const express = require('express');
const router = express.Router();
const Agency = require('../models/Agency');
const Client = require('../models/Client');

// Route to create an agency and client in a single request
router.post('/createAgencyClient', async (req, res) => {
  try {
    // Extract agency and client data from request body
    const { agency, client } = req.body;
    console.log(req.body);
    console.log(agency);
    console.log(client);
    // Create agency
    const newAgency = await Agency.create(agency);

    // Attach agencyId to clientData
    client.agencyId = newAgency._id;

    // Create client
    const newClient = await Client.create(client);

    // Send response
    res.status(201).json({ message: 'Agency and client created successfully', agency: newAgency, client: newClient });
  } catch (error) {
    console.error('Error creating agency and client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
