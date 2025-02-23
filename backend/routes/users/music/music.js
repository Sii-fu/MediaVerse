const express = require("express");
const router = express.Router();

const pool = require('../../db');
const axios = require('axios');
const { exec } = require("child_process");

// Get trending 10 songs
router.get("/trending/songs", (req, res) => {
    exec("python c:/Users/ACER/Documents/Media-and-Merchandising-Platform/backend/DB/spotify_api/trending.py", async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        try {
            const pythonData = JSON.parse(stdout);
            // const result = await pool.query("SELECT * FROM songs ORDER BY id DESC LIMIT 10");
            res.json(pythonData);
            console.log("Trending songs fetched successfully");
            console.log(pythonData.json);
        } catch (err) {
            console.log(`error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});

router.get("/moststm", (req, res) => {
    exec("python c:/Users/ACER/Documents/Media-and-Merchandising-Platform/backend/DB/spotify_api/mostStreamed.py", async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        try {
            const pythonData = JSON.parse(stdout);
            // const result = await pool.query("SELECT * FROM songs ORDER BY id DESC LIMIT 10");
            res.json(pythonData);
            console.log("Trending songs fetched successfully");
            console.log(pythonData.json);
        } catch (err) {
            console.log(`error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});




router.get("/newrelease", (req, res) => {
    exec("python c:/Users/ACER/Documents/Media-and-Merchandising-Platform/backend/DB/spotify_api/newrelease.py", async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        try {
            const pythonData = JSON.parse(stdout);
            res.json(pythonData);
            console.log("Trending songs fetched successfully");
            console.log(pythonData.top_songs_from_artist);
        } catch (err) {
            console.log(`error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});

// get music details

router.post("/page", async (req, res) => {
    const musicId = req.body.music_id;
    if (!musicId) {
        return res.status(400).send("Music ID is required");
    }

    exec(`python c:/Users/ACER/Documents/Media-and-Merchandising-Platform/backend/DB/spotify_api/music_page.py ${musicId}`, async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        try {
            const pythonData = JSON.parse(stdout);
            res.json(pythonData);
            console.log("Music songs fetched successfully");
            console.log(pythonData.top_songs_from_artist);
        } catch (err) {
            console.log(`error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});

router.post("/artist/page", async (req, res) => {
    const artistId = req.body.artist_id;
    if (!artistId) {
        return res.status(400).send("Artist ID is required");
    }

    exec(`python c:/Users/ACER/Documents/Media-and-Merchandising-Platform/backend/DB/spotify_api/artist_songs.py ${artistId}`, async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        try {
            const pythonData = JSON.parse(stdout);
            res.json(pythonData);
            console.log("Trending songs fetched successfully");
            console.log(pythonData.top_songs_from_artist);
        } catch (err) {
            console.log(`error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});



module.exports = router;