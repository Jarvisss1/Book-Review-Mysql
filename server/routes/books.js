const express = require("express");
const {allBooks,singleBook} = require("../controllers/books.js");

const router = express.Router();

router.get("/allBooks", allBooks);
router.get("/singleBook/:id", singleBook);


module.exports = router;
