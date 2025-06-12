import Product from '../models/Product.js';
import WarehouseView from '../views/WarehouseView.js';

class ProductController {
    constructor() {
        this.productModel = new Product();
    }

    async insertProducts() {
        try {
            const productsData = [
                [1, 'Laptop', 'Elektronik', 999.99],
                [2, 'Desk Chair ', 'Perabot', 199.99],
                [3, 'Printer', 'Elektronik', 299.99],
                [4, 'Bookshelf', 'Perabot', 149.99]
            ];

            const result = await this.productModel.create(productsData);
            WarehouseView.displaySuccess('Products data inserted or updated.');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async showProducts() {
        try {
            const products = await this.productModel.getAll();
            WarehouseView.displayProducts(products);
            return products;
        } catch (error) {
            throw error;
        }
    }

    async updateProductPrice(productName = 'Laptop', newPrice = 1099.99) {
        try {
            const result = await this.productModel.updatePrice(productName, newPrice);
            if (result.changes > 0) {
                WarehouseView.displaySuccess(`Harga untuk '${productName}' berhasil diperbarui menjadi ${newPrice}.`);
            } else {
                WarehouseView.displayInfo(`Produk '${productName}' tidak ditemukan atau harga tidak berubah.`);
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async showUnorderedProducts() {
        try {
            const products = await this.productModel.getUnordered();
            WarehouseView.displayUnorderedProducts(products);
            return products;
        } catch (error) {
            throw error;
        }
    }
}

export default ProductController;