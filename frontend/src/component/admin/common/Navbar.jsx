import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

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

  return (
      <div className="navbar-container2">
        {/* <div className="logo-container2">
          <h1 className="logo-title2">MMP</h1>
        </div> */}
        <div className="menu-container2">
          <div className="menu-list2">
            <Link to={`/${username}/home`}>
              <div className="menu-list-item2">
                <i className="fa-solid fa-chart-line"></i> Statistic
              </div>
            </Link>

            {/* Dropdown2 Button */}
            <div className="menu-list-item2 dropdown2">
              <span className="dropdown2-btn">
                <i className="fa fa-users"></i> Users
              </span>
              <div className="dropdown2-content">
                <Link to={`/${username}/userlist`}>
                  <span className="dropdown2-item">
                    <i className="fa fa-user"></i> User
                  </span>
                </Link>
                <Link to={`/${username}/companylist`}>
                  <span className="dropdown2-item">
                    <i className="fa-solid fa-user-tie"></i> Company
                  </span>
                </Link>
              </div>
            </div>

            <Link to={`/${username}/viewrole`}>
              <div className="menu-list-item2">
                <i className="fa-solid fa-user-plus"></i> Roles
              </div>
            </Link>

            <Link to={`/${username}/report`}>
              <div className="menu-list-item2">
                <i className="fa-solid fa-user-plus"></i> Report
              </div>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Navbar;
