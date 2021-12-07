const models = require("../core/models");

// function for getting boks from mongodb database
async function getBooks() {
  return await models.bookModel.find({});
}

module.exports = {
  getBooks: getBooks,
};
