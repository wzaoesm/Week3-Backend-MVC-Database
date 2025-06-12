import Database from '../config/database.js';
import WarehouseView from '../views/WarehouseView.js';

class Order {
    constructor() {
        this.database = new Database();
    }

    async createOrdersAndDetails(ordersData, orderDetailsData) {
        let db;
        try {
            db = await this.database.connect();
            
            await new Promise((resolve, reject) => {
                const queries = {
                    orders: `INSERT OR REPLACE INTO Orders (order_id, customer_id, order_date) VALUES (?, ?, ?)`,
                    orderDetails: `INSERT OR REPLACE INTO OrderDetails (order_detail_id, order_id, product_id, quantity) VALUES (?, ?, ?, ?)`
                };
                
                db.serialize(() => {
                    const insertOrderStmt = db.prepare(queries.orders);
                    let ordersCompleted = 0;
                    const ordersErrors = [];
                    
                    ordersData.forEach(order => {
                        insertOrderStmt.run(order, function(err) {
                            if (err) {
                                ordersErrors.push(`Error inserting order ${order[0]}: ${err.message}`);
                            }
                            
                            ordersCompleted++;
                            if (ordersCompleted === ordersData.length) {
                                insertOrderStmt.finalize((finalizeErr) => {
                                    if (finalizeErr) {
                                        ordersErrors.push(`Error finalizing order statement: ${finalizeErr.message}`);
                                    }

                                    if (ordersErrors.length > 0) {
                                        reject(new Error(ordersErrors.join(', ')));
                                        return;
                                    }
                                    
                                    // Insert order details
                                    const insertOrderDetailStmt = db.prepare(queries.orderDetails);
                                    let detailsCompleted = 0;
                                    const detailsErrors = [];
                                    
                                    orderDetailsData.forEach(detail => {
                                        insertOrderDetailStmt.run(detail, function(err) {
                                            if (err) {
                                                detailsErrors.push(`Error inserting order detail ${detail[0]}: ${err.message}`);
                                            }
                                            
                                            detailsCompleted++;
                                            if (detailsCompleted === orderDetailsData.length) {
                                                insertOrderDetailStmt.finalize((finalizeDetailErr) => {
                                                    if (finalizeDetailErr) {
                                                        detailsErrors.push(`Error finalizing order detail statement: ${finalizeDetailErr.message}`);
                                                    }

                                                    if (detailsErrors.length > 0) {
                                                        reject(new Error(detailsErrors.join(', ')));
                                                    } else {
                                                        resolve('Orders and order details inserted successfully');
                                                    }
                                                });
                                            }
                                        });
                                    });
                                });
                            }
                        });
                    });
                });
            });
            return 'Orders and order details inserted successfully'; // This return is for the outer async function
        } catch (error) {
            throw error;
        } finally {
            if (db) {
                db.close((err) => {
                    if (err) {
                        WarehouseView.displayError('Error closing database connection after createOrdersAndDetails:', err.message);
                    }
                });
            }
        }
    }

    async getTotals() {
        let db;
        try {
            db = await this.database.connect();
            
            return await new Promise((resolve, reject) => {
                const query = `
                    SELECT
                        O.order_id,
                        O.order_date,
                        SUM(OD.quantity * P.price) AS total_amount
                    FROM
                        Orders AS O
                    JOIN
                        OrderDetails AS OD ON O.order_id = OD.order_id
                    JOIN
                        Products AS P ON OD.product_id = P.product_id
                    GROUP BY
                        O.order_id, O.order_date
                    ORDER BY
                        O.order_id`;
                
                db.all(query, [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        const formattedRows = rows.map(row => ({
                            order_id: row.order_id,
                            order_date: row.order_date,
                            total_amount: parseFloat(row.total_amount).toFixed(2)
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
                        WarehouseView.displayError('Error closing database connection after getTotals:', err.message);
                    }
                });
            }
        }
    }
}

export default Order;