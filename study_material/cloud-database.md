# Cloud Database

Cloud database, atau database berbasis awan, adalah jenis database yang dihosting dan dioperasikan di cloud computing. Dalam cloud database, kalian tidak perlu mengelola infrastruktur fisik seperti server fisik atau perangkat penyimpanan sendiri. Sebaliknya, kalian dapat menyimpan, mengakses, dan mengelola data kalian melalui layanan cloud yang disediakan oleh penyedia layanan cloud.

Berikut adalah beberapa konsep utama terkait dengan cloud database:

1. **Infrastruktur Cloud**: Kalian dapat memanfaatkan infrastruktur cloud yang disediakan oleh penyedia seperti Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), dan banyak lagi. Penyedia cloud ini menyediakan server, jaringan, dan perangkat penyimpanan yang dapat kalian gunakan untuk menyimpan dan mengelola data kalian.

2. **Skalabilitas**: Cloud database memungkinkan kalian untuk dengan mudah meningkatkan atau mengurangi kapasitas dan sumber daya sesuai kebutuhan kalian. Ini dapat dilakukan tanpa perlu berinvestasi dalam perangkat keras tambahan atau melakukan perubahan fisik yang kompleks.

3. **Ketersediaan Tinggi**: Layanan cloud biasanya menyediakan tingkat ketersediaan yang tinggi dengan dukungan otomatis untuk replikasi data, pemulihan bencana, dan manajemen otomatis. Hal ini memastikan data kalian tetap tersedia bahkan jika terjadi gangguan.

4. **Keamanan**: Penyedia cloud umumnya menyediakan lapisan keamanan tambahan dan alat untuk mengamankan data kalian. Selain itu, kalian dapat mengatur pengendalian akses, enkripsi data, dan audit keamanan sesuai kebutuhan kalian.

5. **Manajemen Data**: Kalian dapat mengelola data kalian menggunakan antarmuka pengelolaan yang disediakan oleh penyedia cloud. Ini termasuk membuat basis data, mengelola tabel atau koleksi data, menjalankan kueri, dan memantau kinerja.

6. **Komersialisasi**: Penyedia cloud biasanya mengenakan biaya berdasarkan penggunaan sebenarnya, yang dapat mencakup kapasitas penyimpanan, penggunaan sumber daya komputasi, dan transfer data. Ini memungkinkan kalian untuk menghemat biaya jika kalian hanya menggunakan sumber daya sesuai kebutuhan.

Cloud database telah menjadi solusi yang populer bagi banyak organisasi karena fleksibilitas, skalabilitas, dan kemudahan manajemennya. Mereka memungkinkan kalian untuk fokus pada pengembangan aplikasi dan manajemen data tanpa harus khawatir tentang infrastruktur dasar.

<br/>

## MongoDb Atlas (No SQL)
MongoDB Atlas adalah layanan database manajemen cloud yang disediakan oleh MongoDB, Inc. Ini adalah salah satu cara untuk menyelenggarakan dan mengelola database MongoDB dalam lingkungan cloud tanpa perlu mengelola infrastruktur fisik atau virtual secara langsung. MongoDB Atlas memungkinkan pengguna untuk dengan mudah membuat, mengonfigurasi, dan mengelola basis data MongoDB mereka dalam cloud.

Kita akan memakai deployment MongoDb Atlas untuk tugas tugas di week4. 

Tentu, berikut adalah langkah-langkah untuk membuat database di MongoDB Atlas dan mendapatkan URL koneksi:

1. Buat Akun MongoDB Atlas:
- Kunjungi situs web MongoDB Atlas di https://www.mongodb.com/cloud/atlas.
- Klik tombol "Get started free" atau "Start Free" (tergantung pada tampilan situs web pada saat itu) untuk memulai proses pendaftaran.

2. Isi Informasi Akun:
- Daftarkan akun kalian dengan mengisi informasi yang diperlukan, seperti alamat email, kata sandi, dan detail organisasi.

3. Pilih Rencana (Plan):
- Setelah akun terdaftar, MongoDB Atlas akan meminta kalian untuk memilih rencana (plan). Kalian dapat memilih rencana gratis atau berbayar sesuai kebutuhan kalian. Untuk tujuan pembelajaran, rencana gratis adalah pilihan yang baik.

4. Konfigurasi Cluster:
- Setelah memilih rencana, MongoDB Atlas akan meminta kalian untuk mengonfigurasi cluster database kalian. Klik "Create a cluster" atau langkah serupa.
- Pilih penyedia cloud (AWS, Azure, atau GCP) dan wilayah geografis yang sesuai dengan lokasi kalian.

5. Konfigurasi Opsi Cluster:
- Setelah memilih penyedia cloud dan wilayah, kalian dapat mengonfigurasi opsi tambahan seperti jenis server, replikasi, dan pemulihan bencana. Untuk penggunaan umum dan pembelajaran, konfigurasi default seharusnya sudah cukup.

6. Buat Cluster:
- Klik tombol "Create Cluster" atau langkah serupa untuk membuat cluster kalian. Proses ini mungkin memerlukan beberapa menit untuk menyelesaikan.

7. Buat Pengguna Database:
- Setelah cluster selesai dibuat, kalian perlu membuat pengguna yang akan digunakan untuk mengakses database. Pilih "Database Access" dari menu samping dan klik tombol "Add New Database User". Atur nama pengguna dan kata sandi, serta berikan izin yang sesuai.

8. Konfigurasi Akses IP: 
- Kembali ke dashboard cluster dan pilih "Network Access" dari menu samping. Klik tombol "Add IP Address" dan tambahkan alamat IP yang akan diizinkan untuk mengakses cluster. Jika ingin memberikan akses dari mana saja (tidak disarankan untuk produksi), kalian bisa memasukkan 0.0.0.0/0.

9. Menghubungkan Aplikasi:
- Kembali ke dashboard cluster, pilih "Clusters" dan klik cluster yang telah kalian buat. Di halaman cluster, klik tombol "Connect" dan pilih "Connect Your Application". Ini akan menampilkan URL koneksi yang dapat digunakan dalam aplikasi kalian.

10. Gunakan URL Koneksi dalam Aplikasi:
- Gunakan URL koneksi yang ditampilkan untuk menghubungkan aplikasi kalian dengan basis data MongoDB Atlas.

Sekarang kalian telah berhasil membuat database di MongoDB Atlas dan mendapatkan URL koneksi yang dapat digunakan dalam aplikasi kalian. Pastikan kalian menjaga keamanan dan privasi URL koneksi ini serta izin akses database kalian sesuai kebutuhan aplikasi kalian.

URL koneksi ini yang bakal kita pake untuk implementasi di ODM Mongoose. 

![image](https://github.com/user-attachments/assets/88f6fa3e-9811-464c-a88e-1e6a2ae6e3b3)

## Railway
"Railway" adalah platform hosting aplikasi modern yang memudahkan penyebaran aplikasi yang siap untuk produksi dengan cepat. Railway menawarkan layanan database yang persisten untuk PostgreSQL, MySQL, MongoDB, dan Redis, serta layanan aplikasi dengan repositori GitHub sebagai sumber penyebaran.

https://railway.app/

kalian bisa langsung daftar di railway nya, dan buat new project. pilih provision Mysql untuk database yang bakal kita implement di ORM Prisma

![image](https://github.com/user-attachments/assets/21b4099c-1939-4dcb-9071-1bde1e8d1857)

Setelah kalian pilih Provision MySQL, maka railway otomatis akan membuatkan cloud database mysql.

silahkan check dasboard kalian dan klik database mysql nya. maka tampilan nya akan seperti ini

![image](https://github.com/user-attachments/assets/f4c55897-cbaf-4ae5-a2a7-08c08b6af6ef)

pilih tab connect maka kalian akan lihat credential database kalian

![image](https://github.com/user-attachments/assets/26402e1d-23d9-435d-9d60-bd815c5fd1e3)

copy MYSQL_URL, itulah URL yang akan kalian pakai di week4 ini.

## Supabase

"Supabase" salah satu platform untuk cloud database yang bisa di gunakan secara geratis. database yang di gunakan merupakan bentuk SQL yang sama seperti MySQL, PostgreSQL. pada penggunaan geratis Supabase menawarkan fitur:

- Unlimited API requests
- 50,000 monthly active users
- 500 MB database space
- Shared CPU • 500 MB RAM
- 5 GB bandwidth
- 1 GB file storage
- Community support

Link nya disini: https://supabase.com/

kalian bisa masuk menggunakan akun gmail atau akun Github kalian. setelah masuk kalian bisa membuat project DB kalian seperti ini

![image](https://github.com/user-attachments/assets/c9519a54-891c-4f0e-a776-a66f066528ec)

kalian akan di suruh untuk memasukan nama database, password, dan server (disarankan menggunakan server yang seregion dengan kalian)

![image](https://github.com/user-attachments/assets/8fc38ac2-47b4-4d2b-bea4-970ff7ab29ac)

setelah selesai membuat projet database kalian bisa langsung Connect database ke project kalian

![image](https://github.com/user-attachments/assets/24f07f74-373a-4878-a024-43ddbbe75822)

![image](https://github.com/user-attachments/assets/9413827e-6b49-466d-82e3-18d25eaf247c)

## Neon

"Neon" juga merupakan salah satu platform database berbentuk PostgreSQl yang menyediakan penggunaan geratis
untuk penggunaan geratis menawarkan fitur berikut: 

- 0.5 GiB storage
- 24/7 for your main database 
- Community support
- Fixed capacity at 0.25 vCPU
- Point-in-time restore (24 h)

Kalian bisa masuk menggunakan akun Gmail atau Github kalian. setelah kalian masuk langsung buat project database kalian 

![image](https://github.com/user-attachments/assets/46a4236a-b203-41a1-88ea-16ed4b5a2364)

setelah project siap kalian bisa membuat branch baru untuk project kalian

![image](https://github.com/user-attachments/assets/f83c901d-a3ba-40cc-a49a-ff70e22b985b)

