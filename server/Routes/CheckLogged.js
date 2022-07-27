const User = require('../Models/User')
const verifyToken = require('../Middleware/VerifyToken')
const router = require('express').Router()

router.get('/', verifyToken, async (req, res)=>{
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(400).json({success: false, message: 'User not found!'})
        }
        res.json({success: true, user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error!'})
    }
})


module.exports = router