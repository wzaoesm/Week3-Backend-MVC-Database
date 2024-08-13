# SQL Query Cheat Sheet (Versi RPN)

pada tahap ini kalian akan diberikan cheat sheet query2 yang akan sering di gunakan di pada real project nantinya

### 1. SELECT - Mengambil data dari tabel

```sql
SELECT column1, column2 FROM table_name;
```
Kegunaan: Menampilkan kolom tertentu dari sebuah tabel.

Contoh: 
```sql
SELECT product_name, price FROM Products;
```
Output:
```sql
product_name | price
-------------+-------
Laptop       | 999.99
Desk Chair   | 199.99
```

### 2. WHERE - Memfilter data

```sql
SELECT column1, column2 FROM table_name WHERE condition;
```
Kegunaan: Menampilkan data yang memenuhi kondisi tertentu.

Contoh:
```sql
SELECT product_name, category, price FROM Products WHERE category = 'Electronics';
```
Output:
```sql
product_name |   category  | price 
-------------+-------------+-------
Laptop       | Electronics | 999.99
Printer      | Electronics | 299.99
```

### 3. ORDER BY - Mengurutkan hasil

```sql
SELECT column1, column2 FROM table_name ORDER BY column1 [ASC|DESC];
```
Kegunaan: Mengurutkan hasil query berdasarkan kolom tertentu.

Contoh:
```sql
SELECT product_name, price FROM Products ORDER BY price DESC;
```
Output:
```sql
product_name | price
-------------+-------
Laptop       | 999.99
Printer      | 299.99
Desk Chair   | 199.99
```

### 4. INSERT INTO - Menambahkan data baru

```sql
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
```
Kegunaan: Menambahkan baris baru ke dalam tabel.

Contoh:
```sql
INSERT INTO Products (product_name, category, price) VALUES ('Smartphone', 'Electronics', 599.99);
SELECT * FROM Products;
```
Output:
```sql
product_id | product_name | category    | price
-----------+--------------+-------------+-------
1          | Laptop       | Electronics | 999.99
2          | Desk Chair   | Furniture   | 199.99
3          | Smartphone   | Electronics | 599.99
```

### 5. UPDATE - Mengubah data yang ada

```sql
UPDATE table_name SET column1 = value1 WHERE condition;
```
Kegunaan: Mengubah nilai dalam tabel yang memenuhi kondisi tertentu.

Contoh:
```sql
UPDATE Products SET price = 1099.99 WHERE product_name = 'Laptop';
SELECT * FROM Products WHERE product_name = 'Laptop';
```
Output:
```sql
product_id | product_name | category    | price
-----------+--------------+-------------+--------
1          | Laptop       | Electronics | 1099.99
```

### 6. UPDATE - Mengubah data yang ada

```sql
UPDATE table_name SET column1 = value1 WHERE condition;
```
Kegunaan: Menghapus baris dari tabel yang memenuhi kondisi tertentu.

Contoh:
```sql
DELETE FROM Products WHERE product_name = 'Smartphone';
SELECT * FROM Products;
```
Output:
```sql
product_id | product_name | category    | price
-----------+--------------+-------------+--------
1          | Laptop       | Electronics | 1099.99
2          | Desk Chair   | Furniture   | 199.99
```

### 7. JOIN - Menggabungkan data dari beberapa tabel

```sql
SELECT column1, column2 FROM table1
JOIN table2 ON table1.column = table2.column;
```
Kegunaan: Menggabungkan data dari dua atau lebih tabel berdasarkan kolom yang berhubungan.

Contoh:
```sql
SELECT p.product_name, i.quantity, i.location
FROM Products p
JOIN Inventory i ON p.product_id = i.product_id;
```
Output:
```sql
product_name | quantity | location
-------------+----------+------------
Laptop       | 50       | Warehouse A
Desk Chair   | 30       | Warehouse B
```

### 8. GROUP BY dengan agregasi

```sql
SELECT column1, AGG_FUNCTION(column2) FROM table_name GROUP BY column1;
```
Kegunaan: Mengelompokkan hasil berdasarkan satu atau lebih kolom dan melakukan operasi agregasi.

Contoh:
```sql
SELECT category, AVG(price) as avg_price FROM Products GROUP BY category;
```
Output:
```sql
category    | avg_price
------------+----------
Electronics | 1099.99
Furniture   | 199.99
```

### 9. HAVING - Memfilter hasil GROUP BY

```sql
SELECT column1, AGG_FUNCTION(column2)
FROM table_name
GROUP BY column1
HAVING AGG_FUNCTION(column2) > value;
```
Kegunaan: Memfilter hasil dari GROUP BY berdasarkan kondisi agregasi.

Contoh:
```sql
SELECT category, AVG(price) as avg_price
FROM Products
GROUP BY category
HAVING AVG(price) > 500;
```
Output:
```sql
category    | avg_price
------------+----------
Electronics | 1099.99
```

### 10. Subquery

```sql
SELECT column1 FROM table1
WHERE column2 IN (SELECT column2 FROM table2 WHERE condition);
```
Kegunaan: Menggunakan hasil dari satu query sebagai input untuk query lain.

Contoh:
```sql
SELECT product_name FROM Products
WHERE product_id IN (SELECT product_id FROM Inventory WHERE quantity > 40);
```
Output:
```sql
product_name
-------------
Laptop
```

### 11. LIMIT - Membatasi jumlah hasil

```sql
SELECT column1, column2 FROM table_name LIMIT number;
```
Kegunaan: Membatasi jumlah baris yang dikembalikan oleh query.

Contoh:
```sql
SELECT product_name, price FROM Products ORDER BY price DESC LIMIT 2;
```
Output:
```sql
product_name | price
-------------+--------
Laptop       | 1099.99
Printer      | 299.99
```

### 12. DISTINCT - Menghilangkan duplikat

```sql
SELECT DISTINCT column1 FROM table_name;
```
Kegunaan: Menampilkan nilai unik dari suatu kolom, menghilangkan duplikat.

Contoh:
```sql
SELECT DISTINCT category FROM Products;
```
Output:
```sql
category
-----------
Electronics
Furniture
```

### 13. LIKE - Pencarian pola

```sql
SELECT column1, column2 FROM table_name WHERE columnN LIKE pattern;
```
Kegunaan: Mencari nilai yang cocok dengan pola tertentu.

Contoh:
```sql
SELECT product_name FROM Products WHERE product_name LIKE '%Chair%';
```
Output:
```sql
product_name
------------
Desk Chair
```

### 14. UNION - Menggabungkan hasil dari dua atau lebih SELECT

```sql
SELECT column1 FROM table1
UNION
SELECT column1 FROM table2;
```
Kegunaan: Menggabungkan hasil dari dua atau lebih pernyataan SELECT.

Contoh:
```sql
SELECT product_name FROM Products WHERE category = 'Electronics'
UNION
SELECT product_name FROM Products WHERE price > 500;
```
Output:
```sql
product_name
------------
Laptop
Printer
```

### 15. UNION - Menggabungkan hasil dari dua atau lebih SELECT

```sql
CREATE VIEW view_name AS
SELECT column1, column2
FROM table_name
WHERE condition;
```
Kegunaan: Membuat view (tabel virtual) berdasarkan hasil dari sebuah SELECT statement.

Contoh:
```sql
CREATE VIEW expensive_products AS
SELECT product_name, price
FROM Products
WHERE price > 500;

SELECT * FROM expensive_products;
```
Output:
```sql
product_name | price
-------------+--------
Laptop       | 1099.99
```

### 16. CASE - Melakukan logika kondisional

```sql
SELECT column1,
       CASE
           WHEN condition1 THEN result1
           WHEN condition2 THEN result2
           ELSE result3
       END AS new_column
FROM table_name;
```
Kegunaan: Menambahkan logika kondisional ke dalam query SELECT.

Contoh:
```sql
SELECT product_name, price,
       CASE
           WHEN price < 200 THEN 'Budget'
           WHEN price < 500 THEN 'Mid-range'
           ELSE 'Premium'
       END AS price_category
FROM Products;
```
Output:
```sql
product_name | price   | price_category
-------------+---------+----------------
Laptop       | 1099.99 | Premium
Desk Chair   | 199.99  | Budget
Printer      | 299.99  | Mid-range
```
