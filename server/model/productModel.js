const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  discountPrice: {
    type: Number
  },
  specification: {
    type: String
  },
  description: {
    type : String
  },
  images: {
    type: []
  }
});

const productDb = new mongoose.model("product", productSchema);
module.exports = productDb;
