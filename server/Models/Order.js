const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    number: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = mongoose.model('Order', Order)