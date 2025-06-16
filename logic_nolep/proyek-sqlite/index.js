const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');
const db = new sqlite3.Database('database_karyawan.db');

// Promisify database methods
db.runAsync = promisify(db.run).bind(db);
db.allAsync = promisify(db.all).bind(db);
db.execAsync = promisify(db.exec).bind(db);
db.closeAsync = promisify(db.close).bind(db);

async function createTables() {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Karyawan (
        IDKaryawan INTEGER PRIMARY KEY,
        Nama TEXT NOT NULL,
        Usia INTEGER,
        Jabatan TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Proyek (
        IDProyek INTEGER PRIMARY KEY,
        NamaProyek TEXT NOT NULL,
        IDKaryawanPenanggung INTEGER,
        FOREIGN KEY (IDKaryawanPenanggung) REFERENCES Karyawan (IDKaryawan)
      );
    `);

    await db.execAsync(`
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
  }
}

// Fungsi untuk memasukkan data contoh ke dalam tabel
async function insertData() {
  try {
    await db.execAsync('BEGIN'); // Memulai transaksi

    await db.runAsync('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['John Doe', 30, 'Manager']);
    await db.runAsync('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Jane Smith', 25, 'Programmer']);
    await db.runAsync('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Bob Johnson', 35, 'Sales']);
    await db.runAsync('INSERT INTO Karyawan (Nama, Usia, Jabatan) VALUES (?, ?, ?)', ['Alice Brown', 28, 'Designer']);

    await db.runAsync('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek A', 2]);
    await db.runAsync('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek B', 4]);
    await db.runAsync('INSERT INTO Proyek (NamaProyek, IDKaryawanPenanggung) VALUES (?, ?)', ['Proyek C', 1]);

    await db.runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 1', 1, 2]);
    await db.runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 2', 1, 2]);
    await db.runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 3', 2, 4]);
    await db.runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 4', 2, 4]);
    await db.runAsync('INSERT INTO Pekerjaan (NamaPekerjaan, IDProyek, IDKaryawan) VALUES (?, ?, ?)', ['Pekerjaan 5', 3, 1]);

    await db.execAsync('COMMIT'); // Menyelesaikan transaksi

    console.log('Data berhasil dimasukkan.');
  } catch (error) {
    await db.execAsync('ROLLBACK'); // Membatalkan transaksi jika terjadi kesalahan
    console.error('Gagal memasukkan data:', error.message);
  }
}

// Fungsi untuk menampilkan data dari tabel
async function displayData() {
  try {
    const karyawanRows = await db.allAsync('SELECT * FROM Karyawan');
    console.log('Data Karyawan:');
    console.table(karyawanRows);

    const proyekRows = await db.allAsync('SELECT * FROM Proyek');
    console.log('Data Proyek:');
    console.table(proyekRows);

    const pekerjaanRows = await db.allAsync('SELECT * FROM Pekerjaan');
    console.log('Data Pekerjaan:');
    console.table(pekerjaanRows);
  } catch (error) {
    console.error('Gagal mengambil data:', error.message);
  }
}

// Fungsi untuk menutup koneksi ke database
async function closeDatabase() {
  try {
    await db.closeAsync();
    console.log('Koneksi ke database ditutup.');
  } catch (error) {
    console.error('Gagal menutup koneksi:', error.message);
  }
}

// Fungsi utama untuk menjalankan semua proses secara berurutan
db.main = async function() {
  try {
    await createTables();
    await insertData();
    await displayData();
  } finally {
    await closeDatabase();
  }
};

db.main();