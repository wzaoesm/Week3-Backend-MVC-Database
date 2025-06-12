import chalk from 'chalk';

class WarehouseView {
    static displayTitle() {
        console.log(chalk.blue('='.repeat(40)));
        console.log(chalk.bold.green('     WAREHOUSE MANAGEMENT SYSTEM'));
        console.log(chalk.blue('='.repeat(40)));
    }

    static displayMenu() {
        console.log('\n--- MENU ---');
        console.log('1. Initialize Database');
        console.log('2. Insert Products');
        console.log('3. Show Products');
        console.log('4. Insert Inventory');
        console.log('5. Show Inventory Details');
        console.log('6. Update Product Price');
        console.log('7. Show Warehouse Inventory Value');
        console.log('8. Insert Orders and Details');
        console.log('9. Show Order Totals');
        console.log('10. Show Unordered Products');
        console.log('11. Show Current Stock Levels');
        console.log('0. Exit');
        console.log()
        console.log(chalk.blue('-'.repeat(40)));
        console.log()
    }

    static displayProducts(products) {
        console.log()
        if (products.length === 0) {
            console.log('Tidak ada produk yang ditemukan.');
        } else {
            console.log(products);
        }
    }

    static displayInventoryDetails(inventoryDetails) {
        console.log()
        if (inventoryDetails.length > 0) {
            console.log(inventoryDetails);
        } else {
            console.log('Tidak ada data inventory yang ditemukan.');
        }
    }

    static displayWarehouseValues(warehouseValues) {
        console.log()
        if (warehouseValues.length > 0) {
            console.log(warehouseValues);
        } else {
            console.log('Tidak ada data warehouse yang ditemukan.');
        }
    }

    static displayOrderTotals(orderTotals) {
        console.log()
        if (orderTotals.length > 0) {
            console.log(orderTotals);
        } else {
            console.log('Tidak ada data pesanan yang ditemukan.');
        }
    }

    static displayUnorderedProducts(products) {
        console.log()
        if (products.length > 0) {
            console.log(products);
        } else {
            console.log('(No rows, as all products have been ordered)');
        }
    }

    static displayCurrentStockLevels(stockLevels) {
        console.log()
        if (stockLevels.length > 0) {
            console.log(stockLevels);
        } else {
            console.log('Tidak ada data stok yang ditemukan.');
        }
    }

    static displaySuccess(message) {
        console.log(`\n✅ ${message}`);
    }

    static displayError(message) {
        console.log(`\n❌ ${message}`);
    }

    static displayInfo(message) {
        console.log(`\nℹ️  ${message}`);
    }

    static displaySeparator() {
        console.log('\n' + '='.repeat(50) + '\n');
    }
}

export default WarehouseView;