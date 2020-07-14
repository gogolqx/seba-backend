"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const cors = require('cors');
const toursRoute = require('./routes/toursRoute');
const authRoute = require('./routes/authRoute');
const guideRoute = require('./routes/guideRoute');
const bookingRoute = require('./routes/bookingRoute');
const reviewsRoute = require('./routes/reviewsRoute');
const blogRoute = require('./routes/blogRoute');
const middlewares = require('./middlewares/index');
const api = express();

require('dotenv/config');


// Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// Basic Routes

api.get('/',(req,res) => {
    res.send('SEBA GROUP 34 GoLocal Backend');

});

// API routes
api.use('/auth',authRoute)
api.use('/tours',toursRoute);
api.use('/guide_dashboard',guideRoute);
api.use('/booking',bookingRoute);
api.use('/reviews',reviewsRoute);
api.use('/blog',blogRoute);


module.exports = api;
