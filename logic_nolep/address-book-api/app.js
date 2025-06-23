const express = require("express");
const app = express();
const port = 3000;
const router = require("./router/router");
const db = require("./connection/connection"); // Tambahkan import db
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(router);

// Inisialisasi database dan pastikan koneksi diputus sebelum server listen
(async () => {
  await db.connect(); // Membuat tabel jika belum ada
  await db.close();   // Pastikan koneksi diputus
  app.listen(port, () => {
    console.log("Server is running in port: " + port);
  });
})();