const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role")

router.get("/list", async (req, res) => {
  const user = await User.find();
  return res.status(200).json({ user });
})

router.post("/register", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).json({ message: "Error: incomplete data" });
  if (!req.body.phone) req.body.phone = "";
  let email = await User.findOne({ email: req.body.email });
  if (email)
    return res.status(400).json({ message: "Error: mail already registered" });
  const role = await Role.findOne({name: "client"});
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    phone: req.body.phone,
    role: role._id,
    active: true,
  });
  try {
    const result = await user.save();
    if (!result)
      return res.status(400).json({ message: "Error:Failed to register user" });
    const jwtToken = user.generateJWT();
    res.status(200).json({ jwtToken });
  } catch (err) {
    return res.status(400) .json({ message: "Error: Failed to register user", err });
  }
});



module.exports = router;
