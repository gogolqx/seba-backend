const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    //copied from the one automatically generated in UserSchema
    title : { 
        type: String,
        required: true
    },

    image_url: {
        type: String,
        required: true
    },
   
    image_id: String

});

module.exports = mongoose.model('Images', ImageSchema);