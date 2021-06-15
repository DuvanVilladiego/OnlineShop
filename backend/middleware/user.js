const User = require('../models/user')

const user = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if(!user) return res.status(400).json({message: "Error no user rol permission"})
    next()
}

module.exports = user