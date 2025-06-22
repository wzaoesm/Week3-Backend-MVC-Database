const express = require('express');
const app = express();
const port = 3000;

const loggingMiddleware = require('./middlewares/loggingMiddleware');
const rateLimitingMiddleware = require('./middlewares/rateLimitingMiddleware');


// Ini dia middleware-nya!
app.use(express.json()); // Penting: Letakkan di awal sebelum rute Anda
app.use(loggingMiddleware);
app.use(rateLimitingMiddleware);

app.post('/users', (req, res) => {
  // Tanpa express.json(), req.body akan undefined
  // Dengan express.json(), req.body akan berisi objek JSON yang dikirim client
  const newUser = req.body;
  console.log('Data pengguna baru:', newUser);

  // Misalnya, menyimpan ke database
  // database.save(newUser);

  res.status(201).json({ message: 'Pengguna berhasil dibuat!', data: newUser });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});