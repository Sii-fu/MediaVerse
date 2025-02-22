import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Music.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion"; 
import { Link } from "react-router-dom";

const Music = () => {
  const [showAllTrending, setShowAllTrending] = useState(false);

    const [username, setUsername] = useState('');
    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);


  const newReleases = [
    {
      id: 1,
      title: "Perfect",
      artist: "Ed Sheeran",
      image:
        "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 2,
      title: "Choo lo",
      artist: "The Local Train",
      image:
        "https://th.bing.com/th/id/OIP.ln12u9qvM39TZNEFNUzZgAHaFB?w=257&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      title: "The night",
      artist: "Oner Direction",
      image:
        "https://th.bing.com/th/id/OIP.UfyvMBjZLwaDIcyGo0FTNAHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      title: "Fire Esho",
      artist: "Tahsan",
      image:
        "https://th.bing.com/th/id/OIP.qU9L61uvePwvrm1hspGMxwHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  const youMayLike = [
    {
      id: 1,
      title: "Perfect",
      artist: "Ed Sheeran",
      image:
        "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 2,
      title: "Choo lo",
      artist: "The Local Train",
      image:
        "https://th.bing.com/th/id/OIP.ln12u9qvM39TZNEFNUzZgAHaFB?w=257&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      title: "The night",
      artist: "Oner Direction",
      image:
        "https://th.bing.com/th/id/OIP.UfyvMBjZLwaDIcyGo0FTNAHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      title: "Fire Esho",
      artist: "Tahsan",
      image:
        "https://th.bing.com/th/id/OIP.qU9L61uvePwvrm1hspGMxwHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  const trendingSongs = [
    {
      id: 1,
      title: "Perfect",
      artist: "Ed Sheeran",
      image:
        "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 2,
      title: "Choo lo",
      artist: "The Local Train",
      image:
        "https://th.bing.com/th/id/OIP.ln12u9qvM39TZNEFNUzZgAHaFB?w=257&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      title: "The night",
      artist: "Oner Direction",
      image:
        "https://th.bing.com/th/id/OIP.UfyvMBjZLwaDIcyGo0FTNAHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      title: "Fire Esho",
      artist: "Tahsan",
      image:
        "https://th.bing.com/th/id/OIP.qU9L61uvePwvrm1hspGMxwHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      title: "Fire Esho",
      artist: "Tahsan",
      image:
        "https://th.bing.com/th/id/OIP.qU9L61uvePwvrm1hspGMxwHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    
  ];

  const trendingSongs2 = [
    {
      id: 1,
      title: "Perfect",
      artist: "Ed Sheeran",
      image:
        "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 2,
      title: "Choo lo",
      artist: "The Local Train",
      image:
        "https://th.bing.com/th/id/OIP.ln12u9qvM39TZNEFNUzZgAHaFB?w=257&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      title: "The night",
      artist: "Oner Direction",
      image:
        "https://th.bing.com/th/id/OIP.UfyvMBjZLwaDIcyGo0FTNAHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      title: "Fire Esho",
      artist: "Tahsan",
      image:
        "https://th.bing.com/th/id/OIP.qU9L61uvePwvrm1hspGMxwHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      title: "Fire Esho",
      artist: "Tahsan",
      image:
        "https://th.bing.com/th/id/OIP.qU9L61uvePwvrm1hspGMxwHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 1,
      title: "Perfect",
      artist: "Ed Sheeran",
      image:
        "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 2,
      title: "Choo lo",
      artist: "The Local Train",
      image:
        "https://th.bing.com/th/id/OIP.ln12u9qvM39TZNEFNUzZgAHaFB?w=257&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      title: "The night",
      artist: "Oner Direction",
      image:
        "https://th.bing.com/th/id/OIP.UfyvMBjZLwaDIcyGo0FTNAHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      title: "Fire Esho",
      artist: "Tahsan",
      image:
        "https://th.bing.com/th/id/OIP.qU9L61uvePwvrm1hspGMxwHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      title: "Fire Esho",
      artist: "Tahsan",
      image:
        "https://th.bing.com/th/id/OIP.qU9L61uvePwvrm1hspGMxwHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingSongs.length);
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

 
  return (
    <div className="music-container" style={{ textAlign: "center" }}>
      <h1 className="music-container-title">
        <i className="fa fa-music"></i>Music
      </h1>

      <div className="music-lower-container">
        <div className="music-lower-container-upper">
          {/* Left Side - Currently Playing Trending Song */}
          <div className="music-lower-container-upper-left">
            <motion.div
              key={currentIndex}
              className="music-lower-container-upper-trending-now"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={`/${username}/music/${trendingSongs[currentIndex].id}`} className="link-music-card">
                <img
                  src={trendingSongs[currentIndex].image}
                  alt={trendingSongs[currentIndex].title}
                  className="music-lower-container-upper-trending-image"
                />
              </Link>
            </motion.div>
            <div className="music-lower-container-upper-trending-info">
              <h2>{trendingSongs[currentIndex].title}</h2>
              <p>{trendingSongs[currentIndex].artist}</p>
            </div>
          </div>

          {/* Right Side - Trending Songs List */}
          <motion.div
            className="music-lower-container-upper-right"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="music-lower-container-upper-trending-title">
              Top 5 Trending Now
            </h3>
            <ul className="music-lower-container-upper-trending-list">
              {trendingSongs.map((song, index) => (
                // <Link to={`/${username}/music/${song.id}`} className="link-music-card">
                <motion.li
                  key={song.id}
                  className={`music-lower-container-upper-trending-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  
                    <img
                      src={song.image}
                      alt={song.title}
                      className="music-lower-container-upper-trending-thumbnail"
                    />
                    <div className="music-lower-container-upper-trending-text">
                      <h4>{song.title}</h4>
                      <p>{song.artist}</p>
                    </div>
                  
                </motion.li>
                // </Link>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Lower Section - New Releases, Featured Song, You May Like, Top Trending */}
        <div className="music-lower-container-lower">
          <div className="music-lower-container-lower-left">
            <div className="music-lower-container-lower-left-lower-content">
              <div className="new-releases">
                <p className="music-lower-container-lower-left-lower-content-title">
                  New Releases
                </p>
                <Slider {...sliderSettings}>
                  {newReleases.map((release) => (
                    <Link to={`/${username}/music/${release.id}`} className="link-music-card" key={release.id}>
                      <div className="music-card3">
                        <img
                          src={release.image}
                          alt={release.title}
                          className="music-card3-img"
                        />
                        <div className="music-card3-circle"></div>
                        <div className="music-card3-circl2"></div>
                        <h4 className="music-card3-name">{release.title}</h4>
                        <p className="music-card3-artist">{release.artist}</p>
                      </div>
                    </Link>
                  ))}
                </Slider>
              </div>
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/track/2LwsunYgfRoqyIsNtgOCQx?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>

              <div className="you-may-like">
                <p className="music-lower-container-lower-left-lower-content-title">
                  You May Like
                </p>
                <Slider {...sliderSettings}>
                  {youMayLike.map((song) => (
                    <Link to={`/${username}/music/${song.id}`} className="link-music-card" key={song.id}>
                      <div className="music-card2">
                        <img
                          src={song.image}
                          alt={song.title}
                          className="music-card2-img"
                        />
                        <h4 className="music-card2-name">{song.title}</h4>
                        <p className="music-card2-artist">{song.artist}</p>
                      </div>
                    </Link>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="music-lower-container-lower-right">
            <div className="top-trending">
              <p className="music-lower-container-lower-right-title">
                Top Listen Song
              </p>
              {(showAllTrending
                ? trendingSongs2
                : trendingSongs2.slice(0, 5)
              ).map((song) => (
                <Link to={`/${username}/music/${song.id}`} className="link-music-card" key={song.id}>
                  <div className="music-card4">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="music-card4-img"
                    />
                    <div className="music-card4-content">
                      <span className="music-card4-name">{song.title}</span>
                      <span className="music-card4-artist">{song.artist}</span>
                    </div>
                  </div>
                </Link>
              ))}
              <button
                className="expand-button"
                onClick={() => setShowAllTrending(!showAllTrending)}
              >
                {showAllTrending ? "Show Less" : "Show All"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;