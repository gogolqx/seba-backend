const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/authentication');
const TourController = require('../controllers/toursController');
const UploadController = require('../controllers/uploadController');
var multiparty = require('multiparty');
//router.post('/upload', busboy(),TourController.upload);
//router.post('/upload', UploadController.uploadFile);
router.post('/search', TourController.search);
router.get('/', TourController.list); // List all tours
router.post('/:username/create',  middlewares.checkGuideAuthentication,TourController.create); // Create a new tours   middlewares.checkAuthentication, 
router.put('/:username/:tour_id',   middlewares.checkGuideAuthentication,TourController.update); // Update a tours by Id   middlewares.checkAuthentication,
router.delete('/:username/:tour_id',  middlewares.checkGuideAuthentication, TourController.remove); // Delete a tours by Id    middlewares.checkAuthentication,

router.post('/upload', function(req, res, next) { 
    let form = new multiparty.Form(); 
    var path = require('path'); 
    form.uploadDir=path.resolve(__dirname,'../../public/image'); 
    console.log(form.uploadDir)
    form.keepExtensions=true; 
    form.parse(req,function(err,fields,files){ //
        if(err){ 
            console.log(files); 
            res.json({ status:"1", msg:"Failed."+err }); }
        else{ 
            
            res.json({ status:"0", msg:"Succuss!", img_url: "http://localhost:3000"+files.file[0].path.split("public")[1] }); } }); });


module.exports = router; 