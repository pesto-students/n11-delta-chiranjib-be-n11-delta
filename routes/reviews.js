const express = require("express");
const router = express.Router();
const passport = require("passport");
const ErrorCodes = require("../core/constants");

const crudReviews = require("../crud/reviews");
const crudOrders = require("../crud/orders");
const crudBooks = require("../crud/books");

// Save new Order
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (
      !req.body.bookId ||
      !req.body.title ||
      !req.body.comment ||
      !req.body.rating
    ) {
      return res.status(ErrorCodes.BAD_REQUEST).json({
        message: "Please provide all required data",
      });
    }

    review = {
      userId: req.user._id,
      bookId: req.body.bookId,
      title: req.body.title,
      comment: req.body.comment,
      rating: parseInt(req.body.rating),
    };

    crudReviews
      .saveReview(review)
      .then((result) => {
        crudReviews
          .getBookReviews(req.body.bookId)
          .then((reviews) => {
            let avg_rating = 0;
            let count = 0;
            for (let review of reviews) {
              avg_rating += review.rating;
              count += 1;
            }
            if (count) {
              avg_rating = Math.floor(avg_rating / count);
              crudBooks
                .updateBookRating(req.body.bookId, avg_rating)
                .then((result) => {
                  console.log("Rating Updated Successfully");
                })
                .catch((error) => {
                  console.log("Rating Update Failed");
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        return res.json({ message: "Review saved." });
      })
      .catch((error) => {
        // console.log(error.message);
        if (error.message.toLowerCase().includes("validation failed")) {
          return res.status(ErrorCodes.BAD_REQUEST).json({
            message: error.message,
          });
        } else {
          return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
          });
        }
      });
  }
);

// GET all book's reviews
router.get("/", function (req, res, next) {
  if (!req.query.bookId) {
    return res.status(ErrorCodes.BAD_REQUEST).json({
      message: "Please provide bookId",
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
router.post(
  "/user/:bookId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    user_id = req.user._id;
    book_id = req.params.bookId;
    is_eligible = false;

    crudOrders
      .getUserOrders(user_id)
      .then((orders) => {
        if (orders) {
          outer_loop: for (let order of orders) {
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
          canPostReview: is_eligible,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          error: "Internal Server Error.",
        });
      });
  }
);

module.exports = router;
