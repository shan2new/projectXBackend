const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  cuisines: {
    type: String,
  },
  average_cost_for_two: {
    type: Number,
    required: true
  },
  thumb: {
    type: String,
  },
  featured_image: {
    type: String
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
