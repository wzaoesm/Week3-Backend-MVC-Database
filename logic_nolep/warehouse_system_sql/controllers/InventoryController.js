import Inventory from '../models/Inventory.js';
import WarehouseView from '../views/WarehouseView.js';

class InventoryController {
    constructor() {
        this.inventoryModel = new Inventory();
    }

    async insertInventory() {
        try {
            const inventoryData = [
                [1, 1, 50, 'Warehouse A'],
                [2, 2, 30, 'Warehouse B'],
                [3, 3, 20, 'Warehouse A'],
                [4, 4, 40, 'Warehouse B']
            ];

            const result = await this.inventoryModel.create(inventoryData);
            WarehouseView.displaySuccess('Inventory data inserted or updated.');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async showInventoryDetails() {
        try {
            const inventoryDetails = await this.inventoryModel.getDetails();
            WarehouseView.displayInventoryDetails(inventoryDetails);
            return inventoryDetails;
        } catch (error) {
            throw error;
        }
    }

    async showWarehouseInventoryValue() {
        try {
            const warehouseValues = await this.inventoryModel.getWarehouseValues();
            WarehouseView.displayWarehouseValues(warehouseValues);
            return warehouseValues;
        } catch (error) {
            throw error;
        }
    }

    async showCurrentStockLevels() {
        try {
            const stockLevels = await this.inventoryModel.getCurrentStockLevels();
            WarehouseView.displayCurrentStockLevels(stockLevels);
            return stockLevels;
        } catch (error) {
            throw error;
        }
    }
}

export default InventoryController;