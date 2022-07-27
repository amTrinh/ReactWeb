const express = require('express')
const Router = express.Router()
const Item = require('../Models/Item')
const { route } = require('./GetAllItems')

Router.get('/:type', async(req, res) => {
    try {
        const type = req.params.type
        const Items = await Item.find({itemType: type}) 
        res.json({success: true,  Items})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error!'})
    }
})

module.exports = Router