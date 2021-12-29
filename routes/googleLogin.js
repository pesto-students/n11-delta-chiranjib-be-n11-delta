const express = require("express");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require("google-auth-library");
const crud = require("../crud/users");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

router.post("/", async (req, res, next) => {
  const {token} = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const {name, email} = ticket.getPayload();

  crud
    .upsertUser(name, email)
    .then((user) => {
      const body = {
        _id: user._id,
        email: user.email,
        isSuperAdmin: user.isSuperAdmin,
      };
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
        user: {
          username: user.username ?? null,
          email: user.email,
          isSuperAdmin: user.isSuperAdmin,
        },
      });
    })
    .catch((err) => {
      return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failure while doing google-login",
      });
    });
});

module.exports = router;
