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

  const logActivity = async () => {
    try {
      await fetch("http://localhost:5000/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          com_id: movie.com_id,
          action_type: "view",
          media_id: movie.id, 
          meta_data: {},
        }),
      });
      console.log("Activity logged successfully");
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  return (
    <div className="movie-card-copy" onClick={logActivity}>
      <Link to={`/${username}/media/${movie.id}`} className="link-product-card">
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
                  <i className="fa fa-bars"></i>
                </button>
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
                  <i className="fa fa-bookmark"></i>
                </button>
              </Link>
              {isHovered1 && <div className="tooltip">Add to WatchList</div>}
            </div>
          </div>
        </div>
        <h3 className="movie-card-copy-title">{movie.title}</h3>
        <h3 className="movie-card-copy-type">{movie.type}</h3>
      </Link>
    </div>
  );
};

export default MovieCard;