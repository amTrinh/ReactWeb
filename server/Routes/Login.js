const express = require('express')
const Router = express.Router()
const argon2 = require('argon2')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')

Router.post('/', async(req, res) => {
    const{userName, passWord} = req.body

    if(!userName || !passWord) {
        return res.status(400).json({success: false, message: 'Missing username or password!'})
    }

    try {
        //check for existing user in DB
        const existingUser = await User.findOne({userName})
        if (!existingUser) {
            return res.status(400).json({success: false, message: 'Incorrect username or password!'})
        }
        const passwordValid = await argon2.verify(existingUser.passWord, passWord)
        if (!passwordValid) {
            return res.status(400).json({success: false, message: 'Incorrect username or password!'})
        }
        //all are good
        const accessToken = jwt.sign({userId: existingUser._id}, process.env.ATSECRET)
        res.json({success: true, message: 'Logged in successfully!', accessToken, existingUser})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error!'})
    }
})

module.exports = Router
