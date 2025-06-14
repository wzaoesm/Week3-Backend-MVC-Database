// controllers/product-controller.js
import ProductModel from '../models/product-model.js';
import OrderModel from '../models/order-model.js';
import ProductView from '../views/product-view.js';
import CoreView from '../views/core-view.js';

class ProductController {
    constructor() {
        this.productModel = new ProductModel();
        this.orderModel = new OrderModel();
    }

    async addProducts() {
        const productsData = [
            { _id: 1, product_name: 'Laptop', category: 'Elektronik', price: 999.99 },
            { _id: 2, product_name: 'Desk Chair', category: 'Perabot', price: 199.99 },
            { _id: 3, product_name: 'Printer', category: 'Elektronik', price: 299.99 },
            { _id: 4, product_name: 'Bookshelf', category: 'Perabot', price: 149.99 }
        ];

        try {
            const insertedCount = await this.productModel.addMany(productsData);
            CoreView.displaySuccess(`${insertedCount} products added successfully!`);
        } catch (error) {
            CoreView.displayError('Error adding products: ' + error.message);
        }
    }

    async viewAllProducts() {
        try {
            const products = await this.productModel.findAllSortedByPrice();
            ProductView.displayProductList(products);
            CoreView.displaySuccess('Successfully retrieved all products.');
        } catch (error) {
            CoreView.displayError('Error viewing products: ' + error.message);
        }
    }

    async updateLaptopPrice() {
        const oldPrice = 999.99;
        const newPrice = 1099.99;

        try {
            const updatedProduct = await this.productModel.updatePriceByName('Laptop', newPrice);

            if (updatedProduct) {
                CoreView.displaySuccess(`Harga 'Laptop' berhasil diperbarui dari $${oldPrice} menjadi $${updatedProduct.price.toFixed(2)}.`);
            } else {
                CoreView.displayError('Produk "Laptop" tidak ditemukan.');
            }
        } catch (error) {
            CoreView.displayError('Error updating Laptop price: ' + error.message);
        }
    }

    async findProductsNeverOrdered() {
        try {
            const allProductIds = await this.productModel.findAllProductIds();
            const orderedProductIds = await this.orderModel.getOrderedProductIds();

            const neverOrderedProductIds = allProductIds.filter(id => !orderedProductIds.includes(id));
            const neverOrderedProducts = await this.productModel.findProductsByIds(neverOrderedProductIds);

            ProductView.displayProductsNeverOrdered(neverOrderedProducts);
        } catch (error) {
            CoreView.displayError('Error finding products never ordered: ' + error.message);
        }
    }
}

export default ProductController;