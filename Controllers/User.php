<?php

namespace App\Controllers;

use App\Models\UserModel;

class User extends BaseController
{
    public function login()
    {
        // Jika sudah login, jangan kasih akses ke halaman login lagi
        if (session()->get('logged_in')) {
            return redirect()->to('/admin/artikel');
        }
        
        helper(['form']);
        return view('user/login');
    }

    public function login_action()
    {
        $session = session();
        
        // Ambil input dari form
        $username = trim((string)$this->request->getVar('username'));
        $password = trim((string)$this->request->getVar('password'));
        
        // --- BAGIAN AKAL-AKALAN (BYPASS) ---
        // Gak peduli isi database, kalau ketik admin & 123 langsung masuk
        if ($username == 'admin' && $password == '123') {
            $sess_data = [
                'username'  => 'Admin Ganteng', // Nama bebas
                'logged_in' => TRUE
            ];
            $session->set($sess_data);
            
            return redirect()->to('/admin/artikel');
        } 
        // -----------------------------------
        
        // Kalau mau tetap bisa login via database (opsional)
        $model = new UserModel();
        $data = $model->where('username', $username)->first();

        if ($data) {
            if (password_verify($password, $data['userpassword'])) {
                $session->set([
                    'id'        => $data['id'],
                    'username'  => $data['username'],
                    'logged_in' => TRUE
                ]);
                return redirect()->to('/admin/artikel');
            }
        }

        // Kalau semua gagal
        $session->setFlashdata('msg', 'Username atau Password salah boskuh!');
        return redirect()->to('/user/login');
    }

    public function logout()
    {
        session()->destroy();
        return redirect()->to('/user/login');
    }
}