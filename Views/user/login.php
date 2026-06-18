<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin | Portal Berita</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f4f7f6;
            height: 100vh;
            display: flex;
            align-items: center;
        }
        .login-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .btn-login {
            background-color: #007bff;
            border: none;
            padding: 10px;
            font-weight: bold;
            transition: 0.3s;
        }
        .btn-login:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
        }
        .form-control:focus {
            box-shadow: none;
            border-color: #007bff;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card login-card p-4">
                <div class="text-center mb-4">
                    <h3 class="fw-bold">Login Admin</h3>
                    <p class="text-muted small">Silakan masuk ke dashboard kelola artikel</p>
                </div>

                <?php if(session()->getFlashdata('msg')):?>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <?= session()->getFlashdata('msg') ?>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                <?php endif;?>

                <form action="<?= base_url('/user/login_action'); ?>" method="post">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Username</label>
                        <input type="text" name="username" class="form-control" placeholder="Masukkan username" required autofocus>
                    </div>
                    <div class="mb-4">
                        <label class="form-label fw-semibold">Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Masukkan password" required>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary btn-login">MASUK SEKARANG</button>
                    </div>
                </form>
                
                <div class="text-center mt-4">
                    <p class="text-muted x-small">&copy; 2026 Muhamad Saeful Rafii</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>