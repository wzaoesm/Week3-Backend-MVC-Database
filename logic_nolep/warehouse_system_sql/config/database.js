import sqlite3 from 'sqlite3';
import WarehouseView from '../views/WarehouseView.js';

const { verbose } = sqlite3;

class Database {
    constructor(dbPath = './warehouse.db') {
        this.dbPath = dbPath;
    }

    connect() {
        return new Promise((resolve, reject) => {
            const connection = new (verbose().Database)(this.dbPath, (err) => {
                if (err) {
                    WarehouseView.displayError('Error opening database: ' + err.message);
                    reject(err);
                } else {
                    WarehouseView.displaySuccess('Connected to the warehouse database.');
                    resolve(connection);
                }
            });
        });
    }

    async initialize() {
        let db;
        try {
            db = await this.connect();
            
            await new Promise((resolve, reject) => {
                db.serialize(() => {
                    db.run(`CREATE TABLE IF NOT EXISTS Products (
                        product_id INTEGER PRIMARY KEY,
                        product_name TEXT,
                        category TEXT,
                        price REAL
                    )`, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });

                    db.run(`CREATE TABLE IF NOT EXISTS Inventory (
                        inventory_id INTEGER PRIMARY KEY,
                        product_id INTEGER,
                        quantity INTEGER,
                        location TEXT,
                        FOREIGN KEY (product_id) REFERENCES Products(product_id)
                    )`, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });

                    db.run(`CREATE TABLE IF NOT EXISTS Orders (
                        order_id INTEGER PRIMARY KEY,
                        customer_id INTEGER,
                        order_date TEXT
                    )`, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });

                    db.run(`CREATE TABLE IF NOT EXISTS OrderDetails (
                        order_detail_id INTEGER PRIMARY KEY,
                        order_id INTEGER,
                        product_id INTEGER,
                        quantity INTEGER,
                        FOREIGN KEY (order_id) REFERENCES Orders(order_id),
                        FOREIGN KEY (product_id) REFERENCES Products(product_id)
                    )`, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                db.close((err) => {
                    if (err) {
                        WarehouseView.displayError('Error closing database connection: ' + err.message);
                    }
                });
            }
        }
    }
}

export default Database;