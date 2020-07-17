"use strict";
require("dotenv/config");
//Configuration variables
const { config, uploader } = require('cloudinary').v2;

const cloudinaryConfig = (req, res, next) => {
config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});
next();
};
const port      = process.env.PORT        || '3000';
const mongoURI  = process.env.MONGODB_URI 
const JwtSecret = process.env.JWT_SECRET  ||'very secret secret';
const CLOUD_API_SECRET  = process.env.CLOUD_API_SECRET 
const CLOUD_NAME = process.env.CLOUD_NAME
const CLOUD_API_KEY = process.env.CLOUD_API_KEY

module.exports = {
    port,
    mongoURI,
    JwtSecret,
    CLOUD_API_KEY,
    CLOUD_NAME,
    CLOUD_API_SECRET,
    cloudinaryConfig, 
    uploader
};