const mongoose = require("mongoose");
const schema = mongoose.Schema;
const orderDetailSchema =  require("./orderDetail")

const CartSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  orderDetails: [orderDetailSchema],
});

module.exports = CartSchema;
