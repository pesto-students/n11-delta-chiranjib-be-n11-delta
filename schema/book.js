const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
    title: String,
    author: String,
    pages: Number,
    description: String,
    category: String,
    quantity: Number,
    price: Number,
    language: String,
    highlights: [String],
    imageUri: String
});

module.exports = book;