const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes for CRUD operations on clients
router.post('/create', clientController.createClient);
router.get('/getclient/:id', clientController.getClientById);
router.put('/update/:id', clientController.updateClient);
router.delete('/delete/:id', clientController.deleteClient);

module.exports = router;
