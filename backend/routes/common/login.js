const express = require("express");
const router = express.Router();

const pool = require('../db');

// Route to login for companies

router.post('/company', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password }); // Log the received request

    try {
        const result = await pool.query(
            `SELECT user_name, password, com_id AS user_id
             FROM login 
             JOIN company ON login.id = company.com_id 
             WHERE user_name = $1 AND password = $2`,
            [username, password] // Positional parameters for parameterized query
        );

        console.log(`Query Result: ${JSON.stringify(result.rows)}`);

        if (result.rows.length) {
            res.status(200).send(result.rows[0]); // Respond to client
            console.log("Login Successful");
        } else {
            console.log("Invalid Credentials");
            res.status(401).send("Invalid Credentials"); // Respond to client
        }
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    }
});



// Route to login for users

router.post('/user', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });  // Log the received request

    let client;
    try {
        // Connect to the PostgreSQL client
        client = await pool.connect();

        // Query the LOGIN table and join it with USERS to verify credentials
        const result = await client.query(
            `SELECT USER_NAME, PASSWORD, USER_ID AS "user_id"
            FROM LOGIN
            JOIN USERS ON LOGIN.ID = USERS.USER_ID
            WHERE USER_NAME = $1 AND PASSWORD = $2`, 
            [username, password]  // Use placeholders for parameterized query
        );
        
        console.log(`Query Result: ${JSON.stringify(result.rows)}`);

        if (result.rows.length) {
            // If credentials match, send the user data back to the client
            res.status(200).json(result.rows[0]);
        } else {
            // If credentials don't match, send an error response
            console.log("Invalid Credentials");
            res.status(401).send("Invalid Credentials");
        }
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        // Release the client back to the pool
        if (client) {
            client.release();
        }
    }
});

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Login route for ADMIN
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    router.post('/admin', async (req, res) => {
        const { username, password } = req.body;
        console.log('Received login request:', { username, password }); // Log the received request

        let client;
        try {
            // Connect to the PostgreSQL client
            client = await pool.connect();

            // Query the LOGIN table and join it with ADMIN to verify credentials
            const result = await client.query(
                `SELECT USER_NAME, PASSWORD, ADMIN_ID AS "user_id"
                FROM LOGIN
                JOIN ADMIN ON LOGIN.ID = ADMIN.ADMIN_ID
                WHERE USER_NAME = $1 AND PASSWORD = $2`, 
                [username, password]  // Use placeholders for parameterized query
            );
            
            console.log(`Query Result: ${JSON.stringify(result.rows)}`);

            if (result.rows.length) {
                // If credentials match, send the user data back to the client
                res.status(200).json(result.rows[0]);
            } else {
                // If credentials don't match, send an error response
                console.log("Invalid Credentials");
                res.status(401).send("Invalid Credentials");
            }
        } catch (err) {
            console.error("Error during database query: ", err);
            res.status(500).send("Internal Server Error");
        } finally {
            // Release the client back to the pool
            if (client) {
                client.release();
            }
        }
    });




module.exports = router;


