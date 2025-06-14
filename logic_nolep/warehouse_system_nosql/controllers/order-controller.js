// controllers/order-controller.js
import OrderModel from '../models/order-model.js';
import ProductModel from '../models/product-model.js';
import OrderView from '../views/order-view.js';
import CoreView from '../views/core-view.js';

class OrderController {
    constructor() {
        this.orderModel = new OrderModel();
        this.productModel = new ProductModel();
    }

    async addOrderData() {
        const ordersData = [
            {
                _id: 1,
                customer_id: 101,
                order_date: new Date("2024-08-12T00:00:00.000Z"),
                order_details: [
                    { product_id: 1, quantity: 2 },
                    { product_id: 3, quantity: 1 }
                ]
            },
            {
                _id: 2,
                customer_id: 102,
                order_date: new Date("2024-08-13T00:00:00.000Z"),
                order_details: [
                    { product_id: 2, quantity: 1 },
                    { product_id: 4, quantity: 2 }
                ]
            }
        ];

        try {
            for (const order of ordersData) {
                for (const detail of order.order_details) {
                    const productExists = await this.productModel.findById(detail.product_id);
                    if (!productExists) {
                        CoreView.displayError(`Product with ID ${detail.product_id} not found for order item. Skipping this order.`);
                        return;
                    }
                }
            }

            const insertedCount = await this.orderModel.addMany(ordersData);
            CoreView.displaySuccess(`${insertedCount} orders added successfully!`);
        } catch (error) {
            CoreView.displayError('Error adding order data: ' + error.message);
        }
    }

    async viewTotalAmountForEachOrder() {
        try {
            const ordersWithTotal = await this.orderModel.getTotalAmountForEachOrder();
            OrderView.displayOrderTotals(ordersWithTotal);
            CoreView.displaySuccess('Successfully retrieved total amount for each order.');
        } catch (error) {
            CoreView.displayError('Error calculating total amount for orders: ' + error.message);
        }
    }
}

export default OrderController;