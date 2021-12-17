const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AddressSchema = new schema({
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: false,
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
    type: Number,
    required: true,
  },
  default: {
    type: Boolean,
    required: true,
  }
});

module.exports = AddressSchema;
