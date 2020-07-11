const Blog = require('../models/Blog');


const create = async (req, res) => {
    
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    console.log('Username:', req.params.username);
    const guide = await Guide.findOne(
        {username : req.params.username}
    ).exec();
    new_blog= new Blog({
        guide_id: guide.user_id, 
        blog_title: req.title,
        blog_description:req.description
    })
    await Blog.create(new_blog)
    .then(blog => res.status(201).json(blog))
    .catch(error => res.status(500).json({
        error: 'Internal server error',
        message: error.message
    }));
}

const list  = async(req, res) => {
    console.log('Username:', req.params.username);
    const guide = await Guide.findOne(
        {username : req.params.username}
    ).exec();
    const blogs = await Blog.find({
        guide_id: guide.user_id
       
     }).exec();
     results = res.json(blogs);
     
     console.log('guide username ', guide.username);
     console.log('about guide: ', guide.about);
     console.log('blogs: ', tours.map(blog => blog.blog_title).sort());
};


module.exports = {
    create,
    list
};