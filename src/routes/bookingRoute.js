const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/index');

const TourController = require('../controllers/toursController');
const BookController = require('../controllers/bookingController');

router.get('/:tour_id', BookController.load); // List all tours
router.post('/:tour_id', BookController.book); // Create a new tours   middlewares.checkAuthentication, 


module.exports = router;