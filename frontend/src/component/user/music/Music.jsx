import React from "react";
import "./Music.css";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


const Music = () => {
  const newReleases = [
    {
      id: 1,
      title: "Red (Taylor's Version)",
      artist: "Taylor Swift",
      image: "red.jpg",
    },
    {
      id: 2,
      title: "Need To Know",
      artist: "Doja Cat",
      image: "need_to_know.jpg",
    },
    {
      id: 3,
      title: "After Hours",
      artist: "The Weeknd",
      image: "after_hours.jpg",
    },
    {
      id: 4,
      title: "HIT MACHINE",
      artist: "Soundwave",
      image: "hit_machine.jpg",
    },
  ];

  const youMayLike = [
    {
      id: 1,
      title: "Way Back Home",
      artist: "SHAUN",
      image: "way_back_home.jpg",
    },
    {
      id: 2,
      title: "Rockabye",
      artist: "The Clean Bandit",
      image: "rockabye.jpg",
    },
    {
      id: 3,
      title: "Graduation",
      artist: "Kanye West",
      image: "graduation.jpg",
    },
    { id: 4, title: "Stay", artist: "Zedd", image: "stay.jpg" },
    { id: 5, title: "abcdefu", artist: "GAYLE", image: "abcdefu.jpg" },
  ];

  const trendingSongs = [
    { id: 1, title: "Mistletoe", artist: "Justin Bieber", duration: "3:54" },
    { id: 2, title: "Easy On Me", artist: "Adele", duration: "4:22" },
    {
      id: 3,
      title: "Moonlight",
      artist: "Public Library Commute",
      duration: "3:34",
    },
    {
      id: 4,
      title: "SICKO MODE",
      artist: "Travis Scott ft. Drake",
      duration: "5:12",
    },
    { id: 5, title: "Get Lost", artist: "Vincent Fable", duration: "3:10" },
  ];

  return (
    <div className="music-container">
      <h1 className="music-container-title">
        <i class="fa fa-music"></i>Music
      </h1>
      <div className="music-lower-container">
        <div className="music-lower-container-left">
          <div className="music-lower-container-left-upper-content">
              <input
                type="text"
                className="search-bar"
                placeholder="Search artists, songs, albums..."
              />
              {/* <h1 className="featured-song">Post Malone - Circles</h1> */}
              <img className="music-lower-container-left-upper-content-img" src="https://th.bing.com/th/id/R.49fbb4105da0f8b76802c98fe2dfd0f9?rik=25WR7xFSfAfgOg&pid=ImgRaw&r=0" alt={1} />
          </div>
          
          <div className="music-lower-container-left-lower-content">
            <div className="new-releases">
              <h2>New Releases</h2>
              <div className="card-list">
                {newReleases.map((release) => (
                  <div key={release.id} className="card">
                    <img src={release.image} alt={release.title} />
                    <h3>{release.title}</h3>
                    <p>{release.artist}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="you-may-like">
              <h2>You May Like</h2>
              <div className="card-list">
                {youMayLike.map((song) => (
                  <div key={song.id} className="card">
                    <img src={song.image} alt={song.title} />
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="music-lower-container-right">
          <div className="top-trending">
            <h2>Top Trending Songs</h2>
            <ul>
              {trendingSongs.map((song) => (
                <li key={song.id}>
                  <span>{song.title}</span>
                  <span>{song.artist}</span>
                  <span>{song.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
