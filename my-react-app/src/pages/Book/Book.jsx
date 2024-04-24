import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Book.css";
import moment from "moment";

const Book = () => {
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  // Retrieve user_id from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.other.user_id : null;

  // Initialize newReview state with user_id
  const [newReview, setNewReview] = useState({
    review_text: "",
    rating: 0,
    user_id: userId, // Set user_id directly here
    book_id: id,
  });

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/singleBook/${id}`
      );
      setBook(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reviews/book/${id}/reviews`
      );
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = async () => {
    console.log("Review object:", newReview);

    try {
      await axios.post(
        `http://localhost:5000/api/reviews/book/${id}/reviews`,
        newReview
      );
      fetchBook();
      fetchReviews();
      setShowModal(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="book-page">
      {Object.keys(book).length > 0 ? (
        <div className="book-info">
          <img
            src={book.thumbnail}
            alt={book.title}
            className="book-thumbnail"
          />
          <div className="book-details">
            <h2 className="book-title">{book.title}</h2>
            <h3 className="book-authors">Authors: {book.authors}</h3>
            <p className="book-categories">Categories: {book.categories}</p>
            <p className="book-publisher">Publisher: {book.publisher}</p>
            <p className="book-published-date">
              Published Date: {book.publishedDate}
            </p>
            <div className="book-additional-info">
              <p className="book-language">Language: {book.language}</p>
              <p className="book-page-count">Page Count: {book.pageCount}</p>
              <p className="book-page-count">Description: {book.description}</p>
            </div>
            <a href={book.infoLink} className="book-more-info">
              More Info
            </a>
            <p className="book-average-rating">
              Average Rating: {book.average_rating}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="book-reviews">
        <h3>Reviews</h3>
        <button onClick={() => setShowModal(true)}>Add review</button>
        {reviews.map((review) => (
          <div key={review.review_id} className="review-item">
            
              <p className="review-text">{review.review_text}</p>
              <p className="review-rating">Rating: {review.rating}</p>
              <p className="review-by">By: {review.username}</p>
            <p className="review-posted-at">
              Posted {moment(review.created_at).fromNow()}{" "}
              {/* Display the moment when the review is posted */}
            </p>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Add Review</h2>
            <textarea
              name="review_text"
              value={newReview.review_text}
              onChange={handleReviewChange}
              placeholder="Write your review here..."
              rows="4"
              cols="50"
            />
            <div className="rating-input">
              <p>Rating:</p>
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={rating <= newReview.rating ? "active" : ""}
                >
                  ★
                </span>
              ))}
            </div>
            <button onClick={handleSubmitReview}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
