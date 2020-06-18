const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');


//Middlewares
app.use(bodyParser.json());
app.use(cors());
// Import Routes
const toursRoute = require('./routes/tours');

app.use('/tours',toursRoute);
//ROUTES

app.get('/',(req,res) => {
    res.send('We are on home');

});
// connect to DB

mongoose.connect(
    process.env.MONGODB_URI,//{ useNewUrlParser: true,useUnifiedTopology: true},
 ()=> console.log('connected to DB!'));

//listening
app.listen(3000);
