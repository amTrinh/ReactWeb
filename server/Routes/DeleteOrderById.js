const router = require('express').Router()
const Order = require('../Models/Order')
const verifyToken = require('../Middleware/VerifyToken')

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Order.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({success: true, message: 'deleted!'})
    } catch (error) {
        console.log(error)
        res.status(200).json({success: false, message: 'Internal server error!'})
    }
})

module.exports = router
