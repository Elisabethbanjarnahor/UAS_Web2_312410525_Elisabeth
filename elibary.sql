CREATE DATABASE IF NOT EXISTS e_library_buku;
USE e_library_buku;

-- 1. Buat tabel kategori (genre)
CREATE TABLE kategori (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL
);

-- Masukin 15 genre otomatis
INSERT INTO kategori (nama_kategori) VALUES
('Self-Improvement'), ('Bisnis & Keuangan'), ('Teknologi & Pemrograman'),
('Pendidikan'), ('Psikologi'), ('Biografi'), ('Sejarah'), ('Sains'),
('Kesehatan'), ('Agama'), ('Bahasa'), ('Hukum & Politik'),
('Motivasi'), ('Karier'), ('Parenting');

-- 2. Buat tabel buku
CREATE TABLE buku (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_kategori INT NOT NULL,
    judul VARCHAR(255) NOT NULL,
    penulis VARCHAR(150),
    penerbit VARCHAR(150),
    cover VARCHAR(255) NULL,
    status_ketersediaan ENUM('tersedia', 'dipinjam') DEFAULT 'tersedia',
    FOREIGN KEY (id_kategori) REFERENCES kategori(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Buat tabel peminjaman
CREATE TABLE peminjaman (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_buku INT NOT NULL,
    tanggal_pinjam DATE NOT NULL,
    tanggal_kembali DATE NOT NULL,
    status_pinjam ENUM('berjalan', 'selesai') DEFAULT 'berjalan',
    FOREIGN KEY (id_buku) REFERENCES buku(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. Buat tabel users (buat login admin)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'admin'
);
