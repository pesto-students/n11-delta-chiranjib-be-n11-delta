const express = require("express");
const router = express.Router();

const ErrorCodes = require("../core/constants");
const crudAddress = require("../crud/address");
const crudUser = require("../crud/users");
const crudCart = require("../crud/cart");

router.patch("/", function (req, res, next) {
  //get user's id
  user_id = req.user._id;

  if (!req.body.orderDetails) {
    return res.status(ErrorCodes.BAD_REQUEST).json({
      message: "Please add books to cart",
    });
  }

  orderDetail = {
    userId: req.user._id,
    orderDetails: req.body.orderDetails,
  };

  crudCart
    .saveCart(user_id, orderDetail)
    .then((cart) => {
      return res.json({ message: "Cart saved" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error.",
      });
    });
});

router.get("/", function (req, res, next) {
  //get user's id
  user_id = req.user._id;

  // making call to mongodb to get cart
  crudCart
    .getUserCart(user_id)
    .then((cart) => {
      res.json(cart);
    })
    .catch((error) => {
      console.log(error);
      res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error.",
      });
    });
});

router.delete("/", function (req, res, next) {
  //get user's id
  user_id = req.user._id;

  // making call to mongodb to delete cart
  crudCart
    .deleteCart(user_id)
    .then((result) => {
      return res.json({ message: "Cart deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error.",
      });
    });
});

module.exports = router;
