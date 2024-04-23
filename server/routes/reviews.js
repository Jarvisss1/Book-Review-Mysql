const express = require("express");
const  {getReviewsByBookId,addReview, getBooksWithAverageRating}  = require("../controllers/reviews");

const router = express.Router();

// Route to get reviews by book ID
router.get("/book/:id/reviews", getReviewsByBookId);
router.post("/book/:id/reviews", addReview);

module.exports = router;
