
const express = require("express");
const router = express.Router();

const pool = require('../db');



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for ADMIN PROFILE
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received user profile request:', { user_id });
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        const result = await client.query(
            `SELECT * FROM ADMIN WHERE ADMIN_ID = $1`,
            [user_id]
        );
        console.log(`Query Result: ${JSON.stringify(result.rows)}`);

        if (result.rows.length) {
            res.send(result.rows[0]);
            console.log("User Data sent");
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for ADMIN PROFILE UPDATE
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/update', async (req, res) => {
    const { user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE } = req.body;
    console.log('Received admin profile update request:', { user_id, NAME, DOB, EMAIL, CITY, STREET, HOUSE, PHONE });

    if (!user_id || !NAME || !DOB || !EMAIL || !CITY || !STREET || !HOUSE || !PHONE) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Log the DOB value to verify its format
    console.log('DOB before formatting:', DOB);

    // Ensure DOB is in YYYY-MM-DD format
    const formattedDOB = new Date(DOB).toISOString().split('T')[0];
    console.log('Formatted DOB:', formattedDOB);

    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).json({ message: "Connection Error" });
            return;
        }

        const result = await client.query(
            `UPDATE ADMIN SET NAME = $1, DOB = $2, EMAIL = $3, CITY = $4, STREET = $5, HOUSE = $6, PHONE = $7 WHERE ADMIN_ID = $8`,
            [NAME, formattedDOB, EMAIL, CITY, STREET, HOUSE, PHONE, user_id]
        );
        console.log(`Query Result: ${JSON.stringify(result)}`);

        const updatedProfile = { user_id, NAME, DOB: formattedDOB, EMAIL, CITY, STREET, HOUSE, PHONE };
        res.status(200).json(updatedProfile);
        console.log("Profile updated successfully");

    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (client) {
            client.release();
        }
    }
});



module.exports = router;
