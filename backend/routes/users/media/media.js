const express = require("express");
const router = express.Router();

const pool = require('../../db');

// Route to USERS media for companies





router.get('/', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        console.log('Received media request----');
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        const result = await client.query('SELECT * FROM MEDIA_VIEW ORDER BY RATING DESC LIMIT 30');
        console.log('Query executed successfully:', result.rows);

        const transformData = (data) => ({
            id: data.media_id,
            img: data.poster,
            title: data.title,
            description: data.description,
            rating: data.rating,
            releaseDate: data.release_date ? new Date(data.release_date).toISOString().split('T')[0] : null,
            type: data.type,
            episodes: data.episode || 0,
            duration: data.duration,
            genre: data.genre ? data.genre.split(',').map(g => g.trim()) : [],
            companyName: 'Example Productions',
            role: [],
            news: [],
            review: []
        });

        const transformedData = result.rows.map(transformData);
        res.json(transformedData);
        console.log("MEDIA Data sent");
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            try {
                client.release();
            } catch (err) {
                console.error("Error releasing database connection: ", err);
            }
        }
    }

});



router.post('/page', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            return res.status(500).send("Connection Error");
        }
        console.log('Received media request:', req.body);
        const { id } = req.body;
        const mediaResult = await client.query(
            `SELECT * FROM MEDIA_COMPANY_DETAILS WHERE MEDIA_ID = $1`, 
            [id]
        );

        if (!mediaResult.rows.length) {
            return res.status(404).send("Media not found");
        }
        const roleResult = await client.query(
            `SELECT * FROM MEDIA_ROLE_DETAILS WHERE MEDIA_ID = $1`,
            [id]
        );
        const newsResult = await client.query(
            `SELECT * FROM MEDIA_NEWS_DETAILS WHERE MEDIA_ID = $1`,
            [id]
        );
        const reviewResult = await client.query(
            `SELECT * FROM MEDIA_REVIEW_DETAILS WHERE MEDIA_ID = $1`,
            [id]
        );
        
        const mediaData = mediaResult.rows[0];
        const transformedData = {
            id: mediaData.media_id,
            img: mediaData.poster,
            title: mediaData.title,
            description: mediaData.description,
            rating: mediaData.rating,
            releaseDate: new Date(mediaData.release_date).toISOString().split('T')[0],  // Format the date
            type: mediaData.type,
            episodes: mediaData.episode || 0,
            duration: mediaData.duration,
            genre: mediaData.genre ? mediaData.genre.split(',').map(g => g.trim()) : [],  // Keep genre as is
            trailer: mediaData.trailer,
            companyName: mediaData.company_name,
            role: roleResult.rows,
            news: newsResult.rows.map(row => ({
                topic: row.headline || '',  
                description: row.description || '',  
                date: row.news_date
            })),
            review: reviewResult.rows.map(row => ({
                name: row.reviewer_name || '',  // 
                id: row.r_id,
                description: row.description || '',  // 
                rating: row.rating,
                date: row.review_date
            }))
        };

        res.send(transformedData);
        console.log("Media Data sent");
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            try {
                client.release();
            } catch (err) {
                console.error("Error releasing database connection: ", err);
            }
        }
    }
});





module.exports = router;
