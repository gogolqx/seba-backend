const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/index');

const TourController = require('../controllers/toursController');

router.post('/search', TourController.search);
router.get('/', TourController.list); // List all tours
router.post('/:user_id/create',  middlewares.checkGuideAuthentication,TourController.create); // Create a new tours   middlewares.checkAuthentication, 
router.put('/:user_id/:tour_id',   middlewares.checkGuideAuthentication,TourController.update); // Update a tours by Id   middlewares.checkAuthentication,
router.delete('/:user_id/:tour_id',  middlewares.checkGuideAuthentication, TourController.remove); // Delete a tours by Id    middlewares.checkAuthentication,


module.exports = router;