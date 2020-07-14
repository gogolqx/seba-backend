const Blog = require('../models/Blog');
const Guide = require('../models/Guide');
nodeGeocoder = require('node-geocoder');

const crg = require('country-reverse-geocoding').country_reverse_geocoding();

const create = async (req, res) => {
    
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    console.log('Username:', req.params.username);
    const guide = await Guide.findOne(
        {username : req.params.username})
        .select()
        .exec();
    console.log(guide);
    const new_blog = new Blog({
        username: guide.username,
        guide_id: guide._id, 
        blog_title: req.body.title,
        blog_description:req.body.content,
        lat: req.body.lat,
        lon: req.body.lon,
        city: req.body.city,
        country: crg.get_country(req.body.lat,req.body.lon),
        
    })
    await Blog.create(new_blog)
    .then(blog => res.status(201).json(blog),
    console.log("successful created a new blog!")
    )
    .catch(error => res.status(500).json({
        error: 'Internal server error',
        message: error.message
    }));
}

const list  = async(req, res) => {
    console.log('Username:', req.params);
    const guide = await Guide.findOne(
        {username : req.params.username})
        .select()
        .exec();
        console.log('guide:', guide);
    const blogs = await Blog.find({
        guide_id: guide._id
       
     }).exec();
     results = res.json(blogs);
     
     console.log('guide username ', guide.username);
     console.log('about guide: ', guide.about);
     console.log('blogs: ', blogs.map(blog => blog.blog_title).sort());
};
const read  = async(req, res) => {
    console.log('blog_id:', req.params.id);
    const blogs = await Blog.findById(req.params.id).exec();
     results = res.json(blogs);
     
     //console.log('blogs: ', blogs.map(blog => blog.blog_title).sort());
};
const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty' 
        });
    }

    Blog.findByIdAndUpdate(req.params.blog_id,req.body,{
        new: true,
        runValidators: true})
        .exec()
        .then(tour => res.status(200).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
module.exports = {
    create,
    list,
    read,
    update
};