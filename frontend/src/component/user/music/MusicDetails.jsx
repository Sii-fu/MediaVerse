import React, { useState, useEffect } from "react";
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
  const [musicDetails, setMusicDetails] = useState({});

  useEffect(() => {
    const fetchMusicDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/music/page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ music_id: musicID }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch music details");
        }
        const music = await response.json();
        setMusicDetails(music);
        console.log(music.id);
      } catch (err) {
        console.error("Failed to fetch music details:", err);
      }
    };

    fetchMusicDetails();
  }, [musicID]);

  // const [reviews, setReviews] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     description: "Amazing song! Loved it.",
  //     rating: 5,
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     description: "Great melody and lyrics.",
  //     rating: 4,
  //   },
  // ]);

  const [reviews, setReviews] = useState([]);

  useEffect (() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/music/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: musicID }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
  
    fetchReviews();
  }, [musicID]);


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

    fetch("http://localhost:5000/user/music/review/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"),
        music_id: musicID,
        rating: newReview.rating,
        description: newReview.description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add review");
        }
      })
      .catch((err) => {
        console.error("Failed to add review:", err);
      }
    );
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/music/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: musicID }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    }
    fetchReviews();
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
            {musicDetails.album} • {musicDetails.release_date}
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
            <div>{formatDuration(musicDetails.duration)}</div>
          </p>
          <p className="music-details-stats-epi">
            <div>Rating:</div>
            <div>{musicDetails.rating}/10</div>
          </p>
        </div>

        <div className="music-details-player">
        <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${musicDetails.id}`}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>

        </div>

        <div className="music-details-reviews">
          <h3>Reviews</h3>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          <div className="music-details-add-review">
            <h4>Add a Review</h4>
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
              {[1, 2, 3, 4, 5, 6,7,8,9,10].map((num) => (
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