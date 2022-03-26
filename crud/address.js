const models = require("../core/models");

// function for getting users from mongodb database
async function getUserDefaultAddress(_id) {
  user = await models.userModel.findById(_id);
  if (user.addresses) {
    return user.addresses.find((address) => !!address.default);
  }
  return null;
}

// function to insert user address
async function insertUserAddress(user_id, address) {
  let doc = await models.userModel.findOneAndUpdate(
    { _id: user_id },
    { $push: { addresses: address } },
    { returnDocument: "after" }
  );
  return doc;
}

// function to update user address
function updateUserAddress(user_id, address_id, address) {
  models.userModel.updateOne(
    {
      _id: user_id,
      "addresses._id": address_id,
    },
    {
      $set: {
        "addresses.$.addressLine1": address.addressLine1,
        "addresses.$.city": address.city,
        "addresses.$.state": address.state,
        "addresses.$.pincode": address.pincode,
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        console.log(result);
        return result;
      }
    }
  );
}

// function to get all user address
async function getUserAllAddress(_id) {
  user = await models.userModel.findById(_id);
  return user.addresses;
}

module.exports = {
  getUserDefaultAddress: getUserDefaultAddress,
  insertUserAddress: insertUserAddress,
  updateUserAddress: updateUserAddress,
  getUserAllAddress: getUserAllAddress,
};
