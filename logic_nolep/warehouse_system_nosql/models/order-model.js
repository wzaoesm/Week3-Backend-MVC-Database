// models/order-model.js
import DBClient from './db-client.js';

class OrderModel {
    constructor() { }

    async addMany(ordersData) {
        const db = DBClient.getDb();
        const collection = db.collection('orders');
        try {
            const result = await collection.insertMany(ordersData, { ordered: false });
            return result.insertedCount;
        } catch (error) {
            if (error.writeErrors) {
                const duplicateIds = error.writeErrors.filter(e => e.err.code === 11000).map(e => e.err.op._id);
                if (duplicateIds.length > 0) {
                    throw new Error(`Orders with IDs ${duplicateIds.join(', ')} already exist.`);
                }
            }
            throw error;
        }
    }
    async getTotalAmountForEachOrder() {
        const db = DBClient.getDb();
        const collection = db.collection('orders');
        return await collection.aggregate([
            { $unwind: '$order_details' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'order_details.product_id',
                    foreignField: '_id',
                    as: 'productInfo'
                }
            },
            { $unwind: '$productInfo' },
            {
                $group: {
                    _id: '$_id',
                    order_date: { $first: '$order_date' },
                    total_amount: { $sum: { $multiply: ['$order_details.quantity', '$productInfo.price'] } }
                }
            },
            {
                $project: {
                    order_id: '$_id',
                    _id: 0,
                    order_date: 1,
                    total_amount: { $round: ["$total_amount", 2] }
                }
            },
            { $sort: { order_id: 1 } }
        ]).toArray();
    }


    async getOrderedProductIds() {
        const db = DBClient.getDb();
        const collection = db.collection('orders');
        const orderedProductIdsResult = await collection.aggregate([
            { $unwind: '$order_details' },
            { $group: { _id: null, productIds: { $addToSet: '$order_details.product_id' } } }
        ]).toArray();
        return orderedProductIdsResult.length > 0 ? orderedProductIdsResult[0].productIds : [];
    }
}

export default OrderModel;