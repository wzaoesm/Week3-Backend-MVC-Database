import Database from '../config/database.js';
import WarehouseView from '../views/WarehouseView.js';

class Product {
    constructor() {
        this.database = new Database();
    }

    async create(products) {
        let db;
        try {
            db = await this.database.connect();
            
            return await new Promise((resolve, reject) => {
                const query = `INSERT OR REPLACE INTO Products (product_id, product_name, category, price) VALUES (?, ?, ?, ?)`;
                const stmt = db.prepare(query, function(err) {
                    if (err) {
                        reject(new Error(`Failed to prepare statement: ${err.message}`));
                        return;
                    }

                    let completed = 0;
                    const errors = [];

                    products.forEach((product, index) => {
                        stmt.run(product, function(err) {
                            if (err) {
                                errors.push(`Error inserting product ${product[1]}: ${err.message}`);
                            }
                            
                            completed++;
                            if (completed === products.length) {
                                stmt.finalize(() => {
                                    if (errors.length > 0) {
                                        reject(new Error(errors.join(', ')));
                                    } else {
                                        resolve('Products inserted successfully');
                                    }
                                });
                            }
                        });
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

    async getAll() {
        let db;
        try {
            db = await this.database.connect();
            
            return await new Promise((resolve, reject) => {
                const query = `SELECT product_name, price FROM Products ORDER BY price DESC`;
                
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
                        WarehouseView.displayError('Error closing database connection after getAll:', err.message);
                    }
                });
            }
        }
    }

    async updatePrice(productName, newPrice) {
        let db;
        try {
            db = await this.database.connect();
            
            return await new Promise((resolve, reject) => {
                const query = `UPDATE Products SET price = ? WHERE product_name = ?`;
                
                db.run(query, [newPrice, productName], function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            changes: this.changes,
                            message: this.changes > 0 
                                ? `Price for '${productName}' updated to ${newPrice}` 
                                : `Product '${productName}' not found or price unchanged`
                        });
                    }
                });
            });
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                db.close((err) => {
                    if (err) {
                        WarehouseView.displayError('Error closing database connection after updatePrice:', err.message);
                    }
                });
            }
        }
    }

    async getUnordered() {
        let db;
        try {
            db = await this.database.connect();
            
            return await new Promise((resolve, reject) => {
                const query = `
                    SELECT
                        P.product_id,
                        P.product_name,
                        P.category,
                        P.price
                    FROM
                        Products AS P
                    LEFT JOIN
                        OrderDetails AS OD ON P.product_id = OD.product_id
                    WHERE
                        OD.product_id IS NULL`;
                
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
                        WarehouseView.displayError('Error closing database connection after getUnordered:', err.message);
                    }
                });
            }
        }
    }
}

export default Product;