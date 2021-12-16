const mongoose = require("mongoose");
const schema = mongoose.Schema;
const addressSchema =  require("./address")
const bcrypt = require("bcrypt");

const UserSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false
  },
  addresses: [addressSchema]
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 5);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

module.exports = UserSchema;
