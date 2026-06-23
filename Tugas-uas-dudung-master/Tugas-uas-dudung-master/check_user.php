<?php
$conn = new mysqli("localhost", "root", "", "e_inventory");
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$res = $conn->query("SELECT * FROM users");
if ($res) {
    while ($row = $res->fetch_assoc()) {
        echo "ID: " . $row['id'] . "\n";
        echo "Username: " . $row['username'] . "\n";
        echo "Password Hash: " . $row['password'] . "\n";
        echo "Password Verify (password123): " . (password_verify('password123', $row['password']) ? 'VALID' : 'INVALID') . "\n";
        echo "Created At: " . $row['created_at'] . "\n\n";
    }
} else {
    echo "Error: " . $conn->error . "\n";
}
$conn->close();
