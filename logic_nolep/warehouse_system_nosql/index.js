// index.js
import readline from 'readline';
import CoreView from './views/core-view.js';
import CoreController from './controllers/core-controller.js';
import ProductController from './controllers/product-controller.js';
import InventoryController from './controllers/inventory-controller.js';
import OrderController from './controllers/order-controller.js';

class WarehouseApp {
    constructor() {
        this.coreController = new CoreController();
        this.productController = new ProductController();
        this.inventoryController = new InventoryController();
        this.orderController = new OrderController();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    async runMenu() {
        let running = true;

        while (running) {
            CoreView.displayTitle();
            CoreView.displayMenu();

            const choice = await this.getUserInput('Select an option (0-10): ');

            try {
                switch (choice) {
                    case '1':
                        await this.coreController.initializeDatabaseAndCollections();
                        break;
                    case '2':
                        await this.productController.addProducts();
                        break;
                    case '3':
                        await this.productController.viewAllProducts();
                        break;
                    case '4':
                        await this.inventoryController.addInventoryData();
                        break;
                    case '5':
                        await this.inventoryController.viewProductsWithInventory();
                        break;
                    case '6':
                        await this.productController.updateLaptopPrice();
                        break;
                    case '7':
                        await this.inventoryController.calculateTotalInventoryValuePerLocation();
                        break;
                    case '8':
                        await this.orderController.addOrderData();
                        break;
                    case '9':
                        await this.orderController.viewTotalAmountForEachOrder();
                        break;
                    case '10':
                        await this.productController.findProductsNeverOrdered();
                        break;
                    case '0':
                        running = false;
                        CoreView.displaySuccess('Goodbye!');
                        break;
                    default:
                        CoreView.displayError('Invalid option. Please try again.');
                }

                if (running && choice !== '0') {
                    await this.getUserInput('\nPress Enter to continue...');
                    CoreView.displaySeparator();
                }
            } catch (error) {
                CoreView.displayError(error.message);
                await this.getUserInput('\nPress Enter to continue...');
                CoreView.displaySeparator();
            }
        }

        this.rl.close();
    }

    getUserInput(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
    }

    async start() {
        try {
            await this.runMenu();
        } catch (error) {
            CoreView.displayError('Error running app: ' + error.message);
        } finally {
            await this.coreController.closeDatabaseConnection();
        }
    }
}

// mulai aplikasi (di-running hanya jika menggunakan perintah 'node index.js' directly)
if (import.meta.url === `file://${process.argv[1]}`) {
    const app = new WarehouseApp();
    app.start().catch(console.error);
}