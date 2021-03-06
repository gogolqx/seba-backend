const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    
    guide_id: {
        type: String,
        required: true
    },
    username: {
    type: String,
    required: true
},

    blog_title: {
        type: String,
        required: true,
        maxlength: 30
    },
    blog_description: {
        type: String,
        required: true,
        minlength: 5
    },
    country:{
        type: { code: String, name: String },
        },
    city:{type: String },
    lat:  {type:Number},
    lon:  {type:Number},
    timestamp:{ type : Date, default: Date.now },
    ad_id:{
        type: String,
    }
});

module.exports = mongoose.model('Blogs', BlogSchema);
