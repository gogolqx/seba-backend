const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/authentication');
const TourController = require('../controllers/toursController');
const clController = require('../controllers/clController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


//basic url is /tours
router.post('/search', TourController.search);
router.get('/:username', TourController.usersTours); // List all tours of a guide
router.get('/', TourController.list); // List all tours

router.post('/:username/create',  middlewares.checkGuideAuthentication,TourController.create); // Create a new tours   middlewares.checkAuthentication,
router.get('/:username/:tour_id',   middlewares.checkGuideAuthentication,TourController.read)
router.put('/:username/:tour_id', TourController.update); // Update a tours by Id   middlewares.checkAuthentication,
router.delete('/:username/:tour_id',  middlewares.checkGuideAuthentication, TourController.remove); // Delete a tours by Id    middlewares.checkAuthentication,

//router.post('/upload',UploadController.uploadFile);
router.post('/upload', multipartMiddleware,clController.create);


module.exports = router;
