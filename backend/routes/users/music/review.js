const express = require("express");
const router = express.Router();
const pool = require("../../db");

// Function to generate a review ID based on the title and timestamp
function generateReviewId(title) {
    return Math.abs(title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}

// Fetch reviews for a specific music ID
router.post("/", async (req, res) => {
    const { id } = req.body;
    console.log("Received music review request:", id);

    if (!id) {
        return res.status(400).send("Music ID is required");
    }

    let client;
    try {
        client = await pool.connect();
        const result = await client.query(
            `SELECT REVIEWRATING.R_ID, REVIEWRATING.DESCRIPTION, REVIEWRATING.RATING, USERS.NAME
            FROM REVIEWRATING
            JOIN REVIEWABOUTMUSIC ON REVIEWRATING.R_ID = REVIEWABOUTMUSIC.R_ID
            JOIN USERS ON REVIEWABOUTMUSIC.USER_ID = USERS.USER_ID
            WHERE REVIEWABOUTMUSIC.MUSIC_ID = $1
            LIMIT 5`,
            [id]
        );

        if (!result.rows.length) {
            return res.status(404).send("No reviews found for the given music ID");
        }

        const transformedData = result.rows.map((data) => ({
            id: data.r_id,
            name: data.name,
            description: data.description,
            rating: data.rating,
        }));

        res.json(transformedData);
        console.log("Review data sent successfully");
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});

// Add a review for a music track
router.post("/add", async (req, res) => {
    const { user_id, music_id, rating, description } = req.body;
    console.log("Received add review request:", { user_id, music_id, description, rating });

    if (!music_id || !user_id || !rating || !description) {
        return res.status(400).send("Missing required fields");
    }

    let client;
    try {
        client = await pool.connect();
        const review_id = generateReviewId(description);
        const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

        // Insert review into REVIEWRATING table
        await client.query(
            `INSERT INTO REVIEWRATING (R_ID, DESCRIPTION, RATING, REVIEW_FOR, REVIEW_DATE)
            VALUES ($1, $2, $3, 'MEDIA', $4)`,
            [review_id, description, rating, currentDate]
        );

        // Insert into REVIEWABOUTMUSIC table
        await client.query(
            `INSERT INTO REVIEWABOUTMUSIC (music_id, R_ID, user_id)
            VALUES ($1, $2, $3)`,
            [music_id, review_id, user_id]
        );

        res.status(201).send("Review added successfully");
        console.log("Review added successfully");
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});

module.exports = router;
