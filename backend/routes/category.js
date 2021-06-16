const express = require("express");
const router = express.Router();
const Category = require("../models/category")

router.get("/list", async (req, res) => {
    const category = await Category.find();
    return res.status(200).json({ category });
})

router.post("/register", async (req, res) => {
    if (!req.body.name || !req.body.description) 
        return res.status(400).json({ message: "Error: incomplete data"})
    const categoryfind = await Category.findOne({name: req.body.name});
    if(categoryfind) return res.status(400).json({ message: "Error: category already register"})
    category = new Category({
        name: req.body.name,
        description: req.body.description
    })
    console.log(category)
    try {
        const result = await category.save();
        if(!result) return res.status(400).json({ message: "Error: Failed to register category"})
        res.status(200).json({ message: "category register sucessfull"})
    } catch (err) {
        return res.status(400).json({ message: "Error: Failed to register category", err})
    }
})

module.exports = router