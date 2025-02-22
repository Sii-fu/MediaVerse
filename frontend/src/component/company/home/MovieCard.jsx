import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [username, setUsername] = useState("");
  const [isHovered, setIsHovered] = useState(false);



  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  

  return (
    <Link
      to={`/company/${username}/media/${movie.media_id}`}
      className="link-product-card"
      
    >
      <div className="movie-card-long">
        <div className="movie-card-long-1st">
          <i className="fa fa-bars"></i>
        </div>
        <div className="movie-card-long-2nd">
          <img
            className="movie-card-long-2nd-img"
            src={movie.poster}
            alt={movie.title}
          />
        </div>
        <div className="movie-card-long-3rd">
        <div className="movie-card-long-3rd-content">
          <h3 className="movie-card-long-3rd-title">{movie.title}</h3>
          <p className="movie-card-long-3rd-rate">
            {movie.rating} <i className="fa fa-star"></i>
          </p>
          <h3 className="movie-card-long-3rd-type">{movie.type}</h3>
          <p className="movie-card-long-3rd-desc">{movie.description}</p>
          </div>
          <div className="movie-card-long-3rd-hover-content">
            <h3 className="movie-card-long-3rd-title">{movie.title}</h3>
            <div
              className="tooltip-container1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link
                to={`/company/${username}/media/${movie.media_id}`}
                className="featured-link"
              >
                <button className="movie-card-long-content-button">
                  <i className="fa fa-bars"></i>
                </button>
              </Link>
              {isHovered && <div className="tooltip">Details</div>}
            </div>
          </div>
        </div>

        {/* <div className="movie-card-long-content">
          <p className="movie-card-long-content-title">{movie.title}</p>
          <p className="movie-card-long-content-rate">
            {movie.rating} <i className="fa fa-star"></i>
          </p>
          <p className="movie-card-long-content-episode">{movie.type}</p>
          <p className="movie-card-long-content-episode">
            {movie.episodes} Episodes
          </p>
          <p className="movie-card-long-content-desc">{movie.description}</p>
          <div className="movie-card-long-content-buttons">
            <div
              className="tooltip-container1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link
                to={`/${username}/media/${movie.id}`}
                className="featured-link"
              >
                <button className="movie-card-long-content-button1">
                  <i className="fa fa-bars"></i>
                </button>
              </Link>
              {isHovered && <div className="tooltip">Details</div>}
            </div>
          </div>
        </div> */}
      </div>
    </Link>
  );
};

export default MovieCard;
