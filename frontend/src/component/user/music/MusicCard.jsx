import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MusicCard.css';

const MusicCard = ({ music }) => {
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
    <Link to={`/${username}/media/${music.id}`} className="link-product-card">

      <div className="music-card">
        <img className="music-card-img" src={music.img} alt={music.title} />
        <div className="music-card-content">
          <p className="music-card-content-title">{music.title}</p>
          {/* <p className="music-card-content-rate">{music.rating} <i className="fa fa-star"></i></p>
          <p className="music-card-content-episode">{music.type}</p>
          <p className="music-card-content-episode">{music.episodes} Episodes</p>
          <p className="music-card-content-desc">{music.description}</p> */}
          <div className="music-card-content-buttons">
          <div 
                className="tooltip-container1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link to={`/${username}/media/${music.id}`} className="featured-link">
                <button className="music-card-content-button1">
                  <i className="fa fa-bars"></i></button>
                </Link>
                {isHovered && <div className="tooltip">Details</div>}
              </div>

              <div 
                className="tooltip-container1"
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                <Link to={`/${username}/media/${music.id}`} className="featured-link">
                <button className="music-card-content-button1">
                  <i className="fa fa-bookmark"></i></button>
                </Link>
                {isHovered1 && <div className="tooltip">Add to WatchList</div>}
              </div>
              </div>
        </div>
        <h3 className="music-card-title">{music.title}</h3>
        <h3 className="music-card-type">{music.type}</h3>
      </div>
    </Link>
  );
};

export default MusicCard;
