<?php

namespace App\Cells; // Sesuaikan jika foldernya Components, ganti jadi App\Components

use App\Models\ArtikelModel;

class ArtikelTerkini
{
    public function render()
    {
        $model = new ArtikelModel();
        // Ambil 5 data terbaru
        $data['artikel'] = $model->orderBy('id', 'DESC')->findAll(5);

        // Pastikan 'components/artikel_terkini' sesuai dengan lokasi file HTML di atas
        return view('components/artikel_terkini', $data);
    }
}