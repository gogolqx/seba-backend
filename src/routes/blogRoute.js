const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/authentication');



const BlogController = require('../controllers/blogController');
router.get('/', BlogController.list_all);
router.get('/:username/create', middlewares.checkGuideAuthentication);
router.post('/:username/create', middlewares.checkGuideAuthentication,BlogController.create); // create a blog with 
router.get('/:username', BlogController.list); // List blogs from a guide
router.get('/:username/:id', BlogController.read); // read one blog
router.post('/:username/:id', middlewares.checkGuideAuthentication, BlogController.update); // read one blog
router.delete('/:username/:id',  middlewares.checkGuideAuthentication, BlogController.remove); // Delete a tours by Id 
module.exports = router;