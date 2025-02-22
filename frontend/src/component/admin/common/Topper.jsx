import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Topper.css";

function Topper() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="admin-topper-container">
      <div className="admin-topper-content">
        <div className="admin-topper-content-list1">
          <Link
            to={`/${username}/profile`}
            className="admin-topper-content-list1-item"
          >
            <i class="fa fa-user-circle"></i>
            <p className="admin-topper-content-list1-item-username"> Admin Admin</p>
          </Link>
        </div>
        <div className="admin-topper-content-list2">
          {/* <Link
            to={`/${username}/company/collaborate`}
            className="admin-topper-content-list2-item"
          > */}
            {/* <i class="fa-solid fa-bell"></i> */}
          {/* </Link> */}

          <Link to="/" className="logout-btn2" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Topper;
