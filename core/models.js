const mongoose = require('mongoose');
const bookSchema = require('../schema/book');
const userSchema = require('../schema/user');

const bookModel = mongoose.model('book', bookSchema);
const userModel = mongoose.model('user', userSchema);

module.exports = {
    bookModel: bookModel,
    userModel: userModel
}
