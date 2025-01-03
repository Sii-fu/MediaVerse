import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/mediaverse_logo.png";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState("");

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

  return (
    <div className="navbar-container3">
      <div className="logo-container3">
        {/* <p className="logo-title3">MMP</p> */}
        <img
          className="logo-container3-logo"
          alt="MediaVerse Logo"
          src={logo}
        />
      </div>
      <div className="profile-container3">
        <Link to={`/${username}/profile`}>
          <i class="fa fa-user-circle"></i>
        </Link>
        <p className="profile-container3-name">Walt Disney Corp.</p>
      </div>
      <div className="menu-container3">
        <ul className="menu-list3">
          <Link to={`/${username}/home`}>
            <li className="menu-list-item3">
            <i class="fa fa-cubes" aria-hidden="true"></i> Dashboard
            </li>
          </Link>
          <Link to={`/${username}/mymedia`}>
            <li className="menu-list-item3">
            <i class="fa fa-video-camera" aria-hidden="true"></i>My Media
            </li>
          </Link>
          <Link to={`/${username}/review`}>
            <li className="menu-list-item3">
            <i class="fa fa-video-camera" aria-hidden="true"></i>Review & Rating
            </li>
          </Link>
          <Link to={`/${username}/discussion`}>
            <li className="menu-list-item3">
              <i class="fa-solid fa-handshake"></i> Community
            </li>
          </Link>
        </ul>
      </div>
      {/* <Link to={`/${username}/profile`} className="profile-text3">
        <i className="fa fa-user"></i>
      </Link> */}
      <Link to="/" className="logout-btn3">
        Logout
      </Link>
    </div>
  );
}

export default Navbar;
