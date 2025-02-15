
const express = require("express");
const router = express.Router();

const pool = require('../db');




router.get('/', async (req, res) => {
    let client;
    try {
        client = await pool.connect(); // Use client.connect() to connect to the database
        console.log('Received company request');
        
        const result = await client.query(
            `SELECT 
                C.COM_ID, C.USER_NAME, C.NAME, C.IMG, C.DESCRIPTION, C.EMAIL, 
                COUNT(CHM.MEDIA_ID) AS MEDIA_COUNT
            FROM 
                COMPANY C
            JOIN 
                COMPANYHASMEDIA CHM ON C.COM_ID = CHM.COM_ID
            GROUP BY 
                C.COM_ID, C.USER_NAME, C.NAME, C.IMG, C.DESCRIPTION, C.EMAIL
            ORDER BY 
                MEDIA_COUNT DESC limit 30`
        );

        // console.log('Query Result:', result.rows);

        res.send(result.rows); // Send the company data as the response
        console.log('Company Data sent');
    } catch (err) {
        console.error('Error during database query:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        if (client) {
            try {
                client.release(); // Release the client back to the pool
            } catch (err) {
                console.error('Error releasing client:', err);
            }
        }
    }
});

router.post('/page', async (req, res) => {
    const { companyID } = req.body;
    console.log('Received company request:', companyID);
    
    let client;
    try {
        client = await pool.connect();
        console.log('Connected to database');
        
        const companyQuery = 'SELECT * FROM COMPANY WHERE COM_ID = $1';
        const companyResult = await client.query(companyQuery, [companyID]);
        
        const newsQuery = `
            SELECT MEDIA_TITLE, NEWS_ID, DESCRIPTION, HEADLINE, NEWS_DATE 
            FROM COMPANY_NEWS_DETAILS 
            WHERE COM_ID = $1
        `;
        const newsResult = await client.query(newsQuery, [companyID]);
        
        if (!companyResult.rows.length) {
            res.status(404).send("Company not found");
            return;
        }

        const companyData = companyResult.rows[0];
        companyData.news = newsResult.rows;
        
        res.send(companyData);
        console.log("Company Data sent", companyData);
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            try {
                client.release();
            } catch (err) {
                console.error("Error releasing database connection: ", err);
            }
        }
    }
});

router.post('/medias', async (req, res) => {
    const { com_id } = req.body;
    console.log('Received company details page media request:', { com_id });
    let client;
    try {
        client = await pool.connect();
        

        const result = await client.query(
            `SELECT *
            FROM MEDIA
            JOIN COMPANYHASMEDIA ON MEDIA.MEDIA_ID = COMPANYHASMEDIA.MEDIA_ID
            WHERE COMPANYHASMEDIA.COM_ID = $1
            ORDER BY MEDIA.RELEASE_DATE DESC`,
            [com_id]
        );

        console.log(`Query Result: `, result.rows);

        if (result.rows.length === 0) {
            return res.status(404).send("No media found for the specified company");
        }

        const transformData = (data) => {
            return {
                id: data.MEDIA_ID,
                img: data.POSTER,
                title: data.TITLE,
                description: data.DESCRIPTION,
                rating: data.RATING / 2, // Assuming the original rating is out of 10 and the new one is out of 5
                releaseDate: new Date(data.RELEASE_DATE).toISOString().split('T')[0],
                type: data.TYPE.charAt(0).toUpperCase() + data.TYPE.slice(1).toLowerCase(),
                episodes: data.EPISODE || 0,
                duration: data.DURATION,
                genre: data.GENRE.split(',').map(g => g.trim()),
                companyName: 'Example Productions',
                role: [],
                news: [],
                review: []
            };
        };
        const mediaList = result.rows.map(transformData);
        res.send(mediaList);
    } catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            try {
                client.release();
            } catch (err) {
                console.error("Error releasing database connection: ", err);
            }
        }
    }
});


//route for COMPANY MY MEDIA

router.post('/mymedia', async (req, res) => {
    const { com_id } = req.body;

    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        // Get all media IDs for the given company ID
        const mediaIdsResult = await client.query(
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

        const result = await client.query(mediaQuery, [mediaIds]);

        // Optional: Process and map the result rows to a specific structure
        // const mediaList = result.rows.map(data => ({
        //     id: data.media_id,
        //     img: data.poster,
        //     title: data.title,
        //     description: data.description,
        //     companyName: data.company_name
        // }));

        res.send(result.rows);
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
