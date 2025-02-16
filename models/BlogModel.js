const mongoose = require("mongoose");
const slugify = require("slugify");

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
    },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

NewsSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const date = new Date();
    const dateString = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    this.slug = slugify(`${this.title} ${dateString}`, {
      lower: true,
      strict: true,
    });
  }
  next();
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
