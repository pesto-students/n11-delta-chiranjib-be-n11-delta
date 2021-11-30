var express = require('express');
var router = express.Router();

/* Check connection. */
router.get('/', function(req, res, next) {
  res.json(
    { 
      "msg": "Backend is working." 
    }
  );
});

module.exports = router;
