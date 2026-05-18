const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = 3000;

const posts = [];

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
  const newPost = {
    imageUrl: `/uploads/${req.file.filename}`,
    caption: req.body.caption,
    createdAt: new Date(),
  };

  posts.push(newPost);

  res.json(newPost);
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

    app.get("/images", (req, res) => {
      res.json(posts);
    })
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});