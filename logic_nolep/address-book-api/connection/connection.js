// connection/connection.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(path.join(__dirname, 'address_book.db'), (err) => {
                if (err) {
                    reject(err);
                } else {
                    this.initTables().then(resolve).catch(reject);
                }
            });
        });
    }

    initTables() {
        return new Promise((resolve, reject) => {
            const queries = [
                `CREATE TABLE IF NOT EXISTS Contact (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    phoneNumber INTEGER UNIQUE NOT NULL,
                    company TEXT,
                    email TEXT UNIQUE NOT NULL
                )`,
                `CREATE TABLE IF NOT EXISTS Groups (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    groupName TEXT NOT NULL
                )`,
                `CREATE TABLE IF NOT EXISTS ContactGroups (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    contactId INTEGER NOT NULL,
                    groupId INTEGER NOT NULL,
                    FOREIGN KEY (contactId) REFERENCES Contact(id),
                    FOREIGN KEY (groupId) REFERENCES Groups(id)
                )`
            ];

            let completed = 0;
            queries.forEach(query => {
                this.db.run(query, (err) => {
                    if (err) reject(err);
                    completed++;
                    if (completed === queries.length) resolve();
                });
            });
        });
    }

    run(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, changes: this.changes });
            });
        });
    }

    get(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    all(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}

module.exports = new Database();