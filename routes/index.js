const express = require('express');
const router = express.Router();

/* Check connection. */
router.get('/', function(req, res, next) {
  res.json(
    { 
      "msg": "Backend is working." 
    }
  );
});

module.exports = router;
