// src/components/ReplyCard.jsx
import React, { useState } from 'react';
import './ReplyCard.css';

const ReplyCard = ({ name, text, reply }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedReports, setSelectedReports] = useState({
    spam: false,
    harassment: false,
    inappropriate: false,
  });

  const handleReportClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCheckboxChange = (event) => {
    setSelectedReports({
      ...selectedReports,
      [event.target.name]: event.target.checked,
    });
  };

  const handleOkClick = () => {
    console.log('Selected report types:', selectedReports);
    setShowDropdown(false);
  };

  return (
    <div className="reply-card">
      <div className="reply-card-avatar">
        <i className="fa-regular fa-circle-user"></i>
      </div>
      <div className="reply-card-content">
        <p className="reply-card-name">{name}{reply}</p>
        <p className="reply-card-text">{text}</p>
        <button className="reply-card-btn" onClick={handleReportClick}>Report</button>
        {showDropdown && (
          <div className="report-dropdown">
            <button className="close-dropdown-btn" onClick={() => setShowDropdown(false)}>X</button>
            <label>
              <input
                type="checkbox"
                name="spam"
                checked={selectedReports.spam}
                onChange={handleCheckboxChange}
              />
              Spam
            </label>
            <label>
              <input
                type="checkbox"
                name="harassment"
                checked={selectedReports.harassment}
                onChange={handleCheckboxChange}
              />
              Harassment
            </label>
            <label>
              <input
                type="checkbox"
                name="inappropriate"
                checked={selectedReports.inappropriate}
                onChange={handleCheckboxChange}
              />
              Inappropriate
            </label>
            <button className="report-dropdown-ok" onClick={handleOkClick}>Report this reply</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyCard;
