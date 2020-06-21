const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
    /*
    * Changes from conceptual diagram:
    * I delete name in this table
    */
    id: {
        type: Number,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    charges: Schema.Types.Decimal128,
    about: String,
    review_id: Number,
    blog_id: Number
});

module.exports = mongoose.model('Guides', GuideSchema);
