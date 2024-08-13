# No-SQL Query Cheat Sheet (Versi RPN)

pada tahap ini kalian akan diberikan cheat sheet query2 yang akan sering di gunakan di pada real project nantinya menggunakan database MongoDB. 
***disarankan untuk membaca documentasi resminya langsung untuk mengetahui lebih detail***

### 1. Menyisipkan Dokumen (Insert)

```js
db.collection.insertOne({field1: value1, field2: value2})
```
Kegunaan: Menyisipkan satu dokumen ke dalam koleksi.

Contoh: 
```js
db.products.insertOne({name: "Laptop", price: 999.99, category: "Electronics"})
```
Output:
```json
{
  "acknowledged": true,
  "insertedId": ObjectId("...")
}
```

### 2. Mencari Dokumen (Find)

```js
db.collection.find({field: value})
```
Kegunaan: Mencari dokumen dalam koleksi.

Contoh: 
```js
db.products.find({category: "Electronics"})
```
Output:
```json
[
  {
    "_id": ObjectId("..."),
    "name": "Laptop",
    "price": 999.99,
    "category": "Electronics"
  },
  {
    "_id": ObjectId("..."),
    "name": "Smartphone",
    "price": 599.99,
    "category": "Electronics"
  }
]
```

### 3. Memperbarui Dokumen (Update)

```js
db.collection.updateOne({filter}, {$set: {field: new_value}})
```
Kegunaan: Memperbarui satu dokumen yang cocok dengan filter.

Contoh: 
```js
db.products.updateOne({name: "Laptop"}, {$set: {price: 1099.99}})
```
Output:
```json
{
  "acknowledged": true,
  "matchedCount": 1,
  "modifiedCount": 1
}
```

### 4. Menghapus Dokumen (Delete)

```js
db.collection.deleteOne({field: value})
```
Kegunaan: Menghapus satu dokumen yang cocok dengan kriteria.

Contoh: 
```js
db.products.deleteOne({name: "Smartphone"})
```
Output:
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

### 5. Menghitung Dokumen (Count)

```js
db.collection.countDocuments({field: value})
```
Kegunaan: Menghitung jumlah dokumen yang cocok dengan kriteria.

Contoh: 
```js
db.products.countDocuments({category: "Electronics"})
```
Output:
```json
1
```

### 6. Agregasi (Aggregation)

```js
db.collection.aggregate([
  {$match: {field: value}},
  {$group: {_id: "$field", total: {$sum: "$anotherField"}}}
])
```
Kegunaan: Melakukan operasi agregasi pada dokumen.

Contoh: 
```js
db.products.aggregate([
  {$group: {_id: "$category", avgPrice: {$avg: "$price"}}}
])
```
Output:
```json
db.products.aggregate([
  {$group: {_id: "$category", avgPrice: {$avg: "$price"}}}
])
```

### 7. Indeks (Index)

```js
db.collection.createIndex({field: 1})
```
Kegunaan: Membuat indeks untuk meningkatkan kinerja query.

Contoh: 
```js
db.products.createIndex({name: 1})
```
Output:
```json
{
  "createdCollectionAutomatically": false,
  "numIndexesBefore": 1,
  "numIndexesAfter": 2,
  "ok": 1
}
```

### 8. Indeks (Index)

```js
db.collection.find().limit(n).skip(m)
```
Kegunaan: Membatasi jumlah hasil dan melewati sejumlah dokumen (berguna untuk paginasi).

Contoh: 
```js
db.products.find().limit(2).skip(1)
```
Output:
```json
[
  {
    "_id": ObjectId("..."),
    "name": "Desk Chair",
    "price": 199.99,
    "category": "Furniture"
  },
  {
    "_id": ObjectId("..."),
    "name": "Bookshelf",
    "price": 149.99,
    "category": "Furniture"
  }
]
```

### 9. Sort (Pengurutan)

```js
db.collection.find().sort({field: 1}) // 1 untuk ascending, -1 untuk descending
```
Kegunaan: Mengurutkan hasil query.

Contoh: 
```js
db.products.find().sort({price: -1})
```
Output:
```json
[
  {
    "_id": ObjectId("..."),
    "name": "Laptop",
    "price": 1099.99,
    "category": "Electronics"
  },
  {
    "_id": ObjectId("..."),
    "name": "Desk Chair",
    "price": 199.99,
    "category": "Furniture"
  }
]
```

### 10. Distinct

```js
db.collection.distinct("field")
```
Kegunaan: Mendapatkan nilai unik dari suatu field.

Contoh: 
```js
db.products.distinct("category")
```
Output:
```json
["Electronics", "Furniture"]
```

***untuk penjelasan lebih detailnya di sarankan membuka documentasi MongoDB querynya***
