const express = require("express");
const router = express.Router();

const pool = require('../db');


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ROUTE FOR ADMIN'S USERLIST 
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/userlist', async (req, res) => {
    let con;
    try {
        con = await pool.connect();
        console.log('Received userlist request');
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const result = await con.query(
            `SELECT * FROM USERS`
        );

        const transformData = (data) => {
            return {
                USER_ID: data.user_id,
                USER_NAME: data.user_name,
                NAME: data.name,
                DOB: data.dob,
                EMAIL: data.email,
                CITY: data.city,
                STREET: data.street,
                HOUSE: data.house,
                PHONE: data.phone
            };
        };

        const transformedData = result.rows.map(transformData);

        res.send(transformedData);
        // console.log("Search Data sent:", transformedData);
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (con) {
            try {
                con.release();
            } catch (err) {
                console.error("Error releasing database connection: ", err);
            }
        }
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ROUTE FOR ADMIN'S COMPANYLIST 
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/companylist', async (req, res) => {
    let con;
    try {
        con = await pool.connect();
        console.log('Received companylist request');
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const result = await con.query(
            `SELECT * FROM COMPANY`
        );

        const transformData = (data) => {
            return {
                COM_ID: data.com_id,
                USER_NAME: data.user_name,
                NAME: data.name,
                IMG: data.img,
                DESCRIPTION: data.description,
                EMAIL: data.email
            };
        };

        const transformedData = result.rows.map(transformData);

        res.send(transformedData);
        // console.log("Search Data sent:", transformedData);
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (con) {
            try {
                con.release();
            } catch (err) {
                console.error("Error releasing database connection: ", err);
            }
        }
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for fetch all Role
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/roles', async (req, res) => {
    let con;
    try {
        con = await pool.connect();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }
        console.log('Received Role request');
        const result = await con.query(
            `SELECT * FROM ROLE`
        );
        // console.log(`Query Result: `, result.rows);

        res.send(result.rows);
        console.log("ROLE Data sent");
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (con) {
            try {
                con.release();
            } catch (err) {
                console.error("Error releasing database connection: ", err);
            }
        }
    }
});


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// route for fetch add Role
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


router.post('/addrole', async (req, res) => {
    const { name, roleType, imgUrl } = req.body;

    console.log('Received add role request:', { name, roleType, imgUrl });

    let con;
    try {
        con = await pool.connect();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        // Generate a random integer ID between 100000 and 999999
        const randomRoleId = Math.floor(100000 + Math.random() * 900000);

        // Insert role data into the ROLE table
        const roleResult = await con.query(
            `INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE)
             VALUES ($1, $2, $3, $4)`,
            [randomRoleId, name, imgUrl, roleType]
        );

        console.log(`Role Insert Result: ${JSON.stringify(roleResult)}`);

        // Commit the transaction
        await con.query('COMMIT');

        res.status(201).send("Role added successfully");
        console.log("Role added successfully");
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (con) {
            con.release(); // Release the connection back to the pool
        }
    }
});




module.exports = router;
