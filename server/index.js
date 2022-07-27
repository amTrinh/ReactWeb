require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
// require Router
const RegisterRouter = require('./Routes/Register')
const LoginRouter = require('./Routes/Login')
const checkloggedin = require('./Routes/CheckLogged')
const GetAllItems = require('./Routes/GetAllItems')
const GetItemsByType = require('./Routes/GetItemByType')
const AddNewItem = require('./Routes/AddNewItem')
const GetItemsByKeyWord = require('./Routes/GetItemByKeyWord')
const GetItemById = require('./Routes/GetItemById')
const GetUserById = require('./Routes/GetUserById')
const AddOrder = require('./Routes/AddOrder')
const GetOrders = require('./Routes/GetOrders')
const DeleteItemById = require('./Routes/DeleteItemById')
const CompleteOrder = require('./Routes/CompleteOrder')
const DeleteOrderById = require('./Routes/DeleteOrderById')

const port = process.env.PORT
const connectionString = process.env.CONNSTRING


const connectDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('MongoBD connected!')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

app.use(express.json())
app.use(cors())

app.use('/Register', RegisterRouter) // http://localhost:5000/Register
app.use('/Login', LoginRouter) // http://localhost:5000/Login      
app.use('/GetAllItems', GetAllItems) // http://localhost:5000/GetAllItems
app.use('/checkloggedin', checkloggedin) //http://localhost:5000/checkloggedin
app.use('/GetItemsByType', GetItemsByType) //http://localhost:5000/GetItemsByType/:type
app.use('/AddNewItem', AddNewItem) //http://localhost:5000/AddNewItem
app.use('/GetItemsByKeyWord', GetItemsByKeyWord) // http://localhost:5000/GetItemsByKeyWord/:keyword
app.use('/GetItemById', GetItemById) //http://localhost:5000/GetItemById
app.use('/GetUserById', GetUserById) //http://localhost:5000/GetUserById/
app.use('/AddOrder', AddOrder)
app.use('/GetOrders', GetOrders)
app.use('/DeleteItemById', DeleteItemById) //http://localhost:5000/DeleteItemById/:id
app.use('/CompleteOrder', CompleteOrder )
app.use('/DeleteOrderById', DeleteOrderById )

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})