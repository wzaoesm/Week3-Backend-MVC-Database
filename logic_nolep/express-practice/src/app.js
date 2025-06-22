const express = require('express');
const app = express();
const db = require('../db/database');
const port = 3000;

app.use(express.json());

// GET: Mendapatkan semua nama absen
app.get('/absences', (req, res) => {
  db.all("SELECT * FROM absences", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST: Menambahkan absen baru
app.post('/absences', (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO absences (name) VALUES (?)", [name], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, name });
  });
});

// PUT: Merubah absen berdasarkan ID
app.put('/absences/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.run("UPDATE absences SET name = ? WHERE id = ?", [name, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json({ id, name });
  });
});

// DELETE: Menghapus absen berdasarkan ID
app.delete('/absences/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM absences WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
