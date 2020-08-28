let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let cartSchema = new Schema({
  username: String,
  date: Date,
  productName: String,
  productPrice: Number,
  discountPrice: Number,
  currentPrice: Number,
  category: String,
  image: String,
  quantity: Number
});

let Cart = mongoose.model("Cart", cartSchema, "cart");

module.exports = Cart;
