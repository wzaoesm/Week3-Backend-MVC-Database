# Document Database MongoDB

MongoDB adalah salah satu jenis database NoSQL yang populer. MongoDB adalah database berorientasi dokumen yang dirancang untuk menyimpan, mengelola, dan mengakses data dalam bentuk dokumen JSON-like yang fleksibel. Berikut adalah beberapa informasi dasar tentang MongoDB:

1. **Struktur Data**: MongoDB menyimpan data dalam dokumen, yang mirip dengan format JSON. Dokumen-dokumen ini dikelompokkan dalam koleksi yang setara dengan tabel dalam database relasional. Setiap dokumen dalam koleksi dapat memiliki struktur yang berbeda-beda tanpa perlu mengikuti skema yang ketat. Hal ini membuat MongoDB sangat fleksibel dan cocok untuk mengelola data yang berubah-ubah atau tidak memiliki struktur yang tetap.

2. **Skalabilitas**: MongoDB dirancang untuk memungkinkan skalabilitas horizontal yang mudah. Kalian dapat dengan mudah menambahkan server MongoDB baru ke dalam cluster untuk meningkatkan kapasitas dan kinerja database tanpa perlu mengganggu operasi yang sedang berjalan.

3. **Query dan Indexing**: MongoDB mendukung berbagai jenis kueri dan indexing yang memungkinkan pencarian data yang efisien. Kalian dapat melakukan kueri terhadap dokumen berdasarkan nilai-nilai dalam dokumen tersebut.

4. **Replication**: MongoDB memiliki dukungan untuk replikasi data secara otomatis. Ini berarti kalian dapat membuat salinan data yang dapat digunakan jika satu server mengalami kegagalan. Replikasi juga dapat meningkatkan ketersediaan data.

5. **Sharding**: MongoDB juga mendukung sharding, yang memungkinkan data untuk dibagi menjadi beberapa bagian yang disebut shard. Ini membantu dalam memecahkan masalah performa dan penyimpanan untuk basis data yang sangat besar.

6. **TTL (Time-to-Live) Index**: MongoDB mendukung indeks TTL yang memungkinkan kalian untuk menghapus otomatis dokumen setelah jangka waktu tertentu. Hal ini berguna untuk data yang memiliki masa berlaku atau data yang perlu dihapus secara berkala.

7. **Dukungan untuk Berbagai Bahasa dan Platform**: MongoDB memiliki driver untuk banyak bahasa pemrograman yang berbeda, sehingga kalian dapat mengintegrasikannya dengan berbagai aplikasi. Selain itu, MongoDB dapat dijalankan di berbagai platform, termasuk Windows, Linux, dan macOS.

MongoDB sering digunakan dalam berbagai jenis aplikasi, seperti aplikasi web, e-commerce, permainan, analisis data, dan banyak lagi. Kelebihan utamanya adalah fleksibilitas dalam mengelola data yang berubah-ubah dan kemampuan untuk melakukan skalabilitas dengan mudah.

<br/>

## _Contoh Data MongoDB_
MongoDB adalah database NoSQL yang berfokus pada dokumen, bukan pada tabel dan baris seperti database relasional. Oleh karena itu, MongoDB tidak memiliki "tabel" dalam arti yang sama seperti database SQL tradisional. Sebagai gantinya, MongoDB menggunakan "koleksi" untuk mengorganisasi dokumen. Dokumen dalam koleksi tidak perlu memiliki skema yang sama atau struktur yang seragam, membuatnya sangat fleksibel.

Sebagai contoh, kita bisa menggambarkan beberapa dokumen dalam koleksi "pengguna" di MongoDB. Asumsikan kita memiliki koleksi pengguna yang menyimpan informasi tentang pengguna aplikasi:

```json
{
  "_id": 1,
  "nama": "John Doe",
  "email": "johndoe@email.com",
  "usia": 30,
  "alamat": {
    "jalan": "123 Main Street",
    "kota": "New York",
    "kode_pos": "10001"
  }
}
```

Dokumen ini adalah contoh data pengguna dengan beberapa atribut, termasuk nama, email, usia, dan alamat dalam bentuk objek bersarang. Setiap dokumen dalam koleksi "pengguna" dapat memiliki struktur yang berbeda, sesuai dengan informasi yang dimiliki oleh pengguna tersebut.

Contoh lainnya mungkin adalah dokumen dalam koleksi "produk," yang berisi informasi tentang produk-produk dalam toko online:

```json
{
  "_id": 101,
  "nama_produk": "Smartphone XYZ",
  "harga": 500,
  "stok": 100,
  "kategori": "Elektronik"
}
```

Dokumen ini berisi informasi tentang satu produk, termasuk nama produk, harga, stok, dan kategori.

Dalam MongoDB, tidak ada "relasi" dalam arti yang sama seperti database SQL relasional. Hubungan antara dokumen di MongoDB biasanya dikelola dengan cara menanamkan satu dokumen ke dalam dokumen lain atau dengan menggunakan referensi antar-dokumen melalui ID unik. Ini memungkinkan Kalian untuk membuat struktur data yang fleksibel dan mengakses data yang berhubungan secara efisien. 

<br/>

## Relasi MongoDB
Namun, Kalian dapat menciptakan hubungan antara dokumen dalam MongoDB dengan beberapa cara:

1. **Embedding (Penanaman)**: Kalian dapat menanamkan satu dokumen dalam dokumen lain sebagai cara untuk menggambarkan hubungan. Sebagai contoh, pertimbangkan kasus di mana Kalian memiliki dokumen untuk pengguna dan dokumen untuk komentar pengguna pada sebuah blog. Kalian dapat menanamkan dokumen komentar ke dalam dokumen pengguna:
```json
{
  "_id": 1,
  "nama": "John Doe",
  "komentar": [
    {
      "teks": "Artikel yang bagus!",
      "tanggal": "2023-09-17"
    },
    {
      "teks": "Terima kasih atas informasinya.",
      "tanggal": "2023-09-18"
    }
  ]
}
```

Dalam contoh ini, komentar-komentar terkait dengan pengguna tertentu ditanamkan dalam dokumen pengguna.

2. **Referensi**: Sebagai alternatif, Kalian juga dapat menggunakan referensi antara dokumen. Dalam hal ini, Kalian akan menyimpan ID dokumen yang berkaitan sebagai referensi dalam dokumen utama. Misalnya, Kalian bisa memiliki dokumen pengguna:
```json
{
  "_id": 1,
  "nama": "John Doe",
  "komentar_ids": [101, 102]
}
```

Dan kemudian dokumen komentar terpisah:
```json
{
  "_id": 101,
  "teks": "Artikel yang bagus!",
  "tanggal": "2023-09-17"
}
{
  "_id": 102,
  "teks": "Terima kasih atas informasinya.",
  "tanggal": "2023-09-18"
}
```

Dalam contoh ini, dokumen pengguna memiliki referensi (IDs) ke dokumen komentar terkait.

Pilihan antara penanaman dan referensi tergantung pada kasus penggunaan Kalian dan seberapa sering Kalian harus mengakses atau memodifikasi data. Kalian harus mempertimbangkan struktur data dan kebutuhan akses data Kalian ketika merancang basis data MongoDB Kalian. 

## Studi Kasus

Deskripsi Kasus:

Anda bekerja di sebuah perusahaan yang menggunakan MongoDB untuk menyimpan data karyawan. Data karyawan memiliki beberapa atribut seperti ID, nama, jabatan, dan gaji. Anda diminta untuk mengelola dan melakukan query pada data karyawan tersebut.

**Skema Data Karyawan:**
```json
{
  "_id": ObjectId("..."),
  "id_karyawan": "K001",
  "nama": "Budi Santoso",
  "jabatan": "Software Engineer",
  "gaji": 8000000,
  "tanggal_masuk": ISODate("2022-01-15T00:00:00Z")
}
```

**Contoh Data**

Misalkan kita memiliki koleksi `karyawan` dengan data berikut:
```json
[
  {
    "_id": ObjectId("64a9e8c3b11b75d4b0f9b7b8"),
    "id_karyawan": "K001",
    "nama": "Budi Santoso",
    "jabatan": "Software Engineer",
    "gaji": 8000000,
    "tanggal_masuk": ISODate("2022-01-15T00:00:00Z")
  },
  {
    "_id": ObjectId("64a9e8c3b11b75d4b0f9b7b9"),
    "id_karyawan": "K002",
    "nama": "Siti Nurhaliza",
    "jabatan": "Data Scientist",
    "gaji": 8500000,
    "tanggal_masuk": ISODate("2021-06-01T00:00:00Z")
  },
  {
    "_id": ObjectId("64a9e8c3b11b75d4b0f9b7ba"),
    "id_karyawan": "K003",
    "nama": "Andi Wijaya",
    "jabatan": "UX Designer",
    "gaji": 7500000,
    "tanggal_masuk": ISODate("2023-03-20T00:00:00Z")
  }
]
```

### Contoh Query dan Output

1. **Menampilkan Semua Karyawan**:

**Query:**
```js
db.karyawan.find().pretty()
```

**Output**
```json
[
  {
    "_id": ObjectId("64a9e8c3b11b75d4b0f9b7b8"),
    "id_karyawan": "K001",
    "nama": "Budi Santoso",
    "jabatan": "Software Engineer",
    "gaji": 8000000,
    "tanggal_masuk": ISODate("2022-01-15T00:00:00Z")
  },
  {
    "_id": ObjectId("64a9e8c3b11b75d4b0f9b7b9"),
    "id_karyawan": "K002",
    "nama": "Siti Nurhaliza",
    "jabatan": "Data Scientist",
    "gaji": 8500000,
    "tanggal_masuk": ISODate("2021-06-01T00:00:00Z")
  },
  {
    "_id": ObjectId("64a9e8c3b11b75d4b0f9b7ba"),
    "id_karyawan": "K003",
    "nama": "Andi Wijaya",
    "jabatan": "UX Designer",
    "gaji": 7500000,
    "tanggal_masuk": ISODate("2023-03-20T00:00:00Z")
  }
]
```

2. **Mencari Karyawan Berdasarkan Jabatan**:

**Query:**
```js
db.karyawan.find({ jabatan: "Data Scientist" }).pretty()
```

**Output**
```json
{
  "_id": ObjectId("64a9e8c3b11b75d4b0f9b7b9"),
  "id_karyawan": "K002",
  "nama": "Siti Nurhaliza",
  "jabatan": "Data Scientist",
  "gaji": 8500000,
  "tanggal_masuk": ISODate("2021-06-01T00:00:00Z")
}
```

3. **Mencari Karyawan dengan Gaji Lebih dari 8000000**:

**Query:**
```js
db.karyawan.find({ gaji: { $gt: 8000000 } }).pretty()
```

**Output**
```json
{
  "_id": ObjectId("64a9e8c3b11b75d4b0f9b7b9"),
  "id_karyawan": "K002",
  "nama": "Siti Nurhaliza",
  "jabatan": "Data Scientist",
  "gaji": 8500000,
  "tanggal_masuk": ISODate("2021-06-01T00:00:00Z")
}
```

4. **Mengupdate Gaji Karyawan Berdasarkan ID**:

**Query:**
```js
db.karyawan.updateOne(
  { id_karyawan: "K003" },
  { $set: { gaji: 7800000 } }
)

```

**Output**
```json
{
  "_id": ObjectId("64a9e8c3b11b75d4b0f9b7ba"),
  "id_karyawan": "K003",
  "nama": "Andi Wijaya",
  "jabatan": "UX Designer",
  "gaji": 7800000,
  "tanggal_masuk": ISODate("2023-03-20T00:00:00Z")
}
```

5. **Menghapus Karyawan Berdasarkan ID**:

**Query:**
```js
db.karyawan.deleteOne({ id_karyawan: "K001" })
```

**Output**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```
Ini adalah beberapa contoh query dan operasi yang bisa dilakukan pada koleksi `karyawan` di MongoDB
