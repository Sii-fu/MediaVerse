import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./Home.css";

function Home({ com_id }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/mymedia", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ com_id: localStorage.getItem("user_id") }),
        });

        if (!response.ok) {
          console.error("Failed to fetch data:", response.statusText);
          return;
        }

        const data = await response.json();

        console.log("Fetched Data:", data); // Log the data to inspect its structure
        setMovies(data);
      } catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mymedia-container2">
        <h2 className="title-mymedia2">My Media</h2>
        <div className="mymedia-form1">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.MEDIA_ID || movie.id} movie={movie} />
            ))
          ) : (
            <p>No media available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
