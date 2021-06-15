const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
{
  name:String,
  active:Boolean,
});

const Role = mongoose.model('role',roleSchema);
module.exports = Role;
