const mongoose = require('mongoose');
const config     = require('../config');
const Grid = require('gridfs-stream');
const path = config.MONGODB_URI;

var ImageSchema = new Grid( {
   bucketName: 'photos'
});
module.exports = mongoose.model('photos', ImageSchema);