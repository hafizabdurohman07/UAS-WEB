# E-Inventory - Sistem Manajemen Inventaris Barang

E-Inventory adalah aplikasi Single Page Application (SPA) modern berbasis web untuk mengelola stok barang pergudangan secara digital. Proyek ini dibangun dengan memisahkan sisi Client (Frontend) dan Server (Backend) menggunakan arsitektur RESTful API yang aman dengan otentikasi stateless menggunakan **JSON Web Token (JWT)**.

---

## 🚀 Fitur Utama

- **Dashboard Analitik**: Menampilkan ringkasan total produk, nilai total aset pergudangan, dan indikator peringatan stok menipis (< 5 pcs).
- **CRUD Inventaris Produk**: Tambah, edit, cari, dan hapus barang inventaris secara dinamis tanpa memuat ulang halaman (SPA).
- **Otentikasi Aman (JWT)**: Login dilindungi dengan Bearer JWT Token yang memiliki masa berlaku (session expiry).
- **Desain Glassmorphic**: UI modern yang responsif menggunakan Tailwind CSS dengan nuansa tema gelap premium (dark mode), tipografi Outfit & Inter, serta ikon FontAwesome.
- **Kategori Dinamis**: Relasi database antara produk dan kategori default (Elektronik, Alat Tulis Kantor, Peralatan Rumah Tangga).

---

## 🛠️ Spesifikasi Teknologi

### Sisi Backend (API Server)
- **Framework**: CodeIgniter v4.7.3
- **Bahasa**: PHP >= 8.2
- **Database**: MySQL / MariaDB (melalui XAMPP)
- **Ketergantungan**: Composer (Package Manager)
- **Keamanan**: Implementasi JWT custom (stateless) & filter CORS global terintegrasi pada entrypoint `index.php`.

### Sisi Frontend (Client SPA)
- **Framework**: VueJS v3 (CDN-based)
- **Routing**: Vue Router v4 (Hash History)
- **HTTP Client**: Axios (dengan interceptor untuk menyuntikkan token JWT secara otomatis)
- **Styling**: Tailwind CSS & FontAwesome v6

---

## 💻 Persyaratan Sistem

Pastikan perangkat Anda sudah menginstal aplikasi berikut:
1. **PHP >= 8.2** (Sudah termasuk di XAMPP versi terbaru).
2. **Composer** (Untuk mengelola dependensi PHP di backend).
3. **XAMPP Control Panel** (Untuk menjalankan Apache dan MySQL).
4. **Browser Modern** (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).

---

## 📥 Langkah-Langkah Instalasi (Setup Awal)

Ikuti langkah-langkah di bawah ini di terminal komputer Anda (seperti Command Prompt, PowerShell, atau Git Bash):

### 1. Eksekusi Script Inisialisasi Framework
Masuk ke folder utama proyek (`Tugas uas dudung`) di terminal, lalu jalankan script berikut untuk mengunduh skeleton CodeIgniter 4 dan menyelaraskan file konfigurasi:
```bash
php setup.php
```
*Script ini akan otomatis mengunduh CodeIgniter 4, menyiapkan folder sistem, menyalin konfigurasi, membuat file `.env` di folder `Backend`, serta menginstal seluruh dependensi vendor via Composer.*

### 2. Nyalakan XAMPP
Buka **XAMPP Control Panel** Anda dan tekan tombol **Start** pada modul **Apache** dan **MySQL** hingga indikatornya berwarna hijau.

### 3. Buat Database Otomatis
Jalankan script berikut di folder utama proyek untuk membuat database `e_inventory` secara otomatis tanpa perlu membuka phpMyAdmin:
```bash
php create_db.php
```

### 4. Jalankan Migrasi & Seeder Database
Masuk ke folder `Backend` lalu jalankan migrasi tabel dan pengisian data demo:
```bash
cd Backend
php spark migrate
php spark db:seed UserAndCategorySeeder
```
*Langkah ini akan membuat tabel `users`, `categories`, dan `products` sekaligus mendaftarkan akun administrator default.*

---

## ⚙️ Cara Menjalankan Aplikasi

Aplikasi ini berjalan secara terpisah (Frontend dan Backend). Ikuti langkah ini untuk menjalankan keduanya:

### 1. Jalankan API Backend (Port 8080)
Buka terminal baru, masuk ke folder `Backend`, lalu jalankan server CodeIgniter:
```bash
cd Backend
php spark serve --port 8080
```
Server backend akan berjalan di: **`http://localhost:8080`**

### 2. Jalankan Client Frontend (Port 3001)
Buka terminal baru lainnya, masuk ke folder `frontend`, lalu jalankan web server PHP lokal:
```bash
cd frontend
php -S localhost:3001
```
Server frontend akan berjalan di: **`http://localhost:3001`**

---

## 🔐 Akun Akses Demo (Sign In)

Gunakan akun berikut untuk login ke halaman Dashboard Admin:
- **URL Login**: `http://localhost:3001/#/login`
- **Username**: `admin`
- **Password**: `password123`

---

## 📁 Struktur Direktori Proyek

```
Tugas uas dudung/
├── Backend/                    # Folder Utama Backend (CodeIgniter 4)
│   ├── app/                    # Kode Aplikasi Backend (MVC)
│   │   ├── Config/             # Konfigurasi Aplikasi (Routes.php, Filters.php, dll)
│   │   ├── Controllers/        # Logika Kontroler (AuthController, ProductController)
│   │   ├── Database/           # Migrasi Tabel & Seeder Data
│   │   ├── Filters/            # Middleware Penyaring Request (AuthFilter, CorsFilter)
│   │   ├── Helpers/            # Helper Custom (jwt_helper.php)
│   │   └── Models/             # Model Database (UserModel, ProductModel, CategoryModel)
│   ├── public/                 # Entrypoint API (index.php - penanganan CORS)
│   ├── system/                 # File Sistem Framework CodeIgniter 4
│   ├── writable/               # Log, Cache, & Debug Bar
│   ├── .env                    # Variabel Lingkungan & Pengaturan Database (Auto-generated)
│   └── composer.json           # File Dependensi Backend
│
├── frontend/                   # Folder Utama Frontend (VueJS 3 SPA)
│   ├── js/                     # Logika JavaScript SPA
│   │   ├── components/         # Komponen Tampilan (Landing, Login, Dashboard, Product)
│   │   └── app.js              # Setup Utama Vue App, Routing, & Axios Interceptor
│   ├── index.html              # Layout HTML Utama (Single Page Entrypoint)
│   └── favicon.ico             # Ikon Aplikasi
│
├── setup.php                   # Script Pembantu Instalasi Awal
├── create_db.php               # Script Pembuat Database Otomatis
├── check_user.php              # Script Diagnostik Kredensial User
└── README.md                   # Dokumentasi Proyek (File Ini)
```
