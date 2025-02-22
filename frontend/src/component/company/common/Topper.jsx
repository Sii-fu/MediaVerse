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

  return (
    <div className="topper-container">
      <div className="topper-content">
        <ul className="topper-content-list">
          <Link to={`/${username}/mediaform`}>
            <li className="topper-content-list-item3-add-media">
                <i class="fa-solid fa-folder-plus"></i>Add Media
            </li>
          </Link>
          {/* <Link to={`/${username}/company/collaborate`}> */}
            {/* <li className="topper-content-list-item3">
              <i class="fa-solid fa-bell"></i>
            </li> */}
          {/* </Link> */}
        </ul>
      </div>
    </div>
  );
}

export default Topper;
