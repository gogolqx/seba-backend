const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/index');

const BlogController = require('../controllers/blogController');

router.post('/:username/create', BlogController.create); // create a blog
router.get('/:username', BlogController.list); // List blogs from a guide
router.get('/:username/:id', BlogController.read); // read one blog
router.post('/:username/:id', BlogController.update); // read one blog
module.exports = router;