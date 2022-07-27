const Router = require('express').Router()
const User = require('../Models/User')

Router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        var user = await User.findOne({_id: id})
        user.passWord = '***'
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = Router