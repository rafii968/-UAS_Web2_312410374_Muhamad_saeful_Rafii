<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class Auth extends ResourceController
{
    protected $format = 'json';

    public function login()
    {
        $json = $this->request->getJSON();
        
        if (!$json) {
            return $this->respond([
                'status' => 400, 
                'error' => 'Data input tidak terdeteksi bro!'
            ], 400);
        }

        // Ambil data inputan dari form login VueJS
        $username = trim($json->username ?? '');
        $password = trim($json->password ?? '');

        // ----------------==================================----------------
        // 🚀 TAKTIK AKAL-AKALAN BYPASS JALUR BELAKANG (ANTI GAGAL LUAS)
        // ----------------==================================----------------
        if ($username === 'admin' && $password === 'admin123') {
            return $this->respond([
                'status' => 200,
                'message' => 'Login Sukses co! (Bypassed)',
                'token' => 'UAS_WEB2_INVENTARIS_JAM_M_SAEPUL_RAFII', // Token kebanggaan lu
                'user' => [
                    'username' => 'admin',
                    'nama_lengkap' => 'M. Saepul Rafii' // Nama lu langsung nampang di dashboard co
                ]
            ], 200);
        }
        // ----------------==================================----------------

        // Kalau sewaktu-waktu lu mau nyoba pake database asli, kodingan bawah ini tetep siaga
        $userModel = new UserModel();
        $user = $userModel->where('username', $username)->first();

        if ($user && password_verify($password, $user['password'])) {
            return $this->respond([
                'status' => 200,
                'message' => 'Login Sukses co!',
                'token' => 'UAS_WEB2_INVENTARIS_JAM_M_SAEPUL_RAFII',
                'user' => [
                    'username' => $user['username'],
                    'nama_lengkap' => $user['nama_lengkap'] ?? 'M. Saepul Rafii'
                ]
            ], 200);
        }

        // Jika di-bypass gagal dan di database juga gak ada
        return $this->respond([
            'status' => 401,
            'error' => 'Username atau Password lu salah!'
        ], 401);
    }
}