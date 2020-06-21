"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const cors = require('cors');
const toursRoute = require('./routes/tours');
const authRoute = require('./routes/auth');
//const guidesRoute = require('./routes/guides');
//const usersRoute = require('./routes/users');
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
//api.use('/guides',guidesRoute);
//api.use('/users',usersRoute);



module.exports = api;
