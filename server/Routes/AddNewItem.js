const Router = require('express').Router()
const verifyToken = require('../Middleware/VerifyToken')
const Item = require('../Models/Item')

Router.post('/', verifyToken, async (req, res) => {

    const { itemType, itemName, description, itemPrice, itemImg } = req.body
    const newItem = new Item({
        itemType: itemType,
        itemName: itemName,
        description: description,
        itemPrice: itemPrice,
        itemImg: itemImg
    })
    try {
        await newItem.save()
        res.json({success: true, message: 'Added successfully!', Item: newItem})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error!'})
    }
})

module.exports = Router