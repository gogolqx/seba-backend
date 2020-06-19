const Tour = require('../models/Tour');

const create = async(req, res) => {
    const tour = new Tour({
        title: req.body.title,
        description: req.body.description
    });
    

    tour.save()
        .catch(error => res.status(500).json({
        error: 'Internal server error',
        message: error.message
    }));
    console.log(tour);
    res.json(tour);
        
};



const list  = async(req, res) => {
    console.log('I am here getting tour');
    
    try{
        const tours = await Tour.find();
        res.json(tours);
    }catch(err){
        res.json({message:err});
    }

};


module.exports = {
    create,
    //  read,
    //  update,
    //  remove,
    list
};