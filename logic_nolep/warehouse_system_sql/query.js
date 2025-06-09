const sqlite3 = require('sqlite3').verbose();

function initializeWarehouseDatabase() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        }
        console.log('Connected to the warehouse database.');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS Products (
                product_id INTEGER PRIMARY KEY,
                product_name TEXT,
                category TEXT,
                price REAL
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS Inventory (
                inventory_id INTEGER PRIMARY KEY,
                product_id INTEGER,
                quantity INTEGER,
                location TEXT,
                FOREIGN KEY (product_id) REFERENCES Products(product_id)
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS Orders (
                order_id INTEGER PRIMARY KEY,
                customer_id INTEGER,
                order_date TEXT
            )`);

            db.run(`CREATE TABLE IF NOT EXISTS OrderDetails (
                order_detail_id INTEGER PRIMARY KEY,
                order_id INTEGER,
                product_id INTEGER,
                quantity INTEGER,
                FOREIGN KEY (order_id) REFERENCES Orders(order_id),
                FOREIGN KEY (product_id) REFERENCES Products(product_id)
            )`);

            console.log('\nTables created or already exist.\n');
            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
        });
    });
}

function insertProducts() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL query for inserting products
    const query = `INSERT OR REPLACE INTO Products (product_id, product_name, category, price) VALUES (?, ?, ?, ?)`;
    
    // Execute insertion logic
    const productsData = [
        [1, 'Laptop', 'Elektronik', 999.99],
        [2, 'Desk Chair ', 'Perabot', 199.99],
        [3, 'Printer', 'Elektronik', 299.99],
        [4, 'Bookshelf', 'Perabot', 149.99]
    ];

    const insertProductStmt = db.prepare(query);
    productsData.forEach(product => {
        insertProductStmt.run(product, function(err) {
            if (err) {
                console.error(`Error inserting product ${product[1]}:`, err.message);
            }
        });
    });
    insertProductStmt.finalize(() => {
        console.log('\nProducts data inserted or updated.\n');
        
        // Close database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
}

function showProducts() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL query
    const query = `SELECT product_name, price FROM Products ORDER BY price DESC`;
    
    // Execute query logic
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error querying products:', err.message);
        } else {
            console.log('\n--- Data Produk ---');
            if (rows.length === 0) {
                console.log('No products found.');
            } else {
                rows.forEach(row => {
                    console.log(`${row.product_name} - Harga: $${row.price.toFixed(2)}`);
                });
            }
        }

        // Close database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('\nDatabase connection closed.');
            }
        });
    });
}

function insertInventory() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL query
    const query = `INSERT OR REPLACE INTO Inventory (inventory_id, product_id, quantity, location) VALUES (?, ?, ?, ?)`;
    
    // Execute insertion logic
    const inventoryData = [
        [1, 1, 50, 'Gudang A'],
        [2, 2, 30, 'Gudang B'],
        [3, 3, 20, 'Gudang A'],
        [4, 4, 40, 'Gudang B']
    ];

    const insertInventoryStmt = db.prepare(query);
    inventoryData.forEach(item => {
        insertInventoryStmt.run(item, function(err) {
            if (err) {
                console.error(`Error inserting inventory item ${item[0]}:`, err.message);
            }
        });
    });
    insertInventoryStmt.finalize(() => {
        console.log('Inventory data inserted or updated.');
        
        // Close database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
}

function showInventoryDetails() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL query
    const query = `
        SELECT
            P.product_name,
            I.quantity,
            I.location
        FROM
            Inventory AS I
        JOIN
            Products AS P ON I.product_id = P.product_id`;
    
    // Execute query logic
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching inventory details:', err.message);
        } else {
            console.log('\n--- Detail Inventory ---');
            if (rows.length > 0) {
                rows.forEach(row => {
                    console.log(`Produk: ${row.product_name}, Kuantitas: ${row.quantity}, Lokasi: ${row.location}`);
                });
            } else {
                console.log('Tidak ada data inventory yang ditemukan.');
            }
        }

        // Close database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
}

function updateProductPrice() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL query
    const query = `UPDATE Products SET price = ? WHERE product_name = ?`;
    
    // Execute update logic
    const productName = 'Laptop';
    const newPrice = 1099.99;

    db.run(query, [newPrice, productName], function(err) {
        if (err) {
            console.error(`Error updating price for ${productName}:`, err.message);
        } else {
            if (this.changes > 0) {
                console.log(`Harga untuk '${productName}' berhasil diperbarui menjadi ${newPrice}.`);
            } else {
                console.log(`Produk '${productName}' tidak ditemukan atau harga tidak berubah.`);
            }
        }

        // Close database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
}

function showWarehouseInventoryValue() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL query
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
    
    // Execute query logic
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching warehouse inventory value:', err.message);
        } else {
            console.log('\n--- Nilai Total Inventaris per Gudang ---');
            if (rows.length > 0) {
                rows.forEach(row => {
                    console.log(`Lokasi: ${row.location}, Nilai Total: $${row.total_value.toFixed(2)}`);
                });
            } else {
                console.log('Tidak ada data inventaris yang ditemukan.');
            }
        }

        // Close database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
}

function insertOrdersAndDetails() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL queries
    const query = {
        orders: `INSERT OR REPLACE INTO Orders (order_id, customer_id, order_date) VALUES (?, ?, ?)`,
        orderDetails: `INSERT OR REPLACE INTO OrderDetails (order_detail_id, order_id, product_id, quantity) VALUES (?, ?, ?, ?)`
    };
    
    // Execute insertion logic
    db.serialize(() => {
        const ordersData = [
            [1, 101, '2024-08-12'],
            [2, 102, '2024-08-13']
        ];

        const insertOrderStmt = db.prepare(query.orders);
        ordersData.forEach(order => {
            insertOrderStmt.run(order, function(err) {
                if (err) {
                    console.error(`Error inserting order ${order[0]}:`, err.message);
                }
            });
        });
        insertOrderStmt.finalize(() => {
            console.log('Orders data inserted or updated.');

            const orderDetailsData = [
                [1, 1, 1, 2], // order_detail_id, order_id, product_id, quantity
                [2, 1, 3, 1],
                [3, 2, 2, 1],
                [4, 2, 4, 2]
            ];

            const insertOrderDetailStmt = db.prepare(query.orderDetails);
            orderDetailsData.forEach(detail => {
                insertOrderDetailStmt.run(detail, function(err) {
                    if (err) {
                        console.error(`Error inserting order detail ${detail[0]}:`, err.message);
                    }
                });
            });
            insertOrderDetailStmt.finalize(() => {
                console.log('OrderDetails data inserted or updated.');
                
                // Close database connection
                db.close((err) => {
                    if (err) {
                        console.error('Error closing database:', err.message);
                    } else {
                        console.log('Database connection closed.');
                    }
                });
            });
        });
    });
}

function showOrderTotals() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL query
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
    
    // Execute query logic
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching order totals:', err.message);
        } else {
            console.log('\n--- Total Jumlah Setiap Pesanan ---');
            if (rows.length > 0) {
                rows.forEach(row => {
                    console.log(`Order ID: ${row.order_id}, Tanggal Pesanan: ${row.order_date}, Jumlah Total: $${row.total_amount.toFixed(2)}`);
                });
            } else {
                console.log('Tidak ada data pesanan yang ditemukan.');
            }
        }

        // Close database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
}

function showUnorderedProducts() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL query
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
    
    // Execute query logic
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching unordered products:', err.message);
        } else {
            console.log('\n--- Produk yang Belum Pernah Dipesan ---');
            if (rows.length > 0) {
                rows.forEach(row => {
                    console.log(`ID: ${row.product_id}, Nama: ${row.product_name}, Kategori: ${row.category}, Harga: $${row.price.toFixed(2)}`);
                });
            } else {
                console.log('Semua produk telah dipesan atau tidak ada produk di database.');
            }
        }

        // Close database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
}

function showCurrentStockLevels() {
    const db = new sqlite3.Database('./warehouse.db', (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
            return;
        } else {
            console.log('Connected to the warehouse database.');
        }
    });

    // SQL query
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
    
    // Execute query logic
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching current stock levels:', err.message);
        } else {
            console.log('\n--- Tingkat Stok Saat Ini ---');
            if (rows.length > 0) {
                rows.forEach(row => {
                    console.log(`Produk: ${row.product_name}, Kuantitas: ${row.quantity}, Lokasi: ${row.location}`);
                });
            } else {
                console.log('Tidak ada data stok yang ditemukan.');
            }
        }

        // Close database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
}

module.exports = {
    initializeWarehouseDatabase,
    insertProducts,
    showProducts,
    insertInventory,
    showInventoryDetails,
    updateProductPrice,
    showWarehouseInventoryValue,
    insertOrdersAndDetails,
    showOrderTotals,
    showUnorderedProducts,
    showCurrentStockLevels
};