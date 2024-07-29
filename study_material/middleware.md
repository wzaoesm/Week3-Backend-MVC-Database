# Middleware for API

Middleware dalam konteks API adalah perangkat lunak yang bertindak sebagai jembatan antara server dan aplikasi. Middleware memproses request dan response sebelum mencapai route handler atau setelah route handler mengirimkan response. Beberapa contoh middleware pada API termasuk:

1. **Authentication**: Memverifikasi identitas pengguna, misalnya menggunakan token JWT atau OAuth.

2. **Authorization**: Memeriksa apakah pengguna memiliki izin untuk mengakses resource tertentu.

3. **Logging**: Mencatat informasi tentang request dan response, seperti waktu, status, dan data.

4. Error Handling: Menangani dan merespons kesalahan yang terjadi selama proses request.

5. Request Parsing: Mengurai data dalam request, seperti body JSON atau form data.

6. **CORS (Cross-Origin Resource Sharing)**: Mengatur kebijakan untuk mengizinkan akses dari domain yang berbeda.

7. **Compression**: Mengompresi data response untuk mengurangi ukuran payload dan meningkatkan kecepatan.

8. **Rate Limiting**: Membatasi jumlah request yang dapat dilakukan oleh pengguna dalam periode waktu tertentu untuk mencegah penyalahgunaan atau overload.

9. **Security Headers**: Menambahkan header keamanan untuk melindungi aplikasi dari berbagai jenis serangan seperti XSS atau CSRF.

10. **Caching**: Menyimpan response untuk mengurangi beban pada server dan mempercepat waktu respons untuk request yang sama.