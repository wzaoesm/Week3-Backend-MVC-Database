# Mongoose (ODM)

***ORM VS ODM***

ORM (Object-Relational Mapping) dan ODM (Object-Document Mapping) adalah dua konsep yang digunakan dalam pengembangan perangkat lunak untuk memudahkan interaksi dengan basis data. Mereka digunakan dalam konteks berbeda tergantung pada tipe basis data yang digunakan:

1. ORM (Object-Relational Mapping):
- Digunakan dalam aplikasi yang menggunakan basis data relasional seperti PostgreSQL, MySQL, atau Oracle.
- ORM menghubungkan objek dalam bahasa pemrograman (seperti Java, Python, atau C#) dengan tabel dalam basis data relasional.
- ORM memungkinkan Kalian untuk berinteraksi dengan basis data relasional menggunakan objek dan query berbasis objek daripada SQL murni. Ini membuat pengembangan lebih mudah karena Kalian dapat berfokus pada manipulasi objek daripada bekerja dengan query SQL yang kompleks.
- Contoh ORM populer termasuk Hibernate untuk Java, Entity Framework untuk .NET, Django ORM untuk Python, Dan Prisma untuk node Js (yang kita pelajari).

2. ODM (Object-Document Mapping):
- Digunakan dalam aplikasi yang menggunakan basis data dokumen, seperti MongoDB, Couchbase, atau Cassandra.
- ODM menghubungkan objek dalam bahasa pemrograman dengan dokumen dalam basis data dokumen.
- ODM memungkinkan Kalian untuk menyimpan, mengambil, dan memanipulasi data dalam bentuk dokumen, yang biasanya dalam format JSON atau BSON, tanpa perlu menulis query SQL.
- Ini sangat berguna dalam pengembangan aplikasi yang menggunakan model data fleksibel, seperti dokumen dalam basis data NoSQL.
- Contoh ODM populer termasuk Mongoose untuk Node.js dan PyMongo untuk Python.

Perbedaan utama antara ORM dan ODM adalah jenis basis data yang mereka dukung dan cara mereka memetakan objek dalam bahasa pemrograman ke struktur data dalam basis data. ORM cocok untuk basis data relasional, sementara ODM lebih sesuai untuk basis data dokumen. Pilihan antara keduanya tergantung pada kebutuhan proyek dan jenis basis data yang Kalian gunakan.

## Mongoose ODM
Mongoose adalah salah satu ODM yang paling populer dan sering digunakan untuk Node.js dalam konteks MongoDB. Mongoose menyediakan alat dan fitur yang kuat untuk mengelola skema basis data, membuat model-data, dan menjalankan operasi CRUD (Create, Read, Update, Delete) pada basis data MongoDB. Berikut beberapa fitur utama Mongoose:

1. **Skema (Schema)**: Mongoose memungkinkan pengembang untuk mendefinisikan skema atau struktur data yang akan disimpan dalam basis data MongoDB. Skema ini menentukan atribut apa yang akan ada pada dokumen dan tipe data masing-masing atribut.

2. **Model**: Mongoose memungkinkan pengembang untuk membuat model-data yang berbasis pada skema yang telah didefinisikan. Model-model ini memungkinkan kalian untuk berinteraksi dengan data dalam basis data MongoDB.

3. **Validasi**: Mongoose menyediakan validasi data otomatis berdasarkan skema yang telah didefinisikan. Ini memastikan bahwa data yang disimpan dalam basis data sesuai dengan aturan yang telah ditetapkan.

4. **Querying**: Mongoose menyediakan API yang kuat untuk menjalankan kueri terhadap basis data MongoDB. Penggunaan Mongoose membuat kueri menjadi lebih mudah dan lebih intuitif.

5. **Middleware**: Mongoose mendukung middleware yang memungkinkan pengembang untuk menambahkan logika sebelum atau sesudah operasi seperti penyimpanan atau pembacaan data.

6. **Referensi dan Referensi Bersarang**: Mongoose mendukung referensi antar-dokumen dan dokumen bersarang, memungkinkan untuk memodelkan hubungan antar data dalam basis data.

7. **Populasi**: Mongoose memungkinkan pengembang untuk mengisi (populate) data yang terkait dalam satu kueri, menghindari kebutuhan untuk kueri berulang-ulang.

8. **Plugin**: Mongoose mendukung penggunaan plugin untuk menambahkan fungsionalitas tambahan ke model-data.

Dengan menggunakan Mongoose, pengembang dapat dengan mudah mengintegrasikan MongoDB ke dalam aplikasi Node.js mereka dan mengelola data dengan cara yang lebih terstruktur. Itu membuat pengembangan dengan MongoDB menjadi lebih efisien dan produktif dalam pengembangan aplikasi berbasis dokumen.

Explore : 
https://mongoosejs.com/ 
Contoh penggunaan Express.js dan Mongoose dapat diilustrasikan dengan membuat API sederhana untuk mengelola data pengguna (user) dalam MongoDB. Berikut adalah langkah-langkah dan contoh kode:

## Setup Project

**Langkah 1: Persiapkan Proyek**

buat proyek Node.js baru dan instal Express.js dan Mongoose sebagai dependensi:

```
npm init -y
npm install express mongoose
```
**Langkah 2: Buat Skema dan Model dengan Mongoose**

Dalam proyek Kalian, buat berkas `models/user.js `untuk mendefinisikan skema pengguna dan modelnya menggunakan Mongoose:

```js
// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

**Langkah 3: Buat Express App**

Buat berkas app.js untuk mengkonfigurasi dan menjalankan aplikasi Express.js:

```js
// app.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Koneksi ke MongoDB (ganti url dengan url dari mongodb Atlas)
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Connection error:', err);
});

// Endpoint untuk menambahkan pengguna baru
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint untuk mendapatkan daftar semua pengguna
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

**Langkah 4: Menjalankan Aplikasi**

Jalankan aplikasi Kalian dengan perintah:

```
node app.js
```

Aplikasi Express.js Kalian sekarang akan berjalan di `http://localhost:3000/`. Kalian dapat menggunakan Postman atau alat pengujian API lainnya untuk mengirim permintaan HTTP ke endpoint `/users` untuk menambahkan dan mendapatkan data pengguna.

Dengan contoh ini, Kalian telah membuat API sederhana dengan Express.js dan menggunakan Mongoose untuk berinteraksi dengan basis data MongoDB. Kalian dapat memperluasnya dengan menambahkan endpoint lain untuk operasi CRUD lebih lanjut dan menambahkan validasi data tambahan sesuai kebutuhan aplikasi Kalian.