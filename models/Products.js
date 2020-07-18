const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: String,
  category: {
    type: String,
    enum: ["Food", "Craft"],
  },
  producedBy: {
    type: Schema.Types.ObjectId,
    ref: "Producer",
  },
});

module.exports = mongoose.model("Products", ProductSchema);
