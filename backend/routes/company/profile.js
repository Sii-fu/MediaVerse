const express = require("express");
const router = express.Router();

const pool = require('../db');




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for COMPANY PROFILE
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


router.post('/', async (req, res) => {
    const { userid } = req.body;
    console.log('Received company profile request:', { userid });
    
    let client;
    try {
        client = await pool.connect();
        if (!client) {
        res.status(500).send("Connection Error");
        return;
        }
    
        // Execute the query
        const result = await client.query(
        `SELECT * FROM COMPANY WHERE COM_ID = $1`,
        [userid] // Use $1 to parameterize the query
        );
    
        console.log(`Query Result: `);
    
        if (result.rows.length > 0) {
        res.send(result.rows[0]); // Send the first row as the company data
        console.log("Company Data sent");
        } else {
        res.status(404).send("Company not found");
        }
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
        client.release(); // Release the client back to the pool
        }
    }
    });



module.exports = router;
