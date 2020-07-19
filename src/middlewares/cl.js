var cloudinary = require('cloudinary');
const config     = require('../config');
module.exports = {
    config: (req, res, next) => {
        cloudinary.config({
            cloud_name: "ddjlxxigl",
            api_key: config.CLOUD_API_KEY,
            api_secret: config.CLOUD_API_SECRET
        });
        req.cloudinary = cloudinary;
        next()
    },
}