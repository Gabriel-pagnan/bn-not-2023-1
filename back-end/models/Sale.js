const mongoose = require('mongoose');

const schema = mongoose.Schema({
    datetime: {
        type: Date,
        require: true,
        default: Date.now()
    },
    number: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.ObjectId,
        ref: 'Customer',
        required: true
    },
})

module.exports = mongoose.model('Sale', schema, 'sales')