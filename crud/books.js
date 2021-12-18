const models = require("../core/models");

// function for getting boks from mongodb database
async function getBooks() {
  return await models.bookModel.find({});
}

async function getBookDetail(id) {
  return await models.bookModel.findById(id);
}

async function getBooksByTimestamp(skip, limit) {
  return await models.bookModel.find().sort({_id:-1}).skip(skip).limit(limit);
}

async function saveBookDetails(bookDetail) {
  const book = new models.bookModel(bookDetail);
  book.save((err, result)=> {
    if (err) {
      throw err;
    } else {
      return result;
    }
  });
}

async function updateBookRating(bookId, bookRating) {
  return await models.bookModel.updateOne({_id:bookId}, {avgRating: bookRating});
}

module.exports = {
  getBooks: getBooks,
  getBookDetail: getBookDetail,
  getBooksByTimestamp: getBooksByTimestamp,
  saveBookDetails: saveBookDetails,
  updateBookRating: updateBookRating,
};
