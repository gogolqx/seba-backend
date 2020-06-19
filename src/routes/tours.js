const express = require('express');
const router = express.Router();
const middleware = require('../middlewares');

const TourController = require('../controllers/tours');


router.get('/', TourController.list); // List all tours
router.post('/', TourController.create); // Create a new tours   middlewares.checkAuthentication, 




module.exports = router;