const mongoose = require('mongoose');
const bookSchema = require('../schema/book');

const bookModel = mongoose.model('book', bookSchema);

module.exports = {
    bookModel: bookModel
}
