const express = require('express');
const router = express.Router();

const crud = require('../crud/books');


// GET Books List
router.get('/', function(req, res, next) {
  // request params
  let page = req.query.page;
  let limit = req.query.limit;
  let searchString = req.query.search;
  let filter = req.query.filter;

  // making call to mongodb to get books list
  crud.getBooks().then(books => {
    res.json(
      {
        "count": books.length,
        "books": books
      }
    );
  }).catch(error => {
    res.status(500).json(
      {
        "error": "Internal Server Error."
      }
    );
  });
});

module.exports = router;
