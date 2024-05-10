const express = require('express');
const router = express.Router();
const Agency = require('../models/Agency');
const Client = require('../models/Client');

// Route to return the name of the agency along with top client details
router.get('/topClients', async (req, res) => {
  try {
    // Find agencies with clients sorted by totalBill descending
    const agenciesWithTopClients = await Agency.aggregate([
      {
        $lookup: {
          from: 'clients',
          localField: '_id',
          foreignField: 'agencyId',
          as: 'clients'
        }
      },
      {
        $unwind: '$clients'
      },
      {
        $sort: { 'clients.totalBill': -1 }
      },
      {
        $group: {
          _id: '$_id',
          agencyName: { $first: '$name' },
          topClients: { $push: {
                                clientName: '$clients.name',
                                totalBill: '$clients.totalBill' 
                              }
                    }
        }
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          agencyName: 1, // Include agencyName field
          topClients: 1 // Include topClients field
        }
      }
    ]);

    // Send response
    res.status(200).json(agenciesWithTopClients);
  } catch (error) {
    console.error('Error fetching top clients:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
