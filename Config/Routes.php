<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// ====================================================
// 1. RUTE PUBLIK / UMUM (Bebas Akses Tanpa Token / Gembok)
// ====================================================
// Akses login dan logout admin
$routes->post('api/login', 'Auth::login');
$routes->post('api/logout', 'Auth::logout');

// Pengunjung/Publik bisa bebas melihat katalog jam tangan
$routes->get('api/produk', 'Produk::index'); 


// ====================================================
// 2. RUTE PRIVATE ADMIN (Otomatis Dikunci Filter Auth)
// ====================================================
// Semua rute di dalam grup ini WAJIB melampirkan token valid di header Axios
$routes->group('api', ['filter' => 'auth'], function($routes) {
    
    $routes->post('produk', 'Produk::create');         // Tambah jam tangan baru
    $routes->put('produk/(:num)', 'Produk::update/$1');  // Edit data jam tangan berdasarkan ID
    $routes->delete('produk/(:num)', 'Produk::delete/$1'); // Hapus jam tangan berdasarkan ID

});