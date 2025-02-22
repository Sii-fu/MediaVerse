const express = require("express");
const router = express.Router();

const pool = require('../../db');
const axios = require('axios');
const { exec } = require("child_process");


function generateReviewId(title) {
    //will generate a review id based on the title and time
    return Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}


router.post('/', async (req, res) => {
    const { id } = req.body;
    console.log('Received music review request:', id);

    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        console.log('Received media review request:', id);

        const result = await client.query(
            `SELECT REVIEWRATING.R_ID, REVIEWRATING.DESCRIPTION, REVIEWRATING.RATING, USERS.NAME
            FROM REVIEWRATING
            JOIN REVIEWABOUTMUSIC ON REVIEWRATING.R_ID = REVIEWABOUTMUSIC.R_ID
            JOIN USERS ON REVIEWABOUTMUSIC.USER_ID = USERS.USER_ID
            WHERE REVIEWABOUTMUSIC.MUSIC_ID = $1
            LIMIT 5`,
            [id]
        );
        console.log(`Query Result: `, result.rows);

        if (!result.rows.length) {
            res.status(404).send("No reviews found for the given media");
            return;
        }

        const transformData = (data) => ({
            id: data.r_id,
            name: data.name,
            description: data.description,
            rating: data.rating
        });

        const transformedData = result.rows.map(transformData);

        res.send(transformedData);
        console.log("Review Data sent");
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



router.post('/add', async (req, res) => {
const { user_id, music_id, rating, description } = req.body;
console.log('Received add review request:', { user_id, music_id, description, rating });

if (!music_id || !user_id || !rating || !description) {
    res.status(400).send("Missing required fields");
    return;
}

let client;
try {
    client = await pool.connect();
    if (!client) {
        res.status(500).send("Connection Error");
        return;
    }

    const review_id = generateReviewId(description);
    console.log('Generated review id:', review_id);
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // Insert review into REVIEWRATING table
    await client.query(
        `INSERT INTO REVIEWRATING (R_ID, DESCRIPTION, RATING, REVIEW_FOR, REVIEW_DATE)
        VALUES ($1, $2, $3, 'MEDIA', $4)`,
        [review_id, description, rating, currentDate]
    );
    console.log(`Review Insert time: ${currentDate}`);

    // Insert into USERGIVEREVIEW table
    await client.query(
        `INSERT INTO REVIEWABOUTMUSIC (music_id, R_ID, user_id)
        VALUES ($1, $2, $3)`,
        [music_id, review_id, user_id]
    );

    res.status(201).send("Review added to music successfully");
    console.log("Review added successfully");
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