<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;

class Auth implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Ambil token dari HTTP Header Authorization
        $authHeader = $request->getServer('HTTP_AUTHORIZATION');

        // Jika token tidak disertakan atau formatnya bukan Bearer [cite: 27]
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return Services::response()
                ->setJSON(['status' => 401, 'error' => 'Unauthorized! Token tidak ditemukan atau ilegal.'])
                ->setStatusCode(401);
        }

        $token = $matches[1];
        $tokenRahasia = "UAS_WEB2_INVENTARIS_JAM_M_SAEPUL_RAFII";

        // Validasi kesesuaian token
        if ($token !== $tokenRahasia) {
            return Services::response()
                ->setJSON(['status' => 401, 'error' => 'Unauthorized! Token salah co, akses ditolak.'])
                ->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Kosongkan
    }
}