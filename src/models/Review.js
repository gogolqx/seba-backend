const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    tour_id: {
        type: String,
        required: true
    },
    rating: { type: Number, min: 0, max: 5 },
    content: {
        type: String,
        default: " "
    },
    timestamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('Reviews', ReviewSchema);
