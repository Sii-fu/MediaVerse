const express = require("express");
const router = express.Router();
const path = require("path");
const { exec } = require("child_process");

// Get trending 10 songs
router.get("/trending/songs", (req, res) => {
    const scriptPath = path.join(__dirname, "..", "..", "DB", "spotify_api", "trending.py");

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
            console.error(`Error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});

// Get most streamed songs
router.get("/moststm", (req, res) => {
    const scriptPath = path.join(__dirname, "..", "..", "DB", "spotify_api", "mostStreamed.py");

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

// Get new releases
router.get("/newrelease", (req, res) => {
    const scriptPath = path.join(__dirname, "..", "..", "DB", "spotify_api", "newrelease.py");

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
    if (!musicId) return res.status(400).send("Music ID is required");

    const scriptPath = path.join(__dirname, "..", "..", "DB", "spotify_api", "music_page.py");

    exec(`python "${scriptPath}" "${musicId}"`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) console.error(`stderr: ${stderr}`);

        try {
            const pythonData = JSON.parse(stdout);
            res.json(pythonData);
            console.log("Music details fetched successfully");
        } catch (err) {
            console.error(`Error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});

// Get artist details by ID
router.post("/artist/page", async (req, res) => {
    const artistId = req.body.artist_id;
    if (!artistId) return res.status(400).send("Artist ID is required");

    const scriptPath = path.join(__dirname, "..", "..", "DB", "spotify_api", "artist_songs.py");

    exec(`python "${scriptPath}" "${artistId}"`, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send("Error running Python script");
        }
        if (stderr) console.error(`stderr: ${stderr}`);

        try {
            const pythonData = JSON.parse(stdout);
            res.json(pythonData);
            console.log("Artist details fetched successfully");
        } catch (err) {
            console.error(`Error: ${err.message}`);
            res.status(500).send("Failed to parse data");
        }
    });
});

module.exports = router;
