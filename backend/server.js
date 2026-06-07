const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

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
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    const caption = req.body.caption;
    const createdAt = new Date().toISOString();

    const query = db.prepare(`
      INSERT INTO posts (image_url, caption, created_at)
      VALUES (?, ?, ?)
    `);

    const result = query.run(imageUrl, caption, createdAt);

    res.json({
      id: result.lastInsertRowid,
      imageUrl,
      caption,
      createdAt,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Get all uploaded images
app.get("/images", (req, res) => {
  try {
    const query = db.prepare(`
      SELECT * FROM posts
      ORDER BY id DESC
    `);

    const rows = query.all();

    const formattedPosts = rows.map((row) => ({
      id: row.id,
      imageUrl: row.image_url,
      caption: row.caption,
      likes: row.likes,
      createdAt: row.created_at,
    }));

    res.json(formattedPosts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// like API
app.post("/like/:id", (req, res) => {
  const postId = req.params.id;

  const query = db.prepare(`
    UPDATE posts
    SET likes = likes + 1
    WHERE id = ?
  `);

  query.run(postId);

  res.json({
    success: true,
  });
});

// delete post
app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;

  try {
    const query = db.prepare(`
      DELETE FROM posts
      WHERE id = ?
    `);

    query.run(postId);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete post",
    });
  }
});

// update post
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { caption } = req.body;

  if (!caption) {
  return res.status(400).json({
    error: "Caption is required",
  });
}

  try {
    const query = db.prepare(`
      UPDATE posts
      SET caption = ?
      WHERE id = ?
    `);

    query.run(caption, id);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update post",
    });
  }
});