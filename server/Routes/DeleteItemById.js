const router = require('express').Router()
const Item = require('../Models/Item')
const verifyToken = require('../Middleware/VerifyToken')

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Item.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({success: true, message: 'Removed!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router
