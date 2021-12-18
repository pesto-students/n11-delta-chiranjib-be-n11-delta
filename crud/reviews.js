const models = require("../core/models");

// function for getting reviews from mongodb database
async function getBookReviews(bookId) {
  return await models.reviewModel.find({
      bookId: bookId
  });
}

async function getAllReviews() {
    return await models.reviewModel.find({});
}

function saveReview(reviewDetail) {
  const review = new models.reviewModel(reviewDetail);
  return review.save();
}

module.exports = {
  getBookReviews: getBookReviews,
  getAllReviews: getAllReviews,
  saveReview: saveReview
};
