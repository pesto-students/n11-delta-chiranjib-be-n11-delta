const models = require("../core/models");

// function for getting users from mongodb database
async function getUserDefaultAddress(_id) {
  user = await models.userModel.findById(_id);
  if (user.addresses) {
    for (let address of user.addresses) {
      if (address.default) {
        return address;
      }
    }
  }
  return null;
}

// function to insert user address
function insertUserAddress(user_id, address) {
  models.userModel.findOneAndUpdate(
    { _id: user_id },
    { $push: { addresses: address } },
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

// function to update user address
function updateUserAddress(user_id, address_id, address) {
    models.userModel.updateOne(
        { 
            _id: user_id,
            "addresses.id": address_id
        },
        {
            $set: {
                "addresses.$.addressLine1": address.addressLine1,
                "addresses.$.addressLine2": address.addressLine2,
                "addresses.$.city": address.city,
                "addresses.$.state": address.state,
                "addresses.$.pincode": address.pincode,
             }
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
    )
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
