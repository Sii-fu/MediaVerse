const express = require("express");
const router = express.Router();

const pool = require("../../db");

// Route to USERS media for companies

// ROUTE FOR MEDIA SEARCH
router.post("/", async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    console.log("Received search request:", req.body);
    const { searchTerm, selectedGenres, selectedMediaType } = req.body;

    const genreFilter = selectedGenres.length
      ? `AND (${selectedGenres
          .map((g) => `GENRE LIKE '%${g}%'`)
          .join(" AND ")})`
      : "";
    const mediaTypeFilter = selectedMediaType
      ? `AND LOWER(TYPE) = LOWER($2)`
      : "";

    const query = `
            SELECT * FROM MEDIA_SEARCH
            WHERE LOWER(TITLE) LIKE LOWER($1)
            ${genreFilter}
            ${mediaTypeFilter}
            ORDER BY RATING DESC
        `;

    const values = [`%${searchTerm}%`];
    if (selectedMediaType) values.push(selectedMediaType);

    const result = await client.query(query, values);

    const transformData = (data) => ({
      id: data.media_id,
      img: data.poster,
      title: data.title,
      description: data.description,
      rating: data.rating / 2,
      releaseDate: new Date(data.release_date).toISOString().split("T")[0],
      type:
        data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase(),
      episodes: data.episode || 0,
      duration: data.duration,
      genre: data.genre.split(",").map((g) => g.trim()),
      companyName: "Example Productions",
      role: [],
      news: [],
      review: [],
    });

    const transformedData = result.rows.map(transformData);

    res.send(transformedData);
    console.log("Search Data sent:");
  } catch (err) {
    console.error("Error during database query:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (client) {
      try {
        client.release();
      } catch (err) {
        console.error("Error releasing database connection:", err);
      }
    }
  }
});

router.post("/genre", async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    console.log("Received search request:", req.body);

    const { searchTerm, selectedGenres } = req.body;

    // Build genre filter dynamically
    const genreFilter = selectedGenres.length
      ? `AND (${selectedGenres
          .map((_, index) => `GENRE ILIKE $${index + 2}`)
          .join(" AND ")})`
      : "";

    const query = `
            SELECT * 
            FROM MEDIA 
            WHERE UPPER(TITLE) LIKE UPPER($1) 
            ${genreFilter} 
            ORDER BY RATING DESC
        `;

    // Build parameter array
    const params = [
      `%${searchTerm}%`,
      ...selectedGenres.map((genre) => `%${genre}%`),
    ];

    const result = await client.query(query, params);

    // Transform the data for the response
    const transformData = (data) => ({
      id: data.media_id,
      img: data.poster,
      title: data.title,
      description: data.description,
      rating: data.rating / 2,
      releaseDate: new Date(data.release_date).toISOString().split("T")[0],
      type:
        data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase(),
      episodes: data.episode || 0,
      duration: data.duration,
      genre: data.genre.split(",").map((g) => g.trim()),
      companyName: "Example Productions",
      role: [],
      news: [],
      review: [],
    });

    const transformedData = result.rows.map(transformData);

    res.send(transformedData);
    console.log("Search Data sent");
  } catch (err) {
    console.error("Error during database query:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (client) {
      try {
        client.release();
      } catch (err) {
        console.error("Error releasing database connection:", err);
      }
    }
  }
});

router.post("/browse/genre", async (req, res) => {
  const { genre } = req.body; // Collect the genre from the request body

  let client;
  try {
    client = await pool.connect();
    console.log("Fetching media for genre:", genre);

    // Query to get media for the specific genre
    const query = `
        SELECT * 
        FROM MEDIA 
        WHERE GENRE LIKE $1  
        ORDER BY RATING DESC
      `;

    const result = await client.query(query, [`%${genre.toUpperCase()}%`]); // Ensure genre is in uppercase for comparison

    // Transform the data for the response
    const transformData = (data) => ({
      id: data.media_id,
      img: data.poster,
      title: data.title,
      description: data.description,
      rating: data.rating / 2,
      releaseDate: new Date(data.release_date).toISOString().split("T")[0],
      type:
        data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase(),
      episodes: data.episode || 0,
      duration: data.duration,
      genre: data.genre.split(",").map((g) => g.trim()),
      companyName: "Example Productions",
      role: [],
      news: [],
      review: [],
    });

    const transformedData = result.rows.map(transformData);
    res.send(transformedData);
    console.log("Data sent for genre:", genre);
  } catch (err) {
    console.error("Error during database query:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (client) {
      try {
        client.release();
      } catch (err) {
        console.error("Error releasing database connection:", err);
      }
    }
  }
});

// Route for fetching popular media (highest rating)
router.post("/browse/popular", async (req, res) => {
    try {
      const result = await pool.query(`
          SELECT * FROM MEDIA
          ORDER BY RATING DESC
        `);
  
      // Transform the data for the response
      const transformData = (data) => ({
        id: data.media_id,
        img: data.poster,
        title: data.title,
        description: data.description,
        rating: data.rating / 2,
        releaseDate: new Date(data.release_date).toISOString().split("T")[0],
        type:
          data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase(),
        episodes: data.episode || 0,
        duration: data.duration,
        genre: data.genre.split(",").map((g) => g.trim()),
        companyName: "Example Productions",
        role: [],
        news: [],
        review: [],
      });
  
      const transformedData = result.rows.map(transformData);
      res.send(transformedData);
      console.log("Data sent for popular media");
    } catch (err) {
      console.error("Error during database query:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Route for fetching new media (newest releases)
  router.post("/browse/new", async (req, res) => {
    try {
      const result = await pool.query(`
          SELECT * FROM MEDIA
          ORDER BY RELEASE_DATE DESC
        `);
  
      // Transform the data for the response
      const transformData = (data) => ({
        id: data.media_id,
        img: data.poster,
        title: data.title,
        description: data.description,
        rating: data.rating / 2,
        releaseDate: new Date(data.release_date).toISOString().split("T")[0],
        type:
          data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase(),
        episodes: data.episode || 0,
        duration: data.duration,
        genre: data.genre.split(",").map((g) => g.trim()),
        companyName: "Example Productions",
        role: [],
        news: [],
        review: [],
      });
  
      const transformedData = result.rows.map(transformData);
      res.send(transformedData);
      console.log("Data sent for new media");
    } catch (err) {
      console.error("Error during database query:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Route for fetching alphabetical media
  router.post("/browse/alphabetical", async (req, res) => {
    try {
      const result = await pool.query(`
          SELECT * FROM MEDIA
          ORDER BY TITLE ASC
        `);
  
      // Transform the data for the response
      const transformData = (data) => ({
        id: data.media_id,
        img: data.poster,
        title: data.title,
        description: data.description,
        rating: data.rating / 2,
        releaseDate: new Date(data.release_date).toISOString().split("T")[0],
        type:
          data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase(),
        episodes: data.episode || 0,
        duration: data.duration,
        genre: data.genre.split(",").map((g) => g.trim()),
        companyName: "Example Productions",
        role: [],
        news: [],
        review: [],
      });
  
      const transformedData = result.rows.map(transformData);
      res.send(transformedData);
      console.log("Data sent for alphabetical media");
    } catch (err) {
      console.error("Error during database query:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;
