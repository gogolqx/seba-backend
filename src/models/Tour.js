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
    city:{
        type: String,
        required: true
    },
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
    review_id: [Number],
    rating:{
        type: Number,
        default: 3
    }
});

module.exports = mongoose.model('Tours', TourSchema);
