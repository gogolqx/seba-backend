"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares/authentication');
const AuthController = require('../controllers/authController');


router.post('/login', AuthController.login);
router.post('/register_guide', AuthController.register_guide);
router.post('/register_traveler', AuthController.register_traveler);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);

module.exports = router;