const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dateFormat = require("dateformat");
let now = new Date();

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  date: Date
});

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
