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
    items: [{
        order: {
            type: Number,
            required: true,
            min: 1
        },
        quantity: {
            type: Number,
            required: true,
            min: 0.01
        },
        product: {
            type: mongoose.ObjectId,
            ref: 'Product',
            required: true
        }
    }]
})

module.exports = mongoose.model('Sale', schema, 'sales')