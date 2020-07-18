const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Consumer = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: [{
    type: String,
    required: true,
  }],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  orderHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = mongoose.model("Consumer", Consumer);
