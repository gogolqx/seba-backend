const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    rating: Schema.Types.Decimal128,
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Reviews', ReviewSchema);
