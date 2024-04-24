const express = require("express");
const {allBooks,singleBook, searchBook} = require("../controllers/books.js");

const router = express.Router();

router.get("/allBooks", allBooks);
router.get("/singleBook/:id", singleBook);
router.get("/search/:searchTerm", searchBook);


module.exports = router;
