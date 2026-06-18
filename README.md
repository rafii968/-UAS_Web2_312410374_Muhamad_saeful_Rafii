# Rafoldies Watch Inventory System - UAS Pemrograman Web 2

Proyek ini merupakan aplikasi sistem manajemen inventaris toko jam tangan (*Rafoldies Watch Inventory*) yang dibangun menggunakan arsitektur decoupled (terpisah). Bagian frontend dikembangkan sebagai Single Page Application (SPA) yang reaktif, sedangkan bagian backend berfungsi sebagai penyedia layanan RESTful API yang aman dengan otentikasi berbasis token.

* **NIM:** 312410374
* **Nama:** Muhamad Saeful Rafii
* **Mata Kuliah:** Pemrograman Web 2

## 1. Studi Kasus & Deskripsi Proyek
Aplikasi ini menangani pengelolaan data stok barang masuk dan keluar untuk toko jam tangan komersial bernama **Rafoldies**. Fitur utama dalam aplikasi ini meliputi pencatatan katalog publik untuk pengunjung umum, pembatasan hak akses halaman manajemen admin menggunakan Navigation Guards, serta fungsi CRUD (Create, Read, Update, Delete) data jam tangan secara real-time yang terproteksi oleh JSON Web Token (JWT).

## 2. Skema Relasi Tabel Database
Berikut adalah rancangan hubungan antar tabel di database MySQL yang digunakan untuk menyokong seluruh operasional data pada sistem ini:
<img width="959" height="505" alt="Screenshot 2026-06-18 203534" src="https://github.com/user-attachments/assets/376f2108-fef0-4fd6-b88b-d002cd402be6" />

---

## 3. Pengujian Keamanan & Proteksi API (Postman)
Sistem backend telah dilengkapi dengan sistem keamanan Token-Based Authentication. Jika endpoint API krusial ditembak secara langsung tanpa menyertakan token otentikasi yang sah di bagian Header Authorization, server akan menolak akses tersebut dan mengembalikan status Error 401 Unauthorized.
<img width="959" height="502" alt="postman_error_401" src="https://github.com/user-attachments/assets/eba175c0-ae4f-4192-8e58-79560b8266fb" />

---

## 4. Antarmuka Aplikasi (User Interface)

### Halaman Login Admin
Gerbang masuk autentikasi untuk memvalidasi kredensial administrator sebelum diberikan hak akses token ke dashboard.
<img width="959" height="476" alt="Screenshot 2026-06-18 195508" src="https://github.com/user-attachments/assets/71a5af39-6840-4c8f-83f3-4a72e7169f62" />


### Halaman Dashboard Admin & Tabel Data (TailwindCSS)
Tampilan panel utama admin yang menampilkan visualisasi data inventaris jam tangan dalam tabel responsif bertenaga TailwindCSS, lengkap dengan indikator warna stok kritis.
<img width="959" height="479" alt="Screenshot 2026-06-18 203754" src="https://github.com/user-attachments/assets/4c152e98-413b-4b0c-9b9b-532609d819c0" />

### Form Modal Tambah / Edit Data
Pop-up form modal interaktif yang digunakan admin untuk melakukan operasi penambahan data baru maupun pembaruan data jam tangan secara real-time.
<img width="959" height="474" alt="Screenshot 2026-06-18 203824" src="https://github.com/user-attachments/assets/136f6ba4-a5de-4b8a-aad5-01a93f8e3b64" />

## 5. Petunjuk Instalasi (Local Environment)

### Prasyarat Sistem
1. XAMPP (Terinstal PHP versi 8.1 ke atas).
2. Web Browser modern (Google Chrome atau Microsoft Edge).

### Langkah-Langkah Menjalankan Proyek:

#### A. Konfigurasi Database MySQL
1. Jalankan XAMPP Control Panel, lalu aktifkan modul **Apache** dan **MySQL**.
2. Akses halaman kontrol database lewat aplikasi di `MySQL Workbench`.
3. Buat sebuah database baru dengan nama `db_inventaris_jam`.
4. Masuk ke database tersebut, pilih tab **Import**, cari file database `.sql` bawaan proyek ini, kemudian klik **Import/Go** hingga seluruh struktur tabel sukses terpasang.

#### B. Penempatan Source Code
Ekstrak dan pastikan seluruh folder proyek berada di dalam direktori `htdocs` XAMPP Anda dengan struktur hirarki sebagai berikut:
```text
C:\xampp\htdocs\UAS_Web2_312410374_Muhamad_saeful_rafii\
├── backend-api-baru\     <-- Core System Backend (CodeIgniter 4)
└── frontend-spa\         <-- Core System Frontend (Vue.js & TailwindCSS)hp.net/manual/en/mysqlnd.install.php) if you plan to use MySQL
- [libcurl](http://php.net/manual/en/curl.requirements.php) if you plan to use the HTTP\CURLRequest library
