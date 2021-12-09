const models = require("../core/models");

// function for getting boks from mongodb database
async function getBooks() {
  return await models.bookModel.find({});
}

async function getBookDetail(id) {
  return await models.bookModel.findById(id);
}

module.exports = {
  getBooks: getBooks,
  getBookDetail: getBookDetail
};
