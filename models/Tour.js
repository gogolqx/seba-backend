const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    /*
    * I make review_id is an array of int(contains review ids)
    */
    id: {
        type: Number,
        required: true
    },
    guide_id: Number,
    title: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    language: String,
    location: [Number],
    description: {
        type: String,
        required: true
    },
    max_participants: Number,
    price: Number,
    time: {
        type: Date,
        default: Date.now
    },
    review_id: [Number]
});

module.exports = mongoose.model('Tours', TourSchema);
