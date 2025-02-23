# Middleware for API

Middleware dalam konteks API adalah perangkat lunak yang bertindak sebagai jembatan antara server dan aplikasi. Middleware memproses request dan response sebelum mencapai route handler atau setelah route handler mengirimkan response. Beberapa contoh middleware pada API termasuk:

1. **Authentication**: Memverifikasi identitas pengguna, misalnya menggunakan token JWT atau OAuth.

2. **Authorization**: Memeriksa apakah pengguna memiliki izin untuk mengakses resource tertentu.

3. **Logging**: Mencatat informasi tentang request dan response, seperti waktu, status, dan data.

4. **Error Handling**: Menangani dan merespons kesalahan yang terjadi selama proses request.

5. **Request Parsing**: Mengurai data dalam request, seperti body JSON atau form data.

6. **CORS (Cross-Origin Resource Sharing)**: Mengatur kebijakan untuk mengizinkan akses dari domain yang berbeda.

7. **Compression**: Mengompresi data response untuk mengurangi ukuran payload dan meningkatkan kecepatan.

8. **Rate Limiting**: Membatasi jumlah request yang dapat dilakukan oleh pengguna dalam periode waktu tertentu untuk mencegah penyalahgunaan atau overload.

9. **Security Headers**: Menambahkan header keamanan untuk melindungi aplikasi dari berbagai jenis serangan seperti XSS atau CSRF.

10. **Caching**: Menyimpan response untuk mengurangi beban pada server dan mempercepat waktu respons untuk request yang sama.

11. **File Upload** (Multer): Menangani upload file (akan dijelaskan detail di bawah).

## Contoh simple penggunaan Middleware (Multer)

Multer adalah middleware Express.js untuk menangani data form multipart/form-data (umum digunakan untuk upload file).

Fitur Utama Multer:

- File Storage: Menyimpan file ke disk atau memori.

- Custom Naming: Memberi nama unik untuk menghindari konflik.

- File Filtering: Membatasi jenis file yang diizinkan.

### 1. Persiapan

Pastikan kamu sudah menginstal express, sqlite3, dan multer:

```
npm install express sqlite3 multer
```

### 2. Struktur Proyek

Buat struktur proyek seperti ini:
```
project/
│
├── index.js
├── db.js
├── uploads/
└── middlewares/
    ├── authMiddleware.js
    ├── loggingMiddleware.js
    ├── errorHandlerMiddleware.js
    ├── corsMiddleware.js
    └── rateLimitingMiddleware.js
```
### 3. Konfigurasi Database SQLite3
Buat file `db.js` untuk konfigurasi SQLite3 seperti sebelumnya:

```js
// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create karyawan table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS karyawan (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT,
      jabatan TEXT
    )
  `);
});

module.exports = db;
```

### 4. Middleware
Buat berbagai middleware di folder `middlewares/`.

`authMiddleware.js` (Authentication)
```js
// middlewares/authMiddleware.js
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    // Simulate token verification
    if (token === 'valid-token') {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

`loggingMiddleware.js` (Logging)
```js
// middlewares/loggingMiddleware.js
module.exports = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
```

`errorHandlerMiddleware.js` (Error Handling)
```js
// middlewares/errorHandlerMiddleware.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};
```

`corsMiddleware.js` (CORS)
```js
// middlewares/corsMiddleware.js
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};
```

`rateLimitingMiddleware.js` (Rate Limiting)
```js
// middlewares/rateLimitingMiddleware.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

module.exports = limiter;
```

### 5. Konfigurasi `Express.js` dan `Multer`

```js
// index.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('./db');

// Import middlewares
const authMiddleware = require('./middlewares/authMiddleware');
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const corsMiddleware = require('./middlewares/corsMiddleware');
const rateLimitingMiddleware = require('./middlewares/rateLimitingMiddleware');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware setup
app.use(loggingMiddleware);
app.use(corsMiddleware);
app.use(rateLimitingMiddleware);
app.use(express.json());

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Apply authentication middleware to all routes
app.use(authMiddleware);

// Routes

// Get all karyawan
app.get('/karyawan', (req, res) => {
  db.all('SELECT * FROM karyawan', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add new karyawan
app.post('/karyawan', (req, res) => {
  const { nama, jabatan } = req.body;
  db.run('INSERT INTO karyawan (nama, jabatan) VALUES (?, ?)', [nama, jabatan], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, nama, jabatan });
    }
  });
});

// Upload file
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ file: req.file });
});

// Error handling middleware should be the last middleware used
app.use(errorHandlerMiddleware);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### 6. Uji API

1. Menjalankan Server: Jalankan server dengan node index.js.

2. Menambahkan Karyawan: Kirim request POST ke http://localhost:3000/karyawan dengan body JSON seperti:
```json
{
  "nama": "John Doe",
  "jabatan": "Manager"
}
```

3. Mendapatkan Semua Karyawan: Kirim request GET ke `http://localhost:3000/karyawan`.

4. Mengupload File: Kirim request POST ke `http://localhost:3000/upload` dengan form-data yang menyertakan file di bawah key `file`.

### ***Untuk menguji API upload file dengan Multer di Postman, ikuti langkah-langkah berikut:***

1. **Buka Postman**: Jalankan aplikasi Postman di komputer Anda.

2. **Buat Request Baru**:
- Klik tombol + untuk membuat request baru.
- Pilih metode POST dari dropdown di sebelah URL.

3. **Masukkan URL**: Masukkan URL endpoint upload file Anda, misalnya:
```bash
http://localhost:3000/upload
```

4. **Pilih Tab Body**:
- Pilih tab Body di bawah URL.

5. **Pilih form-data**:
- Pilih opsi form-data.

6. **Tambahkan Field**:
- Di bawah `form-data`, tambahkan field baru dengan menekan tombol `+.`
- Set `Key` menjadi `file` (ini harus sesuai dengan nama field yang digunakan di `upload.single('file')` di konfigurasi Multer).
- Di sebelah kanan dari `Key`, ada dropdown `Text`, ubah dropdown ini menjadi `File`.
- Klik `Choose Files` dan pilih file yang ingin diupload dari sistem file Anda.

7.  **Kirim Request**
- Klik tombol Send untuk mengirim request.

8. **Menyimpan dan Melihat Response**
- **Response**: Setelah mengirim request, Anda akan melihat response dari server di Postman. Jika upload berhasil, server akan merespons dengan informasi file yang telah diupload, seperti nama file dan lokasi penyimpanannya.
- **Error Handling**: Jika ada kesalahan, misalnya tidak ada file yang dipilih, server akan merespons dengan pesan kesalahan

***Contoh Response***

Response Success:
```json
{
  "file": {
    "fieldname": "file",
    "originalname": "example.txt",
    "encoding": "7bit",
    "mimetype": "text/plain",
    "destination": "uploads/",
    "filename": "1627382821723-example.txt",
    "path": "uploads/1627382821723-example.txt",
    "size": 1024
  }
}
```
Response Error:
```json
{
  "error": "No file uploaded"
}
```

# Middleware untuk API

Middleware dalam konteks API adalah perangkat lunak yang bertindak sebagai jembatan antara server dan aplikasi. Middleware memproses request dan response sebelum mencapai route handler atau setelah route handler mengirimkan response. Berikut penjelasan jenis middleware dan implementasi praktis:

---

## Daftar Middleware Umum
1. **Authentication**: Memverifikasi identitas pengguna (e.g., token JWT/OAuth).
2. **Authorization**: Memeriksa izin akses pengguna.
3. **Logging**: Mencatat aktivitas request-response.
4. **Error Handling**: Menangani kesalahan secara terpusat.
5. **CORS**: Mengatur izin akses lintas domain.
6. **Rate Limiting**: Membatasi frekuensi request.
7. **File Upload (Multer)**: Menangani upload file (*akan dijelaskan detail di bawah*).

---

## Contoh Implementasi Middleware dengan Express.js

### 1. Persiapan
**Instal Package**:
```bash
npm install express sqlite3 multer
```
- `express`: Framework web server
- `sqlite3`: Database sederhana
- `multer`: **Middleware khusus untuk handle upload file** (*penjelasan lengkap di bagian akhir*)

### 2. Struktur Proyek
```
project/
├── index.js         # Entry point aplikasi
├── db.js            # Konfigurasi database
├── uploads/         # Folder penyimpanan file (dibuat otomatis)
└── middlewares/     # Kumpulan middleware
    ├── authMiddleware.js
    ├── loggingMiddleware.js
    └── ...
```

### 3. Konfigurasi Database (SQLite3)
```js
// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Buat tabel karyawan jika belum ada
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS karyawan (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT,
      jabatan TEXT
    )
  `);
});

module.exports = db;
```

---

## Penjelasan Library Multer dan Konfigurasi Storage
**Multer** adalah middleware Express.js untuk menangani data form `multipart/form-data` (umum digunakan untuk upload file). 

### Fitur Utama Multer:
1. **File Storage**: Menyimpan file ke disk atau memori.
2. **Custom Naming**: Memberi nama unik untuk menghindari konflik.
3. **File Filtering**: Membatasi jenis file yang diizinkan.

### Konfigurasi Storage di Backend
Pada contoh kode di `index.js`, kami menggunakan **diskStorage** untuk menyimpan file ke folder `uploads/`:

```js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  # File disimpan di folder 'uploads'
  },
  filename: (req, file, cb) => {
    # Nama file: timestamp + ekstensi asli (e.g., '1627382821723-laporan.pdf')
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
```

**Penjelasan Parameter**:
- `destination`: Fungsi untuk menentukan lokasi penyimpanan file.
- `filename`: Fungsi untuk generate nama file unik.
- `Date.now()`: Menjamin nama file unik dengan timestamp.
- `path.extname()`: Mempertahankan ekstensi file asli.

---

### 4. Implementasi Middleware Lain
**Contoh: Authentication Middleware**
```js
// middlewares/authMiddleware.js
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === 'valid-token') next();
  else res.status(401).json({ error: 'Akses ditolak!' });
};
```

**Contoh: Error Handling Middleware**
```js
// middlewares/errorHandlerMiddleware.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Terjadi kesalahan server!' });
};
```

---

## 5. Konfigurasi Express.js dengan Middleware
```js
// index.js
const express = require('express');
const upload = require('./config/multer');  # Impor konfigurasi Multer

const app = express();

// Terapkan middleware global
app.use(express.json());
app.use(authMiddleware);
app.use(loggingMiddleware);

// Route untuk upload file
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) throw new Error('File tidak ditemukan!');
  res.json({ file: req.file });
});

// Terapkan error handler di akhir
app.use(errorHandlerMiddleware);
```

---

## 6. Testing API dengan Postman

### Upload File:
1. **Endpoint**: `POST /upload`
2. **Body**: Pilih `form-data`
3. **Key**: `file` (tipe `File`)
4. **Pilih File**: Upload dari komputer

**Contoh Response Sukses**:
```json
{
  "file": {
    "fieldname": "file",
    "originalname": "laporan.pdf",
    "filename": "1627382821723-laporan.pdf",
    "path": "uploads/1627382821723-laporan.pdf"
  }
}
```

**Response Error**:
```json
{
  "error": "File tidak ditemukan!"
}
```

---

## FAQ Tentang Multer & Storage
**Q: Apa perbedaan memoryStorage vs diskStorage?**
- `memoryStorage`: File disimpan di RAM (untuk pemrosesan lanjutan seperti upload ke cloud).
- `diskStorage`: File disimpan di direktori server (untuk penyimpanan lokal).

**Q: Bagaimana membatasi ukuran file?**
Tambahkan `limits` pada konfigurasi Multer:
```js
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }  # Maksimal 5MB
});
```

**Q: Bagaimana cara menghapus file yang diupload?**
Gunakan modul `fs` untuk menghapus file secara manual:
```js
const fs = require('fs');
fs.unlinkSync('uploads/1627382821723-laporan.pdf');
```
