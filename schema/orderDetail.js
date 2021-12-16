const mongoose = require("mongoose");
const schema = mongoose.Schema;

const OrderDetailSchema = new schema({
  bookId: {
    type: schema.Types.ObjectId,
    ref: 'book',
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  }
});

module.exports = OrderDetailSchema;
