const mongoose = require('mongoose');

const TravellerSchema = new mongoose.Schema({
    /*
    Not a must
    */
    
    preferences: [String]
});

module.exports = mongoose.model('Travellers', TravellerSchema);
