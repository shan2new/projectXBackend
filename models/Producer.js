const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Products = require("./Products");

const Producer = new Schema({
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  orderQueue: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
});

module.exports = mongoose.model("Producer", Producer);
