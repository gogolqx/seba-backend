const Guide = require('../models/Guide');
const Tour = require('../models/Tour');

const list  = async(req, res) => {
    console.log('ID:', req.params.id);
    const guide = await Guide.findById(
        req.params.id
    ).exec();
    const tours = await Tour.find({
        guide_id:req.params.id
       
     }).exec();
     results = res.json(guide);
};

module.exports = {
    
    list
};