const express = require('express')
const Router = express.Router()
const Item = require('../Models/Item')


Router.get('/', async (req, res) => {
    try {
        const Items = await Item.find({})
        res.json({ success: true, Items })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = Router
