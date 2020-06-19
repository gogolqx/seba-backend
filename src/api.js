"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const cors = require('cors');
const toursRoute = require('./routes/tours');
//const guidesRoute = require('./routes/guides');
//const usersRoute = require('./routes/users');
const middlewares = require('./middlewares/index');
const api = express();

require('dotenv/config');


// Middlewares
api.use(bodyParser.json());
api.use(cors());
api.use(middlewares.middleware);
// Basic Routes

api.get('/',(req,res) => {
    res.send('SEBA GROUP 34 GoLocal Backend');

});

// API routes
api.use('/tours',toursRoute);
//api.use('/guides',guidesRoute);
//api.use('/users',usersRoute);
api.use(middlewares.middleware);


module.exports = api;
