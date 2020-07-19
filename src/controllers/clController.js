
// Dependencies
var cloudinary = require('cloudinary');
// Mongoose Model
var Image = require('../models/Image');
const config     = require('../config');

// Configure Cloudinary

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_API_KEY,
    api_secret: config.CLOUD_API_SECRET
});

module.exports = {
  new: function (req, res) {
      res.render('tours/create');
  },
  create: async function  (req, res) {
      // Use Cloudinary uploader to upload to cloudinary sever
      // Access files uploaded from the browser using req.files
      cloudinary.uploader.upload(req.files.file.path, async function(result) {
          // Create a post model
          // by assembling all data as object
          // and passing to Model instance
          var post = new Image({
              title: result.original_filename,
              // Store the URL in a DB for future use
              image_url: result.url,
              image_id: result.public_id
          });
          // Persist by saving
          await Image.create(post).then(post => res.status(201).json(post),
          console.log("successful uploaded")
          )
          .catch(error => res.status(500).json({
              error: 'Some Internal server error',
              message: error.message
          }));
      });
  }
};