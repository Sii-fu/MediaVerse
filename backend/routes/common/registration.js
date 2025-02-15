const express = require("express");
const router = express.Router();

const pool = require('../db');


function generateUserId(username) {
    //will return a short unique integer of 4 digit based on the username and current time
    return Math.abs(username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}

function generateLoginId(username, password) {
    //will generate a login id based on the username and password and time
    return Math.abs(username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + password.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;    
}


// Route to check username for users
router.post('/user/check-username', async (req, res) => {
    const { username } = req.body;

    console.log('Received username check request for user:', username);

    try {
        console.log('Preparing to query database for user username...');
        const result = await pool.query(
            `SELECT COUNT(*) AS count FROM users WHERE user_name = $1`,
            [username]
        );

        console.log('Query executed successfully. Count:', result.rows[0].count);

        if (+result.rows[0].count > 0) {
            res.status(409).send("Username already exists");
        } else {
            res.status(200).send("Username available");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route to check username for merchandiser
router.post('/merch/check-username', async (req, res) => {
    const { username } = req.body;

    console.log('Received username check request for merchandiser:', username);

    try {
        console.log('Preparing to query database for merchandiser username...');
        const result = await pool.query(
            `SELECT COUNT(*) AS count FROM merchandiser WHERE user_name = $1`,
            [username]
        );

        console.log('Query executed successfully. Count:', result.rows[0].count);

        if (+result.rows[0].count > 0) {
            res.status(409).send("Username already exists");
        } else {
            res.status(200).send("Username available");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    }
});


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ROUTE FOR CHECK USERNAME EXIST COMPANY REGISTRATION
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/company/check-username', async (req, res) => {
    const { username } = req.body;

    console.log('Received username check request:', req.body);

    
    try {
        console.log('Preparing to query database...');
        const result = await pool.query(
            `SELECT COUNT(*) AS count FROM company WHERE user_name = $1`,
            [username]
        );
        console.log('Query executed successfully:', result.rows[0].count);

        
        if (+result.rows[0].count > 0) {
            res.status(409).send("Username already exists");
        } else {
            res.status(200).send("Username available");
        }
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } 
});



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ROUTE FOR COMPANY REGISTRATION
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post('/company', async (req, res) => {
    const { username, password, name, email, description, imageUrl } = req.body;
    console.log('Received company registration request:', { username, password, name, email, description, imageUrl });

    const login_id = generateLoginId(username, password);  // Generate login_id in Node.js
    console.log('Generated Login ID:', login_id);

    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        // Begin transaction
        await client.query('BEGIN');

        // Execute the stored procedure
        const result = await client.query(
            `SELECT register_company($1, $2, $3, $4, $5, $6, $7) AS p_com_id`,
            [username, password, name, imageUrl, email, description, login_id]
        );

        const comId = result.rows[0].p_com_id;  // Retrieve the COM_ID from the output
        console.log(`Company registered with Company ID: ${comId} and Login ID: ${login_id}`);

        // Send success response
        res.status(201).send("Company registered successfully");

        // Commit the transaction
        await client.query('COMMIT');
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
        if (client) {
            await client.query('ROLLBACK');
        }
    } finally {
        if (client) {
            client.release();
        }
    }
});




    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ROUTE FOR USER REGISTRATION
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


router.post('/user', async (req, res) => {
    const { username, password, name, dob, email, city, street, house, phone, genres } = req.body;
    console.log('Received user registration request:', { username, password, name, dob, email, city, street, house, phone, genres });

    // Generate IDs
    const login_id = generateLoginId(username, password); // Generate Login ID in Node.js
    console.log('Generated Login ID:', login_id);

    let client;
    try {
        client = await pool.connect();
        if (!client) {
            return res.status(500).send("Connection Error");
        }

        // Ensure DOB is in the correct format (YYYY-MM-DD)
        const formattedDob = new Date(dob).toISOString().split('T')[0]; // Example conversion

        // Execute the stored procedure
        const result = await client.query(
            `SELECT register_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) AS user_id`,
            [username, password, name, formattedDob, email, city, street, house, phone, genres.join(','), login_id]
        );

        const userId = result.rows[0].user_id;  // Retrieve the USER_ID from the output
        console.log(`User registered with User ID: ${userId} and Login ID: ${login_id}`);

        // Commit the transaction
        await client.query('COMMIT');
        console.log("Transaction committed successfully.");

        // Respond with success
        res.status(201).json({
            message: `User registered successfully.`,
            userId: userId,
            loginId: login_id
        });

    } catch (err) {
        // Handle errors during the query execution
        console.error("Error during database operation: ", err);

        // Attempt to roll back the transaction if there is a failure
        if (client) {
            try {
                await client.query('ROLLBACK');
                console.log("Transaction rolled back due to error.");
            } catch (rollbackErr) {
                console.error("Error during transaction rollback: ", rollbackErr);
            }
        }

        // Send the error response with more details
        res.status(500).json({ message: "Internal Server Error. Unable to register user.", error: err.message });

    } finally {
        // Ensure the connection is closed
        if (client) {
            client.release();
            console.log("Database connection closed.");
        }
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ROUTE FOR MERCHANIDISER REGISTRATION
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/merchandiser', async (req, res) => {
    const { username, password, name, description, email, city, street, house, phone } = req.body;
    console.log('Received merchandiser registration request:', { username, password, name, description, email, city, street, house, phone });

    const login_id = generateLoginId(username, password);  // Generate login_id in Node.js
    console.log('Generated Login ID:', login_id);

    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        // Execute the stored procedure
        const result = await client.query(
            `SELECT register_merchandiser($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) AS merch_id`,
            [username, password, name, description, email, city, street, house, phone, login_id]
        );

        const merchId = result.rows[0].merch_id;  // Retrieve the MERCH_ID from the output
        console.log(`Merchandiser registered with Merch ID: ${merchId} and Login ID: ${login_id}`);

        // Commit the transaction
        await client.query('COMMIT');
        console.log("Transaction committed successfully.");

        // Send success response
        res.status(201).send("Merchandiser registered successfully");

    } catch (err) {
        console.error("Error during database query: ", err);

        // Attempt to roll back the transaction if there is a failure
        if (client) {
            try {
                await client.query('ROLLBACK');
                console.log("Transaction rolled back due to error.");
            } catch (rollbackErr) {
                console.error("Error during transaction rollback: ", rollbackErr);
            }
        }

        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
            console.log("Database connection closed.");
        }
    }
});





module.exports = router;