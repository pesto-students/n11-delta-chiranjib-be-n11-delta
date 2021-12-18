const express = require("express");
const router = express.Router();
const passport = require("passport");
const ErrorCodes = require("../core/constants");

const crudReviews = require("../crud/reviews");
const crudOrders = require("../crud/orders");

// Save new Order
router.post("/new", passport.authenticate('jwt', { session: false }), function (req, res, next) {

  if (!req.body.bookId || !req.body.title || !req.body.comment || !req.body.rating) {
    return res.status(ErrorCodes.BAD_REQUEST).json({
      message: "Please provide all required data"
    });
  }

  try {
    review = {
      userId: req.user._id,
      bookId: req.body.bookId,
      title: req.body.title,
      comment: req.body.comment,
      rating: parseInt(req.body.rating)
    }
    result = crudReviews.saveReview(review);
    return res.json({"message": "Review saved."});
  } catch (error) {
      console.log(error);
      return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
          message: "Internal Server Error.",
      });
  }
});

// GET all book's reviews
router.get("/", function (req, res, next) {

  if (!req.query.bookId) {
    return res.status(ErrorCodes.BAD_REQUEST).json({
        message: "Please provide bookId"
    });
  }

  crudReviews
    .getBookReviews(req.query.bookId)
    .then((reviews) => {
      res.json({
        count: reviews.length,
        reviews: reviews,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "Internal Server Error.",
      });
    });
});

// To check if user can post a review for a book
router.get("/user/:bookId", passport.authenticate('jwt', { session: false }), function (req, res, next) {

  user_id = req.user._id;
  book_id = req.params.bookId;
  is_eligible = false;

  crudOrders.getUserOrders(user_id).then((orders) => {
      if (orders) {
          outer_loop:
          for (let order of orders) {
              for (let item of order.orderDetails) {
                  if (item.bookId == book_id) {
                      is_eligible = true;
                      break outer_loop;
                  }
              }
          }
      }
      return res.json({
        bookId: book_id,
        canPostReview: is_eligible
      })
  }).catch((error) => {
    return res.status(500).json({
      error: "Internal Server Error.",
    });
  });
});

module.exports = router;
