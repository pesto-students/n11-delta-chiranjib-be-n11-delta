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

module.exports = {
  getBooks: getBooks,
  getBookDetail: getBookDetail,
  getBooksByTimestamp: getBooksByTimestamp
};