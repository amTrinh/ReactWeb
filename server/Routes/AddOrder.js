const express = require('express')
const Router = express.Router()
const verifyToken = require('../Middleware/VerifyToken')
const { findOne, exists } = require('../Models/Order')
const Order = require('../Models/Order')
const Item = require('../Models/Item')

Router.post('/', verifyToken, async (req, res) => {
    try {

        const existingOrder = await Order.findOne({
            user_id: req.userId,
            item_id: req.body.item_id
        })
        if (existingOrder) {
            await Order.findOneAndUpdate({
                user_id: req.userId,
                item_id: req.body.item_id
            }, {
                number: req.body.number
            })
            res.status(200).json({ success: true, message: 'Updated your cart!' })
        } else {
            const newOrder = new Order({
                user_id: req.userId,
                item_id: req.body.item_id,
                number: req.body.number
            })
            await newOrder.save()
            res.status(200).json({ success: true, message: 'Added to your cart!' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
})

module.exports = Router