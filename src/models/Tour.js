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
    city:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    price:{
        type: Number,
        default: 0
    },
    rating:{
        type: Number,
        default: 3
    }
});

module.exports = mongoose.model('Tours', TourSchema);