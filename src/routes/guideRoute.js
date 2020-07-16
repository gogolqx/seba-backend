const express = require('express');
const router = express.Router();
//const middleware = require('../middlewares');
const GuideController = require('../controllers/guideController');
router.get('/:id', GuideController.list); // List all tours from this id

module.exports = router;
