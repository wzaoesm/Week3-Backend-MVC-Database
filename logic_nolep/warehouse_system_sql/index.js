import Database from './config/database.js';
import ProductController from './controllers/ProductController.js';
import InventoryController from './controllers/InventoryController.js';
import OrderController from './controllers/OrderController.js';
import WarehouseView from './views/WarehouseView.js';
import readline from 'readline';

class WarehouseApp {
    constructor() {
        this.database = new Database();
        this.productController = new ProductController();
        this.inventoryController = new InventoryController();
        this.orderController = new OrderController();

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async initializeDatabase() {
        try {
            await this.database.initialize();
            WarehouseView.displaySuccess('Database initialized successfully!');
        } catch (error) {
            WarehouseView.displayError('Failed to initialize database: ' + error.message);
        }
    }

    async runMenu() {
        let running = true;
        
        while (running) {
            WarehouseView.displayTitle();
            WarehouseView.displayMenu();
            
            const choice = await this.getUserInput('Select an option (0-11): ');
            
            try {
                switch (choice) {
                    case '1':
                        await this.initializeDatabase();
                        break;
                    case '2':
                        await this.productController.insertProducts();
                        break;
                    case '3':
                        await this.productController.showProducts();
                        break;
                    case '4':
                        await this.inventoryController.insertInventory();
                        break;
                    case '5':
                        await this.inventoryController.showInventoryDetails();
                        break;
                    case '6':
                        await this.productController.updateProductPrice();
                        break;
                    case '7':
                        await this.inventoryController.showWarehouseInventoryValue();
                        break;
                    case '8':
                        await this.orderController.insertOrdersAndDetails();
                        break;
                    case '9':
                        await this.orderController.showOrderTotals();
                        break;
                    case '10':
                        await this.productController.showUnorderedProducts();
                        break;
                    case '11':
                        await this.inventoryController.showCurrentStockLevels();
                        break;
                    case '0':
                        running = false;
                        WarehouseView.displayInfo('Goodbye!');
                        break;
                    default:
                        WarehouseView.displayError('Invalid option. Please try again.');
                }
                
                if (running && choice !== '0') {
                    await this.getUserInput('\nPress Enter to continue...');
                    WarehouseView.displaySeparator();
                }
                
            } catch (error) {
                WarehouseView.displayError(error.message);
                await this.getUserInput('\nPress Enter to continue...');
                WarehouseView.displaySeparator();
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
        await this.runMenu();
    }
}

// fungsi yang akan dijalankan berdasarkan soal
// soal 1
export async function initializeWarehouseDatabase() {
    const app = new WarehouseApp();
    await app.initializeDatabase();
}

// soal 2
export async function insertProducts() {
    const controller = new ProductController();
    return await controller.insertProducts();
}

// soal 3
export async function showProducts() {
    const controller = new ProductController();
    return await controller.showProducts();
}

// soal 4
export async function insertInventory() {
    const controller = new InventoryController();
    return await controller.insertInventory();
}

// soal 5
export async function showInventoryDetails() {
    const controller = new InventoryController();
    return await controller.showInventoryDetails();
}

// soal 6
export async function updateProductPrice() {
    const controller = new ProductController();
    return await controller.updateProductPrice();
}

// soal 7
export async function showWarehouseInventoryValue() {
    const controller = new InventoryController();
    return await controller.showWarehouseInventoryValue();
}

// soal 8
export async function insertOrdersAndDetails() {
    const controller = new OrderController();
    return await controller.insertOrdersAndDetails();
}

// soal 9
export async function showOrderTotals() {
    const controller = new OrderController();
    return await controller.showOrderTotals();
}

// soal 10
export async function showUnorderedProducts() {
    const controller = new ProductController();
    return await controller.showUnorderedProducts();
}

// soal 11
export async function showCurrentStockLevels() {
    const controller = new InventoryController();
    return await controller.showCurrentStockLevels();
}

// membuat instance dari kelas WarehouseApp dan menyimpannya ke variabel app
const app = new WarehouseApp();

// mulai aplikasi (di-running hanya jika menggunakan perintah 'node index.js' directly)
if (import.meta.url === `file://${process.argv[1]}`) {
    app.start().catch(console.error);
}