const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    tour_id:{
        type: String,
        required: true
    },
    traveller_id:{
    type: String,
    required: true
},
    datetime:{
        type: Date,
        required: true
    },
    book_time:{ type : Date, default: Date.now },
    num_participants: {type:Number, default: 1},
    
    review_id: {
        type: String
    }
    
});
module.exports = mongoose.model('Bookings', BookingSchema);
