
const express = require("express");
const router = express.Router();

const pool = require('../../db');

router.post('/mymedia', async (req, res) => {
    const { com_id } = req.body;

    try {
        // Get all media IDs for the given company ID
        const mediaIdsResult = await pool.query(
            `SELECT media_id FROM companyhasmedia WHERE com_id = $1`,
            [com_id]
        );

        const mediaIds = mediaIdsResult.rows.map(row => row.media_id);

        if (mediaIds.length === 0) {
            res.status(404).send("No media found for the given company");
            return;
        }

        // Get all media details for the retrieved media IDs
        const mediaQuery = `
            SELECT media.*, company.name AS company_name 
            FROM media
            LEFT JOIN companyhasmedia ON media.media_id = companyhasmedia.media_id
            LEFT JOIN company ON companyhasmedia.com_id = company.com_id
            WHERE media.media_id = ANY($1)
        `;

        const result = await pool.query(mediaQuery, [mediaIds]);

        res.send(result.rows);
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    }
});


router.post('/addNews', async (req, res) => {
    const { mediaID, com_id, topic, description } = req.body;

    if (!mediaID || !com_id || !topic || !description) {
        return res.status(400).send("Missing required fields");
    }

    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const news_id = Math.floor(100000 + Math.random() * 900000); // Random 6-digit ID

    console.log('Generated Random News ID:', news_id);

    const client = await pool.connect(); // Get a connection from the pool

    try {
        await client.query('BEGIN'); // Start transaction

        // Insert news into NEWSANDUPDATES table
        await client.query(
            `INSERT INTO NEWSANDUPDATES (NEWS_ID, DESCRIPTION, HEADLINE)
             VALUES ($1, $2, $3)`,
            [news_id, description, topic]
        );

        console.log(`Inserted News ID: ${news_id}`);

        // Insert into COMPANYGIVENEWS table
        await client.query(
            `INSERT INTO COMPANYGIVENEWS (NEWS_ID, COM_ID, NEWS_DATE)
             VALUES ($1, $2, $3)`,
            [news_id, com_id, currentDate]
        );

        // Insert into NEWSTOMEDIA table
        await client.query(
            `INSERT INTO NEWSTOMEDIA (MEDIA_ID, NEWS_ID, NEWS_DATE)
             VALUES ($1, $2, $3)`,
            [mediaID, news_id, currentDate]
        );

        await client.query('COMMIT'); // Commit transaction

        res.status(201).send("News added successfully");
        console.log("News added successfully");
    } catch (err) {
        await client.query('ROLLBACK'); // Rollback transaction on error
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        client.release(); // Release connection back to pool
    }
});


module.exports = router;
