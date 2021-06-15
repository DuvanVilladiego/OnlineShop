const Role = require('../models/role')

const admin = async (req, res, next) => {
    const role = await Role.findById(req.body.role)
    if(!role) return res.status(400).json({ message: "Error: no role asigned"})
    if (role.name === "admin") next()
    else return res.status(400).json({ AuthorizationDenegate: " Unauthorized user"})
}

module.exports = admin