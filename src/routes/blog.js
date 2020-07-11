const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/index');

const BlogController = require('../controllers/blog');

router.post('/:username', BlogController.create); // create a blog
router.get('/:username', BlogController.list); // List all blogs


module.exports = router;