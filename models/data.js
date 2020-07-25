const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  clicks: Number,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
