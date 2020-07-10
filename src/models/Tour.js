const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    /*
    * I make review_id is an array of int(contains review ids)
    
    id: {
        type: Number,
        required: true
    },*/
    guide_id: Number,
    title: {
        type: String,
        required: true
    },
    dates:{
        type: [Date]
    },
    img:{data: Buffer, contentType: String },
    language: String,
    country:{type:  { code: String, name: String },
        required: true},
    city:{
        type: String,
        required: true
    },
    lat:  {type:Number, required: true},
    lon:  {type:Number, required: true},
    description: {
        type: String,
        required: true
    },
    max_participants: Number,
    price: Number,
    preference: [String],
    schedules: {
        type: [{
            hours: {
                type: Number, required: true, min: 0, max: 23
            },
            minutes: {
                type: Number, required: true, min: 0, max: 59
            }
        }]
    },
    duration:{
        type: Number,
        required: true
    },
    review_id: [Number],
    rating:{
        type: Number,
        default: 3
    }
});

module.exports = mongoose.model('Tours', TourSchema);
