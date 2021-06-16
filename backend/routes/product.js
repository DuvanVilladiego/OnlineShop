const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category")

router.get("/list", async (req, res) => {
  const product = await Product.find();
  return res.status(200).json({ product });
});

router.post("/register", async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.price || !req.body.category)
    return res.status(400).json({ message: "Error: incomplete data" });
  const productfind = await Product.findOne({name: req.body.name});
  if(productfind) return res.status(400).json({ message: "Error: product already register"})
  const category = await Category.find({ name: req.body.category });
  if (!category)
    return res.status(400).json({ message: "Error: Invalid category" });
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: category._id,
  });
  try {
    const result = await product.save();
    if (!result)
      return res
        .status(400)
        .json({ message: "Error: Failed to register product" });
    res.status(200).json({ message: "Product register sucessfull"})
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error: Failed to register product" , err});
  }
});

router.put("/update", async (req, res) => {
    if(!req.body._id) return res.status(400).json({ message: "Error: Incomplete Data"})
    let updateProduct = await Product.findById(req.body._id)
    console.log(updateProduct)
    if(req.body.name) updateProduct.name = req.body.name
    if(req.body.description) updateProduct.description = req.body.description
    if(req.body.price) updateProduct.price = req.body.price
    const product = await Product.findByIdAndUpdate(req.body._id, {
        name:updateProduct.name,
        description:updateProduct.description,
        price:updateProduct.price
    })
    if(!product) return res.status(400).json({ message: "Error: Product no update"})
    res.status(200).json({ message: "Product update succesfull"})
});

module.exports = router;
