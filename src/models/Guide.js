const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
    //copied from the one automatically generated in UserSchema
    user_id : { 
        type: Object,
        required: true
    },

    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String
    },
    about: String
});

module.exports = mongoose.model('Guides', GuideSchema);
