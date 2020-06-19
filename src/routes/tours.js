const express = require('express');
const router = express.Router();
const middleware = require('../middlewares');
const Tour = require('../models/Tour');

router.get('/',async(req,res) => {
    console.log('I am here getting tour');
    
    try{
        const tours = await Tour.find();
        res.json(tours);
    }catch(err){
        res.json({message:err});
    }

});

router.post('/',async(req,res) => {
    console.log(req.body.description);
    
    const tour = new Tour({
        title: req.body.title,
        description: req.body.description
    });
    

    tour.save();
    console.log(tour);
    res.json(tour);
        
});


module.exports = router;