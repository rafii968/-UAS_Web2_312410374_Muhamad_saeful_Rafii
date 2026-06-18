<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Produk extends ResourceController
{
    protected $modelName = 'App\Models\ProdukModel';
    protected $format    = 'json';

    public function index()
    {
        $data = $this->model->select('produk.*, kategori.nama_kategori')
                            ->join('kategori', 'kategori.id_kategori = produk.id_kategori')
                            ->findAll();

        return $this->respond($data);
    }
}