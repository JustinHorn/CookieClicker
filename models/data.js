const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  clicks: Number,
});

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
