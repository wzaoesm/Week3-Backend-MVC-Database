class OrderView {
    static displayOrderTotals(orders) {

        if (!orders || orders.length === 0) {
            console.log('[]');
            return;
        }

        console.log(orders);
    }
}

export default OrderView;