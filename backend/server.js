const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Upload route
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    message: "Image uploaded successfully",
    imageUrl: `/uploads/${req.file.filename}`,
  });
});

// Get all uploaded images
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});