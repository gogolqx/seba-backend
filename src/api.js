"use strict";

require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares/index');
const app = express();

//passport
var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');
app.use(passport.initialize());
jwtConfig(passport);



// Middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middlewares.allowCrossDomain);
// Basic Routes

app.get('/',(req,res) => {
    res.send('SEBA GROUP 34 GoLocal Backend');

});

const toursRoute = require('./routes/tours');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

// API routes
app.use('/auth',authRoute)
app.use('/tours',toursRoute);
//api.use('/guides',guidesRoute);
//app.use('/users',userRoutes);
app.use('/user', userRoute(passport));

module.exports = app;




