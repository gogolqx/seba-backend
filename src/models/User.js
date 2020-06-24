const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    /*
    * Changes from conceptual diagram:
    * I put the first_name, middle_name and last_name in here instead of both guide and traveller.
    */
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
    password: {
        type: String,
        required: true
    }
    
    /*guide_id: Number,
    traveller_id: Number,
    first_name:  {
        type: String,
        required: true
    },
    middle_name: String,
    last_name:  {
        type: String,
        required: true
    },
    country: String,
    phone_number: Number,
    country_code: Number,
    card_number: Number,
    address: String
    */
   
    
});
//UserSchema.plugin(require('mongoose-beautiful-unique-validation'));
module.exports = mongoose.model('Users', UserSchema);
