import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import FeaturedContent from "./FeaturedContent";
import MovieList from "./MovieList";
import MultiLineMovieList from "./MultiLineMovieList";
import HomeNews from "./HomeNews";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [foryouMovies, setForYouMovies] = React.useState([]);
  const [actionMovies, setActionMovies] = React.useState([]);
  const [horrorMovies, setHorrorMovies] = React.useState([]);
  const [romanceMovies, setRomanceMovies] = React.useState([]);
  const [comedyMovies, setComedyMovies] = React.useState([]);
  const [roleData, setRoleData] = React.useState([]);
  const [empData, setEmpData] = React.useState([]);

  const fetchMoviesByGenre = async (genre, setMovies) => {
    try {
      const response = await fetch("http://localhost:5000/media/search/genre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: "", selectedGenres: [genre] }),
      });

      if (response.ok) {
        const data = await response.json();
        setMovies(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to search. Status:", response.status);
      }
    } catch (err) {
      console.error("Failed to search:", err);
    }
  };

  const fetchForYouMovies = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/common/media/foryou", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: localStorage.getItem("user_id") }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch media");
      }

      const media = await response.json();
      setForYouMovies(media);
    } catch (err) {
      console.error("Failed to fetch for you movies:", err);
    }
  };

  useEffect(() => {
    const fetchFavRoleMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/common/media/favRole", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: localStorage.getItem("user_id") }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorite role media");
        }

        const media = await response.json();
        setRoleData(media);
      } catch (err) {
        console.error("Failed to fetch favorite role movies:", err);
      }
    };

    fetchFavRoleMovies();
  }, []);

  React.useEffect(() => {
    fetchForYouMovies();
    fetchMoviesByGenre("ACTION", setActionMovies);
    fetchMoviesByGenre("HORROR", setHorrorMovies);
    fetchMoviesByGenre("ROMANCE", setRomanceMovies);
    fetchMoviesByGenre("COMEDY", setComedyMovies);
  }, []);

  // const newReleases = [
  //   {
  //     id: 1,
  //     title: "Perfect",
  //     artist: "Ed Sheeran",
  //     image:
  //       "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   }
  // ];
  const [newReleases, setNewReleases] = React.useState([]);

  React.useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/music/trending/songs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setNewReleases(data);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      }
    };

    fetchNewReleases();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <Navbar />
      <FeaturedContent />
      <div className="content-container">
        <MovieList movies={foryouMovies} title="Top Picks for You" />
        <div className="movie-list-container">
          <p className="movie-list-title">Top Trending Songs </p>
          <p className="movie-list-title2">Listen and Feel the every bit...</p>
          <Slider {...sliderSettings}>
            {newReleases.map((release) => (
              <div key={release.id} className="music-card3">
                <img
                  src={release.cover_image}
                  alt={release.title}
                  className="music-card3-img"
                />
                <h4 className="music-card3-name">{release.title}</h4>
                <p className="music-card3-artist">
                  {release.artists?.join(", ")}
                </p>
              </div>
            ))}
          </Slider>
        </div>
        {roleData.length > 0 && (
          <>
            <MultiLineMovieList data={roleData} />
          </>
        )}

        <MovieList movies={actionMovies} title="Action" />
        <HomeNews />
        <MovieList movies={horrorMovies} title="Horror" />
        <MovieList movies={romanceMovies} title="Romance" />
        <MovieList movies={comedyMovies} title="Comedy" />
      </div>
    </div>
  );
}

export default Home;
