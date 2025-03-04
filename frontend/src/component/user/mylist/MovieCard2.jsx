import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard2.css';

const MovieCard2 = ({ movie, handleDeleteMovie }) => {
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
    <div className="movie-card2">
      {/* <button className="delete-button" onClick={handleDeleteMovie}>X</button> */}
      <Link to={`/${username}/media/${movie.media_id}`} className="link-product-card">
        <div className="movie-card2">
          <img className="movie-card2-img" src={movie.poster} alt={movie.title} />
          <div className="movie-card2-content">
            <p className="movie-card2-title">{movie.title}</p>
            {/* <p className="movie-card2-desc">{movie.DESCRIPTION}</p> */}
            <p className="movie-card2-type">{movie.type}</p>
            
            <p className="movie-card2-type">{movie.duration}</p>   
          </div>
        </div>
      </Link>
      <div 
          className="tooltip-container"
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <button className="delete-button" onClick={handleDeleteMovie}><i class="fa-solid fa-trash-can" ></i></button>
          {isHovered1 && <div className="tooltip">Remove</div>}
        </div>
    </div>
  );
};

export default MovieCard2;
