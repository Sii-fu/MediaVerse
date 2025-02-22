const express = require("express");
const router = express.Router();

const pool = require('../../db');


router.post('/', async (req, res) => {
    const { id } = req.body;
    console.log('Received company review request:', id);
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        const result = await client.query(
            `select media.media_id as id, poster as img, title as name, rating 
            from media join companyhasmedia on media.media_id = companyhasmedia.media_id
            where companyhasmedia.com_id=$1`,
            [id]
        );

        const data = result.rows;
        for (const item of data) {
            const reviewQuery = await client.query(
                `SELECT name, description, rating FROM reviewrating 
                join reviewaboutmedia on reviewrating.r_id = reviewaboutmedia.r_id
                join usergivereview on usergivereview.r_id = reviewrating.r_id
                join users on users.user_id = usergivereview.user_id
                where reviewaboutmedia.media_id=$1
                order by reviewrating.review_date
                `, [item.id]);
            item.reviews = reviewQuery.rows;
        }
        res.json(data);

    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});


module.exports = router;