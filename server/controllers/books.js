const db = require('../db.js');

const allBooks = (req, res) => {
    const query = `
        SELECT b.id, b.title, b.thumbnail, b.authors, b.categories, AVG(r.rating) AS average_rating
        FROM books b
        LEFT JOIN reviews r ON b.id = r.id
        GROUP BY b.id order by average_rating desc;
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching books with ratings:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results);
    });
};

const singleBook = (req, res) => {
  const id = req.params.id;
  const query = `
        SELECT *
        FROM books_with_average_rating
        WHERE id = ?;
    `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching book with rating:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results[0]);
  });
};


module.exports = { allBooks, singleBook };