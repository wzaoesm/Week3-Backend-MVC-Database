# Express JS

## Perkenalan

Express.js adalah kerangka kerja (framework) JavaScript yang berjalan di atas Node.js. Ini adalah salah satu kerangka kerja web yang paling populer dalam ekosistem Node.js. Express.js dirancang khusus untuk mempermudah pembuatan aplikasi web dan API backend dengan cara yang efisien dan sederhana. Berikut adalah beberapa alasan mengapa orang menggunakan Express.js dan cara menggunakannya untuk membuat API backend: Mengapa Menggunakan Express.js: 

1.  <span style="color:red">Ringan dan Minimalis</span>.: Express.js adalah kerangka kerja yang ringan dan minimalis, yang berarti Kalian dapat menggunakannya untuk membangun aplikasi web atau API sesuai dengan kebutuhan Kalian. Kalian dapat menambahkan fungsionalitas tambahan melalui middleware atau paket pihak ketiga sesuai kebutuhan.

2.	<span style="color:red">Rute (Routing) yang Kuat</span>: Express.js menyediakan sistem rute yang kuat untuk mengelola permintaan HTTP ke endpoint yang sesuai. Ini memungkinkan Kalian dengan mudah menentukan berbagai rute yang berbeda untuk menangani permintaan yang berbeda.

3.	<span style="color:red">Middleware</span>: Express.js memungkinkan Kalian untuk menggunakan middleware untuk mengubah dan memproses permintaan HTTP sebelum mencapai endpoint akhir. Ini sangat berguna untuk autentikasi, otorisasi, logging, dan banyak lagi.

4.	<span style="color:red">Ketersediaan Banyak Paket Pihak Ketiga</span>: Ada banyak paket pihak ketiga yang dapat Kalian integrasikan dengan Express.js untuk menambahkan fungsi khusus seperti otentikasi (contoh: Passport.js), validasi input (contoh: express-validator), dan lainnya.

5.	<span style="color:red">Komunitas Besar</span>: Express.js memiliki komunitas yang besar, sehingga Kalian dapat dengan mudah menemukan sumber daya, tutorial, dan bantuan dari komunitas jika menghadapi masalah.

## MEMULAI PROJECT EXPRESS
Cara Menggunakan Express.js untuk Membuat API Backend: Berikut adalah langkah-langkah umum untuk membuat API backend menggunakan Express.js: 

1. <span style="color:red">Inisialisasi Project</span>: Pertama, Kalian perlu membuat proyek Node.js . Kalian dapat melakukannya dengan menjalankan perintah `npm init -y` dalam direktori proyek Kalian dan akan muncul file package.json.

![image](https://github.com/user-attachments/assets/0b5bc161-44b9-4e45-b3ae-72395befe42a)
                                                
2. <span style="color:red">Mempersiapkan Project</span>: Buat folder src dan buat file Bernama `app.js`  Lalu install express dan nodemon dengan menjalankan perintah `npm install express nodemon` Sehingga tampilan schema folder seperti ini

<br/>

```
your-project-directory/
│
├── node_modules/
│
├── src/
│   └── app.js
│
├── package.json
├── package-lock.json
└── .gitignore (optional)

```

Lalu kita ke file `package.json` untuk mengatur project sesuai dengan schema folder kita 

<br/>

```json
{
  "name": "express",
  "version": "1.0.0",
  "description": "",
  "main": "./src/app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon /src/app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.19.2",
    "nodemon": "^3.1.4"
  }
}
```
<br/>

3. <span style="color:red">Inisialisasi Express.js</span>: Buat file JavaScript (biasanya bernama app.js atau server.js) dan inisialisasikan Express.js di dalamnya:

<br/>


```js
const express = require('express'); //import express module
const app = express(); //inisialisasi express
const port = 3000; // Port server akan berjalan

// Middleware
app.use(express.json()); // Middleware untuk parsing JSON

// Definisikan rute-rute API Kalian di sini

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port} 🚀🚀🚀`);
});
```
<br/>

lalu menjalankan perintah `npm run dev` di terminal maka akan menjalankan code di `src/index.js` dan menghasilkan seperti di bawah.

![image](https://github.com/user-attachments/assets/78980379-050e-4a33-b1be-d8173a4d2ba9)


🎖️ <em><strong>Selamat telah menjalankan code express pertamamu </strong></em>🎖️


<br/>

# HTTP Method

HTTP Methods digunakan untuk menunjukkan tindakan yang ingin dilakukan klien API pada sumber daya tertentu. Setiap metode HTTP dipetakan ke operasi tertentu, seperti membuat, membaca, memperbarui, atau menghapus sumber daya, dan metode HTTP harus disertakan dengan setiap permintaan ke REST API.

## Pendahuluan

HTTP methods adalah sekumpulan metode yang digunakan dalam protokol HTTP untuk melakukan berbagai operasi pada server. Berikut adalah penjelasan singkat tentang metode HTTP yang paling umum digunakan:

### GET

Metode GET digunakan untuk meminta data dari server. Data yang diminta dikirimkan dalam URL, dan metode ini biasanya digunakan untuk membaca data.

### POST

Metode POST digunakan untuk mengirim data ke server untuk membuat atau memperbarui sumber daya. Data yang dikirimkan biasanya berada dalam body request.

### PUT

Metode PUT digunakan untuk memperbarui sumber daya yang ada pada server dengan data yang baru. Jika sumber daya belum ada, PUT biasanya akan membuat sumber daya tersebut.

### DELETE

Metode DELETE digunakan untuk menghapus sumber daya dari server.

## Contoh Penggunaan dengan Express.js

Berikut adalah contoh bagaimana menggunakan metode HTTP di atas dengan Express.js dengan menggunakan project dan code yang sama sebelumnya :

install module tambahan dan aplikasi yang akan di gunakan yang di perlukan :

[Postman](https://www.postman.com/downloads/)

[SQLite browse](https://sqlitebrowser.org/dl/)

<br/>

Jalankan peritah di terminal:

`npm install body-parser sqlite3 express`

schema directory projectnya :

```
your-project-directory/
│
├── node_modules/
│
├── src/
│   └── app.js
│
├── package.json
├── package-lock.json
└── .gitignore (optional)
```

<br/>

buat folder bernama `db` dan buat file `database.js`

```
your-project-directory/
│
├── node_modules/
│
├── db/
│   └── database.js
├── src/
│   └── app.js
│
├── package.json
├── package-lock.json
└── .gitignore (optional)
```
<br/>

di dalam file `database.js` tulis code seperti ini

```js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS absences (
    id INTEGER PRIMARY KEY AUTOINCREMENT Unique,
    name TEXT Unique
  )`);
});

module.exports = db;
```

```js
const express = require('express');
const app = express();
const db = require('../db/database');
const port = 3000;

app.use(express.json());

// GET: Mendapatkan semua nama absen
app.get('/absences', (req, res) => {
  db.all("SELECT * FROM absences", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST: Menambahkan absen baru
app.post('/absences', (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO absences (name) VALUES (?)", [name], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, name });
  });
});

// PUT: Merubah absen berdasarkan ID
app.put('/absences/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.run("UPDATE absences SET name = ? WHERE id = ?", [name, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json({ id, name });
  });
});

// DELETE: Menghapus absen berdasarkan ID
app.delete('/absences/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM absences WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

```
jika sudah melakukan langkah-langkah di atas, tinggal kalian jalankan perintah `npm run dev`. perlu di perhatikan ketikan code sudah di jalankan maka akan muncul `database.db`  di dalam folder db yang berarti code dari `database.js` berhasil di jalankan

Langkah selanjutnya kita akan mencoba RESTapi yang telah kita buat menggunakan postman:

### POST
untuk mencoba `API POST` maka ubah tipe pada postman ke POST seperti di gambar

![image](https://github.com/user-attachments/assets/be1a3211-ecc4-466d-92a7-6c3632e82041)

route yang di gunakan adalah `http://localhost:3000/absences` dan mengirimkan data di body dalam bentuk raw json seperti ini

```json
{
    "name": "Terkoiz"
}
```

lalu kita send data tersebut ke API kita makan akan membuat hasil seperti ini

![image](https://github.com/user-attachments/assets/e5e3a9f2-dffd-4ba8-9e09-a4636a78cb0b)

### GET
untuk mencoba `API GET` maka ubah tipe pada postman ke GET. route yang di gunakan adalah `http://localhost:3000/absences` maka akan memunculkan data2 yang telah kita input menggunakan `API POST` seperti ini

```json
[
    {
        "id": 1,
        "name": "Zexovers"
    },
    {
        "id": 2,
        "name": "Terkoiz"
    }
]
```

hasil di postman akan seperti ini

![image](https://github.com/user-attachments/assets/feb84a2e-64d4-46b6-b0cf-fce83a9ae255)

dia akan memberikan data di response

### PUT

untuk mencoba `API PUT` maka ubah tipe pada postman ke PUT. route yang di gunakan adalah `http://localhost:3000/absences/:id`. kita akan mengganti data yang memiliki `'id': 2`.

```json
{
    "id": 2,
    "name": "Terkoiz"
}
```

karna ada params id yang kita butuhkan maka route yg kita gunakan akan seperti ini `http://localhost:3000/absences/2` dengan body bertipe json seperti ini

```json
{
    "name": "Harkon"
}
```
maka akan menghasilkan pada response seperti ini

```json
{
    "id": "2",
    "name": "Harkon"
}
```
jika di lihat dari postman akan seperti ini

![image](https://github.com/user-attachments/assets/fee298dc-ec6c-49a2-9448-e19c1a3a6054)

### DELETE

untuk mencoba `API DELETE` maka ubah tipe pada postman ke PUT. route yang di gunakan adalah `http://localhost:3000/absences/:id` sama seperti `API PUT`. kita akan menghapus data yang memiliki `'id': 2`.

```json
{
    "id": 2,
    "name": "Harkon"
}
```

karna ada params id yang kita butuhkan maka route yg kita gunakan akan seperti ini `http://localhost:3000/absences/2`

jika kalian jalankan makan akan mendapatkan response seperti ini

```json
{
    "id": "2"
}
```
yang menandakan bahwa data sudah di hapus
