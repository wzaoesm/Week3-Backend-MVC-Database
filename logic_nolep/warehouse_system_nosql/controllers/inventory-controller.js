// controllers/inventory-controller.js
import InventoryModel from '../models/inventory-model.js';
import ProductModel from '../models/product-model.js';
import InventoryView from '../views/inventory-view.js';
import CoreView from '../views/core-view.js';

class InventoryController {
    constructor() {
        this.inventoryModel = new InventoryModel();
        this.productModel = new ProductModel();
    }

    async addInventoryData() {
        const inventoryData = [
            { _id: 1, product_id: 1, quantity: 50, location: 'Warehouse A' },
            { _id: 2, product_id: 2, quantity: 30, location: 'Warehouse B' },
            { _id: 3, product_id: 3, quantity: 20, location: 'Warehouse A' },
            { _id: 4, product_id: 4, quantity: 40, location: 'Warehouse B' }
        ];

        try {
            for (const item of inventoryData) {
                const productExists = await this.productModel.findById(item.product_id);
                if (!productExists) {
                    CoreView.displayError(`Product with ID ${item.product_id} not found for inventory item. Skipping this item.`);
                    return;
                }
            }

            const insertedCount = await this.inventoryModel.addMany(inventoryData);
            CoreView.displaySuccess(`${insertedCount} inventory items added successfully!`);
        } catch (error) {
            CoreView.displayError('Error adding inventory data: ' + error.message);
        }
    }

    async viewProductsWithInventory() {
        try {
            const aggregatedData = await this.inventoryModel.getProductsWithInventoryDetails();
            InventoryView.displayAggregatedProductInventory(aggregatedData);
            CoreView.displaySuccess('Successfully retrieved aggregated product and inventory data.');
        } catch (error) {
            CoreView.displayError('Error viewing products with inventory: ' + error.message);
        }
    }

    async calculateTotalInventoryValuePerLocation() {
        try {
            const result = await this.inventoryModel.calculateTotalValuePerLocation();
            InventoryView.displayTotalInventoryValue(result);
            CoreView.displaySuccess('Successfully calculated total inventory value per location.');
        } catch (error) {
            CoreView.displayError('Error calculating total inventory value: ' + error.message);
        }
    }
}

export default InventoryController;