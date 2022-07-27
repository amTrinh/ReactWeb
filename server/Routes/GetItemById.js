const Router = require('express').Router()
const Item = require('../Models/Item')


Router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const item = await Item.findOne({_id: id})
        res.json({ success: true, item })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = Router