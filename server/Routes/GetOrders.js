const express = require('express')
const Router = express.Router()
const verifyToken = require('../Middleware/VerifyToken')

const Order = require('../Models/Order')

Router.get('/', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.userId }).populate('item_id').populate('user_id', 'fullName')
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
})


module.exports = Router
