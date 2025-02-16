
const express = require("express");
const router = express.Router();

const pool = require('../../db');


function generateReviewId(title) {
    //will generate a review id based on the title and time
    return Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}




router.post('/', async (req, res) => {
    const { id } = req.body;
    console.log('Received media review request:', id);

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
            JOIN USERGIVEREVIEW ON REVIEWRATING.R_ID = USERGIVEREVIEW.R_ID
            JOIN REVIEWABOUTMEDIA ON REVIEWRATING.R_ID = REVIEWABOUTMEDIA.R_ID
            JOIN USERS ON USERGIVEREVIEW.USER_ID = USERS.USER_ID
            WHERE REVIEWABOUTMEDIA.MEDIA_ID = $1
            ORDER BY REVIEWRATING.REVIEW_DATE DESC
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
const { user_id, media_id, rating, description } = req.body;
console.log('Received add review request:', { user_id, media_id, description, rating });

if (!media_id || !user_id || !rating || !description) {
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
        `INSERT INTO USERGIVEREVIEW (R_ID, USER_ID)
        VALUES ($1, $2)`,
        [review_id, user_id]
    );

    // Insert into REVIEWABOUTMEDIA table
    await client.query(
        `INSERT INTO REVIEWABOUTMEDIA (MEDIA_ID, R_ID)
        VALUES ($1, $2)`,
        [media_id, review_id]
    );

    // Get previous rating_count and rating
    const previousRatingResult = await client.query(
        `SELECT RATING, RATING_COUNT FROM MEDIA WHERE MEDIA_ID = $1`,
        [media_id]
    );
    const previousRatingCount = previousRatingResult.rows[0].rating_count;
    const previousRatingValue = previousRatingResult.rows[0].rating;

    // Calculate new rating
    const newRating = ((previousRatingValue * previousRatingCount) + rating) / (previousRatingCount + 1);
    const roundedNewRating = Math.round(newRating); // Round the new rating to an integer

    // Update rating and rating_count
    await client.query(
        `UPDATE MEDIA SET RATING = $1, RATING_COUNT = RATING_COUNT + 1 WHERE MEDIA_ID = $2`,
        [roundedNewRating, media_id]
    );

    res.status(201).send("Review added successfully");
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
