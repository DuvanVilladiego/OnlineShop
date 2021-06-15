const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const userSchema = new mongoose.Schema(
{
    name:String,
    email:String,
    password:String,
    phone:String,
    role:{type: mongoose.Schema.ObjectId, ref: 'role'},
    active:Boolean,
    date: {type: Date, default: Date.now},
})

userSchema.methods.generateJWT = function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email,
        iat:moment().unix()
    }, process.env.JWT_KEY)
}

const User = mongoose.model('user',userSchema)

module.exports = User