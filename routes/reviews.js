const express = require("express");
const router = express.Router();
const ErrorCodes = require("../core/constants");

const crud = require("../crud/reviews");

// Save new Order
router.post("/new", function (req, res, next) {

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
    result = crud.saveReview(review);
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

  crud
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

module.exports = router;
