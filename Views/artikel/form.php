<?= $this->include('template/header'); ?>

<h1>Tambah Artikel</h1>

<form action="/artikel/simpan" method="post">
    <p>Judul</p>
    <input type="text" name="judul" required>

    <p>Isi</p>
    <textarea name="isi" rows="5"></textarea>

    <br><br>
    <button type="submit">Simpan</button>
</form>

<?= $this->include('template/footer'); ?>