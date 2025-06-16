import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('database_karyawan.db');

async function createTables() {
  try {
    await execAsync(`
      CREATE TABLE IF NOT EXISTS Karyawan (
        IDKaryawan INTEGER PRIMARY KEY,
        Nama TEXT NOT NULL,
        Usia INTEGER,
        Jabatan TEXT
      );
    `);
    await execAsync(`
      CREATE TABLE IF NOT EXISTS Proyek (
        IDProyek INTEGER PRIMARY KEY,
        NamaProyek TEXT NOT NULL,
        IDKaryawanPenanggung INTEGER,
        FOREIGN KEY (IDKaryawanPenanggung) REFERENCES Karyawan (IDKaryawan)
      );
    `);
    await execAsync(`
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
    throw error;
  }
}

// Panggil fungsi createTables untuk membuat tabel
await createTables();

async function insertData() {
  try {
    await execAsync('BEGIN'); // Memulai transaksi
    await runAsync('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['John Doe', 30, 'Manager']);
    await runAsync('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Jane Smith', 25, 'Programmer']);
    await runAsync('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Bob Johnson', 35, 'Sales']);
    await runAsync('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Alice Brown', 28, 'Designer']);
    await runAsync('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek A', 2]);
    await runAsync('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek B', 4]);
    await runAsync('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek C', 1]);
    await runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 1', 101, 2]);
    await runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 2', 101, 2]);
    await runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 3', 101, 4]);
    await runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 4', 102, 4]);
    await runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 5', 103, 1]);
    await execAsync('COMMIT'); // Menyelesaikan transaksi
    console.log('Data berhasil dimasukkan.');
  } catch (error) {
    await execAsync('ROLLBACK').catch(() => {}); // Membatalkan transaksi jika terjadi kesalahan
    console.error('Gagal memasukkan data:', error.message);
    throw error;
  }
}

// Panggil fungsi insertData untuk menambahkan data ke tabel
await insertData();

async function displayData() {
  try {
    const karyawanRows = await allAsync('SELECT * FROM Karyawan');
    console.log('Data Karyawan:');
    console.table(karyawanRows);
    const proyekRows = await allAsync('SELECT * FROM Proyek');
    console.log('Data Proyek:');
    console.table(proyekRows);
    const pekerjaanRows = await allAsync('SELECT * FROM Pekerjaan');
    console.log('Data Pekerjaan:');
    console.table(pekerjaanRows);
  } catch (error) {
    console.error('Gagal mengambil data:', error.message);
    throw error;
  }
}

// Panggil fungsi displayData untuk menampilkan data dari tabel
await displayData();

async function closeDatabase() {
  try {
    await closeAsync();
    console.log('Koneksi ke database ditutup.');
  } catch (error) {
    console.error('Gagal menutup koneksi:', error.message);
  }
}

// Panggil fungsi closeDatabase untuk menutup koneksi ke database
await closeDatabase();








function execAsync(sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function closeAsync() {
  return new Promise((resolve, reject) => {
    db.close(function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}