const mongoose = require('mongoose');

const TravellerSchema = new mongoose.Schema({

   user_id : { 
    type: Object,
    required: true
},

username: {
    type: String,
    unique: true,
    required: true
},
email: {
    type: String,
    unique: true,
    required: true
},
// marking favourite tours
    wish_tours: [String]
});

module.exports = mongoose.model('Travellers', TravellerSchema);
