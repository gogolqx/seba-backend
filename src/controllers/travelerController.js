const Traveler = require('../models/Traveller');


const setPreference = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty' 
        });
    }

    Traveler.findByIdAndUpdate(req.body,{
        new: true,
        runValidators: true})
        .exec()
        .then(traveler => res.status(200).json(traveler))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};
module.exports = {
    setPreference
};