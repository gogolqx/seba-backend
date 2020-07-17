const multer = require ('multer');
const config     = require('../config');
const util = require("util");
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: config.mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    console.log(file);
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-tour-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-tour-${file.originalname}`
    };
  }
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);


module.exports ={ uploadFilesMiddleware } ;