const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Productschema = new Schema({
  productName: String,
  productPrice: Number,
  discountPrice: Number,
  currentPrice: Number,
  category: String,
  date: Date,
  quantity: Number,
  description: String,
  specification: [String],
  image: String,
  brand: String,
  detailImage: [String],
  review: [
    {
      username: String,
      reviewStar: Number,
      reviewMessage: String,
      reviewDate: Date
    }
  ]
});

const Product = mongoose.model("Product", Productschema, "products");

module.exports = Product;
