<?= $this->extend('layout/main'); ?>
<?= $this->section('content'); ?>

<h2>Tambah Artikel Baru</h2>
<div style="background:#f9f9f9; padding:20px; border:1px solid #ddd; border-radius:5px;">
     <form action="<?= base_url('/admin/artikel/add'); ?>" method="post">
        <?= csrf_field() ?>
        <div style="margin-bottom:15px;">
            <label style="display:block; margin-bottom:5px;">Judul Artikel</label>
            <input type="text" name="judul" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
        </div>
        <div style="margin-bottom:15px;">
            <label style="display:block; margin-bottom:5px;">Kategori</label>
            <select name="id_kategori" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                <option value="">-- Pilih Kategori --</option>
                <?php foreach($kategori as $k): ?>
                    <option value="<?= $k['id_kategori']; ?>">
                        <?= $k['nama_kategori']; ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div style="margin-bottom:15px;">
            <label style="display:block; margin-bottom:5px;">Isi Artikel</label>
            <textarea name="isi" rows="10" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"></textarea>
        </div>
        <div>
            <input type="submit" value="Simpan Artikel" style="background:#28a745; color:white; border:none; padding:10px 20px; border-radius:4px; cursor:pointer;">
            <a href="<?= base_url('/admin/artikel'); ?>" style="margin-left:10px; color:#666;">Batal</a>
        </div>
    </form>
</div>

<?= $this->endSection(); ?>