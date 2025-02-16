const express = require("express");
const router = express.Router();

const pool = require('../../db');

function generateDiscussionId(topic) {
    //will generate a discussion id based on the topic and time
    return Math.abs(topic.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}


router.get('/', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        console.log('Received discussion request');

        const query = `
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
            WHERE PARENT_TOPIC IS NULL
            ORDER BY DISCUSSIONABOUTMEDIA.DIS_DATE DESC, DISCUSSION.REPLY_COUNT DESC
        `;

        const result = await client.query(query);

        res.send(result.rows);
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

router.post('/my', async (req, res) => {
    const { user_id } = req.body;
    console.log('Fetching discussions for user:', user_id);
    let client;
    try {
        client = await pool.connect();

        const query = `
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
            JOIN USERSTARTDISCUSSION 
                ON DISCUSSION.DIS_ID = USERSTARTDISCUSSION.DIS_ID
            WHERE USERSTARTDISCUSSION.USER_ID = $1 AND PARENT_TOPIC IS NULL
            ORDER BY DISCUSSIONABOUTMEDIA.DIS_DATE DESC, DISCUSSION.REPLY_COUNT DESC
        `;

        const result = await client.query(query, [user_id]);

        res.status(200).send(result.rows);
        console.log("User Discussions Data sent");
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

router.post('/replies', async (req, res) => {
    const { discussion_id } = req.body;
    console.log('Received discussion replies request:', { discussion_id });
    let client;
    try {
        client = await pool.connect();

        const query = `
            SELECT 
                DISCUSSION.DIS_ID, 
                USERS.NAME, 
                DISCUSSION.DESCRIPTION, 
                DISCUSSION.REPLY_COUNT
            FROM DISCUSSION
            JOIN USERSTARTDISCUSSION 
                ON DISCUSSION.DIS_ID = USERSTARTDISCUSSION.DIS_ID
            JOIN USERS 
                ON USERSTARTDISCUSSION.USER_ID = USERS.USER_ID
            WHERE DISCUSSION.PARENT_TOPIC = $1
            ORDER BY DISCUSSION.REPLY_COUNT ASC
        `;

        const result = await client.query(query, [discussion_id]);

        res.send(result.rows);
        console.log("Discussion Replies Data sent");
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

router.post('/media', async (req, res) => {
    const { id } = req.body;
    console.log('Received discussion request:', { id });
    let client;
    try {
        client = await pool.connect();
        const query = `
            SELECT DISTINCT DISCUSSION.DIS_ID, TITLE, TOPIC, DISCUSSION.DESCRIPTION, REPLY_COUNT, 
            DISCUSSIONABOUTMEDIA.DIS_DATE, MEDIA.POSTER
            FROM DISCUSSION 
            JOIN DISCUSSIONABOUTMEDIA 
                ON DISCUSSION.DIS_ID = DISCUSSIONABOUTMEDIA.DIS_ID 
            JOIN MEDIA 
                ON DISCUSSIONABOUTMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
            WHERE PARENT_TOPIC IS NULL AND DISCUSSIONABOUTMEDIA.MEDIA_ID = $1
            ORDER BY DISCUSSIONABOUTMEDIA.DIS_DATE DESC, DISCUSSION.REPLY_COUNT DESC
        `;
        const result = await client.query(query, [id]);
        res.send(result.rows);
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

// ROUTE FOR ADD DISCUSSION
router.post('/add', async (req, res) => { 
    const { user_id, media_id, topic, description } = req.body;
    console.log('Received add discussion request:', { user_id, media_id, topic, description });
    const dis_id = generateDiscussionId(topic);
    console.log('Generated Discussion ID:', dis_id);
    const dis_date = new Date().toISOString().split('T')[0]; 
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        await client.query(
            `INSERT INTO DISCUSSION (DIS_ID, DESCRIPTION, TOPIC, REPLY_COUNT, PARENT_TOPIC)
            VALUES ($1, $2, $3, 0, NULL)`,
            [dis_id, description, topic]
        );
        await client.query(
            `INSERT INTO USERSTARTDISCUSSION (DIS_ID, USER_ID)
            VALUES ($1, $2)`,
            [dis_id, user_id]
        );
        await client.query(
            `INSERT INTO DISCUSSIONABOUTMEDIA (DIS_ID, MEDIA_ID, DIS_DATE)
            VALUES ($1, $2, $3)`,
            [dis_id, media_id, dis_date]
        );
        await client.query('COMMIT');
        res.status(201).send("Discussion added successfully");
        console.log("Discussion added successfully");
    } catch (err) {
        await client.query('ROLLBACK');
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

// ROUTE FOR ADD DISCUSSION REPLY
router.post('/add/reply', async (req, res) => {
    let { user_id, discussion_id, description, replyCount } = req.body;
    console.log('Received add discussion reply request:', { user_id, discussion_id, description, replyCount });
    const dis_id = generateDiscussionId(description);
    console.log('Generated Discussion ID:', dis_id);
    const dis_date = new Date().toISOString().split('T')[0];
    replyCount = replyCount + 1;
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        await client.query(
            `INSERT INTO DISCUSSION (DIS_ID, DESCRIPTION, REPLY_COUNT, PARENT_TOPIC)
            VALUES ($1, $2, $3, $4)`,
            [dis_id, description, replyCount, discussion_id]
        );
        await client.query(
            `INSERT INTO USERSTARTDISCUSSION (DIS_ID, USER_ID)
            VALUES ($1, $2)`,
            [dis_id, user_id]
        );
        await client.query(
            `UPDATE DISCUSSION SET REPLY_COUNT = (
                SELECT REPLY_COUNT FROM DISCUSSION WHERE DIS_ID = $1
            ) 
            WHERE DIS_ID = $2`,
            [dis_id, discussion_id]
        );
        await client.query('COMMIT');
        res.status(201).send("Discussion reply added successfully");
        console.log("Discussion reply added successfully");
    } catch (err) {
        await client.query('ROLLBACK');
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
