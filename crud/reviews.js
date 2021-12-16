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
  review.save((err, result)=> {
    if (err) {
      throw err;
    } else {
      return result;
    }
  });
}

module.exports = {
  getBookReviews: getBookReviews,
  getAllReviews: getAllReviews,
  saveReview: saveReview
};
