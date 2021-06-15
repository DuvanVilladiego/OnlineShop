const express = require('express')
const router = express.Router()
const Role = require('../models/role')
const Admin = require('../middleware/admin')

router.get('/list' ,async (req, res) => {
    const role = await Role.find()
    return res.status(200).json({role})
})

module.exports = router