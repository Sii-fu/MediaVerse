import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Notification from "../notification/Notification";
import logo from "../../../assets/mediaverse_logo.png";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Historical",
    "Horror",
    "Magic",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sports",
  ];

  return (
    <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container1">
        <div className="logo-container1">
          <img
            className="logo-container1-logo"
            alt="MediaVerse Logo"
            src={logo}
          />
        </div>
        <div className="menu-container1">
          <ul className="menu-list1">
            <Link to={`/${username}/home`}>
              <li className="menu-list-item1">Home</li>
            </Link>

            {/* Browse Dropdown */}
            <li className="menu-list-item1 browse-dropdown">
              Browse
              <i className="fa fa-caret-down" aria-hidden="true"></i>
              <div className="browse-option">
                <div className="browse-option-container">
                  <div className="browse-option-container-popular">
                    <Link
                      to={`/${username}/browse/popular`}
                      className="browse-option-container-button"
                    >
                      Popular
                    </Link>
                    <Link
                      to={`/${username}/browse/new`}
                      className="browse-option-container-button"
                    >
                      New
                    </Link>
                    <Link
                      to={`/${username}/browse/alphabetical`}
                      className="browse-option-container-button"
                    >
                      Alphabetical
                    </Link>
                  </div>
                  <div className="browse-option-container-genres">
                    <div className="browse-option-container-genres-button">
                      GENRES
                    </div>
                    <div className="browse-option-container-genres0">
                      {genres.map((genre) => (
                        <Link
                          key={genre}
                          to={`/${username}/browse/${genre.toLowerCase()}`}
                          className="browse-option-container-button"
                        >
                          {genre}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <Link to={`/${username}/music`}>
              <li className="menu-list-item1">Music</li>
            </Link>
            <Link to={`/${username}/discussion`}>
              <li className="menu-list-item1">Community</li>
            </Link>
            <Link to={`/${username}/company`}>
              <li className="menu-list-item1">Company</li>
            </Link>
          </ul>
        </div>

        <Link to={`/${username}/search`} className="profile-text1">
          <i className="fa fa-search"></i>
        </Link>
        <Link to={`/${username}/mylist`} className="profile-text1">
          <i className="fa-regular fa-bookmark"></i>
        </Link>
        <Notification />

        <Link to={`/${username}/profile`} className="profile-text1">
          <i className="fa fa-user"></i>
        </Link>
        <Link to="/" className="logout-btn1" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
