import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicCard from './MusicCard';
import './MusicSearch.css';

const MusicSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setMusicList([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:5000/search`, {
          params: { query: searchQuery },
        });
        setMusicList(response.data.tracks);
      } catch (err) {
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

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
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && musicList.length === 0 && searchQuery.trim() !== "" && (
          <p>No results found</p>
        )}
        {musicList.map((music) => (
          <MusicCard key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
};

export default MusicSearch;