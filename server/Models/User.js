const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({

    fullName: {
        type: String,
        required: true,
    },
    userName : {
        type: String,
        required: true,
        unique: true
    },
    passWord : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('User', User)