import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MusicSearch.css";
import { useEffect } from "react";

const MusicCard = ({ music }) => {
  return (
    <Link to={`/${localStorage.getItem("user_id")}/music/${music.id}`} className="music-search-link">
      <div className="music-search-card">
        <div className="music-search-card-content-upper">
          <h3 className="music-search-card-title1">{music.title}</h3>
          <h3 className="music-search-card-artist1">
            {music.artists ? music.artists.join(", ") : "Unknown Artist"} {/* Fix artist */}
          </h3>
          <p className="music-search-card-desc1">{music.album}</p>
        </div>
        <img className="music-search-card-img" src={music.coverImage} alt={music.title} /> {/* Fix image */}
        <div className="music-search-card-content">
          <h3 className="music-search-card-title">{music.title}</h3>
          <h3 className="music-search-card-artist">
            {music.artists ? music.artists.join(", ") : "Unknown Artist"} {/* Fix artist */}
          </h3>
        </div>
      </div>
    </Link>
  );
};


const MusicSearch = () => {
  // const [musicList, setMusicList] = useState([
  //   {
  //     id: 1,
  //     title: "Perfect",
  //     artist: "Ed Sheeran",
  //     album: "Divide",
  //     coverImage: "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   },
  //   {
  //     id: 2,
  //     title: "Shape of You",
  //     artist: "Ed Sheeran",
  //     album: "Divide",
  //     coverImage: "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   },
  //   {
  //     id: 3,
  //     title: "Blinding Lights",
  //     artist: "The Weeknd",
  //     album: "After Hours",
  //     coverImage: "https://th.bing.com/th/id/OIP.mcXkQH330Hn-uLJ3hSCpkgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   },
  // ]);

  const [musicList, setMusicList] = useState([]);

  React.useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/music/moststm", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setMusicList(data);
      } catch (error) {
        console.error("Error fetching music:", error);
      }
    };

    fetchMusic();
  }
  , []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMusic, setFilteredMusic] = useState(musicList);

  useEffect(() => {
    setFilteredMusic(
      musicList.filter((music) =>
        music.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }
  , [searchQuery, musicList]);
  


  return (
    <div className="music-search-section">
      <div className="music-search-header">
        <input
          type="text"
          placeholder="Search for music..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="music-search-header-search-bar"
        />
      </div>

      <div className="music-search-list">
        {filteredMusic.map((music) => (
          <MusicCard key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
};

export default MusicSearch;