// views/core-view.js
import chalk from 'chalk';

class CoreView {
    static displayTitle() {
        console.log(chalk.blue('='.repeat(50)));
        console.log(chalk.bold.green('     WAREHOUSE MANAGEMENT SYSTEM (No SQL)     '));
        console.log(chalk.blue('='.repeat(50)));
    }

    static displayMenu() {
        console.log('\n--- MENU ---');
        console.log('1. Initialize Database, Collections, and Connect DB');
        console.log('2. Add Products');
        console.log('3. View All Products (Sorted by Price)');
        console.log('4. Add Inventory Data');
        console.log('5. View Products with Inventory (Aggregated)');
        console.log('6. Update Product Price (Laptop)');
        console.log('7. Calculate Total Inventory Value per Location');
        console.log('8. Add Order Data');
        console.log('9. View Total Amount for Each Order');
        console.log('10. Find Products Never Ordered');
        console.log('0. Exit');
        console.log();
        console.log(chalk.blue('-'.repeat(50)));
        console.log();
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
        console.log('\n' + '='.repeat(60) + '\n');
    }
}

export default CoreView;