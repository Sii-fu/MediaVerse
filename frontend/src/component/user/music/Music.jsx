import React, { useState } from "react";
import Slider from "react-slick";
import "./Music.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Music = () => {
  const [showAllTrending, setShowAllTrending] = useState(false);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="music-container">
      <h1 className="music-container-title">
        <i className="fa fa-music"></i>Music
      </h1>
      <div className="music-lower-container">
        <div className="music-lower-container-left">
          <div className="music-lower-container-left-upper-content">
            <input
              type="text"
              className="search-bar"
              placeholder="Search artists, songs, albums..."
            />
            <img
              className="music-lower-container-left-upper-content-img"
              src="https://th.bing.com/th/id/R.a5275743884a191d88c28f7b95993f98?rik=ndeTEh3aXOJS%2bw&pid=ImgRaw&r=0"
              alt="Featured"
            />
          </div>

          <div className="music-lower-container-left-lower-content">
            <div className="new-releases">
              <p className="music-lower-container-left-lower-content-title">
                New Releases
              </p>
              <Slider {...sliderSettings}>
                {newReleases.map((release) => (
                  <div key={release.id} className="music-card3">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="music-card3-img"
                    />
                    <div className="music-card3-circle"> </div>
                    <div className="music-card3-circl2"> </div>
                    <h4 className="music-card3-name">{release.title}</h4>
                    <p className="music-card3-artist">{release.artist}</p>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="you-may-like">
              <p className="music-lower-container-left-lower-content-title">
                {" "}
                You May Like
              </p>
              <Slider {...sliderSettings}>
                {youMayLike.map((song) => (
                  <div key={song.id} className="music-card2">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="music-card2-img"
                    />
                    <h4 className="music-card2-name">{song.title}</h4>
                    <p className="music-card2-artist">{song.artist}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="music-lower-container-right">
          <div className="top-trending">
            <p className="music-lower-container-right-title">
              Top Trending Songs
            </p>
              {(showAllTrending
                ? trendingSongs
                : trendingSongs.slice(0, 5)
              ).map((song) => (
                <div className="music-card4" key={song.id}>
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
  );
};

export default Music;
