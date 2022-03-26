const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AddressSchema = new schema({
  addressLine1: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  default: {
    type: Boolean,
    required: true,
  }
});

module.exports = AddressSchema;
