<?php

namespace App\Controllers;

class Page extends BaseController
{
    public function home()
    {
        return view('home', [
            'title' => 'Home',
            'content' => 'Ini halaman home'
        ]);
    }

    public function about()
    {
        return view('about', [
            'title' => 'About',
            'content' => 'Ini adalah halaman about yang menjelaskan tentang isi halaman ini.'
        ]);
    }

    public function contact()
    {
        return view('contact', [
            'title' => 'Kontak',
            'content' => 'Ini halaman kontak'
        ]);
    }
}