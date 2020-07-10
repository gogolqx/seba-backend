const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    about: String
    //review_id: [String],
    //blog_id: [String]
});

module.exports = mongoose.model('Guides', GuideSchema);
