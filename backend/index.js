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
app.use("/user/music", require("./routes/users/music/music"));
app.use("/user/music/review", require("./routes/users/music/review"));



app.use("/company", require("./routes/company/media/media"));
app.use("/company/profile", require("./routes/company/profile"));
app.use("/company/review", require("./routes/company/review/review"));
app.use("/company/mediaform", require("./routes/company/addmedia/mediaform"));




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


app.post('/activity', async (req, res) => {
    const { user_id,com_id,action_type,media_id,meta_data } = req.body;
    console.log('Received activity request:', { user_id,com_id,action_type,media_id,meta_data });
    let client;
    try {
      await pool.query(
        `INSERT INTO activity_log (user_id, com_id, action_type, media_id, metadata)
         VALUES ($1, $2, $3, $4, $5)`,
        [user_id, com_id, action_type, media_id, meta_data]
    );
    res.status(201).send("Activity logged successfully");
    console.log("Activity logged successfully");
  } catch (err) {
    console.error("Error during database query: ", err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (client) {
      client.release();
    }
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});















function generateMediaId(title) {
    //will generate a media id based on the title and time
    return Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}

function generateProductId(title) {
    //will generate a media id based on the title and time
    return Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}


function generateDiscussionId(topic) {
    //will generate a discussion id based on the topic and time
    return Math.abs(topic.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + Date.now()) % 10000;
}


//     //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//     // route for fetch medias
//     //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//     app.get('/medias', async (req, res) => {
//         let con;
//         try {
//             con = await pool.getConnection();
//             if (!con) {
//                 res.status(500).send("Connection Error");
//                 return;
//             }
//             console.log('Received Media request');
//             const result = await con.execute(
//                 `SELECT * FROM MEDIA`
//             );
//             console.log(`Query Result: `,result.rows);

            

//             res.send(result.rows);
//             console.log("MEDIA Data sent");
//         } catch (err) {
//             console.error("Error during database query: ", err);
//             res.status(500).send("Internal Server Error");
//         } finally {
//             if (con) {
//                 try {
//                     await con.close();
//                 } catch (err) {
//                     console.error("Error closing database connection: ", err);
//                 }
//             }
//         }
//     });
    









