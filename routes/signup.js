const express = require("express");
const passport = require("passport");
const ErrorCodes = require("../core/constants");

const router = express.Router();

router.post("/", async (req, res, next) => {
  passport.authenticate("signup", {session: false}, async (err, user) => {
    if (err) {
      if (err.message.toLowerCase().includes("dup key")) {
        msg = "Email already registered";
      } else {
        msg = err.message;
      }

      return res.status(ErrorCodes.BAD_REQUEST).json({
        message: msg,
      });
    }

    return res.json({
      message: "SignUp Successful",
      user: user,
    });
  })(req, res, next);
});

module.exports = router;
