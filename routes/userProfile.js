const express = require("express");
const router = express.Router();

const crud = require("../crud/users");

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
  let _id = req.user._id;

  //code to be written  
  return res.json({});
});

module.exports = router;
