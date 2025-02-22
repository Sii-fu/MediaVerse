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


router.post('/favorite/status', async (req, res) => {
    const { user_id, media_id } = req.body;
    console.log('Received favorite status request:', { user_id, media_id });
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }
        const result = await client.query(
            `SELECT FAVORITE FROM USERWATCHANDFAVORITE
            WHERE USER_ID = $1
            AND MEDIA_ID = $2`,
            [user_id, media_id]
        );
        if (result.rows.length === 0) {
            res.status(404).send("Not found");
        } else {
            if(result.rows[0].favorite === 'Y'){
                res.status(200).send("Favorite");
            }
            else{
                res.status(404).send("Not favorite");
            }
        }
        console.log("Favorite Status Data sent");
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

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ROUTE FOR DELETE FROM FAVORITE
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/favorite/delete', async (req, res) => {
    const { user_id, media_id } = req.body;
    console.log('Received delete request for favorite:', { user_id, media_id });
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        const checkResult = await client.query(
            `SELECT * FROM USERWATCHANDFAVORITE 
            WHERE USER_ID = $1
            AND MEDIA_ID = $2`,
            [user_id, media_id]
        );

        console.log(`Query Result: `, checkResult.rows);

        if(checkResult.rows.length === 0){
            res.status(404).send("Record not found or already deleted");
        }
        else {
            if(checkResult.rows[0].status === 'WATCHED' || checkResult.rows[0].status === 'PLAN_TO_WATCH'){
                await client.query(
                    `UPDATE USERWATCHANDFAVORITE
                    SET FAVORITE = NULL
                    WHERE USER_ID = $1
                    AND MEDIA_ID = $2`,
                    [user_id, media_id]
                );
            } else{
                await client.query(
                    `DELETE FROM USERWATCHANDFAVORITE
                    WHERE USER_ID = $1
                    AND MEDIA_ID = $2`,
                    [user_id, media_id]
                );
            }

            res.send("Deleted successfully");
            console.log("Deleted successfully");
        }
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


router.post('/favorite', async (req, res) => {
    const { user_id, media_id, is_favorite } = req.body;
    console.log('Received favorite request:', { user_id, media_id, is_favorite });
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }
        let status = is_favorite ? 'Y' : 'N';

        const checkResult = await client.query(
            `SELECT * FROM USERWATCHANDFAVORITE 
            WHERE USER_ID = $1
            AND MEDIA_ID = $2`,
            [user_id, media_id]
        );
        if (checkResult.rows.length === 0) {
            const result = await client.query(
                `INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE)
                VALUES ($1, $2, $3)`,
                [user_id, media_id, status]
            );
            console.log(`Query Result: `, result);
            res.send("Favorite status updated successfully");
        } else {
            const result = await client.query(
                `UPDATE USERWATCHANDFAVORITE 
                SET FAVORITE = $1
                WHERE USER_ID = $2
                AND MEDIA_ID = $3`,
                [status, user_id, media_id]
            );
            console.log(`Query Result: `, result);
            res.send("Favorite status updated successfully");
        }
        console.log("Favorite status updated successfully");
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


router.post('/mylist/add', async (req, res) => {
    let { user_id, media_id, status } = req.body;
    console.log('Received add to plan to watch request:', { user_id, media_id, status });

    try {
        // Check if the user has already added this media
        const checkResult = await pool.query(
            'SELECT * FROM USERWATCHANDFAVORITE WHERE USER_ID = $1 AND MEDIA_ID = $2',
            [user_id, media_id]
        );

        if (checkResult.rows.length === 0) {
            // Media not found in the list, so insert it
            const result = await pool.query(
                'INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, STATUS) VALUES ($1, $2, $3)',
                [user_id, media_id, status]
            );
            console.log("Query Result:", result);
            res.send("Media added to list successfully");
        } else {
            // Media already exists, update the status
            const result = await pool.query(
                'UPDATE USERWATCHANDFAVORITE SET STATUS = $1 WHERE USER_ID = $2 AND MEDIA_ID = $3',
                [status, user_id, media_id]
            );
            console.log("Query Result:", result);
            res.send("Media list updated successfully");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
