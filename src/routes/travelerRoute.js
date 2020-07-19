const express = require('express');
const router = express.Router();
const TravelerController = require('../controllers/travelerController');
const middlewares = require('../middlewares/authentication');
router.get('/:id', GuideController.list); // List all tours from this id


module.exports = router;

router.post('/:username/preferences',  middlewares.checkTravelerAuthentication,TravelerController.setPreference);