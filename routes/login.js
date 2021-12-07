const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({
          message: info.message,
        });
      }

      req.login(user, {session: false}, async (error) => {
        if (error) {
          return res.status(400).json({
            message: error.message,
          });
        }

        const body = {_id: user._id, email: user.email};
        const token = jwt.sign(
          {
            user: body,
          },
          process.env.ENCRYPTION_SECRET,
          {
            expiresIn: parseInt(process.env.TOKEN_EXPIRE_TIME),
          }
        );
        const refreshToken = jwt.sign(
          {
            token: token,
            user: body,
          },
          process.env.ENCRYPTION_SECRET,
          {
            expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME),
          }
        );

        return res.json({
          token: token,
          refreshToken: refreshToken,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
