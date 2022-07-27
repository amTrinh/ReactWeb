const Router = require('express').Router()
const Item = require('../Models/Item')


Router.get('/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword.toLowerCase()
        const items = await Item.find({})
        const lengh = items.length
        const searchItems = []
        for (i = 0; i < lengh; i++) {
            const condition = (items[i].itemName.toLowerCase().search(keyword) !== -1)
                || (items[i].description.toLowerCase().search(keyword) !== -1)
                || (items[i].itemType.toLowerCase().search(keyword) !== -1)
            if (condition) {
                searchItems.push(items[i])
            }
        }
        res.json({ success: true, searchItems })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = Router