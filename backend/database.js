const Database = require("better-sqlite3");

const db = new Database("posts.db");

console.log("Connected to SQLite database.");

db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT,
    caption TEXT,
    likes INTEGER DEFAULT 0,
    created_at TEXT
  )
`).run();

module.exports = db;