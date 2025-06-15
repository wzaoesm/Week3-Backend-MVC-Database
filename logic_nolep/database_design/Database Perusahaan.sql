CREATE TABLE `karyawan` (
  `id_karyawan` int PRIMARY KEY AUTO_INCREMENT,
  `nama_depan` varchar(50) NOT NULL,
  `nama_belakang` varchar(50),
  `email` varchar(100) UNIQUE NOT NULL,
  `nomor_telepon` varchar(20),
  `tanggal_bergabung` date NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `gaji_per_jam` decimal(10,2) DEFAULT 0
);

CREATE TABLE `absensi` (
  `id_absensi` int PRIMARY KEY AUTO_INCREMENT,
  `id_karyawan` int NOT NULL,
  `tanggal` date NOT NULL,
  `jam_masuk` time,
  `jam_keluar` time,
  `status_absensi` varchar(20) NOT NULL
);

CREATE TABLE `tugas` (
  `id_tugas` int PRIMARY KEY AUTO_INCREMENT,
  `id_karyawan` int NOT NULL,
  `nama_tugas` varchar(255) NOT NULL,
  `deskripsi_tugas` text,
  `tanggal_mulai` date,
  `tanggal_deadline` date,
  `status_tugas` varchar(50) NOT NULL DEFAULT 'Belum Selesai',
  `prioritas` varchar(20)
);

CREATE TABLE `proyek` (
  `id_proyek` int PRIMARY KEY AUTO_INCREMENT,
  `id_manager` int NOT NULL,
  `nama_proyek` varchar(255) NOT NULL,
  `deskripsi_proyek` text,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai_target` date,
  `tanggal_selesai_aktual` date,
  `status_proyek` varchar(50) NOT NULL DEFAULT 'Perencanaan',
  `budget_proyek` decimal(15,2),
  `pendapatan_proyek` decimal(15,2)
);

CREATE TABLE `proyek_karyawan` (
  `id_proyek_karyawan` int PRIMARY KEY AUTO_INCREMENT,
  `id_proyek` int NOT NULL,
  `id_karyawan` int NOT NULL,
  `peran_dalam_proyek` varchar(100)
);

CREATE TABLE `pengeluaran_gaji_proyek` (
  `id_pengeluaran_gaji` int PRIMARY KEY AUTO_INCREMENT,
  `id_proyek` int NOT NULL,
  `id_karyawan` int NOT NULL,
  `jumlah_jam_kerja` decimal(10,2) NOT NULL,
  `tanggal_pembayaran` date NOT NULL,
  `jumlah_bayar` decimal(15,2) NOT NULL
);

CREATE UNIQUE INDEX `absensi_index_0` ON `absensi` (`id_karyawan`, `tanggal`);

CREATE UNIQUE INDEX `proyek_karyawan_index_1` ON `proyek_karyawan` (`id_proyek`, `id_karyawan`);

ALTER TABLE `absensi` ADD FOREIGN KEY (`id_karyawan`) REFERENCES `karyawan` (`id_karyawan`);

ALTER TABLE `tugas` ADD FOREIGN KEY (`id_karyawan`) REFERENCES `karyawan` (`id_karyawan`);

ALTER TABLE `proyek` ADD FOREIGN KEY (`id_manager`) REFERENCES `karyawan` (`id_karyawan`);

ALTER TABLE `proyek_karyawan` ADD FOREIGN KEY (`id_proyek`) REFERENCES `proyek` (`id_proyek`);

ALTER TABLE `proyek_karyawan` ADD FOREIGN KEY (`id_karyawan`) REFERENCES `karyawan` (`id_karyawan`);

ALTER TABLE `pengeluaran_gaji_proyek` ADD FOREIGN KEY (`id_proyek`) REFERENCES `proyek` (`id_proyek`);

ALTER TABLE `pengeluaran_gaji_proyek` ADD FOREIGN KEY (`id_karyawan`) REFERENCES `karyawan` (`id_karyawan`);
