const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    traveller_id: {
        type: Number,
        required: true
    },
    tour_id: {
        type: Number,
        required: true
    },
    payment_id: {
        type: Number,
        required: true
    },
    num_of_participants: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Bookings', BookingSchema);
