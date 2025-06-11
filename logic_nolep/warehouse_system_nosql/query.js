import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://admin:admin@prod-warehouse-ap-south.ckhmxii.mongodb.net/?retryWrites=true&w=majority&appName=prod-warehouse-ap-southeast-1";

function getClient() {
  return new MongoClient(uri);
}

export async function createCollections() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    await db.createCollection('Products');
    await db.createCollection('Inventory');
    await db.createCollection('Orders');
    console.log("Collections 'Products', 'Inventory', 'Orders' are ready.");
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Error creating collections:', err);
    }
  } finally {
    await client.close();
  }
}

export async function insertProducts() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    const productsCollection = db.collection('Products');
    const productsToInsert = [
      { _id: 1, product_name: 'Laptop', category: 'Elektronik', price: 999.99 },
      { _id: 2, product_name: 'Desk Chair', category: 'Perabot', price: 199.99 },
      { _id: 3, product_name: 'Printer', category: 'Elektronik', price: 299.99 },
      { _id: 4, product_name: 'Bookshelf', category: 'Perabot', price: 149.99 }
    ];
    for (const product of productsToInsert) {
      await productsCollection.deleteOne({ _id: product._id });
    }
    const insertResult = await productsCollection.insertMany(productsToInsert);
    console.log(`\nInserted ${insertResult.insertedCount} documents into 'Products' collection.`);
  } catch (err) {
    console.error('Error inserting products:', err);
  } finally {
    await client.close();
  }
}

export async function getAllProducts() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    const productsCollection = db.collection('Products');
    const cursor = productsCollection.find(
      {},
      { projection: { _id: 0, product_name: 1, price: 1 } }
    ).sort({ price: 1 });
    const products = await cursor.toArray();
    console.log(JSON.stringify(products, null, 2));
  } catch (err) {
    console.error('Error fetching products:', err);
  } finally {
    await client.close();
  }
}

export async function insertInventory() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    const inventoryCollection = db.collection('Inventory');
    const inventoryToInsert = [
      { _id: 1, product_id: 1, quantity: 50, location: 'Warehouse A' },
      { _id: 2, product_id: 2, quantity: 30, location: 'Warehouse B' },
      { _id: 3, product_id: 3, quantity: 20, location: 'Warehouse A' },
      { _id: 4, product_id: 4, quantity: 40, location: 'Warehouse B' }
    ];
    for (const item of inventoryToInsert) {
      await inventoryCollection.deleteOne({ _id: item._id });
    }
    const insertResult = await inventoryCollection.insertMany(inventoryToInsert);
    console.log(`\nInserted ${insertResult.insertedCount} documents into 'Inventory' collection.`);
  } catch (err) {
    console.error('Error inserting inventory:', err);
  } finally {
    await client.close();
  }
}

export async function getProductInventory() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    const inventoryCollection = db.collection('Inventory');
    const result = await inventoryCollection.aggregate([
      {
        $lookup: {
          from: 'Products',
          localField: 'product_id',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      { $unwind: '$productInfo' },
      {
        $project: {
          _id: 0,
          product_name: '$productInfo.product_name',
          quantity: 1,
          location: 1,
          product_id: 1
        }
      },
      { $sort: { product_id: 1 } },
      {
        $project: {
          product_name: 1,
          quantity: 1,
          location: 1
        }
      }
    ]).toArray();
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error aggregating product inventory:', err);
  } finally {
    await client.close();
  }
}

export async function updateLaptopPrice() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    const productsCollection = db.collection('Products');
    const result = await productsCollection.updateOne(
      { product_name: 'Laptop' },
      { $set: { price: 1099.99 } }
    );
    if (result.modifiedCount > 0) {
      console.log("Harga 'Laptop' berhasil diperbarui menjadi 1099.99.");
    } else if (result.matchedCount > 0) {
      console.log("Harga 'Laptop' sudah 1099.99 atau tidak berubah.");
    } else {
      console.log("Produk 'Laptop' tidak ditemukan.");
    }
  } catch (err) {
    console.error('Error updating Laptop price:', err);
  } finally {
    await client.close();
  }
}

export async function getWarehouseInventoryValue() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    const inventoryCollection = db.collection('Inventory');
    const result = await inventoryCollection.aggregate([
      {
        $lookup: {
          from: 'Products',
          localField: 'product_id',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      { $unwind: '$productInfo' },
      {
        $group: {
          _id: '$location',
          total_value: { $sum: { $multiply: ['$quantity', '$productInfo.price'] } }
        }
      },
      {
        $project: {
          _id: 1,
          total_value: { $round: ['$total_value', 2] }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error aggregating warehouse inventory value:', err);
  } finally {
    await client.close();
  }
}

export async function insertOrders() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    const ordersCollection = db.collection('Orders');
    const ordersToInsert = [
      {
        _id: 1,
        customer_id: 101,
        order_date: new Date('2024-08-12T00:00:00Z'),
        order_details: [
          { product_id: 1, quantity: 2 },
          { product_id: 3, quantity: 1 }
        ]
      },
      {
        _id: 2,
        customer_id: 102,
        order_date: new Date('2024-08-13T00:00:00Z'),
        order_details: [
          { product_id: 2, quantity: 1 },
          { product_id: 4, quantity: 2 }
        ]
      }
    ];
    for (const order of ordersToInsert) {
      await ordersCollection.deleteOne({ _id: order._id });
    }
    const insertResult = await ordersCollection.insertMany(ordersToInsert);
    console.log(`\nInserted ${insertResult.insertedCount} documents into 'Orders' collection.`);
  } catch (err) {
    console.error('Error inserting orders:', err);
  } finally {
    await client.close();
  }
}

export async function getOrderTotals() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    const ordersCollection = db.collection('Orders');
    const productsCollection = db.collection('Products');
    const result = await ordersCollection.aggregate([
      {
        $unwind: '$order_details'
      },
      {
        $lookup: {
          from: 'Products',
          localField: 'order_details.product_id',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      { $unwind: '$productInfo' },
      {
        $project: {
          order_id: '$_id',
          order_date: 1,
          line_total: { $multiply: ['$order_details.quantity', '$productInfo.price'] }
        }
      },
      {
        $group: {
          _id: { order_id: '$order_id', order_date: '$order_date' },
          total_amount: { $sum: '$line_total' }
        }
      },
      {
        $project: {
          _id: 0,
          order_id: '$_id.order_id',
          order_date: '$_id.order_date',
          total_amount: { $round: ['$total_amount', 2] }
        }
      },
      { $sort: { order_id: 1 } }
    ]).toArray();
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error aggregating order totals:', err);
  } finally {
    await client.close();
  }
}

export async function getUnorderedProducts() {
  const client = getClient();
  try {
    const db = client.db('warehouse');
    const productsCollection = db.collection('Products');
    const ordersCollection = db.collection('Orders');

    // Get all product_ids that have been ordered
    const orderedProductIds = await ordersCollection.aggregate([
      { $unwind: "$order_details" },
      { $group: { _id: "$order_details.product_id" } }
    ]).toArray();
    const orderedIds = orderedProductIds.map(doc => doc._id);

    // Find products not in the orderedIds array
    const unorderedProducts = await productsCollection.find({
      _id: { $nin: orderedIds }
    }).toArray();

    if (unorderedProducts.length === 0) {
      console.log('[]');
    } else {
      console.log(JSON.stringify(unorderedProducts, null, 2));
    }
    return unorderedProducts;
  } catch (err) {
    console.error('Error getting unordered products:', err);
  } finally {
    await client.close();
  }
}
