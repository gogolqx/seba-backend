const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/index');

const TourController = require('../controllers/tours');
const BookController = require('../controllers/booking');

router.get('/:id', BookController.load); // List all tours
router.post('/:id', BookController.book); // Create a new tours   middlewares.checkAuthentication, 


module.exports = router;