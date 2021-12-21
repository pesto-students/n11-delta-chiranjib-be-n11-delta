const express = require("express");
const router = express.Router();

const ErrorCodes = require("../core/constants");
const crudAddress = require("../crud/address");
const crudUser = require("../crud/users");

// Post Book Detail
router.post("/address", function (req, res, next) {
  //get user id
  user_id = req.user._id;

  const address = req.body.address;

  if (address) {
    const addressLine1 = address.addressLine1;
    const addressLcine2 = address.addressLine2;
    const city = address.city;
    const state = address.state;
    const pincode = address.pincode;

    if (addressLine1 && city && state && pincode) {
      crudAddress
        .getUserDefaultAddress(user_id)
        .then((address) => {
          if (address) {
            return res.status(ErrorCodes.BAD_REQUEST).json({
                message: "Default address already exists",
            });
          } else {
            newAddress = {
                addressLine1: addressLine1,
                addressLine2: addressLcine2,
                city: city,
                state: state,
                pincode: pincode,
                default: true,
            };
            result = crudAddress.insertUserAddress(user_id, newAddress);
            return res.json({
                "message": "Default address added"
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
          });
        });
    } else {
      return res.status(ErrorCodes.BAD_REQUEST).json({
        message: "Please provide complete address details",
      });
    }
  } else {
    return res.status(ErrorCodes.BAD_REQUEST).json({
      message: "Please provide address to add",
    });
  }
});

module.exports = router;
