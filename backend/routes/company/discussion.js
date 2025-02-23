const express = require("express");
const router = express.Router();

const pool = require('../db');




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for COMPANY DISCUSSIONS
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/', async (req, res) => {
    const { com_id } = req.body;  // Retrieve com_id from the request body
    
    let client;
    try {
        client = await pool.connect();
        console.log('Received discussion request for company ID:', com_id);

        // Query to get media related to the company
        const mediaQuery = `
            SELECT MEDIA_ID 
            FROM COMPANYHASMEDIA
            WHERE COM_ID = $1
        `;
        const mediaResult = await client.query(mediaQuery, [com_id]);

        console.log(`Media Query Result: `, mediaResult.rows);

        if (mediaResult.rows.length === 0) {
            return res.status(404).send("No media found for the specified company.");
        }

        const mediaIds = mediaResult.rows.map(row => row.media_id);

        console.log(`Media IDs for company ${com_id}:`, mediaIds);

        // Fetch discussions about the media that the company owns
        const discussionQuery = `
            SELECT DISTINCT 
                DISCUSSION.DIS_ID, 
                TITLE, 
                TOPIC, 
                DISCUSSION.DESCRIPTION, 
                REPLY_COUNT, 
                DISCUSSIONABOUTMEDIA.DIS_DATE, 
                MEDIA.POSTER
            FROM DISCUSSION
            JOIN DISCUSSIONABOUTMEDIA
                ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID
            JOIN MEDIA
                ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
            WHERE DISCUSSIONABOUTMEDIA.MEDIA_ID = ANY($1::int[]) 
            ORDER BY DISCUSSIONABOUTMEDIA.DIS_DATE DESC, DISCUSSION.REPLY_COUNT DESC
        `;
        
        const discussionResult = await client.query(discussionQuery, [mediaIds]);

        console.log(`Discussion Query Result: `, discussionResult.rows);
        
        if (discussionResult.rows.length === 0) {
            return res.status(404).send("No discussions found for the specified media.");
        }

        res.send(discussionResult.rows);
        console.log("Discussion Data sent");
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
