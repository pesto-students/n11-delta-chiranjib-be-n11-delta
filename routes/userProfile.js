const express = require("express");
const router = express.Router();

const ErrorCodes = require("../core/constants");

const crud = require("../crud/users");
const crudAddress = require("../crud/address");

// GET User's Data
router.get("/", function (req, res, next) {
  // request params
  let _id = req.user._id;

  // making call to mongodb to get user data
  crud
    .getUserById(_id)
    .then((user) => {
      user["password"] = null;
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error.",
      });
    });
});

// POST User's Data
router.post("/", function (req, res, next) {
  // request params
  let user_id = req.user._id;

  const username = req.body.username;
  const addressLine1 = req.body.addressLine1;
  const addressLcine2 = req.body.addressLine2;
  const city = req.body.city;
  const state = req.body.state;
  const pincode = req.body.pincode;

  if (addressLine1 || addressLcine2 || city || state || pincode) {
    if (addressLine1 && city && state && pincode) {
      crudAddress
        .getUserDefaultAddress(user_id)
        .then((address) => {
          newAddress = {
            addressLine1: addressLine1,
            addressLine2: addressLcine2,
            city: city,
            state: state,
            pincode: pincode,
            default: true,
          };
          if (address) {
            result = crudAddress.updateUserAddress(
              user_id,
              address._id,
              newAddress
            );
          } else {
            result = crudAddress.insertUserAddress(user_id, newAddress);
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
  }

  if (username) {
    result = crud.updateUserName(user_id, username);
  }
  //return response
  return res.json({"message": "Profile Updated"});
});

module.exports = router;
