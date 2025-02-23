# SQLite
**SQLite** adalah sistem manajemen basis data (Database Management System - DBMS) yang berbasis file. Ini adalah salah satu jenis database yang sangat ringan dan relatif sederhana yang menghilangkan kebutuhan akan server basis data yang terpisah. SQLite digunakan secara luas dalam aplikasi desktop, perangkat mobile, dan bahkan dalam pengembangan web untuk mengelola dan menyimpan data.

**Kenapa Kita Pakai SQLite:**

- *Ringan dan Cepat*: SQLite adalah database yang sangat ringan dan cepat karena bekerja secara lokal di dalam aplikasi tanpa memerlukan server terpisah. Hal ini menjadikannya pilihan yang baik untuk aplikasi berbasis sumber daya terbatas atau perangkat mobile.

- *Tidak Memerlukan Konfigurasi yang Rumit*: SQLite tidak memerlukan konfigurasi server yang rumit seperti sistem manajemen basis data berbasis server lainnya. Ini membuatnya mudah diintegrasikan ke dalam aplikasi.

- *Transaksi ACID*: SQLite mendukung transaksi yang aman (ACID - Atomicity, Consistency, Isolation, Durability), sehingga data kalian dapat dijamin keamanannya.

- *Dukungan Cross-Platform*: SQLite tersedia di berbagai platform, termasuk Windows, macOS, Linux, Android, dan iOS, sehingga aplikasi kalian dapat berjalan di banyak lingkungan.

<br/>

## Database Transaction
Transaksi dalam SQLite merujuk kepada sekumpulan perintah SQL yang dieksekusi bersama-sama sebagai satu kesatuan yang tak dapat dibatalkan (atomic). Dalam konteks basis data, transaksi adalah operasi yang didefinisikan oleh satu atau beberapa perintah SQL yang, ketika dijalankan, entah semuanya berhasil dijalankan atau semuanya gagal, tanpa ada perubahan yang terekspos di antara keadaan awal dan akhir transaksi. Ini dikenal sebagai prinsip ACID, yang merupakan singkatan dari Atomicity, Consistency, Isolation, dan Durability.

Berikut penjelasan singkat tentang setiap komponen prinsip ACID dalam konteks transaksi SQLite:

1. **Atomicity (Atomic)**: Ini berarti bahwa transaksi dianggap sebagai unit tunggal yang tidak dapat dibatalkan. Semua perintah dalam transaksi harus berhasil dijalankan atau tidak ada yang berhasil dijalankan sama sekali. Jika salah satu perintah gagal, transaksi harus dibatalkan, dan perubahan yang mungkin telah dibuat oleh perintah-perintah sebelumnya harus dikembalikan ke keadaan semula.

2. **Consistency (Konsistensi)**: Setiap transaksi harus menjaga integritas data, yang berarti bahwa data harus tetap konsisten sebelum dan setelah transaksi. Ini berarti bahwa transaksi tidak boleh menyebabkan database berada dalam keadaan yang tidak konsisten.

3. **Isolation (Isolasi)**: Transaksi yang sedang berlangsung tidak boleh terpengaruh oleh transaksi lain yang mungkin berjalan secara bersamaan. Ini berarti bahwa dalam konteks transaksi SQLite, perintah dalam satu transaksi tidak boleh melihat atau mempengaruhi perubahan yang dilakukan oleh transaksi lain yang sedang berjalan secara bersamaan.

4. **Durability (Daya Tahan)**: Setelah transaksi berhasil selesai, perubahan yang telah dibuat oleh transaksi tersebut harus tetap ada dalam database meskipun terjadi kegagalan sistem, pemadaman listrik, atau kejadian tak terduga lainnya. Dengan kata lain, data yang telah ditambahkan atau diubah oleh transaksi tersebut harus tetap persisten dalam database.

Dalam SQLite, kalian dapat menggunakan transaksi menggunakan perintah `BEGIN`, `COMMIT`, dan `ROLLBACK` untuk mengendalikan unit transaksi. Misalnya, kalian dapat memulai transaksi dengan `BEGIN`, menjalankan beberapa perintah SQL, dan kemudian mengakhiri transaksi dengan `COMMIT` jika semuanya berhasil atau `ROLLBACK` jika terjadi kegagalan

<br/>

## Cara Menggunakan SQLite dengan Node.js:
***Mini Logic Nolep (proyek-sqlite)***:
Push folder proyek-sqlite ini ke repo week 3, beserta database nya juga.

**Preparing Project**

1. Buat Folder Baru:
- Buka terminal atau command prompt.
- Navigasikan ke direktori tempat Kalian ingin membuat proyek baru.
- Buat folder baru untuk proyek Kalian. Misalnya:

```
mkdir proyek-sqlite
```

2. Masuk ke Folder Proyek:
- Masuk ke folder proyek yang baru dibuat
```
cd proyek-sqlite
```

3. Buat Berkas index.js:
- Buat berkas index.js di dalam folder proyek Kalian:
```
touch index.js
```

4. Inisialisasi Proyek Node.js:
- Jalankan perintah berikut untuk menginisialisasi proyek Node.js:

```
npm init -y
```

Ini akan membuat berkas package.json dengan pengaturan default.

<br/>

5. Instalasi Modul SQLite:
- Sekarang, Kalian dapat menginstal modul SQLite untuk proyek Kalian:

```
npm install sqlite3
```

Ini akan menginstal modul SQLite dan menambahkannya sebagai dependensi ke dalam package.json. 

***Develop Index.js***

1. Import Modul SQLite dan Buat Koneksi:
- Import modul sqlite3 dan buat koneksi ke database SQLite.
- Kode ini seharusnya dijalankan pertama kali saat aplikasi dimulai.

```js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database_karyawan.db');
```

2. Buat Tabel:
- Buat tabel "Karyawan," "Proyek," dan "Pekerjaan" jika belum ada.

```js
async function createTables() {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Karyawan (
        IDKaryawan INTEGER PRIMARY KEY,
        Nama TEXT NOT NULL,
        Usia INTEGER,
        Jabatan TEXT
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS Proyek (
        IDProyek INTEGER PRIMARY KEY,
        NamaProyek TEXT NOT NULL,
        IDKaryawanPenanggung INTEGER,
        FOREIGN KEY (IDKaryawanPenanggung) REFERENCES Karyawan (IDKaryawan)
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS Pekerjaan (
        IDPekerjaan INTEGER PRIMARY KEY,
        NamaPekerjaan TEXT NOT NULL,
        IDProyek INTEGER,
        IDKaryawan INTEGER,
        FOREIGN KEY (IDProyek) REFERENCES Proyek (IDProyek),
        FOREIGN KEY (IDKaryawan) REFERENCES Karyawan (IDKaryawan)
      );
    `);

    console.log('Tabel berhasil dibuat.');
  } catch (error) {
    console.error('Gagal membuat tabel:', error.message);
  }
}

// Panggil fungsi createTables untuk membuat tabel
createTables();
```

3. Menambahkan Data ke Tabel:
- Menambahkan data ke tabel "Karyawan," "Proyek," dan "Pekerjaan."

```js
async function insertData() {
  try {
    await db.exec('BEGIN'); // Memulai transaksi

    await db.run('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['John Doe', 30, 'Manager']);
    await db.run('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Jane Smith', 25, 'Programmer']);
    await db.run('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Bob Johnson', 35, 'Sales']);
    await db.run('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Alice Brown', 28, 'Designer']);

    await db.run('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek A', 2]);
    await db.run('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek B', 4]);
    await db.run('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek C', 1]);

    await db.run('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 1', 101, 2]);
    await db.run('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 2', 101, 2]);
    await db.run('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 3', 101, 4]);
    await db.run('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 4', 102, 4]);
    await db.run('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 5', 103, 1]);

    await db.exec('COMMIT'); // Menyelesaikan transaksi

    console.log('Data berhasil dimasukkan.');
  } catch (error) {
    await db.exec('ROLLBACK'); // Membatalkan transaksi jika terjadi kesalahan
    console.error('Gagal memasukkan data:', error.message);
  }
}

// Panggil fungsi insertData untuk menambahkan data ke tabel
insertData();
```

4. Mengambil dan Menampilkan Data dari Tabel:
- Menggunakan perintah SQL untuk mengambil dan menampilkan data dari tabel "Karyawan," "Proyek," dan "Pekerjaan."
```js
async function displayData() {
  try {
    const karyawanRows = await db.all('SELECT * FROM Karyawan');
    console.log('Data Karyawan:');
    console.table(karyawanRows);

    const proyekRows = await db.all('SELECT * FROM Proyek');
    console.log('Data Proyek:');
    console.table(proyekRows);

    const pekerjaanRows = await db.all('SELECT * FROM Pekerjaan');
    console.log('Data Pekerjaan:');
    console.table(pekerjaanRows);
  } catch (error) {
    console.error('Gagal mengambil data:', error.message);
  }
}

// Panggil fungsi displayData untuk menampilkan data dari tabel
displayData();
```
5. Menutup Koneksi ke Database SQLite:
- Menutup koneksi ke database SQLite setelah selesai.
```js
async function closeDatabase() {
  try {
    await db.close();
    console.log('Koneksi ke database ditutup.');
  } catch (error) {
    console.error('Gagal menutup koneksi:', error.message);
  }
}

// Panggil fungsi closeDatabase untuk menutup koneksi ke database
closeDatabase();
```
Dalam kode di atas, kita telah menggunakan async/await untuk mengelola operasi asinkron secara lebih mudah dibaca dan dipahami. Kalian telah membuat fungsi terpisah untuk setiap langkah seperti membuat tabel, memasukkan data, menampilkan data, dan menutup koneksi database untuk mempermudah pemahaman dan pemeliharaan kode.

***Cek Hasilnya Menggunakan SQLite Browser***

Untuk memeriksa dan mengelola basis data SQLite menggunakan SQLite Browser, Kalian dapat mengikuti langkah-langkah berikut:

**Langkah 1: Instalasi SQLite Browser**

1. Unduh SQLite Browser dari situs web resmi mereka: https://sqlitebrowser.org/
2. Pilih versi yang sesuai dengan sistem operasi Kalian (Windows, macOS, atau Linux).
3. Ikuti panduan instalasi yang diberikan untuk sistem operasi Kalian.
4. Setelah instalasi selesai, jalankan SQLite Browser.

**Langkah 2: Membuka Database `database_karyawan.db`**

1. Buka SQLite Browser yang telah diinstal.
2. Pilih "Open Database" atau "Buka Basis Data" dari menu utama atau gunakan pintasan keyboard (biasanya Ctrl+O pada Windows atau Command+O di macOS).
3. Arahkan ke direktori tempat Kalian menyimpan berkas database_karyawan.db.
4. Pilih berkas database_karyawan.db dan klik "Open" atau "Buka".

Setelah membuka basis data, Kalian akan dapat melihat skema tabel, menjalankan perintah SQL, dan mengeksekusi permintaan kueri untuk memeriksa isi basis data Kalian. Kalian juga dapat memanipulasi data jika diperlukan.

Pastikan Kalian telah menjalankan kode JavaScript yang telah disediakan sebelumnya untuk membuat basis data dan mengisi data. Setelah itu, Kalian dapat membuka basis data dengan SQLite Browser untuk memeriksa isinya.
