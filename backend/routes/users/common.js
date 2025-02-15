const express = require("express");
const router = express.Router();

const pool = require('../db');


router.post('/notifications', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        res.status(400).send("Missing required fields");
        return;
    }

    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        const query = `
            SELECT
                NEWSANDUPDATES.NEWS_ID,
                NEWSANDUPDATES.HEADLINE,
                NEWSANDUPDATES.DESCRIPTION,
                NEWSTOMEDIA.NEWS_DATE,
                MEDIA.TITLE AS MEDIA_TITLE,
                MEDIA.MEDIA_ID AS MEDIA_ID,
                MEDIA.POSTER AS MEDIA_POSTER
            FROM
                NEWSANDUPDATES
            JOIN
                NEWSTOMEDIA ON NEWSANDUPDATES.NEWS_ID = NEWSTOMEDIA.NEWS_ID
            JOIN
                MEDIA ON NEWSTOMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
            WHERE
                NEWSTOMEDIA.MEDIA_ID IN (
                    SELECT MEDIA_ID
                    FROM USERWATCHANDFAVORITE
                    WHERE USER_ID = $1
                )
            ORDER BY
                NEWSTOMEDIA.NEWS_DATE DESC
        `;

        const result = await client.query(query, [user_id]);

        if (result.rows.length === 0) {
            res.status(404).send("No notifications found");
            return;
        }

        const notifications = result.rows.map(row => ({
            news_id: row.news_id,
            headline: row.headline,
            description: row.description,
            news_date: row.news_date,
            media_title: row.media_title,
            media_id: row.media_id,
            media_poster: row.media_poster
        }));
        console.log("Notifications sent");
        res.status(200).json(notifications);
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




// fixed featured content in home page
router.post('/media/featured1', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        const mediaIds = req.body.mediaIds; // Assuming mediaIds is an array of IDs sent in the request body

        if (!Array.isArray(mediaIds) || mediaIds.length === 0) {
            res.status(400).send("Invalid media IDs");  
            return;
        }

        console.log('Received media IDs:', mediaIds);

        // Create a SQL query to fetch media details for the given IDs
        const query = `
            SELECT *
            FROM MEDIA
            WHERE MEDIA_ID = ANY($1::uuid[])
        `;

        const result = await client.query(query, [mediaIds]);

        const transformData = (data) => ({
            id: data.media_id,
            title: data.title,
            description: data.description,
            rating: data.rating,
            ratingCount: data.rating_count,
            type: data.type,
            genre: data.genre,
            trailer: data.trailer,
            poster: data.poster, 
            duration: data.duration,
            releaseDate: new Date(data.release_date).toISOString().split('T')[0],
            episodes: data.episode || 0,
        });

        const transformedData = result.rows.map(transformData);

        res.send(transformedData);
        console.log("featured1 Data sent");
    } catch (err) {
        console.error("Error during database query:", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            try {
                client.release();
            } catch (err) {
                console.error("Error releasing database connection:", err);
            }
        }
    }
});




    router.get('/media/featured', async (req, res) => {
        let client;
        try {
            client = await pool.connect();
            if (!client) {
                res.status(500).send("Connection Error");
                return;
            }
            console.log('Received media request');
        
            const query = `
                SELECT MEDIA_ID, TITLE, IMG_SRC, DESCRIPTION
                FROM MEDIA_FEATURED
            `;
            const result = await client.query(query);
        
            const transformData = (data) => ({
                id: data.media_id,
                title: data.title,
                imgSrc: data.img_src,
                description: data.description
            });
        
            const transformedData = result.rows.map(transformData);
        
            res.send(transformedData);        
            console.log("featured Data sent");
            console.log(transformedData);


        } catch (err) {
            console.error("Error during database query:", err);
            res.status(500).send("Internal Server Error");
        } finally {
            if (client) {
                try {
                    client.release();
                } catch (err) {
                    console.error("Error releasing database connection:", err);
                }
            }
        }
    });




router.post('/media/foryou', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received recommendation request:', { user_id });
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            return res.status(500).send("Connection Error");
        }

        const query = `
            SELECT DISTINCT
                M.media_id, 
                M.title, 
                M.description, 
                M.rating, 
                M.rating_count, 
                M.type, 
                M.genre, 
                M.trailer, 
                M.poster, 
                M.duration, 
                M.release_date, 
                M.episode
            FROM 
                media M
            JOIN 
                preferredgenre P ON REGEXP_LIKE(M.genre, REPLACE(P.genres, ',', '|'))
            WHERE 
                P.user_id = $1
                AND NOT EXISTS (
                    SELECT 1 
                    FROM userwatchandfavorite uwf 
                    WHERE uwf.user_id = P.user_id 
                    AND uwf.media_id = M.media_id
                )
            ORDER BY 
                M.rating DESC;
        `;

        const result = await client.query(query, [user_id]);
        console.log(`Query Result: `);

        const transformData = (data) => {
            const releaseDate = new Date(data.release_date);
            const releaseDateStr = !isNaN(releaseDate) ? releaseDate.toISOString().split('T')[0] : null; // Only format if it's a valid date
        
            return {
                id: data.media_id,
                img: data.poster,
                title: data.title,
                description: data.description,
                rating: data.rating,
                releaseDate: releaseDateStr, // Use the formatted date or null
                type: data.type,
                episodes: data.episode || 0,
                duration: data.duration,
                genre: data.genre ? data.genre.split(',').map(g => g.trim()) : [], // Safely handle undefined GENRE
                companyName: 'Example Productions',
                role: [],
                news: [],
                review: []
            };
        };

        const List = result.rows.map(transformData);

        if (result.rows.length === 0) {
            return res.status(404).send("No recommendation found");
        }

        res.send(List);
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




router.post('/media/favRole', async (req, res) => {
    const { user_id } = req.body;
    console.log('Received FAV ROLE request:', { user_id });
    let client;

    try {
        client = await pool.connect();
        if (!client) {
            return res.status(500).send("Connection Error");
        }
        /* top 3 fav role from actor */
        const favrole = `
            SELECT *
            FROM ROLE 
            JOIN PREFERENCEFORROLE ON ROLE.ROLE_ID = PREFERENCEFORROLE.ROLE_ID
            WHERE PREFERENCEFORROLE.USER_ID = $1
        `;
        const result = await client.query(favrole, [user_id]);
        console.log(`Query Result: `);

        if (result.rows.length === 0) {
            return res.status(404).send("No recommendation found");
        }

        res.send(result.rows);
    }
    catch (err) {
        console.error("Error during database query: ", err);
        res.status(500).send("Internal Server Error");
    }
    finally {
        if (client) {
            try {
                client.release();
            } catch (err) {
                console.error("Error releasing database connection: ", err);
            }
        }
    }
});



router.post('/media/rolemedia', async (req, res) => {
    const { role_ids } = req.body;  // Expecting role_ids as an array
    console.log('Received ROLE recommendation request:', { role_ids });
    let client;

    try {
        client = await pool.connect();
        if (!client) {
            return res.status(500).send("Connection Error");
        }

        let List = [];

        // Loop through each role_id to fetch its details and media
        for (const role_id of role_ids) {
            // Fetch role details for current role_id
            const roleDetailQuery = await client.query(
                `SELECT * 
                FROM ROLE
                WHERE ROLE_ID = $1`,
                [role_id]
            );

            // Fetch media details associated with the current role_id
            const mediaQuery = await client.query(
                `SELECT * 
                FROM MEDIA
                JOIN MEDIAHASROLE ON MEDIA.MEDIA_ID = MEDIAHASROLE.MEDIA_ID
                WHERE ROLE_ID = $1`,
                [role_id]
            );

            const roleDetail = roleDetailQuery.rows[0];

            const mediaByRoleId = mediaQuery.rows.map((media) => ({
                id: media.media_id,
                title: media.title,
                description: media.description,
                rating: media.rating,
                ratingCount: media.rating_count,
                type: media.type,
                genre: media.genre,
                trailer: media.trailer,
                img: media.poster,
                duration: media.duration,
                releaseDate: media.release_date,
                episodes: media.episode || 0
            }));
            
            // Push the role and its media to the final list
            List.push({
                image: roleDetail.img,
                name: roleDetail.name,
                movies: mediaByRoleId
            });
            
        }

        // Log the final result
        console.log(`roleMedia Result: `);

        if (List.length === 0) {
            return res.status(404).send("No recommendation found");
        }

        res.send(List);
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


// ROUTE FOR USER HOME NEWS

// Backend route
router.get('/home/news', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        if (!client) {
            res.status(500).send("Connection Error");
            return;
        }

        // Fetch latest news with associated media and poster
        const newsQuery = `
            SELECT MEDIA.MEDIA_ID, MEDIA.TITLE, MEDIA.POSTER, NEWSANDUPDATES.NEWS_ID, 
                   NEWSANDUPDATES.DESCRIPTION, NEWSANDUPDATES.HEADLINE, 
                   NEWSTOMEDIA.NEWS_DATE
            FROM NEWSANDUPDATES
            JOIN NEWSTOMEDIA ON NEWSANDUPDATES.NEWS_ID = NEWSTOMEDIA.NEWS_ID
            JOIN MEDIA ON NEWSTOMEDIA.MEDIA_ID = MEDIA.MEDIA_ID
            ORDER BY NEWSTOMEDIA.NEWS_DATE DESC`;

        const newsResult = await client.query(newsQuery);

        // Assume top 2 news for left section, next 6 for right section
        const topNews = newsResult.rows.slice(0, 2);  // Top 2 news for the left side
        const latestNews = newsResult.rows.slice(2, 8); // Next 6 news for the right side

        res.send({
            topNews,
            latestNews
        });

    } catch (err) {
        console.error("Error fetching news: ", err);
        res.status(500).send("Internal Server Error");
    } finally {
        if (client) {
            try {
                client.release();
            } catch (err) {
                console.error("Error releasing connection: ", err);
            }
        }
    }
});



module.exports = router;
