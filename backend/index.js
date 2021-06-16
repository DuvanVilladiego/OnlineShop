const express = require('express')
const cors = require('cors')
const {dbConnection}  = require('./db') 
require("dotenv").config();

const User = require('./routes/user')
const Role = require('./routes/role')
const Product = require('./routes/product')
const Category = require('./routes/category')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/user/', User)
app.use('/api/role/', Role)
app.use('/api/product/', Product)
app.use('/api/category/', Category)

app.listen(process.env.PORT, () => 
    console.log('Server running on: ' + process.env.PORT)
)

dbConnection()