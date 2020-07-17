const upload = require("../middlewares/multer");
const path = require("path");
var Grid = require('gridfs-stream');
var mongoose = require("mongoose");
Grid.mongo = mongoose.mongo;

const uploadFile = async (req, res) => {
  try {
    await upload.uploadFilesMiddleware(req, res);

    console.log(req.file);
    

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    var gfs = new Grid(mongoose.connection.db);
    await gfs.findOne({ filename: res.filename }, function (err, file) {
        if (err) {
            return res.status(400).send(err);
        }
        else if (!file) {
            return res.status(404).send('Error on the database looking for the file.');
        }
    
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
    
        var readstream = gfs.createReadStream({
            filename: res.filename 
        });
    
        readstream.on("error", function(err) { 
            res.end();
        });
        readstream.pipe(res);
      });
    



//return res.sendFile();
    //return res.json(req.file);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
};


const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/index.html`));
};


module.exports = {home,
    uploadFile
};