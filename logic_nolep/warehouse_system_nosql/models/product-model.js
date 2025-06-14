// models/product-model.js
import DBClient from './db-client.js';

class ProductModel {
    constructor() { }

    async addMany(productsData) {
        const db = DBClient.getDb();
        const collection = db.collection('products');
        try {
            const result = await collection.insertMany(productsData, { ordered: false });
            return result.insertedCount;
        } catch (error) {
            if (error.writeErrors) {
                const duplicateIds = error.writeErrors.filter(e => e.err.code === 11000).map(e => e.err.op._id);
                if (duplicateIds.length > 0) {
                    throw new Error(`Products with IDs ${duplicateIds.join(', ')} already exist.`);
                }
            }
            throw error;
        }
    }

    async findAllSortedByPrice() {
        const db = DBClient.getDb();
        const collection = db.collection('products');
        return await collection.find({})
                                  .project({ product_name: 1, price: 1, _id: 0 })
                                  .sort({ price: 1 })
                                  .toArray();
    }

    async updatePriceByName(productName, newPrice) {
        const db = DBClient.getDb();
        const collection = db.collection('products');
        
        const result = await collection.findOneAndUpdate(
            { product_name: productName },
            { $set: { price: newPrice } },
            { returnDocument: 'after' }
        );

        return result;
    }

    async findAllProductIds() {
        const db = DBClient.getDb();
        const collection = db.collection('products');
        const products = await collection.find({}, { projection: { _id: 1 } }).toArray();
        return products.map(p => p._id);
    }

    async findProductsByIds(ids) {
        if (ids.length === 0) return [];
        const db = DBClient.getDb();
        const collection = db.collection('products');
        return await collection.find(
            { _id: { $in: ids } },
            { projection: { product_name: 1 } }
        ).toArray();
    }

    async findById(productId) {
        const db = DBClient.getDb();
        const collection = db.collection('products');
        return await collection.findOne({ _id: productId });
    }
}

export default ProductModel;