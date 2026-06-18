<?= $this->extend('layout/main'); ?>
<?= $this->section('content'); ?>

<article class="entry">
    <h2><?= $artikel['judul']; ?></h2>
    <p><strong>Kategori:</strong> <?= $artikel['nama_kategori'] ?? 'Uncategorized'; ?></p>
    <hr>
    <p><?= $artikel['isi']; ?></p>
</article>

<a href="<?= base_url('/artikel'); ?>" style="display:inline-block; margin-top:15px; color:#2d6cc0;">← Kembali ke Daftar Artikel</a>

<?= $this->endSection(); ?>