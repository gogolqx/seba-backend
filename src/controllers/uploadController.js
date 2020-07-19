const upload = require("../middlewares/multer");
var multiparty = require('multiparty');
var Grid = require('gridfs-stream');
var mongoose = require("mongoose");
Grid.mongo = mongoose.mongo;

const upload_from_mongdb = async (req, res) => {
  try {
    await upload.uploadFilesMiddleware(req, res);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    return res.json(req.file);
  } catch (error) {
    return res.send(`Error when trying upload image: ${error}`);
  }
};


const uploadFile =(req, res) =>{ 
    let form = new multiparty.Form(); 
    var path = require('path'); 
    form.uploadDir=path.resolve(__dirname,'../../public/image');
    form.keepExtensions=true; 
    form.parse(req,function(err,fields,files){ //
        if(err){
            res.json({ status:"1", msg:"Failed."+err }); }
        else{ 
            
            res.json({ status:"0", msg:"Succuss!", img_url: "http://localhost:3000"+files.file[0].path.split("public")[1] }); } }); }

module.exports = {
    uploadFile
};