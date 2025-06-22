const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS absences (
    id INTEGER PRIMARY KEY AUTOINCREMENT Unique,
    name TEXT Unique
  )`);
});

module.exports = db;