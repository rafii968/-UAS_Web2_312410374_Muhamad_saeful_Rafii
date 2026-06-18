<?= $this->extend('layout/main'); ?>

<?= $this->section('content'); ?>
    <h1><?= $title; ?></h1>
    <hr>
    <p><?= $content; ?></p>
    <form action="#" method="post" style="margin-top: 20px;">
        <div style="margin-bottom: 10px;">
            <label style="display:block;">Nama:</label>
            <input type="text" style="width:100%; padding:8px;">
        </div>
        <div style="margin-bottom: 10px;">
            <label style="display:block;">Pesan:</label>
            <textarea style="width:100%; padding:8px;" rows="5"></textarea>
        </div>
        <button type="button" style="padding:10px 20px; background:#333; color:#fff; border:none; cursor:pointer;">Kirim</button>
    </form>
<?= $this->endSection(); ?>