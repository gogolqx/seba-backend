const express = require('express');
const router = express.Router();
//const middleware = require('../middlewares');
const ReviewController = require('../controllers/reviews');


router.post('/:id', ReviewController.create); // create a review

//router.get('/', ReviewController.list); 
module.exports = router;