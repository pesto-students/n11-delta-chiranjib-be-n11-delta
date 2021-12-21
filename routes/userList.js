const express = require("express");
const router = express.Router();

const crud = require("../crud/users");

// GET Users List by timestamp
router.get("/bytimestamp", function (req, res, next) {
  // request params
  let page = req.query.page ? parseInt(req.query.page): 1;
  let limit = req.query.limit ? parseInt(req.query.limit): 0;

  let skip = (page*limit) - limit;

  // making call to mongodb to get books list
  crud
    .getUsersByTimestamp(skip, limit)
    .then((users) => {
      res.json({
        count: users.length,
        users: users,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error.",
      });
    });
});

module.exports = router;
