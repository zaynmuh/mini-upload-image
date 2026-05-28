const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./database");

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  const imageUrl = `/uploads/${req.file.filename}`;
  const caption = req.body.caption;
  const createdAt = new Date().toISOString();

  const query = `
    INSERT INTO posts (image_url, caption, created_at)
    VALUES (?, ?, ?)
  `;

  db.run(query, [imageUrl, caption, createdAt], function (err) {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      id: this.lastID,
      imageUrl,
      caption,
      createdAt,
    });
  });
});

// Get all uploaded images

app.get("/images", (req, res) => {
  const query = `
    SELECT * FROM posts
    ORDER BY id DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    const formattedPosts = rows.map((row) => ({
      id: row.id,
      imageUrl: row.image_url,
      caption: row.caption,
      createdAt: row.created_at,
    }));

    res.json(formattedPosts);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});