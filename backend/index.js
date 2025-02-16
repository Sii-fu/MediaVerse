const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON


app.use("/registration", require("./routes/common/registration"));
app.use("/login", require("./routes/common/login"));
app.use("/media/search", require("./routes/users/media/search"));
app.use("/media", require("./routes/users/media/media"));
app.use("/media/review", require("./routes/users/media/review"));



app.use("/user/common", require("./routes/users/common"));
app.use("/user/profile", require("./routes/users/profile"));
app.use("/user/companies", require("./routes/users/companies"));
app.use("/user/list/media", require("./routes/users/list/list"));
app.use("/user/discussions", require("./routes/users/discussion/discussion"));




app.use("/company", require("./routes/company/media/media"));
app.use("/company/profile", require("./routes/company/profile"));




app.use("/admin", require("./routes/admin/lists/stats"));
app.use("/admin/list", require("./routes/admin/list"));
app.use("/admin/profile", require("./routes/admin/profile"));




// Create a connection pool for PostgreSQL
const pool = new Pool({
    connectionString: 'postgres://postgres.zedlpacpxbakvsvhdbms:vYpVqLlOX4XArcLe@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: {
      rejectUnauthorized: false
    }
  });
// Test the connection pool

pool.connect()
  .then(client => {
    console.log('Connected to the PostgreSQL database');
    client.release(); // Release the connection back to the pool
  })
  .catch(err => console.error('Error connecting to the PostgreSQL database:', err)
);

  

// Start the server
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
















//     //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//     // ROUTE FOR ADD MEDIA
//     //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//     app.post('/addmedia', async (req, res) => {
//         const {
//             title,
//             description,
//             type,
//             selectedGenres,
//             trailer,
//             duration,
//             releaseDate,
//             episode,
//             roles,
//             imageUrl,
//             com_id
//         } = req.body;
    
//         console.log('Received add media request:', { title, description, type, selectedGenres, trailer, imageUrl, duration, releaseDate, episode, roles });
    
//         const rating = 0; // Default rating
    
//         let con;
//         try {
//             con = await pool.getConnection();
//             if (!con) {
//                 res.status(500).send("Connection Error");
//                 return;
//             }
    
//             // Fetch the next MEDIA_ID from the MEDIA_SEQ sequence
//             const mediaIdResult = await con.execute(`SELECT MEDIA_SEQ.NEXTVAL AS media_id FROM dual`);
//             const media_id = mediaIdResult.rows[0].MEDIA_ID;
    
//             console.log('Generated Media ID:', media_id);
    
//             // Insert media data into the database
//             const result = await con.execute(
//                 `INSERT INTO MEDIA (MEDIA_ID, TITLE, DESCRIPTION, RATING, RATING_COUNT, TYPE, GENRE, TRAILER, POSTER, DURATION, RELEASE_DATE, EPISODE)
//                 VALUES (:media_id, :title, :description, :rating, 0, :type, :genres, :trailer, :poster, :duration, TO_DATE(:releaseDate, 'YYYY-MM-DD'), :episode)`,
//                 {
//                     media_id,
//                     title,
//                     description,
//                     rating,
//                     type,
//                     genres: selectedGenres.join(', '), // Assuming genres are stored as comma-separated values
//                     trailer,
//                     poster: imageUrl,
//                     duration,
//                     releaseDate,
//                     episode
//                 }
//             );
    
//             console.log(`Media Insert Result: ${JSON.stringify(result)}`);
    
//             // Insert roles associated with the media into MEDIAHASROLE
//             for (const role of roles) {
//                 try {
//                     const roleResult = await con.execute(
//                         `INSERT INTO MEDIAHASROLE (ROLE_ID, MEDIA_ID)
//                         VALUES (:role_id, :media_id)`,
//                         {
//                             role_id: role.role_id,
//                             media_id
//                         }
//                     );
//                     console.log(`Role Insert Result for Role ID ${role.role_id}: ${JSON.stringify(roleResult)}`);
//                 } catch (roleErr) {
//                     console.error(`Error inserting role ID ${role.role_id}: `, roleErr);
//                     throw roleErr;
//                 }
//             }
    
//             // Insert media and company association into COMPANYHASMEDIA
//             const companyMediaResult = await con.execute(
//                 `INSERT INTO COMPANYHASMEDIA (MEDIA_ID, COM_ID)
//                 VALUES (:media_id, :com_id)`,
//                 {
//                     media_id,
//                     com_id
//                 }
//             );
//             console.log(`Company-Media Insert Result: ${JSON.stringify(companyMediaResult)}`);
    
//             // Commit the transaction
//             await con.commit();
    
//             res.status(201).send("Media added successfully");
//             console.log("Media added successfully");
//         } catch (err) {
//             console.error("Error during database query: ", err);
//             res.status(500).send("Internal Server Error");
//         } finally {
//             if (con) {
//                 try {
//                     await con.close();
//                 } catch (closeErr) {
//                     console.error("Error closing database connection: ", closeErr);
//                 }
//             }
//         }
//     });
    


// //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// // route for COMPANY ADD News
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
// app.post('/addNews', async (req, res) => {
//     const { mediaID, com_id, topic, description } = req.body;
    
//     if (!mediaID || !com_id || !topic || !description) {
//         res.status(400).send("Missing required fields");
//         return;
//     }

//     let con;
//     try {
//         con = await pool.getConnection();
//         if (!con) {
//             res.status(500).send("Connection Error");
//             return;
//         }

//         const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

//         // Insert news into NEWSANDUPDATES table, generating NEWS_ID using sequence
//         const newsResult = await con.execute(
//             `INSERT INTO NEWSANDUPDATES (NEWS_ID, DESCRIPTION, HEADLINE)
//              VALUES (NEWSANDUPDATES_SEQ.NEXTVAL, :description, :headline)`,
//             {
//                 description,
//                 headline: topic
//             }
//         );
//         console.log(`News Insert Result: ${JSON.stringify(newsResult)}`);

//         // Get the newly generated NEWS_ID
//         const newsIdResult = await con.execute(
//             `SELECT NEWSANDUPDATES_SEQ.CURRVAL AS news_id FROM dual`
//         );
//         const news_id = newsIdResult.rows[0].NEWS_ID;
//         console.log('Generated News ID:', news_id);

//         // Insert into COMPANYGIVENEWS table
//         await con.execute(
//             `INSERT INTO COMPANYGIVENEWS (NEWS_ID, COM_ID, NEWS_DATE)
//              VALUES (:news_id, :com_id, TO_DATE(:news_date, 'YYYY-MM-DD'))`,
//             {
//                 news_id,
//                 com_id,
//                 news_date: currentDate
//             }
//         );

//         // Insert into NEWSTOMEDIA table
//         await con.execute(
//             `INSERT INTO NEWSTOMEDIA (MEDIA_ID, NEWS_ID, NEWS_DATE)
//              VALUES (:media_id, :news_id, TO_DATE(:news_date, 'YYYY-MM-DD'))`,
//             {
//                 media_id: mediaID,
//                 news_id,
//                 news_date: currentDate
//             }
//         );

//         await con.commit();
//         res.status(201).send("News added successfully");
//         console.log("News added successfully");
//     } catch (err) {
//         console.error("Error during database query: ", err);
//         res.status(500).send("Internal Server Error");
//     } finally {
//         if (con) {
//             try {
//                 await con.close();
//             } catch (closeErr) {
//                 console.error("Error closing database connection: ", closeErr);
//             }
//         }
//     }
// });


//     //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//     // route for add role
//     //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//     app.post('/admin/addrole', async (req, res) => {
//         const {
//             name,
//             roleType,
//             img,
//             imgUrl
//         } = req.body;
    
//         console.log('Received add role request:', { name, roleType, img, imgUrl });
    
//         let con;
//         try {
//             con = await pool.getConnection();
//             if (!con) {
//                 res.status(500).send("Connection Error");
//                 return;
//             }
    
//             // Insert role data into the ROLE table with auto-generated ROLE_ID from ROLE_SEQ
//             const roleResult = await con.execute(
//                 `INSERT INTO ROLE (ROLE_ID, NAME, IMG, ROLE_TYPE)
//                  VALUES (ROLE_SEQ.NEXTVAL, :name, :imgUrl, :roleType)`,
//                 {
//                     name,
//                     imgUrl,
//                     roleType
//                 }
//             );
//             console.log(`Role Insert Result: ${JSON.stringify(roleResult)}`);
    
//             // Commit the transaction
//             await con.commit();
    
//             res.status(201).send("Role added successfully");
//             console.log("Role added successfully");
//         } catch (err) {
//             console.error("Error during database query: ", err);
//             res.status(500).send("Internal Server Error");
//         } finally {
//             if (con) {
//                 try {
//                     await con.close();
//                 } catch (closeErr) {
//                     console.error("Error closing database connection: ", closeErr);
//                 }
//             }
//         }
//     });
    


//     //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//     // route for fetch medias
//     //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

