const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Products = new Schema(
  {
    name: { type: String },
    price: { type: String },
    img: { type: String },
    content: { type: String },
    deleted: { type: String, default: false },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Products", Products);
