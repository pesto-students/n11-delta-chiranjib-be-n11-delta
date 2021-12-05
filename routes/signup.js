const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/', 
    async(req, res, next) => {
        passport.authenticate('signup', {session: false},
            async (err, user) => {      
                if (err) {
                    return res.status(400).json(
                        {
                            message: err.message
                        }
                    );
                }

                return res.json(
                    {
                        message: 'SignUp Successful',
                        user: user
                    }
                );
            }
        )(req, res, next);
    }
);

module.exports = router;