const express = require("express");
const router = express.Router();
const Sales = require("../models/sales");
const User = require("../models/user");

router.get("/list", async (req, res) => {
  const sales = await Sales.find();
  return res.status(200).json({ sales });
});

router.post("/register", async (req, res) => {
  if (!req.body.client || !req.body.products || !req.body.total)
    return res.status(400).json({ message: "Error: incomplete data" });
  const client = await User.findOne({ name: req.body.client });
  const sales = new Sales({
    client: client._id,
    products: req.body.products,
    total: req.body.total,
  });
  try {
    const result = await sales.save();
    if (!result)
      return res
        .status(400)
        .json({ message: "Error: Failed to register sale" });
    res.status(200).json({ message: "Sale register sucessfull" });
  } catch (err) {
    res.status(400).json({ message: "Error: Failed to register sale", err });
  }
});

module.exports = router;
