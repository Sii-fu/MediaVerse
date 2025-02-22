import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCardSmall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MovieCardSmall = ({ movie }) => {
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
          media_id: movie.id, // Use the movie's ID
          meta_data: {},
        }),
      });
      console.log("Activity logged successfully");
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  return (
    <div className="movie-card-small" onClick={logActivity}>
      <Link to={`/${username}/media/${movie.id}`} className="link-product-card-small">
        <img className="movie-card-small-img" src={movie.img} alt={movie.title} />
        <div className="movie-card-small-content">
          <p className="movie-card-small-content-title">{movie.title}</p>
          <p className="movie-card-small-content-episode"><i className="fa fa-bolt"></i>Episode {movie.episodes}</p>
          <p className="movie-card-small-content-episode">{movie.type}</p>
        </div>
        <h3 className="movie-card-small-duration"><i className="fa fa-clock"></i>{movie.duration}</h3>
        <div className="movie-card-small-content-buttons">
          <div 
            className="tooltip-container1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link to={`/${username}/media/${movie.id}`} className="featured-link">
              <button className="movie-card-small-content-button1">
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
              <button className="movie-card-small-content-button1">
                <i className="fa fa-bookmark"></i>
              </button>
            </Link>
            {isHovered1 && <div className="tooltip">Add to WatchList</div>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCardSmall;