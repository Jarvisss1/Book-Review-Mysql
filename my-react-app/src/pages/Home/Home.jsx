import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import "./Home.css";

function Home({ results }) {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch books with ratings from backend when component mounts
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/books/allBooks"
        );
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    setSearchResults(results);
  }, [results]);

  return (
    <div>
      <div className="row">
        {searchResults.length > 0 && (
          <h2 className="search-results-heading">Search Results</h2>
        )}
        {(searchResults.length > 0 ? searchResults : books).map((book) => (
          <div key={book.id}>
            <Card
              id={book.id}
              thumbnail={book.thumbnail}
              title={book.title}
              authors={book.authors}
              categories={book.categories}
              average_rating={book.average_rating}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
