const express = require('express')
const Router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')


//Register User

Router.post('/', async(req, res) => {
    const {fullName, userName, passWord} = req.body
    if(!fullName || !userName || !passWord) {
        return res.status(400).json({success: false, message: 'There are Missing fields!'})
    }

    try {
        // check for existing user
        const existingUser = await User.findOne({userName})
        if(existingUser) {
            return res.status(400).json({success: false, message: 'Username is already taken!'})
        }
        const hashedPassword = await argon2.hash(passWord)
        const newUser = new User({
            fullName: fullName,
            userName: userName,
            passWord: hashedPassword
        })
        await newUser.save()
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ATSECRET)
        newUser.passWord = '***'
        res.json({success: true, message: 'Registered successfully!', accessToken, newUser})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error!'})
    }
})

module.exports = Router