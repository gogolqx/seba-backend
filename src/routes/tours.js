const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/index');

const TourController = require('../controllers/tours');

router.post('/search', TourController.search);
router.get('/', TourController.list); // List all tours
router.post('/', TourController.create); // Create a new tours   middlewares.checkAuthentication, 
router.put('/:id',  TourController.update); // Update a tours by Id   middlewares.checkAuthentication,
router.delete('/:id',  TourController.remove); // Delete a tours by Id    middlewares.checkAuthentication,


module.exports = router;