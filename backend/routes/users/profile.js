
const express = require("express");
const router = express.Router();

const pool = require('../db');



router.post('/', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received user profile request:', { user_id });

    let client;
    try {
        // Connect to the PostgreSQL client
        client = await pool.connect();

        // Query to get user details from USERS table
        const result = await client.query(
            `SELECT USER_NAME, 
                    NAME, 
                    DOB, 
                    EMAIL, 
                    PHONE, 
                    CITY, 
                    STREET, 
                    HOUSE
             FROM USERS 
             WHERE USER_ID = $1`, 
            [user_id]  // Use $1 to bind the user_id parameter
        );

        console.log(`Query Result: ${JSON.stringify(result.rows)}`);

        if (result.rows.length) {
            // Send the user data if found
            res.status(200).json(result.rows[0]);
            console.log("User Data sent");
        } else {
            // If user not found, return 404
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        // Release the client back to the pool
        if (client) {
            client.release();
        }
    }
});




router.post('/update', async (req, res) => {
    const { user_id, name, dob, email, city, street, house, phone } = req.body;
    console.log('Received user profile update request:', { user_id, name, dob, email, city, street, house, phone });

    // Validate that all fields are provided
    if (!user_id || !name || !dob || !email || !city || !street || !house || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Log the DOB value to verify its format
    console.log('DOB before formatting:', dob);

    // Ensure DOB is in YYYY-MM-DD format
    const formattedDOB = new Date(dob).toISOString().split('T')[0];
    console.log('Formatted DOB:', formattedDOB);

    let client;
    try {
        client = await pool.connect();

        // Update the USERS table and set the ADDRESS columns
        const query = `
            UPDATE USERS 
            SET NAME = $1, 
                DOB = $2, 
                EMAIL = $3, 
                PHONE = $4, 
                CITY = $5, 
                STREET = $6, 
                HOUSE = $7
            WHERE USER_ID = $8
        `;

        const result = await client.query(query, [
            name, 
            formattedDOB, 
            email, 
            phone, 
            city, 
            street, 
            house, 
            user_id
        ]);
        console.log(`Query Result: ${JSON.stringify(result)}`);

        // Return the updated profile
        const updatedProfile = { user_id, name, dob: formattedDOB, email, city, street, house, phone };
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

