const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema(
{
    client:{type: mongoose.Schema.ObjectId, ref: 'user'},
    products:Array,
    total:String
})

const Sales = mongoose.model('sales',salesSchema);
module.exports = Sales;