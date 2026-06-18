<?= $this->extend('layout/main'); ?>
<?= $this->section('content'); ?>

<h2>Edit Artikel</h2>
<div style="background:#f9f9f9; padding:20px; border:1px solid #ddd; border-radius:5px;">
    <form action="<?= base_url('/admin/artikel/edit/' . $artikel['id']); ?>" method="post">
        <?= csrf_field() ?>
        <div style="margin-bottom:15px;">
            <label style="display:block; margin-bottom:5px;">Judul Artikel</label>
            <input type="text" name="judul" value="<?= $artikel['judul']; ?>" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
        </div>
        <div style="margin-bottom:15px;">
            <label style="display:block; margin-bottom:5px;">Kategori</label>
            <select name="id_kategori" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;">
                <option value="">-- Pilih Kategori --</option>
                <?php foreach($kategori as $k): ?>
                    <option value="<?= $k['id_kategori']; ?>" 
                        <?= ($artikel['id_kategori'] == $k['id_kategori']) ? 'selected' : ''; ?>>
                        <?= $k['nama_kategori']; ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div style="margin-bottom:15px;">
            <label style="display:block; margin-bottom:5px;">Isi Artikel</label>
            <textarea name="isi" rows="10" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px;"><?= $artikel['isi']; ?></textarea>
        </div>
        <div>
            <input type="submit" value="Update Artikel" style="background:#007bff; color:white; border:none; padding:10px 20px; border-radius:4px; cursor:pointer;">
            <a href="<?= base_url('/admin/artikel'); ?>" style="margin-left:10px; color:#666;">Batal</a>
        </div>
    </form>
</div>

<?= $this->endSection(); ?>