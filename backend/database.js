const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./posts.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create posts table
db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT,
    caption TEXT,
    created_at TEXT
  )
`);

module.exports = db;