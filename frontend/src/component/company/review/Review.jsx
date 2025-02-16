import React, { useState } from "react";
import "./Review.css";

const dummyMovies = [
  {
    id: 1,
    img: "https://th.bing.com/th/id/OIP.E2EPleUy3g_c_Zm59bHlFQHaK-?w=203&h=300&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    name: "Looper",
    rating: 8.5,
    reviews: [
      {
        name: "John Doe",
        description: "Great movie with amazing visuals!",
        rating: 8.5,
      },
      {
        name: "Jane Smith",
        description: "Loved the characters and the story.",
        rating: 9,
      },
    ],
  },
  {
    id: 2,
    img: "https://th.bing.com/th/id/OIP.husXuyj7d41bkTiQS2HcygHaKe?w=203&h=287&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    name: "Leader",
    rating: 7.0,
    reviews: [
      {
        name: "Alice",
        description: "Could have been better, but still enjoyable.",
        rating: 7,
      },
    ],
  },
];

const StarIcon = ({
  filled,
  size = 24,
  color = "#ff640a",
  strokeColor = "#ffffff",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    fill={filled ? color : "none"} // Fill only if star is filled
    stroke={filled ? color : strokeColor} // Stroke color changes based on filled state
    strokeWidth={2} // Increase stroke width for a thicker edge
    strokeLinecap="round"
    //   strokeLinejoin="round"
    style={{ marginRight: "5px" }} // Adjust spacing between stars
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ReviewCard = ({ review }) => {
  return (
    <div className="review2-card">
      <i className="fa-regular fa-circle-user"></i>
      <div>
        <h4 className="review2-name">{review.name}</h4>
        <p className="review2-desc">{review.description}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            return (
              <StarIcon
                key={index}
                filled={review.rating / 2 >= starValue}
                size={13}
                color="#ff640a"
              />
            );
          })}
          <p className="review2-rating">
            Review Rating: <strong>{(review.rating / 2).toFixed(1)} </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

const MovieCard = ({ movie, onShowReviews }) => {
  return (
    <div className="movie-card-review">
      <img src={movie.img} alt={movie.name} />
      <h3>{movie.name}</h3>
      <p>Rating: {movie.rating}/10</p>
      <button onClick={() => onShowReviews(movie.id)}>Show Reviews</button>
    </div>
  );
};

const Review = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleShowReviews = (id) => {
    setSelectedMovieId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="review-page">
      <h1 className="review-page-title">Movie Reviews</h1>
      <div className="movie-list">
        {dummyMovies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} onShowReviews={handleShowReviews} />
            {selectedMovieId === movie.id && (
              <div className="reviews2-container">
                {movie.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
                <button
                  className="close-reviews-btn"
                  onClick={() => setSelectedMovieId(null)}
                >
                  Close Reviews
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
