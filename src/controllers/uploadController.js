const upload = require("../middlewares/multer");

const uploadFile = async (req, res) => {
  try {
    await upload.uploadFilesMiddleware(req, res);

    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    return res.json(req.file);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
};
s
module.exports = {
    uploadFile
};