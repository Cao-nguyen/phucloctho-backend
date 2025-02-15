const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
  {
    name: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

const footer = mongoose.model("footer", footerSchema);

module.exports = footer;
