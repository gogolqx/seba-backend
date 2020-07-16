const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/index');



const BlogController = require('../controllers/blogController');
router.get('/', BlogController.list_all);
router.post('/:username/create', middlewares.checkGuideAuthentication,BlogController.create); // create a blog
router.get('/:username', BlogController.list); // List blogs from a guide
router.get('/:username/:id', BlogController.read); // read one blog
router.post('/:username/:id', middlewares.checkGuideAuthentication, BlogController.update); // read one blog
module.exports = router;