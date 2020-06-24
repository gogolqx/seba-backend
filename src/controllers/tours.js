const Tour = require('../models/Tour');

const create = async(req, res) => {
    const tour =  new Tour({
        title: req.body.title,
        description: req.body.description,
        city: req.body.city
    });
    
    await tour.save()
        .catch(error => res.status(500).json({
        error: 'Internal server error',
        message: error.message
    }));
    console.log(tour);
    res.json(tour);
        
};
const update = (req, res) => {
   /* if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty' 
        });
    }*/

    Tour.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(tour => res.status(200).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
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
const search = async(req, res) => {
    var query ={};
  
    if (req.body.city){
        query.city = req.body.city;
    }
    
    if (req.body.price_min){
        query.price_min = req.body.price_min;
    }
    else{query.price_min=-1;}
    
    if (req.body.price_max){
        query.price_max = req.body.price_max;
    }
    else{query.price_max = 999999999;}
 
    const tours = await Tour.find({
                        city:query.city,
                        price:{$gt: query.price_min,  $lt: query.price_max}
                    }).exec();
    res.json(tours);
};



const remove = (req, res) => {
    Tour.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Tour with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = {
    create,
    search,
    //  read,
    update,
    remove,
    list
};