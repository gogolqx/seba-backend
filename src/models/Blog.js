const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    
    guide_id: {
        type: String,
        required: true
    },
    blog_title: {
        type: String,
        required: true
    },
    blog_description: {
        type: String,
        required: true
    },
    ad_id: Number
});

module.exports = mongoose.model('Blogs', BlogSchema);
