const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Consumer = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  address: [{
    type: String,
  }],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  identifierId: {
    type: String,
    required: true
  },
  orderHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = mongoose.model("Consumer", Consumer);
