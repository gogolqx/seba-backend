const mongoose = require('mongoose');

const AdsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    company: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Ads', AdsSchema);
