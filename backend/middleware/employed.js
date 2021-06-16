const Role = require('../models/role')

const employed = async (req, res, next) => {
    const role = await Role.findById(req.body.role)
}