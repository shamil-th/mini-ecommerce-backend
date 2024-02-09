const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  },
  count:{
    type:Number
  }

});

const cartDb = mongoose.model("cart", cartSchema);
module.exports = cartDb;
