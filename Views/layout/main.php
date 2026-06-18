<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= $title ?? 'Portal Berita'; ?></title>
    <link rel="stylesheet" href="/lab11_php_ci/ci4/public/style.css">
</head>
<body>
    <div id="container">
        <header>
            <h1>Layout Sederhana</h1>
        </header>
        <nav>
            <a href="<?= base_url('/'); ?>">Home</a>
            <a href="<?= base_url('/artikel'); ?>">Artikel</a>
            <a href="<?= base_url('/about'); ?>">About</a>
            <a href="<?= base_url('/contact'); ?>">Kontak</a>
            <a href="<?= base_url('/admin/artikel'); ?>">Admin</a>
        </nav>
        <section id="wrapper">
            <section id="main">
                <?= $this->renderSection('content') ?>
            </section>
            <aside id="sidebar">
                <div class="widget-box">
    <?= view_cell('\App\Cells\ArtikelTerkini::render') ?>
</div>
                <div class="widget-box">
                    <h3 class="title">Widget Header</h3>
                    <ul>
                        <li><a href="#">Widget Link</a></li>
                        <li><a href="#">Widget Link</a></li>
                    </ul>
                </div>
                <div class="widget-box">
                    <h3 class="title">Widget Text</h3>
                    <p>Vestibulum lorem ipsum dolor sit amet. Gak perlu pusing, dikit lagi beres!</p>
                </div>
            </aside>
        </section>
        <footer>
            <p>&copy; 2025 - Universitas Pelita Bangsa</p>
        </footer>
    </div>
</body>
</html>