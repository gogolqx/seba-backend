const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: String,
    public_id : String
});

module.exports = mongoose.model('Images', ImageSchema);