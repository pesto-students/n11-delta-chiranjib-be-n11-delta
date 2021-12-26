const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const ErrorCodes = require("../core/constants");

const crud = require("../crud/orders");
const crudCart = require("../crud/cart");

// Save new Order
router.post("/new", function (req, res, next) {
  if (!req.body.value || !req.body.paymentMethod || !req.body.orderDetails) {
    return res.status(ErrorCodes.BAD_REQUEST).json({
      message: "Please provide all required data",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  orderDetail = {
    userId: req.user._id,
    value: req.body.value,
    paymentMethod: req.body.paymentMethod,
    deliveredOn: new Date().setDate(new Date().getDate() + 5),
    orderDetails: req.body.orderDetails,
  };
  crud
    .saveOrder(orderDetail)
    .then((result) => {
      const mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: req.user.email,
        subject: "Order Confirmation",
        text:
          "Your Order is confirmed. You paid a total amount of ₹" +
          result.value +
          " using card. Your expected delivery date is " +
          result.deliveredOn +
          ".",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      crudCart
        .deleteCart(req.user._id)
        .then((result) => {
          console.log("Cart deleted.");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          return res.json({ message: "Order created." });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error.",
      });
    });
});

// GET user's order list
router.get("/", function (req, res, next) {
  if (req.user.isSuperAdmin) {
    // making call to mongodb to get orders list
    crud
      .getAllOrders()
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
  } else {
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
  }
});

module.exports = router;
