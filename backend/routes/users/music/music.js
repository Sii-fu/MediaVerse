const express = require("express");
const router = express.Router();

const pool = require('../../db');
const axios = require('axios');
const { exec } = require("child_process");

// Get trending 10 songs
router.get("/trending/songs", (req, res) => {
    const scriptPath = path.join(__dirname, "../../../", "DB", "spotify_api", "trending.py");

    exec(`python "${scriptPath}"`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) console.error(`stderr: ${stderr}`);

        try {
            const pythonData = JSON.parse(stdout);
            res.json(pythonData);
            console.log("Trending songs fetched successfully");
        } catch (err) {
            console.log(`error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});

// Get most streamed songs
router.get("/moststm", (req, res) => {
    const scriptPath = path.join(__dirname, "../../../", "DB", "spotify_api", "mostStreamed.py");

    exec(`python "${scriptPath}"`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) console.error(`stderr: ${stderr}`);

        try {
            const pythonData = JSON.parse(stdout);
            res.json(pythonData);
            console.log("Most streamed songs fetched successfully");
        } catch (err) {
            console.error(`Error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});




router.get("/newrelease", (req, res) => {
    const scriptPath = path.join(__dirname, "../../../", "DB", "spotify_api", "newrelease.py");

    exec(`python "${scriptPath}"`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) console.error(`stderr: ${stderr}`);

        try {
            const pythonData = JSON.parse(stdout);
            res.json(pythonData);
            console.log("New releases fetched successfully");
        } catch (err) {
            console.error(`Error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});

// Get music details by ID
router.post("/page", async (req, res) => {
    const musicId = req.body.music_id;
    if (!musicId) {
        return res.status(400).send("Music ID is required");
    }

    const scriptPath = path.join(__dirname, "../../../", "DB", "spotify_api", "music_page.py");

    exec(`python "${scriptPath}" "${musicId}"`, async (error, stdout, stderr) => {
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

    const scriptPath = path.join(__dirname, "../../../", "DB", "spotify_api", "artist_songs.py");

    exec(`python "${scriptPath}" "${artistId}"`, async (error, stdout, stderr) => {
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