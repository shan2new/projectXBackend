const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    itemName: {
      type: String,
    },
    consumerID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    producerID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "On Way", "Delivered", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Order", Order);
