const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ReviewSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  bookId: {
    type: schema.Types.ObjectId,
    ref: 'book',
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5]
  }
});

module.exports = ReviewSchema;
