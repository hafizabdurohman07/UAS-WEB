<?php
// Helper script to automatically create the e_inventory database

echo "==================================================\n";
echo "           Membuat Database e_inventory           \n";
echo "==================================================\n\n";

$host = "localhost";
$username = "root";
$password = "";

// Connect to MySQL server (without selecting a database)
$conn = @new mysqli($host, $username, $password);

if ($conn->connect_error) {
    echo "Error: Gagal terhubung ke MySQL server.\n";
    echo "Detail: " . $conn->connect_error . "\n\n";
    echo "Pastikan MySQL/MariaDB di XAMPP Control Panel Anda sudah di-start (running).\n";
    exit(1);
}

// Create database if not exists
$sql = "CREATE DATABASE IF NOT EXISTS e_inventory CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
if ($conn->query($sql) === TRUE) {
    echo "Sukses: Database 'e_inventory' berhasil dibuat atau sudah ada!\n\n";
    
    // Select the DB to verify
    $conn->select_db("e_inventory");
    echo "Koneksi ke database 'e_inventory' berhasil diverifikasi.\n";
} else {
    echo "Error: Gagal membuat database.\n";
    echo "Detail: " . $conn->error . "\n";
}

$conn->close();
echo "==================================================\n";
