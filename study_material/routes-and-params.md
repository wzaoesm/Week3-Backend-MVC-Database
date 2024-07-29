# Routes & Params & Query

kali ini kita akan mengulas dengan detail tentang Routes, Params, dan Query pada API

## Params (Parameters)
Params merujuk pada parameter yang bisa kita ambil dari URL. Ada dua jenis utama:

1. **Route Parameters**:

- Digunakan untuk menangkap bagian tertentu dari URL.
- Ditandai dengan tanda titik dua (:) dalam definisi rute.
- Nilainya bisa diakses melalui req.params.

Contoh: Jika ada rute `/users/:userId/books/:bookId`

```js
const express = require('express');
const app = express();

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

Jika Anda mengakses URL `http://localhost:3000/users/123/books/456`, maka objek req.params akan berisi:
```json
{
  "userId": "123",
  "bookId": "456"
}

```

2. **Query Parameters**:

- Ditambahkan pada akhir URL dengan tanda tanya (?) dan terdiri dari pasangan kunci-nilai yang dipisahkan oleh tanda &.
- Nilainya bisa diakses melalui req.query.

***Kegunaan Query Parameters***

Query Parameters sering digunakan untuk:

1. **Filter dan Pencarian**:

Misalnya, untuk mencari artikel dengan kata kunci tertentu dan membatasi hasil pencarian.
Contoh: `/articles?keyword=tech&limit=10`

2. **Sortir Data**:

Untuk mengurutkan data berdasarkan kriteria tertentu.
Contoh: `/products?sort=price_asc`

3. **Pagination**:

Untuk membagi data menjadi beberapa halaman.
Contoh: `/users?page=2&limit=20`

4. **Pengaturan Tampilan**:

Mengubah cara data ditampilkan.
Contoh: `/dashboard?view=compact`

```js
const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  res.send(req.query);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

```

Jika Anda mengakses URL `http://localhost:3000/search?keyword=nodejs&limit=10`, maka objek req.query akan berisi:

```json
{
  "keyword": "nodejs",
  "limit": "10"
}
```

<br/>

## Routes (Rute)
Routes dalam Express.js menentukan bagaimana aplikasi merespons permintaan klien ke endpoint tertentu. Endpoint ini bisa berupa URL dan metode HTTP tertentu. Beberapa komponen utama dalam routes adalah:

1. **Definisi Rute**:

Rute didefinisikan dengan metode HTTP (seperti GET, POST, PUT, DELETE) dan URL.

```js 
app.get('/path', (req, res) => {
  res.send('GET request to the homepage');
});

app.post('/path', (req, res) => {
  res.send('POST request to the homepage');
});
```

2. **Metode HTTP**:

Beberapa metode HTTP yang sering digunakan dalam routes adalah:
- app.get(path) - untuk permintaan HTTP GET.
- app.post(path) - untuk permintaan HTTP POST.
- app.put(path) - untuk permintaan HTTP PUT.
- app.delete(path) - untuk permintaan HTTP DELETE.

<br/>

3. **Promise (Async/Await)**:

Menggunakan async dan await adalah cara modern dan lebih bersih untuk menangani operasi asynchronous di JavaScript. Ini memungkinkan Anda menulis kode asynchronous yang terlihat dan berperilaku seperti kode synchronous, membuatnya lebih mudah dibaca dan dipahami.

1. `async`: Sebuah kata kunci yang digunakan untuk mendefinisikan fungsi asynchronous. Fungsi ini akan selalu mengembalikan Promise.
2. `await`: Sebuah kata kunci yang hanya dapat digunakan di dalam fungsi async, dan menyebabkan eksekusi fungsi untuk menunggu sampai Promise selesai, dan kemudian mengembalikan hasil Promise.

***Contoh API dengan Async/await***:

Contoh ini menggunakan async dan await untuk mengakses data pengguna dari "database".

```js
// Fungsi untuk mendapatkan user berdasarkan ID, menggunakan Promise
function getUserById(userId) {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.id === parseInt(userId));
    if (user) {
      resolve(user);
    } else {
      reject('User not found');
    }
  });
}

// Endpoint untuk mendapatkan user berdasarkan ID menggunakan async/await
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
```

4. **Chained Route Handlers**:

Anda bisa menggunakan metode chaining untuk menentukan beberapa handler pada rute yang sama.

```js
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });
```


