import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCardcopy.css';

const MovieCard = ({ movie }) => {
  const [username, setUsername] = useState('');
  const [isHovered, setIsHovered] = useState(false); // State for hover
  const [isHovered1, setIsHovered1] = useState(false);


  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Link to={`/${username}/media/${movie.id}`} className="link-product-card">

      <div className="movie-card-copy">
        <img className="movie-card-copy-img" src={movie.img} alt={movie.title} />
        <div className="movie-card-copy-content">
          <p className="movie-card-copy-content-title">{movie.title}</p>
          <p className="movie-card-copy-content-rate">{movie.rating} <i className="fa fa-star"></i></p>
          <p className="movie-card-copy-content-episode">{movie.type}</p>
          <p className="movie-card-copy-content-episode">{movie.episodes} Episodes</p>
          <p className="movie-card-copy-content-desc">{movie.description}</p>
          <div className="movie-card-copy-content-buttons">
          <div 
                className="tooltip-container1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link to={`/${username}/media/${movie.id}`} className="featured-link">
                <button className="movie-card-copy-content-button1">
                  <i className="fa fa-bars"></i></button>
                </Link>
                {isHovered && <div className="tooltip">Details</div>}
              </div>

              <div 
                className="tooltip-container1"
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                <Link to={`/${username}/media/${movie.id}`} className="featured-link">
                <button className="movie-card-copy-content-button1">
                  <i className="fa fa-bookmark"></i></button>
                </Link>
                {isHovered1 && <div className="tooltip">Add to WatchList</div>}
              </div>
              </div>
        </div>
        <h3 className="movie-card-copy-title">{movie.title}</h3>
        <h3 className="movie-card-copy-type">{movie.type}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
