const express = require("express");
const router = express.Router();

const pool = require('../../db');

// Route to USERS media for companies




// ROUTE FOR MEDIA SEARCH 
router.post('/', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        console.log('Received search request:', req.body);
        const { searchTerm, selectedGenres, selectedMediaType } = req.body;

        const genreFilter = selectedGenres.length ? `AND (${selectedGenres.map(g => `GENRE LIKE '%${g}%'`).join(' AND ')})` : '';
        const mediaTypeFilter = selectedMediaType ? `AND LOWER(TYPE) = LOWER($2)` : '';

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
            releaseDate: new Date(data.release_date).toISOString().split('T')[0],
            type: data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase(),
            episodes: data.episode || 0,
            duration: data.duration,
            genre: data.genre.split(',').map(g => g.trim()),
            companyName: 'Example Productions',
            role: [],
            news: [],
            review: []
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



router.post('/genre', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        console.log('Received search request:', req.body);

        const { searchTerm, selectedGenres } = req.body;

        // Build genre filter dynamically
        const genreFilter = selectedGenres.length 
            ? `AND (${selectedGenres.map((_, index) => `GENRE ILIKE $${index + 2}`).join(' AND ')})`
            : '';

        const query = `
            SELECT * 
            FROM MEDIA 
            WHERE UPPER(TITLE) LIKE UPPER($1) 
            ${genreFilter} 
            ORDER BY RATING DESC
        `;

        // Build parameter array
        const params = [`%${searchTerm}%`, ...selectedGenres.map(genre => `%${genre}%`)];

        const result = await client.query(query, params);

        // Transform the data for the response
        const transformData = (data) => ({
            id: data.media_id,
            img: data.poster,
            title: data.title,
            description: data.description,
            rating: data.rating / 2,
            releaseDate: new Date(data.release_date).toISOString().split('T')[0],
            type: data.type.charAt(0).toUpperCase() + data.type.slice(1).toLowerCase(),
            episodes: data.episode || 0,
            duration: data.duration,
            genre: data.genre.split(',').map(g => g.trim()),
            companyName: 'Example Productions',
            role: [],
            news: [],
            review: []
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






module.exports = router;
