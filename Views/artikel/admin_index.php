<?= $this->extend('layout/main'); ?>
<?= $this->section('content'); ?>

<h2>Unit Pengelola Artikel</h2>

<form method="get" class="form-search" style="margin-bottom: 20px;">
    <input type="text" name="q" value="<?= $q ?? ''; ?>" placeholder="Cari data" style="padding: 8px; width: 300px; border: 1px solid #ddd; border-radius: 4px;">
    <input type="submit" value="Cari" style="background-color: #28a745; color: white; padding: 8px 20px; border: none; border-radius: 4px; cursor: pointer;">
</form>

<div style="margin-bottom: 20px;">
    <a href="<?= base_url('/admin/artikel/add'); ?>" style="background-color: #007bff; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px;">+ Tambah Artikel</a>
</div>

<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
    <thead>
        <tr style="background-color: #2d6cc0; color: white; text-align: left;">
            <th style="border: 1px solid #ddd; padding: 12px;">ID</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Judul</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Status</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">Aksi</th>
        </tr>
    </thead>
    <tbody>
        <?php if($artikel ?? false): ?>
            <?php foreach($artikel as $row): ?>
            <tr>
                <td style="border: 1px solid #ddd; padding: 12px;"><?= $row['id']; ?></td>
                <td style="border: 1px solid #ddd; padding: 12px;">
                    <strong><?= $row['judul']; ?></strong>
                </td>
                <td style="border: 1px solid #ddd; padding: 12px;">
                    <span style="background: #e9ecef; padding: 2px 8px; border-radius: 10px; font-size: 0.8em;">
                        <?= $row['status'] == 1 ? 'Aktif' : 'Draft'; ?>
                    </span>
                </td>
                <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">
                    <a href="<?= base_url('/admin/artikel/edit/' . $row['id']); ?>" style="color: #28a745; text-decoration: none; font-weight: bold;">Ubah</a> | 
                    <a onclick="return confirm('Yakin menghapus data?');" href="<?= base_url('/admin/artikel/delete/' . $row['id']); ?>" style="color: #dc3545; text-decoration: none; font-weight: bold;">Hapus</a>
                </td>
            </tr>
            <?php endforeach; ?>
        <?php else: ?>
            <tr>
                <td colspan="4" style="border: 1px solid #ddd; padding: 12px; text-align: center;">Belum ada data artikel.</td>
            </tr>
        <?php endif; ?>
    </tbody>
</table>

<div style="margin-top: 20px;">
    <?= $pager->only(['q'])->links(); ?>
</div>

<?= $this->endSection(); ?>