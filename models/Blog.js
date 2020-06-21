const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    guide_id: {
        type: Number,
        required: true
    },
    blog_title: {
        type: String,
        required: true
    },
    blog_description: String,
    ad_id: Number
});

module.exports = mongoose.model('Blogs', BlogSchema);
