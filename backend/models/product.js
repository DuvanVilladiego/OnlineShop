const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
{
    name:String,
    description:String,
    price:Number,       
    category:{type: mongoose.Schema.ObjectId, ref: 'category'},
    date: {type: Date, default: Date.now},
})

const Product = mongoose.model('product',productSchema)

module.exports = Product