const express = require("express");
const  {getReviewsByBookId,addReview, getBooksWithAverageRating, updateReview}  = require("../controllers/reviews");

const router = express.Router();

// Route to get reviews by book ID
router.get("/book/:id/reviews", getReviewsByBookId);
router.post("/book/:id/reviews", addReview);
router.put("/book/:id/reviews", updateReview);

module.exports = router;
