const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/authentication');
const BookController = require('../controllers/bookingController');

router.get('/:tour_id', BookController.load); // List details for this tour
router.post('/:tour_id', middlewares.checkTravellerAuthentication, BookController.book); // Create a new tours   middlewares.checkAuthentication, 


module.exports = router;