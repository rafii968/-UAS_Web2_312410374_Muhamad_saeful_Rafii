<div class="widget-box">
    <h3 class="title">Artikel Terkini</h3>
    <hr>
    <ul style="list-style: none; padding: 0;">
        <?php if (!empty($artikel) && is_array($artikel)) : ?>
            <?php foreach ($artikel as $row) : ?>
                <li style="margin-bottom: 10px; border-bottom: 1px dashed #ccc; padding-bottom: 5px;">
                    <a href="<?= base_url('/artikel/' . $row['slug']); ?>" style="text-decoration: none; color: #333; font-weight: bold;">
                        <?= $row['judul']; ?>
                    </a>
                </li>
            <?php endforeach; ?>
        <?php else : ?>
            <li>Belum ada artikel terbaru.</li>
        <?php endif; ?>
    </ul>
</div>