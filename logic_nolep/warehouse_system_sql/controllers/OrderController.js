import Order from '../models/Order.js';
import WarehouseView from '../views/WarehouseView.js';

class OrderController {
    constructor() {
        this.orderModel = new Order();
    }

    async insertOrdersAndDetails() {
        try {
            const ordersData = [
                [1, 101, '2024-08-12'],
                [2, 102, '2024-08-13']
            ];

            const orderDetailsData = [
                [1, 1, 1, 2], // order_detail_id, order_id, product_id, quantity
                [2, 1, 3, 1],
                [3, 2, 2, 1],
                [4, 2, 4, 2]
            ];

            const result = await this.orderModel.createOrdersAndDetails(ordersData, orderDetailsData);
            WarehouseView.displaySuccess('Orders data inserted or updated.');
            WarehouseView.displaySuccess('OrderDetails data inserted or updated.');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async showOrderTotals() {
        try {
            const orderTotals = await this.orderModel.getTotals();
            WarehouseView.displayOrderTotals(orderTotals);
            return orderTotals;
        } catch (error) {
            throw error;
        }
    }
}

export default OrderController;