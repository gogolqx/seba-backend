const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/authentication');
const ReviewController = require('../controllers/reviewsController');


router.post('/:tour_id', middlewares.checkTravellerAuthentication, ReviewController.create); // create a review

module.exports = router;