<?php

namespace Config;

use CodeIgniter\Config\Filters as BaseFilters;
use CodeIgniter\Filters\Cors;
use CodeIgniter\Filters\CSRF;
use CodeIgniter\Filters\DebugToolbar;
use CodeIgniter\Filters\ForceHTTPS;
use CodeIgniter\Filters\Honeypot;
use CodeIgniter\Filters\InvalidChars;
use CodeIgniter\Filters\PageCache;
use CodeIgniter\Filters\PerformanceMetrics;
use CodeIgniter\Filters\SecureHeaders;

class Filters extends BaseFilters
{
    /**
     * Configures aliases for Filter classes to
     * make reading things nicer and simpler.
     *
     * @var array<string, class-string|list<class-string>>
     */
    public array $aliases = [
        'csrf'          => CSRF::class,
        'toolbar'       => DebugToolbar::class,
        'honeypot'      => Honeypot::class,
        'invalidchars'  => InvalidChars::class,
        'secureheaders' => SecureHeaders::class,
        'cors'          => Cors::class,
        'forcehttps'    => ForceHTTPS::class,
        'pagecache'     => PageCache::class,
        'performance'   => PerformanceMetrics::class,
        'auth'          => \App\Filters\Auth::class, // Alias filter token keamanan lu
    ];

    /**
     * List of special required filters.
     */
    public array $required = [
        'before' => [
            'forcehttps',
            'pagecache',
        ],
        'after' => [
            'pagecache',
            'performance',
            'toolbar',
        ],
    ];

    /**
     * List of filter aliases that are always
     * applied before and after every request.
     */
    public array $globals = [
        'before' => [
            'cors', // CORS tetep aktif global biar Axios VueJS bebas manggil API lintas folder
            // 'honeypot',
            // 'csrf',
            // 'invalidchars',
        ],
        'after' => [
            // 'honeypot',
            // 'secureheaders',
        ],
    ];

    /**
     * List of filter aliases that works on a
     * particular HTTP method (GET, POST, etc.).
     */
    public array $methods = []; // DIKOSONGKAN: Biar rute POST milik login GAK ikut kekunci jirr!

    /**
     * List of filter aliases that should run on any
     * before or after URI patterns.
     * * Di sini kita pasang kunci secara spesifik ke endpoint produk jam tangan.
     * Jadi aksi manipulasi data jam tangan tetep aman terkunci, tapi rute login lolos!
     */
    public array $filters = [
        'auth' => [
            'before' => [
                'api/produk',     // Mengunci POST (Tambah produk)
                'api/produk/*',   // Mengunci PUT/DELETE (Ubah/Hapus produk berdasarkan ID)
            ]
        ]
    ];
}