import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./MusicDetails.css";
import ReactPlayer from "react-player";

const ReviewCard = ({ review }) => {
  return (
    <div className="music-details-review-card">
      <i className="fa-regular fa-circle-user"></i>
      <div>
        <h4 className="music-details-review-name">{review.name}</h4>
        <p className="music-details-review-desc">{review.description}</p>
        <div className="music-details-review-rating">
          {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`music-details-star ${
                  review.rating >= starValue ? "music-details-star-filled" : ""
                }`}
              >
                ★
              </span>
            );
          })}
          <p>Rating: {review.rating.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

const MusicDetails = () => {
  const { musicID } = useParams();
  const [musicDetails, setMusicDetails] = useState({
    id: 1,
    title: "Perfect",
    artist: "Ed Sheeran",
    album: "Divide",
    releaseDate: "2017-03-03",
    duration: "4:23",
    rating: 4.5,
    playCount: "1.2B",
    coverImage:
      "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    streamUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
  });
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      description: "Amazing song! Loved it.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      description: "Great melody and lyrics.",
      rating: 4,
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    description: "",
    rating: 0,
  });

  const handleAddReview = () => {
    if (newReview.name && newReview.description && newReview.rating > 0) {
      setReviews([...reviews, { ...newReview, id: reviews.length + 1 }]);
      setNewReview({ name: "", description: "", rating: 0 });
    }
  };

  return (
    <div className="music-details-page">
      {/* Header Section */}
      <div
        className="music-details-header"
        style={{ backgroundImage: `url(${musicDetails.coverImage})` }}
      ></div>

      <div className="music-details-header-content">
        <div className="music-details-info">
          <img
            src={musicDetails.coverImage}
            alt={musicDetails.title}
            className="music-details-cover"
          />
          <h1>{musicDetails.title}</h1>
          <h2>{musicDetails.artist}</h2>
          <p>
            {musicDetails.album} • {musicDetails.releaseDate}
          </p>
        </div>
      </div>
      {/* Content Section */}
      <div className="music-details-content">
        <div className="music-details-stats">
        <p className="music-details-stats-epi">
            <div>Album:</div>
            <div>{musicDetails.album} </div>
          </p>
          <p className="music-details-stats-epi">
            <div>Duration:</div>
            <div>{musicDetails.duration}</div>
          </p>
          <p className="music-details-stats-epi">
            <div>Play Count:</div>
            <div>{musicDetails.playCount}</div>
          </p>
          <p className="music-details-stats-epi">
            <div>Rating:</div>
            <div>{musicDetails.rating}/5</div>
          </p>
        </div>

        <div className="music-details-player">
          <ReactPlayer
            url={musicDetails.streamUrl}
            controls
            width="100%"
            height="350px"
          />
        </div>

        <div className="music-details-reviews">
          <h3>Reviews</h3>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          <div className="music-details-add-review">
            <h4>Add a Review</h4>
            {/* <input
              type="text"
              placeholder="Your Name"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
            /> */}
            <textarea
              placeholder="Your Review"
              value={newReview.description}
              onChange={(e) =>
                setNewReview({ ...newReview, description: e.target.value })
              }
            />
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: parseInt(e.target.value) })
              }
            >
              <option value={0}>Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button onClick={handleAddReview}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicDetails;
