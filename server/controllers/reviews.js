const db = require("../db.js");

const jwt = require("jsonwebtoken");

// Controller function to get reviews by book ID
const getReviewsByBookId = (req, res) => {
  const bookId = req.params.id;

  const query = `
    SELECT r.*, u.username
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    WHERE r.id = ?;
  `;

  db.query(query, [bookId], (err, results) => {
    if (err) {
      console.error("Error fetching reviews by book ID:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.json(results);
  });
};

const addReview = (req, res) => {
  const { user_id, review_text, rating ,book_id} = req.body;
  console.log(req.body);

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // const bookId = req.params.id;
  // console.log("Book ID:", bookId);
  // console.log("User ID:", user_id);

  const query = `INSERT INTO reviews (id, user_id, review_text, rating) VALUES (?, ?, ?, ?);`;

  db.query(query, [book_id, user_id, review_text, rating], (err, results) => {
    if (err) {
      console.error("Error adding review:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    

    res.status(201).json({ message: "Review added successfully" });
  });
};


const getBooksWithAverageRating = async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM books_with_average_rating;
    `;
    const books = await query(query);
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books with average rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to fetch updated review after trigger execution
const getUpdatedReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const query = `
      SELECT *
      FROM reviews
      WHERE id = ?;
    `;
    const reviews = await query(query, [bookId]);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching updated review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createBooksWithAverageRatingView = async (req, res) => {
  try {
    const query = `
      CREATE OR REPLACE VIEW books_with_average_rating AS
      SELECT b.id, b.title, b.thumbnail, b.authors, b.categories, AVG(r.rating) AS average_rating
      FROM books b
      LEFT JOIN reviews r ON b.id = r.id
      GROUP BY b.id;
    `;
    await query(query);
    res.status(200).json({ message: "View created successfully" });
  } catch (error) {
    console.error("Error creating view:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to create a trigger that updates average rating when a new review is added
const createUpdateAverageRatingTrigger = async (req, res) => {
  try {
    const query = `
      CREATE OR REPLACE TRIGGER update_average_rating
      AFTER INSERT ON reviews
      FOR EACH ROW
      BEGIN
        UPDATE books b
        SET b.average_rating = (
          SELECT AVG(rating)
          FROM reviews
          WHERE id = NEW.id
        )
        WHERE b.id = NEW.id;
      END;
    `;
    await query(query);
    res.status(200).json({ message: "Trigger created successfully" });
  } catch (error) {
    console.error("Error creating trigger:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {getReviewsByBookId, addReview, getBooksWithAverageRating};
