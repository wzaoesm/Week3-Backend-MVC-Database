// models/inventory-model.js
import DBClient from './db-client.js';

class InventoryModel {
    constructor() { }

    async addMany(inventoryData) {
        const db = DBClient.getDb();
        const collection = db.collection('inventories');
        try {
            const result = await collection.insertMany(inventoryData, { ordered: false });
            return result.insertedCount;
        } catch (error) {
            if (error.writeErrors) {
                const duplicateIds = error.writeErrors.filter(e => e.err.code === 11000).map(e => e.err.op._id);
                if (duplicateIds.length > 0) {
                    throw new Error(`Inventory items with IDs ${duplicateIds.join(', ')} already exist.`);
                }
            }
            throw error;
        }
    }

    async getProductsWithInventoryDetails() {
        const db = DBClient.getDb();
        const collection = db.collection('inventories');
        return await collection.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: '$productDetails' },
            {
                $project: {
                    _id: 0,
                    product_name: '$productDetails.product_name',
                    quantity: '$quantity',
                    location: '$location'
                }
            },
            { $sort: { 'product_id_original': 1 } }
        ]).toArray();
    }

    async calculateTotalValuePerLocation() {
        const db = DBClient.getDb();
        const collection = db.collection('inventories');
        return await collection.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'productInfo'
                }
            },
            { $unwind: '$productInfo' },
            {
                $group: {
                    _id: '$location',
                    totalValue: { $sum: { $multiply: ['$quantity', '$productInfo.price'] } }
                }
            },

            {
                $project: {
                    _id: 1, // Pertahankan _id (lokasi) dari tahap $group
                    totalValue: { $round: ["$totalValue", 2] } // Bulatkan totalValue ke 2 desimal
                }
            },

            { $sort: { _id: 1 } }
        ]).toArray();
    }
}

export default InventoryModel;