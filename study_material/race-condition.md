# Race Condition problem (DB Transaction)

Race condition dalam konteks transaksi database adalah situasi di mana hasil akhir dari transaksi tergantung pada urutan eksekusi operasi yang bersaing. 
Ini bisa menyebabkan hasil yang tidak diinginkan atau inkonsistensi dalam database

## 1.  Pengertian Race Condition

Race condition terjadi ketika dua atau lebih transaksi berkompetisi untuk mengakses dan memodifikasi data yang sama secara bersamaan tanpa sinkronisasi yang tepat. 
Hasil akhir dari transaksi ini bisa bervariasi tergantung pada urutan eksekusi, yang dapat menyebabkan masalah seperti data yang tidak konsisten atau kehilangan pembaruan.

## 2. Contoh Kasus
Misalkan ada dua transaksi yang dilakukan pada saat bersamaan:

  - Transaksi A: Mengupdate saldo rekening dari $1000 menjadi $800.
  - Transaksi B: Mengupdate saldo rekening dari $1000 menjadi $900.
Jika kedua transaksi ini tidak dikelola dengan baik, hasil akhirnya bisa jadi saldo rekening menjadi $900, yang berarti perubahan dari transaksi A hilang.

## 3. Isolasi Transaksi
Untuk mencegah race condition, penting untuk memahami isolasi transaksi. Isolasi transaksi mengacu pada seberapa baik transaksi dilindungi dari dampak transaksi lain yang bersaing.

Ada beberapa tingkat isolasi transaksi yang umum:

  - **Read Uncommitted:** Transaksi dapat membaca data yang belum dikomit. Ini bisa menyebabkan masalah seperti dirty reads.
  - **Read Committed:** Transaksi hanya dapat membaca data yang telah dikomit. Ini mencegah dirty reads tetapi tidak mencegah non-repeatable reads.
  - **Repeatable Read:** Transaksi akan melihat data yang konsisten selama masa hidup transaksi. Ini mengatasi dirty reads dan non-repeatable reads tetapi mungkin tidak menangani phantom reads.
  - **Serializable:** Transaksi diatur sehingga hasilnya identik dengan jika transaksi dieksekusi secara serial (satu per satu). Ini adalah tingkat isolasi yang paling ketat.

## 4. Kunci dan Penguncian
Untuk menangani race condition, banyak sistem database menggunakan mekanisme kunci (locking) untuk mengontrol akses simultan ke data. Ada beberapa jenis kunci yang dapat digunakan:
  - Kunci Eksklusif (Exclusive Lock): Mengunci data sehingga hanya satu transaksi yang dapat mengaksesnya untuk pembaruan.
  - Kunci Baca (Shared Lock): Memungkinkan beberapa transaksi untuk membaca data tetapi tidak untuk memperbarui.

## 5. Penerapan dalam SQL
Untuk mengatasi race condition dalam SQL, Anda dapat menggunakan perintah SQL seperti `BEGIN TRANSACTION`, `COMMIT`, dan `ROLLBACK` untuk memastikan bahwa transaksi dikelola dengan benar. Misalnya:
```sql
BEGIN TRANSACTION;

-- Operasi yang dilakukan oleh Transaksi A
UPDATE rekening SET saldo = saldo - 200 WHERE id_rekening = 1;

-- Operasi lain oleh Transaksi B
UPDATE rekening SET saldo = saldo - 300 WHERE id_rekening = 1;

COMMIT;
```

## 6. Pola Penanganan
Ada beberapa pola umum untuk menangani race condition:

  - Optimistic Concurrency Control **(OCC)** : Mengasumsikan bahwa konflik jarang terjadi dan memeriksa konflik hanya pada saat komit.
  - Pessimistic Concurrency Contro **(PCC)** : Mengunci data secara eksklusif selama transaksi untuk mencegah konflik.

# Perbandingan Pola Penanganan Antara OCC dan PCC

## 1. Optimistic Concurrency Control (OCC)
**Optimistic Concurrency Control** adalah pendekatan di mana sistem berasumsi bahwa konflik antar transaksi jarang terjadi dan memeriksa konflik hanya saat transaksi hendak dikomit. 
OCC lebih ringan dan sering digunakan ketika konflik jarang terjadi.

**Cara Kerja:**
1. Baca Data:
   - Transaksi membaca data dari database tanpa mengunci data tersebut.
     
2. Modifikasi Data:
   - Transaksi melakukan modifikasi data di memori lokal.
  
3. Cek Konflik:
   - Sebelum komit, sistem memeriksa apakah data yang dibaca telah diubah oleh transaksi lain selama transaksi yang sedang berjalan.
   - Biasanya dilakukan dengan memeriksa versi atau timestamp dari data.
  
4. Commit atau Rollback:
   - Jika tidak ada konflik, transaksi dikomit.
   - Jika ada konflik (data yang dibaca telah diubah), transaksi di-roll back, dan pengguna harus menangani konflik tersebut (misalnya, dengan meminta pengguna untuk menyegarkan data dan mencoba lagi).

**Contoh Implementasi (SQL):**
Misalkan kita memiliki tabel rekening dengan kolom version untuk menyimpan versi data:
```sql
CREATE TABLE rekening (
  id SERIAL PRIMARY KEY,
  saldo INTEGER,
  version INTEGER
);

-- Insert data awal
INSERT INTO rekening (saldo, version) VALUES (1000, 1);
```
Contoh proses OCC:
  1. Baca Data:
```sql
SELECT saldo, version FROM rekening WHERE id = 1;
```

  2. Modifikasi Data (di aplikasi):
```sql
new_saldo = saldo - amount
new_version = version + 1

```

  3. Commit Data::
```sql
UPDATE rekening
SET saldo = ?, version = ?
WHERE id = ? AND version = ?;
```
Kelebihan:
  - Performan Lebih Baik: Lebih baik dalam situasi di mana konflik jarang terjadi.
  - Lebih Sedikit Penguncian: Mengurangi kebutuhan untuk mengunci data selama transaksi berlangsung.
    
Kekurangan:
  - Penanganan Konflik: Memerlukan logika tambahan untuk menangani konflik saat transaksi gagal komit.
  - Kompleksitas: Mungkin memerlukan mekanisme untuk menangani kegagalan transaksi.

## 2. Pessimistic Concurrency Control (PCC)
**Pessimistic Concurrency Control** adalah pendekatan di mana sistem menganggap bahwa konflik antar transaksi mungkin sering terjadi dan secara aktif mengunci data yang sedang diakses. 
PCC lebih cocok untuk situasi di mana konflik sering terjadi atau ketika transaksi memerlukan jaminan integritas data yang tinggi.

**Cara Kerja:**
1. Baca Data:
   - Transaksi mengunci data yang akan dibaca untuk mencegah transaksi lain memodifikasinya selama transaksi berjalan.
     
2. Modifikasi Data:
   - Transaksi melakukan modifikasi data di memori lokal.
  
3. Cek Konflik:
   - Setelah modifikasi, transaksi dikomit, dan kunci dilepas.
   - Jika terjadi kesalahan, transaksi di-roll back, dan kunci dilepas.
  
**Contoh Implementasi (SQL):**
Misalkan kita menggunakan PostgreSQL dan kunci baris dengan FOR UPDATE:
```sql
BEGIN;

-- Kunci baris yang akan diupdate
SELECT saldo FROM rekening WHERE id = 1 FOR UPDATE;

-- Lakukan pembaruan saldo
UPDATE rekening SET saldo = saldo - 200 WHERE id = 1;

COMMIT;

```
FOR UPDATE mengunci baris rekening dengan id = 1 untuk mencegah transaksi lain mengubahnya hingga transaksi saat ini selesai.

Kelebihan:
  - Integritas Data Tinggi: Menjamin bahwa tidak ada transaksi lain yang dapat mengubah data yang sedang diakses.
  - Sederhana: Lebih mudah diimplementasikan jika dibandingkan dengan penanganan konflik dalam OCC.
    
Kekurangan:
  - Locking Overhead: Dapat menyebabkan overhead kinerja karena data dikunci untuk durasi transaksi.
  - Deadlock: Berisiko mengalami deadlock jika beberapa transaksi saling mengunci sumber daya.

**Kesimpulan Perbandingan:**
  - OCC lebih efisien ketika konflik jarang terjadi dan mengurangi overhead penguncian, tetapi memerlukan penanganan konflik saat terjadi.
  - PCC lebih cocok ketika integritas data sangat penting dan konflik lebih sering terjadi, tetapi dapat mempengaruhi performa karena penguncian yang lebih berat.
