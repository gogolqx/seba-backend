const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    amount: {
        type: Schema.Types.Decimal128,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
