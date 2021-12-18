const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  pages: Number,
  description: String,
  category: String,
  quantity: Number,
  price: Number,
  language: String,
  highlights: [String],
  imageUri: String,
  avgRating: {
    type: Number,
    default: undefined,
  },
});

module.exports = BookSchema;
