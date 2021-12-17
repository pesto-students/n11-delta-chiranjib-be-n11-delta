const mongoose = require("mongoose");
const schema = mongoose.Schema;
const orderDetailSchema =  require("./orderDetail")

const OrderSchema = new schema({
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
  deliveredOn: {
    type: Date,
  },
  value: {
    type: Number,
    required: true,
  },
  orderDetails: [orderDetailSchema],
  paymentMethod: {
    type: String,
    required: true,
  }
});

module.exports = OrderSchema;
