const mongoose = require('mongoose');

const GoLocalSchema = new mongoose.Schema({
    /*
    * I don't understand why do we have this table?
    */
    user: {
        type: User,
        required: true
    },
    tour: {
        type: Tour,
        required: true
    },
    travel_articles: [Blog]
});

module.exports = mongoose.model('GoLocal', GoLocalSchema);
