const express = require("express");
const router = express.Router();
const ErrorCodes = require("../core/constants");

const crud = require("../crud/orders");

// Save new Order
router.post("/new", function (req, res, next) {

  if (!req.body.value || !req.body.paymentMethod || !req.body.orderDetails) {
    return res.status(ErrorCodes.BAD_REQUEST).json({
      message: "Please provide all required data"
    });
  }

  try {
    orderDetail = {
      userId: req.user._id,
      value: req.body.value,
      paymentMethod: req.body.paymentMethod,
      deliveredOn: new Date().setDate(new Date().getDate() + 5),
      orderDetails: req.body.orderDetails
    }
    result = crud.saveOrder(orderDetail);
    return res.json({"message": "Order created."});
  } catch (error) {
      console.log(error);
      return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
          message: "Internal Server Error.",
      });
  }
});

// GET user's order list
router.get("/", function (req, res, next) {

  // making call to mongodb to get orders list
  crud
    .getUserOrders(req.user._id)
    .then((orders) => {
      res.json({
        count: orders.length,
        orders: orders,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "Internal Server Error.",
      });
    });
});

module.exports = router;
