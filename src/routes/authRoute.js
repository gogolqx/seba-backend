"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares/index');
const AuthController = require('../controllers/authController');


router.post('/login', AuthController.login);
router.post('/register_guide', AuthController.register_guide);
router.post('/register_traveler', AuthController.register_traveler);
router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);

module.exports = router;