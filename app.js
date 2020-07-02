const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');
const express = require('express');
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

const PORT = process.env.PORT || 8081;
const server = app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port .', PORT)
})
