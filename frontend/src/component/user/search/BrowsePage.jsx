import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCardcopy from "../home/MovieCardcopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faMap,
  faLaugh,
  faTheaterMasks,
  faHatWizard,
  faLandmark,
  faGhost,
  faWandSparkles,
  faSearch,
  faHeart,
  faRocket,
  faFutbol,
  faStar, 
  faClock, 
} from "@fortawesome/free-solid-svg-icons";
import "./BrowsePage.css";
import "./SearchResults.css";

const genreIcons = {
  action: faFire,
  adventure: faMap,
  comedy: faLaugh,
  drama: faTheaterMasks,
  fantasy: faHatWizard,
  historical: faLandmark,
  horror: faGhost,
  magic: faWandSparkles,
  mystery: faSearch,
  romance: faHeart,
  "sci-fi": faRocket,
  sports: faFutbol,
  popular: faStar,
    new: faClock,
    alphabetical: faStar,
};

const BrowsePage = () => {
  const {genre} = useParams(); // Get genre from URL params
  const [results, setResults] = useState([]);

  // Fetch data based on (popular, new, alphabetical)
  useEffect(() => {
    const fetchData = async () => {
      let url = "http://localhost:5000/media/search/browse/genre";
      let requestData = { genre };

      // Check and modify fetch accordingly
      if (genre === "popular") {
        url = "http://localhost:5000/media/search/browse/popular"; // Fetch for popular (high rating)
      } else if (genre === "new") {
        url = "http://localhost:5000/media/search/browse/new"; // Fetch for new releases
      } else if (genre === "alphabetical") {
        url = "http://localhost:5000/media/search/browse/alphabetical"; // Fetch alphabetically
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData), // Send genre as part of the request body
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [genre]); // Re-fetch when genre or category changes


  return (
    <div className="browse-container">
      <h1 className="browse-container-title">
        <FontAwesomeIcon
          icon={genreIcons[genre] || faTheaterMasks}
          className="genre-icon"
        />
        {genre.charAt(0).toUpperCase() + genre.slice(1)}
      </h1>
      <h3 className="browse-search-results-title">Browse Results</h3>
      <div className="search-results">
        {results.length > 0 ? (
          results.map((result, index) => (
            <MovieCardcopy key={index} movie={result} />
          ))
        ) : (
          <p>No results found for {genre}.</p>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;

