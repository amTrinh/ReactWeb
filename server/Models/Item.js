const mongoose = require('mongoose')

const Item = new mongoose.Schema({

    itemType : {
        type: String,
        required: true
    },
    itemName : {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    itemPrice : {
        type: Number,
        required: true
    },
    itemRating: {
        type: Number,
        required: true,
        default: 0
    },
    itemImg: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Item', Item)