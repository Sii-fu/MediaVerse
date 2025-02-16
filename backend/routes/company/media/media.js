
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





module.exports = router;
