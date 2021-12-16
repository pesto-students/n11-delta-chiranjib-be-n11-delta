const mongoose = require("mongoose");
const bookSchema = require("../schema/book");
const userSchema = require("../schema/user");
const orderSchema = require("../schema/order");
const reviewSchema = require("../schema/review");

const bookModel = mongoose.model("book", bookSchema);
const userModel = mongoose.model("user", userSchema);
const orderModel = mongoose.model("order", orderSchema);
const reviewModel = mongoose.model("review", reviewSchema);

module.exports = {
  bookModel: bookModel,
  userModel: userModel,
  orderModel: orderModel,
  reviewModel: reviewModel
};
