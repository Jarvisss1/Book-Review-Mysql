import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = ({setResults, user}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    onLogout();
  };

  const handleSearch = () => {
    fetch(`http://localhost:5000/api/books/search/${searchTerm}`)
      .then((res) => res.json())
      .then((json) => {
        const results = json.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log(results);
        setResults(results);
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Bookstore
        </Link>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="my-reviews">
          {user && <Link to="/myReviews">My Reviews</Link>}
        </div>
      </div>
      <div className="navbar-right">
        {user ? (
          <div className="user-info">
            <p>Welcome, {user.username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
