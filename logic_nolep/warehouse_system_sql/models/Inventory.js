import Database from '../config/database.js';
import WarehouseView from '../views/WarehouseView.js';

class Inventory {
    constructor() {
        this.database = new Database();
    }

    async create(inventoryItems) {
        let db;
        try {
            db = await this.database.connect();
            
            return await new Promise((resolve, reject) => {
                const query = `INSERT OR REPLACE INTO Inventory (inventory_id, product_id, quantity, location) VALUES (?, ?, ?, ?)`;
                const stmt = db.prepare(query);
                
                let completed = 0;
                const errors = [];

                inventoryItems.forEach((item, index) => {
                    stmt.run(item, function(err) {
                        if (err) {
                            errors.push(`Error inserting inventory item ${item[0]}: ${err.message}`);
                        }
                        
                        completed++;
                        if (completed === inventoryItems.length) {
                            stmt.finalize((finalizeErr) => {
                                if (finalizeErr) {
                                    errors.push(`Error finalizing statement: ${finalizeErr.message}`);
                                }
                                if (errors.length > 0) {
                                    reject(new Error(errors.join(', ')));
                                } else {
                                    resolve('Inventory items inserted successfully');
                                }
                            });
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
                        WarehouseView.displayError('Error closing database connection after create:', err.message);
                    }
                });
            }
        }
    }

    async getDetails() {
        let db;
        try {
            db = await this.database.connect();
            
            return await new Promise((resolve, reject) => {
                const query = `
                    SELECT
                        P.product_name,
                        I.quantity,
                        I.location
                    FROM
                        Inventory AS I
                    JOIN
                        Products AS P ON I.product_id = P.product_id`;
                
                db.all(query, [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                db.close((err) => {
                    if (err) {
                        WarehouseView.displayError('Error closing database connection after getDetails:', err.message);
                    }
                });
            }
        }
    }

    async getWarehouseValues() {
        let db;
        try {
            db = await this.database.connect();
            
            return await new Promise((resolve, reject) => {
                const query = `
                    SELECT
                        I.location,
                        SUM(I.quantity * P.price) AS total_value
                    FROM
                        Inventory AS I
                    JOIN
                        Products AS P ON I.product_id = P.product_id
                    GROUP BY
                        I.location`;
                
                db.all(query, [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        // format total_value dua digit di belakang koma
                        const formattedRows = rows.map(row => ({
                            location: row.location,
                            total_value: parseFloat(row.total_value).toFixed(2)
                        }));
                        resolve(formattedRows);
                    }
                });
            });
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                db.close((err) => {
                    if (err) {
                        WarehouseView.displayError('Error closing database connection after getWarehouseValues:', err.message);
                    }
                });
            }
        }
    }

    async getCurrentStockLevels() {
        let db;
        try {
            db = await this.database.connect();
            
            return await new Promise((resolve, reject) => {
                const query = `
                    SELECT
                        P.product_name,
                        I.quantity,
                        I.location
                    FROM
                        Inventory AS I
                    JOIN
                        Products AS P ON I.product_id = P.product_id
                    ORDER BY
                        P.product_name, I.location`;
                
                db.all(query, [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                db.close((err) => {
                    if (err) {
                        WarehouseView.displayError('Error closing database connection after getCurrentStockLevels:', err.message);
                    }
                });
            }
        }
    }
}

export default Inventory;