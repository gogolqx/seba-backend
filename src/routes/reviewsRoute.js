const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const ReviewController = require('../controllers/reviewsController');


router.post('/:tour_id', middlewares.checkTravellerAuthentication, ReviewController.create); // create a review

//router.get('/', ReviewController.list); 
module.exports = router;