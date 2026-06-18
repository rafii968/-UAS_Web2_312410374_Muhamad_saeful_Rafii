<?= $this->extend('layout/main'); ?>

<?= $this->section('content'); ?>
    <h1><?= $title; ?></h1>
    <hr>
    <p><?= $content; ?></p>
    <p>Ini adalah halaman utama menggunakan konsep View Layout CodeIgniter 4. Lebih rapi dan efisien karena tidak perlu include header-footer berulang kali.</p>
<?= $this->endSection(); ?>