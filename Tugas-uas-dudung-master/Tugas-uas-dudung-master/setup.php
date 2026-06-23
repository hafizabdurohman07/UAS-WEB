<?php
// Setup Helper Script for E-Inventory CodeIgniter 4 Project

echo "==================================================\n";
echo "       E-Inventory - Setup & Initialization       \n";
echo "==================================================\n\n";

$baseDir = __DIR__;
$backendDir = $baseDir . DIRECTORY_SEPARATOR . 'Backend';
$tempDir = $baseDir . DIRECTORY_SEPARATOR . 'temp-ci4';

// Helper function to recursively copy files
function copy_folder($src, $dst, $overwrite = false) {
    if (!is_dir($src)) return;
    if (!is_dir($dst)) {
        @mkdir($dst, 0777, true);
    }
    $files = scandir($src);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        $srcPath = $src . DIRECTORY_SEPARATOR . $file;
        $dstPath = $dst . DIRECTORY_SEPARATOR . $file;
        if (is_dir($srcPath)) {
            copy_folder($srcPath, $dstPath, $overwrite);
        } else {
            if ($overwrite || !file_exists($dstPath)) {
                if (copy($srcPath, $dstPath)) {
                    // Success
                } else {
                    echo "Gagal menyalin: $srcPath -> $dstPath\n";
                }
            }
        }
    }
}

// Helper function to delete directory recursively
function delete_folder($dir) {
    if (!is_dir($dir)) return;
    $files = scandir($dir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        $path = $dir . DIRECTORY_SEPARATOR . $file;
        if (is_dir($path)) {
            delete_folder($path);
        } else {
            @unlink($path);
        }
    }
    @rmdir($dir);
}

// 1. Download CodeIgniter 4 skeleton via Composer
echo "[1/5] Mengunduh skeleton CodeIgniter 4 via Composer...\n";
if (is_dir($tempDir)) {
    echo "Membersihkan sisa instalan sebelumnya...\n";
    delete_folder($tempDir);
}

// Run composer create-project
$composerCmd = "composer create-project codeigniter4/appstarter \"" . $tempDir . "\"";
system($composerCmd, $retval);

if ($retval !== 0) {
    echo "\nError: Gagal mengunduh skeleton CodeIgniter 4 via Composer.\n";
    echo "Pastikan Composer sudah terinstall dan terkoneksi internet.\n";
    exit(1);
}

echo "\n[2/5] Menyalin file sistem framework ke folder Backend...\n";

// Copy directories
$dirsToCopy = ['system', 'public', 'writable', 'tests'];
foreach ($dirsToCopy as $dir) {
    echo "Menyalin folder: $dir...\n";
    copy_folder($tempDir . DIRECTORY_SEPARATOR . $dir, $backendDir . DIRECTORY_SEPARATOR . $dir, true);
}

// Copy files in root
$filesToCopy = ['spark', 'composer.json', 'composer.lock', 'phpunit.xml.dist', 'project.php'];
foreach ($filesToCopy as $file) {
    $srcFile = $tempDir . DIRECTORY_SEPARATOR . $file;
    $dstFile = $backendDir . DIRECTORY_SEPARATOR . $file;
    if (file_exists($srcFile)) {
        echo "Menyalin file: $file...\n";
        copy($srcFile, $dstFile);
    }
}

// Copy default app configuration without overwriting existing files
echo "Menyalin konfigurasi default CodeIgniter ke Backend/app...\n";
copy_folder($tempDir . DIRECTORY_SEPARATOR . 'app', $backendDir . DIRECTORY_SEPARATOR . 'app', false);

// 3. Clean up temp folder
echo "\n[3/5] Membersihkan folder sementara...\n";
delete_folder($tempDir);

// 4. Create .env file inside Backend
echo "\n[4/5] Mengonfigurasi file .env untuk database...\n";
$envPath = $backendDir . DIRECTORY_SEPARATOR . '.env';
$envTemplate = $backendDir . DIRECTORY_SEPARATOR . 'env';

if (!file_exists($envPath)) {
    // If 'env' exists, use it as template, else write custom config
    $dbConfig = "#--------------------------------------------------------------------\n"
              . "# ENVIRONMENT\n"
              . "#--------------------------------------------------------------------\n"
              . "CI_ENVIRONMENT = development\n\n"
              . "#--------------------------------------------------------------------\n"
              . "# DATABASE\n"
              . "#--------------------------------------------------------------------\n"
              . "database.default.hostname = localhost\n"
              . "database.default.database = e_inventory\n"
              . "database.default.username = root\n"
              . "database.default.password = \n"
              . "database.default.DBDriver = MySQLi\n"
              . "database.default.DBPrefix = \n"
              . "database.default.port     = 3306\n\n"
              . "#--------------------------------------------------------------------\n"
              . "# JWT SECURITY\n"
              . "#--------------------------------------------------------------------\n"
              . "JWT_SECRET = e_inventory_secret_key_2026_uas\n";
              
    file_put_contents($envPath, $dbConfig);
    echo "File .env berhasil dibuat di Backend/.env.\n";
} else {
    echo "File .env sudah ada. Melewati pembuatan .env.\n";
}

// 5. Run Composer Install in Backend
echo "\n[5/5] Menyelaraskan dependensi vendor di folder Backend...\n";
chdir($backendDir);
system("composer install", $retvalInstall);

echo "\n==================================================\n";
echo "            SETUP SELESAI DENGAN SUKSES!           \n";
echo "==================================================\n\n";
echo "Langkah selanjutnya:\n";
echo "1. Pastikan Apache & MySQL di XAMPP Anda aktif.\n";
echo "2. Buat database kosong bernama 'e_inventory' di phpMyAdmin.\n";
echo "3. Jalankan migrasi dan seeder di terminal:\n";
echo "   cd Backend\n";
echo "   php spark migrate\n";
echo "   php spark db:seed UserAndCategorySeeder\n\n";
echo "4. Jalankan backend development server:\n";
echo "   php spark serve --port 8080\n\n";
echo "5. Jalankan atau buka frontend/index.html di browser Anda.\n";
echo "==================================================\n";
