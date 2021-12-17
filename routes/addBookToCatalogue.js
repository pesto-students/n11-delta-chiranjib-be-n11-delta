const express = require("express");
const router = express.Router();
const ErrorCodes = require("../core/constants");
const crud = require("../crud/books");


// Post Book Detail
router.post("/book", function (req, res, next) {
    // console.log(req.files.bookImage);
    // console.log(req.body);

    if (!req.body.title || !req.body.author || !req.body.pages || !req.body.description || !req.body.category || !req.body.quantity || !req.body.price || !req.body.language) {
        return res.status(ErrorCodes.BAD_REQUEST).json({
            message: "Please provide all required data"
        });
    }

    try {
        // s3 link
        s3_link = "https://reactjs.org/logo-og.png"

        data = {
            title: req.body.title,
            author: req.body.author,
            pages: parseInt(req.body.pages),
            description: req.body.description,
            category: req.body.category,
            quantity: parseInt(req.body.quantity),
            price: parseFloat(req.body.price),
            language: req.body.language,
            highlights: req.body.highlights.split(";"),
            imageUri: s3_link
        }
        result = crud.saveBookDetails(data);
        return res.json({"message": "Book details saved."});
    } catch (error) {
        console.log(error);
        return res.status(ErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error.",
        });
    }
});

module.exports = router;
