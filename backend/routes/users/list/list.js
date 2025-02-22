

const express = require("express");
const router = express.Router();

const pool = require('../../db');



router.post('/planToWatch', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received plan to watch request:', { user_id });
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM MEDIA , companyhasmedia
            WHERE companyhasmedia.media_id=media.media_id and
             media.MEDIA_ID IN (
                SELECT MEDIA_ID FROM USERWATCHANDFAVORITE 
                WHERE USER_ID = $1
                AND STATUS = 'PLAN_TO_WATCH'
            )`,
            [user_id]
        );
        res.send(result.rows);
        console.log("Plan to Watch Data sent");
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});

router.post('/planToWatch/delete', async (req, res) => {
    const { user_id, media_id } = req.body;
    console.log('Received delete request for plan to watch:', { user_id, media_id });
    let client;
    try {
        client = await pool.connect();
        const checkResult = await client.query(
            `SELECT * FROM USERWATCHANDFAVORITE 
            WHERE USER_ID = $1
            AND MEDIA_ID = $2`,
            [user_id, media_id]
        );

        if (checkResult.rows.length === 0) {
            res.status(404).send("Record not found or already deleted");
        } else {
            const result = await client.query(
                `DELETE FROM USERWATCHANDFAVORITE
                WHERE USER_ID = $1 AND MEDIA_ID = $2 AND STATUS = 'PLAN_TO_WATCH'`,
                [user_id, media_id]
            );
            res.send("Deleted successfully");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});





router.post('/watched', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received WATCHED request:', { user_id });
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM MEDIA , companyhasmedia
            WHERE companyhasmedia.media_id=media.media_id and
             media.MEDIA_ID IN (
                SELECT MEDIA_ID FROM USERWATCHANDFAVORITE 
                WHERE USER_ID = $1
                AND STATUS = 'WATCHED'
            )`,
            [user_id]
        );
        res.send(result.rows);
        console.log("Watched Data sent");
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});

router.post('/watched/delete', async (req, res) => {
    const { user_id, media_id } = req.body;
    console.log('Received delete request for watched:', { user_id, media_id });
    let client;
    try {
        client = await pool.connect();
        const checkResult = await client.query(
            `SELECT * FROM USERWATCHANDFAVORITE 
            WHERE USER_ID = $1
            AND MEDIA_ID = $2`,
            [user_id, media_id]
        );

        if (checkResult.rows.length === 0) {
            res.status(404).send("Record not found or already deleted");
        } else {
            const result = await client.query(
                `DELETE FROM USERWATCHANDFAVORITE
                WHERE USER_ID = $1 AND MEDIA_ID = $2 AND STATUS = 'WATCHED'`,
                [user_id, media_id]
            );
            res.send("Deleted successfully");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});

router.post('/mylist/add', async (req, res) => {
    let { user_id, media_id, status } = req.body;
    console.log('Received add to plan to watch request:', { user_id, media_id, status });
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        const checkResult = await client.query(
            `SELECT * FROM USERWATCHANDFAVORITE 
            WHERE USER_ID = $1
            AND MEDIA_ID = $2`,
            [user_id, media_id]
        );

        if (checkResult.rows.length === 0) {
            const result = await client.query(
                `INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, STATUS)
                VALUES ($1, $2, $3)`,
                [user_id, media_id, status]
            );
            console.log(`Query Result: `, result);
            res.send("Media added to list successfully");
        } else {
            const result = await client.query(
                `UPDATE USERWATCHANDFAVORITE 
                SET STATUS = $3
                WHERE USER_ID = $1
                AND MEDIA_ID = $2`,
                [user_id, media_id, status]
            );
            console.log(`Query Result: `, result);
            res.send("Media added to list successfully");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});
    



router.post('/favorite', async (req, res) => {
    const { user_id, media_id, is_favorite } = req.body;
    console.log('Received favorite request:', { user_id, media_id, is_favorite });
    let client;
    try {
        client = await pool.connect();
        let status = is_favorite ? 'Y' : 'N';
        
        const checkResult = await client.query(
            `SELECT * FROM USERWATCHANDFAVORITE 
            WHERE USER_ID = $1
            AND MEDIA_ID = $2`,
            [user_id, media_id]
        );

        if (checkResult.rows.length === 0) {
            await client.query(
                `INSERT INTO USERWATCHANDFAVORITE (USER_ID, MEDIA_ID, FAVORITE)
                VALUES ($1, $2, $3)`,
                [user_id, media_id, status]
            );
            res.send("Favorite status updated successfully");
        } else {
            await client.query(
                `UPDATE USERWATCHANDFAVORITE 
                SET FAVORITE = $3
                WHERE USER_ID = $1
                AND MEDIA_ID = $2`,
                [user_id, media_id, status]
            );
            res.send("Favorite status updated successfully");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});

router.post('/favorite/mylist', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received favorite request:', { user_id });
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM MEDIA, companyhasmedia
            WHERE companyhasmedia.media_id=media.media_id and
             media.MEDIA_ID IN (    
                SELECT MEDIA_ID FROM USERWATCHANDFAVORITE
                WHERE USER_ID = $1
                AND FAVORITE = 'Y'
            )`,
            [user_id]
        );
        res.send(result.rows);
        console.log("Favorite Data sent");
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});





router.post('/favorite/delete', async (req, res) => {
    const { user_id, media_id } = req.body;
    console.log('Received delete request for favorite:', { user_id, media_id });
    let client;
    try {
        client = await pool.connect();
        const checkResult = await client.query(
            `SELECT * FROM USERWATCHANDFAVORITE 
            WHERE USER_ID = $1
            AND MEDIA_ID = $2`,
            [user_id, media_id]
        );

        if (checkResult.rows.length === 0) {
            res.status(404).send("Record not found or already deleted");
        } else {
            const result = await client.query(
                `DELETE FROM USERWATCHANDFAVORITE
                WHERE USER_ID = $1 AND MEDIA_ID = $2`,
                [user_id, media_id]
            );
            res.send("Deleted successfully");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});





router.post('/favorite/roles', async (req, res) => {
    const { user_id } = req.body;
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }
        console.log('Received roles request');
        const result = await client.query(
            `SELECT ROLE.ROLE_ID, ROLE.NAME, ROLE.IMG, ROLE.ROLE_TYPE 
            FROM ROLE 
            JOIN PREFERENCEFORROLE
            ON ROLE.ROLE_ID = PREFERENCEFORROLE.ROLE_ID
            WHERE PREFERENCEFORROLE.USER_ID = $1
            ORDER BY ROLE.NAME ASC`,
            [user_id]
        );
        res.send(result.rows);
        console.log("----------Roles Data sent");
        console.log(result.rows);
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});




router.post('/favorite/roles/delete', async (req, res) => {
    const { user_id, role_id } = req.body;
    console.log('Received delete request for role:', { user_id, role_id });
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        const checkResult = await client.query(
            `SELECT * FROM PREFERENCEFORROLE
            WHERE USER_ID = $1
            AND ROLE_ID = $2`,
            [user_id, role_id]
        );

        console.log(`Query Result: `);

        if (checkResult.rows.length === 0) {
            res.status(404).send("Record not found or already deleted");
        } else {
            const result = await client.query(
                `DELETE FROM PREFERENCEFORROLE
                WHERE USER_ID = $1
                AND ROLE_ID = $2`,
                [user_id, role_id]
            );
            console.log(`Query Result: `);
            res.send("Deleted successfully");
            console.log("Deleted successfully");
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});




router.post('/favorite/role', async (req, res) => {
    const { user_id, role_id, is_favorite } = req.body;
    console.log('Received favorite request:', { user_id, role_id, is_favorite });
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        let status = is_favorite ? 'Y' : 'N';
        if (status === 'Y') {
            const result = await client.query(
                `INSERT INTO PREFERENCEFORROLE (USER_ID, ROLE_ID)
                VALUES ($1, $2)`,
                [user_id, role_id]
            );
            console.log(`Query Result: `, result);
            res.send("Role added to favorite successfully");
        } else {
            const result = await client.query(
                `DELETE FROM PREFERENCEFORROLE
                WHERE USER_ID = $1
                AND ROLE_ID = $2`,
                [user_id, role_id]
            );
            res.send("Role removed from favorite successfully");
        }
        console.log("Favorite status updated successfully");
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});





router.post('/favorite/role/status', async (req, res) => {
    const { user_id, role_id } = req.body;
    console.log('------------\nReceived favorite status request:', { user_id, role_id });
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        const result = await client.query(
            `SELECT * FROM PREFERENCEFORROLE
            WHERE USER_ID = $1
            AND ROLE_ID = $2`,
            [user_id, role_id]
        );
        console.log("-----------Favorite Status Data of Role sent");

        if (result.rows.length === 0) {
            res.status(404).send("Not favorite");
        } else {
            res.status(200).send("Favorite");
        }

    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});






router.post('/favorite/status', async (req, res) => {
    const { user_id, media_id } = req.body;
    console.log('Received favorite status request:', { user_id, media_id });
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(
            `SELECT FAVORITE FROM USERWATCHANDFAVORITE
            WHERE USER_ID = $1
            AND MEDIA_ID = $2`,
            [user_id, media_id]
        );
        if (result.rows.length === 0) {
            res.status(404).send("Not found");
        } else {
            if (result.rows[0].favorite === 'Y') {
                res.status(200).send("Favorite");
            } else {
                res.status(404).send("Not favorite");
            }
        }
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            client.release();
        }
    }
});








module.exports = router;