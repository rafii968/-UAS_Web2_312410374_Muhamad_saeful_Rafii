<?= $this->extend('layout/main'); ?>

<?= $this->section('content'); ?>
    <h1><?= $title; ?></h1>
    <hr>
    <p><?= $content; ?></p>
    <p>Kami sedang belajar mengembangkan aplikasi web berbasis Framework CodeIgniter 4 di Universitas Pelita Bangsa.</p>
<?= $this->endSection(); ?>