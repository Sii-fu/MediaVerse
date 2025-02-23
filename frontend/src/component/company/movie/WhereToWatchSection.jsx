import React, { useState } from "react";
import "./WhereToWatchSection.css";

const WhereToWatchSection = () => {
  const [onlinePlatforms, setOnlinePlatforms] = useState([
    { name: "Netflix", url: "https://www.netflix.com" },
    { name: "Amazon Prime", url: "https://www.primevideo.com" },
    { name: "Hulu", url: "https://www.hulu.com" },
    { name: "Disney+", url: "https://www.disneyplus.com" },
  ]);

  const [theaterEvents, setTheaterEvents] = useState([
    {
      name: "AMC",
      date: "2025-01-10",
      time: "7:30 PM",
      location: "123 AMC Theater, Main Street, City",
      ticketUrl: "https://www.amctheatres.com",
    },
    {
      name: "Regal Cinemas",
      date: "2025-01-11",
      time: "6:00 PM",
      location: "456 Regal Blvd, Downtown, City",
      ticketUrl: "https://www.regmovies.com",
    },
    {
      name: "Cinemark",
      date: "2025-01-12",
      time: "8:00 PM",
      location: "789 Cinemark Avenue, Suburb, City",
      ticketUrl: "https://www.cinemark.com",
    },
    {
      name: "Local Indie Theater",
      date: "2025-01-13",
      time: "5:00 PM",
      location: "101 Indie Lane, Arts District, City",
      ticketUrl: "https://www.localindietheater.com",
    },
  ]);

  const [newPlatform, setNewPlatform] = useState({ name: "", url: "" });
  const [newTheater, setNewTheater] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    ticketUrl: "",
  });

  const handleAddPlatform = () => {
    if (newPlatform.name && newPlatform.url) {
      setOnlinePlatforms([...onlinePlatforms, newPlatform]);
      setNewPlatform({ name: "", url: "" });
    } else {
      alert("Please fill out both name and URL for the online platform.");
    }
  };

  const handleAddTheater = () => {
    if (newTheater.name && newTheater.date && newTheater.time && newTheater.location && newTheater.ticketUrl) {
      setTheaterEvents([...theaterEvents, newTheater]);
      setNewTheater({ name: "", date: "", time: "", location: "", ticketUrl: "" });
    } else {
      alert("Please fill out all fields for the theater event.");
    }
  };

  return (
    <div className="where-to-watch-section-container">
      <div className="where-to-watch-section">
        {/* Where to Watch Online */}
        <div className="where-to-watch-online">
          <h3>Where to Watch Online</h3>
          <ul>
            {onlinePlatforms.map((platform, index) => (
              <li
                key={index}
                onClick={() => window.open(platform.url, "_blank")}
                style={{ cursor: "pointer" }}
              >
                {platform.name}
              </li>
            ))}
          </ul>
          {/* Input for new online platform */}
          <div className="add-platform-form">
            <input
              type="text"
              value={newPlatform.name}
              onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
              placeholder="Platform Name"
            />
            <input
              type="url"
              value={newPlatform.url}
              onChange={(e) => setNewPlatform({ ...newPlatform, url: e.target.value })}
              placeholder="Platform URL"
            />
            <button onClick={handleAddPlatform}>Add Online Platform</button>
          </div>
        </div>

        {/* Where to Watch in Theater */}
        <div className="where-to-watch-theater">
          <h3>Where to Watch in Theater</h3>
          <ul>
            {theaterEvents.map((theater, index) => (
              <li key={index}>
                <div>
                  <strong>{theater.name}</strong>
                  <p>Date: {theater.date}</p>
                  <p>Time: {theater.time}</p>
                  <p>Location: {theater.location}</p>
                  <a
                    href={theater.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ticket-book-link"
                  >
                    Book Tickets
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {/* Input for new theater event */}
          <div className="add-theater-form">
            <input
              type="text"
              value={newTheater.name}
              onChange={(e) => setNewTheater({ ...newTheater, name: e.target.value })}
              placeholder="Theater Name"
            />
            <input
              type="date"
              value={newTheater.date}
              onChange={(e) => setNewTheater({ ...newTheater, date: e.target.value })}
            />
            <input
              type="time"
              value={newTheater.time}
              onChange={(e) => setNewTheater({ ...newTheater, time: e.target.value })}
            />
            <input
              type="text"
              value={newTheater.location}
              onChange={(e) => setNewTheater({ ...newTheater, location: e.target.value })}
              placeholder="Theater Location"
            />
            <input
              type="url"
              value={newTheater.ticketUrl}
              onChange={(e) => setNewTheater({ ...newTheater, ticketUrl: e.target.value })}
              placeholder="Ticket URL"
            />
            <button onClick={handleAddTheater}>Add Theater Event</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhereToWatchSection;
