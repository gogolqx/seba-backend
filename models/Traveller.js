const mongoose = require('mongoose');

const TravellerSchema = new mongoose.Schema({
    /*
    * Changes from conceptual diagram:
    * I delete name in this table
    * I make preferences are array of Strings istead of String.
    */
    id: {
        type: Number,
        required: true
    },
    preferences: [String]
});

module.exports = mongoose.model('Travellers', TravellerSchema);
