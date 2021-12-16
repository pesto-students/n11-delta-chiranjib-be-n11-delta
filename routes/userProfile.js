const express = require("express");
const router = express.Router();

const crud = require("../crud/users");

// GET Users Data
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

module.exports = router;
