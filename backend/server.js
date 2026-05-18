const fs = require("fs");
const express = require("express");
const multer = require("multer")
const path = require("path");

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Homepage route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Get /image API
app.get("/images", (req, res) => {
  const uploadsPath = path.join(__dirname, "uploads");

  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to load images",
      });
    }

    const imageUrls = files.map((file) => `/uploads/${file}`);

    res.json(imageUrls);
  });
});