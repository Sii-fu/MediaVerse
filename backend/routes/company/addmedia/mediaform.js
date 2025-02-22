const express = require("express");
const router = express.Router();

const pool = require('../../db');





//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for COMPANY ADD MEDIA ROLES
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/roles', async (req, res) => {
    let client;
    try {
        // Get a client from the pool
        client = await pool.connect();
        console.log('Received Role request');
        
        // Query the roles from the database
        const result = await client.query('SELECT * FROM ROLE');
        console.log(`Query Result: `, result.rows);
        
        // Send the result as the response
        res.send(result.rows);
        console.log("ROLE Data sent");
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        // Release the client back to the pool
        if (client) {
            try {
                client.release();
            } catch (err) {
                console.error("Error releasing client: ", err);
            }
        }
    }
});


router.post('/addmedia', async (req, res) => {
    const {
        title,
        description,
        type,
        selectedGenres,
        trailer,
        duration,
        releaseDate,
        episode,
        roles,
        imageUrl,
        com_id
    } = req.body;

    console.log('Received add media request:', {
        title, description, type, selectedGenres, trailer, imageUrl, duration, releaseDate, episode, roles
    });

    const rating = 0; // Default rating
    const media_id = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit MEDIA_ID

    console.log('Generated Random Media ID:', media_id);

    const client = await pool.connect(); // Get a connection from the pool

    try {
        await client.query('BEGIN'); // Start transaction

        // Insert media data
        await client.query(
            `INSERT INTO MEDIA (MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE)
             VALUES ($1, $2, $3, $4, 0, $5, $6, $7, $8, $9, $10, $11)`,
            [media_id, title, description, rating, type, selectedGenres.join(', '), trailer, imageUrl, duration, releaseDate, episode]
        );

        console.log(`Media Inserted with ID ${media_id}`);

        // Insert roles associated with the media
        for (const role of roles) {
            try {
                await client.query(
                    `INSERT INTO MEDIAHASROLE (ROLE_ID, MEDIA_ID) VALUES ($1, $2)`,
                    [role.role_id, media_id]
                );
                console.log(`Inserted Role ID ${role.role_id} for Media ${media_id}`);
            } catch (roleErr) {
                console.error(`Error inserting role ID ${role.role_id}:`, roleErr);
                throw roleErr;
            }
        }

        // Insert media and company association
        await client.query(
            `INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID) VALUES ($1, $2)`,
            [media_id, com_id]
        );
        console.log(`Inserted Company-Media relation: Media ${media_id}, Company ${com_id}`);

        await client.query('COMMIT'); // Commit transaction

        res.status(201).send("Media added successfully");
        console.log("Media added successfully");
    } catch (err) {
        await client.query('ROLLBACK'); // Rollback transaction on error
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        client.release(); // Release the connection back to the pool
    }
});

module.exports = router;
