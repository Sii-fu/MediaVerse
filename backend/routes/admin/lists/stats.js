
const express = require("express");
const router = express.Router();

const pool = require('../../db');


router.post('/user-stats', async (req, res) => {
    console.log('Received user stats request');
    let con;
    try {
        con = await pool.connect();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const userStatsQuery = `
            SELECT 'User' AS name, COUNT(*) AS count FROM USERS
            UNION ALL
            SELECT 'Company' AS name, COUNT(*) AS count FROM COMPANY
        `;

        const userPieStatsQuery = `
            SELECT 'TotalUsers' AS name, 
                    (SELECT COUNT(*) FROM USERS) + 
                    (SELECT COUNT(*) FROM COMPANY) AS value
            UNION ALL
            SELECT 'Users' AS name, COUNT(*) AS value FROM USERS
            UNION ALL
            SELECT 'Companies' AS name, COUNT(*) AS value FROM COMPANY
        `;
        const userStats = await con.query(userStatsQuery);
        const userPieStats = await con.query(userPieStatsQuery);

        res.json({ bar: userStats.rows, pie: userPieStats.rows });
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

router.post('/media-stats', async (req, res) => {
    console.log('Received media stats request');
    let con;
    try {
        con = await pool.connect();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const mediaStats = await con.query(`
            SELECT 'Media' AS name, COUNT(*) AS count FROM MEDIA
            UNION ALL
            SELECT 'Roles' AS name, COUNT(*) AS count FROM ROLE
        `);

        res.json(mediaStats.rows);
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

router.post('/genre-stats', async (req, res) => {
    console.log('Received genre stats request');
    let con;
    try {
        con = await pool.connect();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const result = await con.query(`
            SELECT GENRE
            FROM MEDIA
        `);


        if (!result || !Array.isArray(result.rows)) {
            throw new Error('Invalid result format or empty result');
        }

        const genreCounts = {};
        result.rows.forEach(row => {
            if (row.genre) {
                const genres = row.genre.split(',').map(genre => genre.trim());
                genres.forEach(genre => {
                    if (genre) {
                        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                    }
                });
            }
        });

        const genreStats = Object.entries(genreCounts).map(([genre, count]) => ({
            genre,
            count
        }));

        res.json(genreStats);
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

router.post('/type-stats', async (req, res) => {
    console.log('Received type stats request');
    let con;
    try {
        con = await pool.connect();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const typeStats = await con.query(`
            SELECT TYPE AS type, COUNT(*) AS count
            FROM MEDIA
            GROUP BY TYPE
        `);
        
        res.json(typeStats.rows);
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

router.post('/role-stats', async (req, res) => {
    console.log('Received role stats request');
    let con;
    try {
        con = await pool.connect();
        if (!con) {
            res.status(500).send("Connection Error");
            return;
        }

        const roleStats = await con.query(`
            SELECT ROLE_TYPE AS role, COUNT(*) AS count
            FROM ROLE
            GROUP BY ROLE_TYPE
        `);
        // console.log(roleStats.rows);
        res.json(roleStats.rows);
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


module.exports = router;