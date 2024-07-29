# POSTMAN
Postman adalah alat yang sangat berguna untuk menguji API (Application Programming Interface). Ini menyediakan antarmuka grafis yang memudahkan pengembang untuk membuat, mengirim, dan menganalisis permintaan HTTP. Berikut adalah materi dan penjelasan lengkap tentang Postman:

## 1. Pengenalan Postman

**Apa Itu Postman?**
Postman adalah alat yang digunakan untuk mengembangkan, menguji, dan mendokumentasikan API. Ini mendukung berbagai metode HTTP seperti GET, POST, PUT, DELETE, PATCH, dan lainnya.

**Fitur Utama Postman**:
- Antarmuka Pengguna Grafis: Memudahkan pembuatan dan pengujian permintaan HTTP.
- Koleksi: Mengorganisir permintaan API ke dalam folder dan subfolder.
- Lingkungan (Environments): Menyimpan variabel yang dapat digunakan dalam permintaan API.
- Uji Otomatis (Automated Testing): Menulis skrip untuk menguji API secara otomatis.
- Dokumentasi: Menghasilkan dokumentasi API secara otomatis.
- Mock Servers: Membuat server tiruan untuk menguji permintaan sebelum API sebenarnya siap.

## 2. Menginstal dan Menyiapkan Postman

**Instalasi**
- Unduh Postman: Kunjungi situs resmi [Postman](https://www.postman.com/downloads/) dan unduh versi yang sesuai untuk sistem operasi Anda.
- Instal: Ikuti petunjuk instalasi yang muncul.

**Pengaturan Awal**
- Setelah instalasi, buka Postman dan buat akun jika diperlukan.
- Anda dapat memulai dengan membuat koleksi pertama Anda untuk mengorganisir permintaan.

## 3. Antarmuka Postman

**1. Tab Utama**
- Request: Tempat untuk menulis dan mengirimkan permintaan HTTP.
- Collections: Mengelola dan mengorganisir permintaan.
- Environments: Menyimpan variabel untuk digunakan dalam permintaan.
- Monitor: Menjadwalkan dan menjalankan pengujian otomatis.
- Mock Servers: Membuat server tiruan.

# Gambar Postman

**2. Komponen Permintaan**
- Method Dropdown: Pilih metode HTTP seperti GET, POST, PUT, DELETE.
- URL Field: Tempat memasukkan URL endpoint API.
- Params: Menambahkan parameter kueri ke URL.
- Headers: Menambahkan header HTTP ke permintaan.
- Body: Menyertakan data dalam permintaan, biasanya untuk metode POST dan PUT.
- Authorization: Mengatur autentikasi untuk API.
- Pre-request Script: Menulis skrip yang dijalankan sebelum permintaan dikirim.
- Tests: Menulis skrip untuk memvalidasi respons API.

# Gambar req postman

## 4. Bekerja dengan Postman

1. Membuat Permintaan
- Pilih metode HTTP (GET, POST, dll.).
- Masukkan URL endpoint API.
- Tambahkan parameter, header, dan body sesuai kebutuhan.
Klik Send untuk mengirimkan permintaan.
2. Menulis Skrip Uji
- Pre-request Script: Menulis kode JavaScript yang dijalankan sebelum permintaan.
- Tests: Menulis kode JavaScript untuk memverifikasi respons API.

```js
// Contoh skrip uji
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

3. Menggunakan Koleksi
- Membuat Koleksi: Klik pada tab Collections, lalu New Collection.
- Menambahkan Permintaan ke Koleksi: Simpan permintaan yang dibuat ke koleksi.
- Menjalankan Koleksi: Jalankan semua permintaan dalam koleksi secara berurutan menggunakan Runner.

4. Menggunakan Environments
- Membuat Environment: Klik pada tab Environments, lalu New Environment.
- Menambahkan Variabel: Masukkan variabel yang dapat digunakan dalam permintaan.
```js
// Contoh variabel environment
{
  "base_url": "https://api.example.com"
}
```
- Menggunakan Variabel: Gunakan variabel dalam URL atau body permintaan seperti {{base_url}}/endpoint.

## 5. Fitur Lanjutan

1. Mock Servers
- Membuat Mock Server: Membuat server tiruan untuk menguji permintaan sebelum API siap.
- Konfigurasi: Atur respons mock dan simpan.
2. Monitor
- Membuat Monitor: Jadwalkan pengujian otomatis untuk permintaan API.
- Pengaturan Monitor: Konfigurasikan jadwal dan pengaturan pengujian.
3. Dokumentasi
- Membuat Dokumentasi: Generasikan dokumentasi dari koleksi permintaan.
- Menyebarluaskan Dokumentasi: Bagikan dokumentasi dengan tim atau publik.

## 6. Contoh Penggunaan
**Contoh Permintaan GET**
- URL: https://api.example.com/users
- Metode: GET
- Header: `Content-Type: application/json`
- Respons 
```json
[
  {
    "id": 1,
    "name": "John Doe"
  },
  {
    "id": 2,
    "name": "Jane Smith"
  }
]
```

<br/>

**Contoh Permintaan POST**
- URL: https://api.example.com/users
- Metode: POST
- Body
```json
{
  "name": "New User"
}
```
- Header: `Content-Type: application/json`
- Respons:
```json
{
  "id": 3,
  "name": "New User"
}
```

## 7. Tips dan Trik
- Gunakan Variabel Global dan Environment: Untuk membuat permintaan lebih dinamis dan mudah dipelihara.
- Uji Respons API: Pastikan API berfungsi dengan benar dengan menggunakan skrip uji.
- Dokumentasikan API Anda: Gunakan fitur dokumentasi untuk membuat dokumentasi yang berguna dan dapat diakses oleh tim.

Disarankan untuk melihat video di youtube
source: https://www.youtube.com/playlist?list=PLhW3qG5bs-L9P22XSnRe4suiWL4acXG-g