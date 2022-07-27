const router = require('express').Router()
const Order = require('../Models/Order')
const virifyToken = require('../Middleware/VerifyToken')
const { findByIdAndDelete } = require('../Models/Order')

router.delete('/', virifyToken, async (req, res) => {
    try {
        await Order.deleteMany({ user_id: req.userId})
        res.status(200).json({success: true, message: 'ordered successfully!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error!'})
    }
})

module.exports = router