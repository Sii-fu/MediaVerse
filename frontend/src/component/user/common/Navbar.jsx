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
    console.log(storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container1">
        <div className="logo-container1">
          {/* <p className="logo-title1">MediaVerse</p> */}
          <img
            className="logo-container1-logo"
            alt="MediaVerse Logo"
            src={logo}
          />
        </div>
        <div className="menu-container1">
          <ul className="menu-list1">
            <Link to={`/${username}/home`}>
              <li className="menu-list-item1">
                {/* <i class="fa fa-home"></i>  */}
                Home
              </li>
            </Link>

            {/* Browse Dropdown */}
            <Link to={`/${username}/search`}>
            <li className="menu-list-item1 browse-dropdown">
              Browse
              <i class="fa fa-caret-down" aria-hidden="true"></i>
              <div className="browse-option">
                <div className="browse-option-container">
                  <div className="browse-option-container-popular">
                    <div className="browse-option-container-button">
                      Popular
                    </div>
                    <div className="browse-option-container-button">New</div>
                    <div className="browse-option-container-button">
                      Alphabetical
                    </div>
                  </div>
                  <div className="browse-option-container-genres">
                    <div className="browse-option-container-genres-button">
                      GENRES
                    </div>
                    <div className="browse-option-container-genres0">
                      <div className="browse-option-container-genres1">
                        <div className="browse-option-container-button">
                          Action
                        </div>
                        <div className="browse-option-container-button">
                          Adventure
                        </div>
                        <div className="browse-option-container-button">
                          Comedy
                        </div>
                        <div className="browse-option-container-button">
                          Drama
                        </div>
                        <div className="browse-option-container-button">
                          Fantasy
                        </div>
                      </div>
                      <div className="browse-option-container-genres1">
                        <div className="browse-option-container-button">
                          Music
                        </div>
                        <div className="browse-option-container-button">
                          Romance
                        </div>
                        <div className="browse-option-container-button">
                          Sci-Fi
                        </div>
                        <div className="browse-option-container-button">
                          Historical
                        </div>
                        <div className="browse-option-container-button">
                          Horror
                        </div>
                      </div>
                      <div className="browse-option-container-genres1">
                        <div className="browse-option-container-button">
                          Crime
                        </div>
                        <div className="browse-option-container-button">
                          Slice of life
                        </div>
                        <div className="browse-option-container-button">
                          Sports
                        </div>
                        <div className="browse-option-container-button">
                          Supernatural
                        </div>
                        <div className="browse-option-container-button">
                          Thriller
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            </Link>
            {/* <Link to={`/${username}/search`}>
              <li className="menu-list-item1">
                <i class="fa fa-search"></i>Search
              </li>
            </Link> */}
            {/* <Link to={`/${username}/mylist`}>
              <li className="menu-list-item1">
                <i class="fa-regular fa-bookmark"></i> My List
              </li>
            </Link> */}
            <Link to={`/${username}/music`}>
              <li className="menu-list-item1">
                {/* <i class="fa fa-comments"></i> */}
                Music
              </li>
            </Link>
            <Link to={`/${username}/discussion`}>
              <li className="menu-list-item1">
                {/* <i class="fa fa-comments"></i> */}
                Community
              </li>
            </Link>
            <Link to={`/${username}/company`}>
              <li className="menu-list-item1">
                {/* <i class="fa fa-building"></i> */}
                Company
              </li>
            </Link>
            {/* <Link to={`/${username}/merch`}>
              <li className="menu-list-item1">
                <i class="fa fa-shopping-bag"></i>Merchandiser
              </li>
            </Link> */}
          </ul>
        </div>

        <Link to={`/${username}/search`} className="profile-text1">
          <i class="fa fa-search"></i>
        </Link>
        <Link to={`/${username}/mylist`} className="profile-text1">
          <i class="fa-regular fa-bookmark"></i>
        </Link>
        <Notification />

        {/* <button className="orders-btn">
          <Link to={`/${username}/merch/order`} className="order-button">
            <i class="fa-solid fa-truck-fast"></i>{" "}
          </Link>
        </button> */}
        {/* <Link to={`/${username}/merch/cart`} className="profile-text1">
          <i className="fa fa-shopping-cart"></i>
        </Link> */}
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
