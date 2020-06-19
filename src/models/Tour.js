const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration:{
        type: Number
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Tours', TourSchema);