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
    //  read,
    update,
    remove,
    list
};