const express = require("express");
const router = express.Router();
const Product = require('../models/product')
const Admin = require('../middleware/admin')

router.get('/list', async(req, res) => {
    const product = await Product.find()
    return res.status(200).json({product})
})

router.post('/register', Admin, async (req, res) => {
    if(!req.body.)
    const category = await Category.findOne({name: req.body.category})
    product = new product ({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        category: category._id,
    })
    try {
        const result = await product.save()
        if(!result) return res.status(400).json({ message: "Error: Failed to register product"})
    } catch (err) {
        return res.status(400).json({ message: "Error: Failed to register product"})
    }
})

module.exports = router