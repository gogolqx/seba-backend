const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({

    guide_id:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 30
    },
    dates_seats:{
        type: [{
            date: {
                type: Date, required: true
            },
            seats: {
                type: Number,
                min: 0,
                validate : {
                    validator : Number.isInteger,
                    message   : '{VALUE} is not an integer value between 0 and 99'
                  },
                required: true //if ==0, no avaiable seat
            }
        }],
        required: true
    },
    img_url:String,

    language:{
        type: String, default: "English"
    },
    country:{
        type: { code: String, name: String },
        required: true},
    city:{
        type: String,
        required: true
    },
    lat:  {type:Number, required: true},
    lon:  {type:Number, required: true},
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    max_participants: {
        type:Number,
        required: true,
        min:1,
        max:99,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value between 1 and 99'
          }},
    price:{type:Number, default: 0},
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
    reviews: [String],
    avg_rating:{
        type: Number,
        default: 3,
        min: 0,
        max: 5
    },
    likes:{
      type: Number,
      min: 0,
      default: 0
    }
});

module.exports = mongoose.model('Tours', TourSchema);
