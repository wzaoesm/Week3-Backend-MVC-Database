# Database Desain

Kali ini kita akan membahas tentang membuat desain Database yang baik dan benar

Desain database yang baik melibatkan beberapa prinsip kunci untuk memastikan bahwa data tersimpan secara efisien dan konsisten. Berikut adalah beberapa prinsip dasar:

### 1. Normalisasi

Normalisasi adalah proses mengorganisasi data dalam database untuk mengurangi redundansi dan meningkatkan integritas data. Ada beberapa bentuk normalisasi, termasuk:

  - **1NF (First Normal Form)**: Setiap kolom harus menyimpan nilai atomik, dan setiap baris harus unik.
  - **2NF (Second Normal Form)**: Setiap kolom non-primer harus bergantung sepenuhnya pada kunci primer.
  - **3NF (Third Normal Form)**: Semua kolom non-primer harus bergantung hanya pada kunci primer, dan tidak pada kolom non-primer lainnya.


### 2. Hubungan Antar Tabel:

Definisikan hubungan antar tabel dengan menggunakan kunci primer dan kunci 

  - **One-to-One (1:1)**: Satu entitas di tabel A berhubungan dengan satu entitas di tabel B.
  - **One-to-Many (1)**: Satu entitas di tabel A berhubungan dengan banyak entitas di tabel B.
  - **Many-to-Many (N)**: Banyak entitas di tabel A berhubungan dengan banyak entitas di tabel B. Ini biasanya diimplementasikan dengan tabel penghubung.


### 3. Indeks

Gunakan indeks untuk mempercepat pencarian data, tetapi hati-hati dengan over-indexing yang dapat mempengaruhi performa operasi INSERT, UPDATE, dan DELETE.\

### 4. Konsistensi dan Integritas Data:
  - Kunci Utama (Primary Key): Setiap tabel harus memiliki kunci utama yang unik.
  - Kunci Asing (Foreign Key): Kunci asing digunakan untuk memastikan referential integrity antara tabel.

### 5. Dokumentasi
  - Buat diagram Entity-Relationship (ER)
  - Dokumentasikan tujuan setiap tabel dan kolom

### 6. Skalabilitas:
  - Rancang dengan mempertimbangkan pertumbuhan data di masa depan
  - Hindari desain yang terlalu kaku

### 7. Keamanan:
  - Terapkan kontrol akses yang tepat
  - Enkripsi data sensitif

### 8. Kinerja:
  - Optimalkan query dengan mempertimbangkan volume data
  - Hindari penggunaan tipe data yang tidak efisien

## Contoh Studi Kasus

Mari kita ambil contoh untuk sistem manajemen perpustakaan sederhana.
Studi Kasus: Sistem Manajemen Perpustakaan

Kebutuhan:
  - Menyimpan informasi buku
  - Mengelola data anggota perpustakaan
  - Mencatat peminjaman dan pengembalian buku

**Langkah 1: Identifikasi Entitas**:

Entitas utama:
  - Buku
  - Anggota
  - Peminjaman

**Langkah 2: Tentukan Atribut**:

1. Buku:
   - ID_Buku (Kunci Primer)
   - Judul
   - Penulis
   - ISBN
   - Tahun_Terbit
   - Kategori
   - Jumlah_Stok
  
2. Anggota:
   - ID_Anggota (Kunci Primer)
   - Nama
   - Alamat
   - No_Telepon
   - Email
   - Tanggal_Bergabung

3. Peminjaman:
   - ID_Peminjaman (Kunci Primer)
   - ID_Buku (Kunci Asing)
   - ID_Anggota (Kunci Asing)
   - Tanggal_Pinjam
   - Tanggal_Kembali
   - Status

  
**Langkah 3: Normalisasi**:

Tabel sudah dalam bentuk normal ketiga (3NF) karena:

  - Setiap kolom hanya memiliki satu nilai
  - Tidak ada ketergantungan parsial
  -  Tidak ada ketergantungan transitif

**Langkah 4: Buat Diagram ER**:
![image](https://github.com/user-attachments/assets/456695b2-33d8-4890-815e-e73d25c3081e)
kalian bisa membuat diagram di https://dbdiagram.io/d secara online

**Langkah 5: Implementasi SQL**:
```sql
CREATE TABLE Buku (
    ID_Buku INT PRIMARY KEY,
    Judul VARCHAR(100) NOT NULL,
    Penulis VARCHAR(100) NOT NULL,
    ISBN VARCHAR(13) UNIQUE,
    Tahun_Terbit INT,
    Kategori VARCHAR(50),
    Jumlah_Stok INT
);

CREATE TABLE Anggota (
    ID_Anggota INT PRIMARY KEY,
    Nama VARCHAR(100) NOT NULL,
    Alamat VARCHAR(200),
    No_Telepon VARCHAR(15),
    Email VARCHAR(100) UNIQUE,
    Tanggal_Bergabung DATE
);

CREATE TABLE Peminjaman (
    ID_Peminjaman INT PRIMARY KEY,
    ID_Buku INT,
    ID_Anggota INT,
    Tanggal_Pinjam DATE NOT NULL,
    Tanggal_Kembali DATE,
    Status VARCHAR(20),
    FOREIGN KEY (ID_Buku) REFERENCES Buku(ID_Buku),
    FOREIGN KEY (ID_Anggota) REFERENCES Anggota(ID_Anggota)
);
```

**Langkah 6: Indeksasi**
```sql
CREATE INDEX idx_buku_judul ON Buku(Judul);
CREATE INDEX idx_anggota_nama ON Anggota(Nama);
CREATE INDEX idx_peminjaman_tanggal ON Peminjaman(Tanggal_Pinjam);
```

**Langkah 7: Keamanan**
```sql
-- Contoh pemberian hak akses
GRANT SELECT ON Buku TO role_pustakawan;
GRANT SELECT, INSERT, UPDATE ON Peminjaman TO role_pustakawan;
```


Penjelasan:
  - Setiap tabel memiliki kunci primer untuk identifikasi unik.
  - Tabel Peminjaman menggunakan kunci asing untuk menghubungkan dengan Buku dan Anggota.
  - Normalisasi diterapkan untuk menghindari redundansi data.
  - Indeks dibuat untuk mempercepat pencarian.
  - Keamanan diterapkan dengan pemberian hak akses.

Desain ini memungkinkan:
  - Pencarian buku berdasarkan judul, penulis, atau ISBN.
  - Pelacakan stok buku.
  - Manajemen anggota perpustakaan.
  - Pencatatan dan pelacakan peminjaman buku.
