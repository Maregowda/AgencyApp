// routes/agencyRoutes.js
const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes for CRUD operations on agencies
router.post('/create', authMiddleware.authenticateUser, agencyController.createAgency);
router.get('/getagency/:id', authMiddleware.authenticateUser, agencyController.getAgencyById);
router.put('/update/:id', authMiddleware.authenticateUser, agencyController.updateAgency);
router.delete('/delete/:id', authMiddleware.authenticateUser, agencyController.deleteAgency);

module.exports = router;
