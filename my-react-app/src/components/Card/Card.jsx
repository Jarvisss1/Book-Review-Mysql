import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card({id, title, authors, categories, average_rating, thumbnail}) {

  return (
    <div className="card">
      <img src={thumbnail} alt={title} className="card-img" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Authors: {authors}</p>
        <p className="card-text">Categories: {categories}</p>
        <p className="card-text">Rating: {average_rating}</p>
        <Link to={`/book/${id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
}

export default Card;
