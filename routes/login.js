const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res, next) => {
  passport.authenticate('login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(400).json(
            {
              message: info.message
            }
          );
        }

        req.login(user,{ session: false },
          async (error) => {
            if (error) {
              return res.status(400).json({
                message: error.message
              });
            }

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, 'TOP_SECRET', {expiresIn: 60});

            return res.json({ token });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});

module.exports = router;