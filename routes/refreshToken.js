const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');


// GET Books List
router.post('/', function(req, res, next) {
  // request params
  let token = req.query.token;
  let refreshToken = req.query.refresh_token;

  if (token == null || token == undefined) {
    return res.status(400).json(
        {
            message: "No token provided"
        }
    );
  }

  if (refreshToken == null || refreshToken == undefined) {
    return res.status(400).json(
        {
            message: "No refresh token provided"
        }
    );
  }

  jwt.verify(refreshToken, process.env.ENCRYPTION_SECRET, function(err, decoded) {
    if (err) {
        if (err.name.toLocaleLowerCase() == 'tokenexpirederror') {
            return res.status(400).json(
                {
                    message: "Refresh token expired"
                }
            );
        } else {
            return res.status(400).json(
                {
                    message: "Invalid refresh token"
                }
            );
        }
    }

    if (!decoded.token || !decoded.user || decoded.token != token) {
        return res.status(400).json(
            {
                message: "Invalid refresh token"
            }
        );
    }

    const newToken = jwt.sign(
        { 
            user: decoded.user 
        }, 
        process.env.ENCRYPTION_SECRET, 
        {
            expiresIn: parseInt(process.env.TOKEN_EXPIRE_TIME)
        }
    );
    const newRefreshToken = jwt.sign(
        {
            token: newToken,
            user: decoded.user
        },
        process.env.ENCRYPTION_SECRET,
        {
            expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME)
        }
    )

    return res.json(
        { 
            token: newToken,
            refreshToken: newRefreshToken
        }
    );
  });
});

module.exports = router;
