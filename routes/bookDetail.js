const express = require("express");
const router = express.Router();
const ErrorCodes = require("../core/constants");

const crud = require("../crud/books");

// GET Book Detail
router.get("/:id", function (req, res, next) {
    // request params
    let id = req.params.id;

    // making call to mongodb to get book's detail
    crud.getBookDetail(id).then(book => {
        if (book) {
            return res.json(book);
        } else {
            return res.status(ErrorCodes.BAD_REQUEST).json({
                message: "No book found with provided id."
            });
        }
    }).catch(error => {
        if (error.message.toLowerCase().includes("cast to objectid failed")) {
            res.status(ErrorCodes.BAD_REQUEST).json({
                message: "Please provide a valid _id.",
            });
        } else {
            res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
                error: "Internal Server Error.",
            });
        }
    });
});

module.exports = router;
