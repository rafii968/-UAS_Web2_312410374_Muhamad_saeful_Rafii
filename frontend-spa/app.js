const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Konfigurasi Base URL API Backend Lu yang valid di Postman tadi co!
const API_URL = "http://localhost/UAS_Web2_312410374_Muhamad_saeful_rafii/backend-api-baru/public/index.php/api";

// ----------------------------------------------------
// AXIOS INTERCEPTORS CONFIGURATION
// ----------------------------------------------------
// 1. Request Interceptor: Suntik token otomatis ke Header Authorization tiap kali hit API
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 2. Response Interceptor: Cegat error 401 secara global, bersihkan sesi, tendang ke login
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        alert("Sesi login Kamu habis atau ilegal! Menendang kembali ke form login...");
        localStorage.clear();
        window.location.href = "#/login"; // Tendang paksa ke rute login
    }
    return Promise.reject(error);
});


// ----------------------------------------------------
// DEFINE FILE KOMPONEN MODULAR SPA (INLINE COMPONENTS)
// ----------------------------------------------------

// Halaman 1: Pengunjung/Public Landing Page
const Home = {
    data() {
        return { produk: [] };
    },
    template: `
        <div class="text-center my-12">
            <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Katalog Inventaris Jam Tangan Publik</h2>
            <p class="text-slate-500 mt-2">Selamat datang pengunjung! Berikut data summary jam tangan terupdate.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="item in produk" :key="item.id_produk" class="bg-white border border-slate-200 rounded-xl shadow-xs p-5 hover:shadow-md transition">
                <span class="text-xs font-semibold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full">{{ item.nama_kategori }}</span>
                <h3 class="text-lg font-bold text-slate-800 mt-2">{{ item.nama_product || item.nama_produk }}</h3>
                <p class="text-sm text-slate-400 mt-1">Merk: {{ item.merk }}</p>
                <div class="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                    <span class="text-xl font-extrabold text-indigo-600">Rp {{ Number(item.harga).toLocaleString('id-ID') }}</span>
                    <span class="text-sm bg-emerald-50 text-emerald-700 font-medium px-2 py-1 rounded">Stok: {{ item.stok }}</span>
                </div>
            </div>
        </div>
    `,
    mounted() {
        axios.get(`${API_URL}/produk`)
            .then(res => { this.produk = res.data; })
            .catch(err => console.error(err));
    }
};

// Halaman 2: Komponen Modul Otentikasi Login Admin
const Login = {
    data() {
        return { 
            username: '', 
            password: '', 
            errMsg: '',
            isLoading: false
        };
    },
    template: `
        <div class="max-w-md mx-auto my-16 bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <h2 class="text-2xl font-bold text-center text-slate-800">🔐 Login Administrator</h2>
            <p class="text-center text-sm text-slate-400 mt-1">Gunakan akun admin mu dari database mu</p>
            
            <div v-if="errMsg" class="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg font-medium border border-red-200">
                {{ errMsg }}
            </div>
            
            <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-slate-600">Username</label>
                    <input v-model="username" type="text" class="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition" required>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-slate-600">Password</label>
                    <input v-model="password" type="password" class="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition" required>
                </div>
                
                <button type="submit" 
                        :disabled="isLoading"
                        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition duration-200 disabled:opacity-50 cursor-pointer flex justify-center items-center">
                    <span v-if="isLoading">Memproses Masuk...</span>
                    <span v-else>Masuk System</span>
                </button>
            </form>
        </div>
    `,
    methods: {
        handleLogin() {
            this.isLoading = true;
            this.errMsg = '';
            
            axios.post(`${API_URL}/login`, {
                username: this.username,
                password: this.password
            })
            .then(res => {
                this.isLoading = false;
                if(res.data.status === 200 || res.data.token) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', res.data.token || res.data.access_token);
                    localStorage.setItem('adminName', res.data.user ? res.data.user.nama_lengkap : 'M. Saepul Rafii');
                    
                    window.location.href = "#/dashboard";
                } else {
                    this.errMsg = "Gagal Login! Periksa kembali akun lu co.";
                }
            })
            .catch(err => {
                this.isLoading = false;
                if (err.response && err.response.data) {
                    this.errMsg = err.response.data.error || err.response.data.message || "Akses ditolak server!";
                } else {
                    this.errMsg = "Koneksi ke backend bermasalah! Pastikan Apache XAMPP mu nyala.";
                }
            });
        }
    }
};

// Halaman 3: Panel Dashboard Utama Admin (Daftar Jam, Tambah, Edit & Hapus)
const Dashboard = {
    data() {
        return {
            adminName: localStorage.getItem('adminName') || 'Admin',
            produk: [],
            // State Tambahan untuk Handle Modal CRUD
            showModal: false,
            isEditMode: false,
            formTitle: 'Tambah Jam Tangan Baru',
            form: {
                id_produk: '',
                nama_produk: '',
                merk: '',
                nama_kategori: '',
                harga: '',
                stok: ''
            }
        };
    },
    template: `
        <div class="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
            <div class="flex justify-between items-center pb-6 border-b border-slate-100 gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">Dashboard Master Inventaris</h2>
                    <p class="text-sm text-slate-400">Selamat bekerja kembali, <span class="font-semibold text-indigo-600">{{ adminName }}</span> 👨‍💻</p>
                </div>
                <div class="flex gap-3">
                    <button @click="bukaModalTambah" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition shadow-xs cursor-pointer text-sm">
                        + Tambah Jam Tangan
                    </button>
                    <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition shadow-xs cursor-pointer text-sm">🚪 Log Out</button>
                </div>
            </div>

            <div class="mt-8 overflow-x-auto rounded-xl border border-slate-200">
                <table class="w-full text-left border-collapse bg-white">
                    <thead class="bg-slate-50 text-slate-600 text-sm font-semibold uppercase border-b border-slate-200">
                        <tr>
                            <th class="px-6 py-4">ID</th>
                            <th class="px-6 py-4">Nama Jam Tangan</th>
                            <th class="px-6 py-4">Merk</th>
                            <th class="px-6 py-4">Kategori</th>
                            <th class="px-6 py-4">Harga</th>
                            <th class="px-6 py-4 text-center">Stok</th>
                            <th class="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
                        <tr v-for="item in produk" :key="item.id_produk" class="hover:bg-slate-50/70 transition">
                            <td class="px-6 py-4 font-mono font-medium text-slate-400">{{ item.id_produk }}</td>
                            <td class="px-6 py-4 font-semibold text-slate-900">{{ item.nama_product || item.nama_produk }}</td>
                            <td class="px-6 py-4 text-slate-500">{{ item.merk }}</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded">{{ item.nama_kategori }}</span></td>
                            <td class="px-6 py-4 font-bold text-slate-900">Rp {{ Number(item.harga).toLocaleString('id-ID') }}</td>
                            <td class="px-6 py-4 text-center font-medium">
                                <span :class="item.stok < 5 ? 'text-rose-600 bg-rose-50 px-2 py-1 rounded' : 'text-slate-700'">{{ item.stok }}</span>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <div class="flex justify-center gap-2">
                                    <button @click="bukaModalEdit(item)" class="text-amber-600 hover:text-white hover:bg-amber-500 border border-amber-200 font-semibold rounded-lg px-3 py-1.5 text-xs transition cursor-pointer">
                                        Edit
                                    </button>
                                    <button @click="hapusProduk(item.id_produk)" class="text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 font-medium rounded-lg px-3 py-1.5 text-xs transition duration-150 cursor-pointer">
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="produk.length === 0">
                            <td colspan="7" class="px-6 py-10 text-center text-slate-400">Belum ada data inventaris jam tangan co.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md p-6">
                    <div class="flex justify-between items-center pb-4 border-b border-slate-100">
                        <h3 class="text-lg font-bold text-slate-800">{{ formTitle }}</h3>
                        <button @click="showModal = false" class="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer">&times;</button>
                    </div>
                    
                    <form @submit.prevent="simpanData" class="mt-4 space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase">Nama Jam Tangan</label>
                            <input v-model="form.nama_produk" type="text" class="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase">Merk</label>
                                <input v-model="form.merk" type="text" class="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase">Kategori</label>
                                <input v-model="form.nama_kategori" type="text" class="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase">Harga (Rp)</label>
                                <input v-model="form.harga" type="number" class="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase">Stok Barang</label>
                                <input v-model="form.stok" type="number" class="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required>
                            </div>
                        </div>
                        
                        <div class="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-6">
                            <button type="button" @click="showModal = false" class="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-semibold cursor-pointer">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm cursor-pointer">Simpan Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    methods: {
        fetchData() {
            axios.get(`${API_URL}/produk`)
                .then(res => { this.produk = res.data; })
                .catch(err => console.error(err));
        },
        bukaModalTambah() {
            this.isEditMode = false;
            this.formTitle = '➕ Tambah Jam Tangan Baru';
            this.form = { id_produk: '', nama_produk: '', merk: '', nama_kategori: '', harga: '', stok: '' };
            this.showModal = true;
        },
        bukaModalEdit(item) {
            this.isEditMode = true;
            this.formTitle = '📝 Edit Data Jam Tangan';
            this.form = { ...item, nama_produk: item.nama_product || item.nama_produk };
            this.showModal = true;
        },
        simpanData() {
            if (this.isEditMode) {
                // Method PUT: Kirim data edit ke backend CodeIgniter 4
                axios.put(`${API_URL}/produk/${this.form.id_produk}`, this.form)
                    .then(() => {
                        alert("Data Berhasil Diperbarui co!");
                        this.showModal = false;
                        this.fetchData();
                    })
                    .catch(err => alert("Gagal ubah data: " + (err.response?.data?.error || err.message)));
            } else {
                // Method POST: Kirim data baru ke backend CodeIgniter 4
                axios.post(`${API_URL}/produk`, this.form)
                    .then(() => {
                        alert("Jam Tangan Baru Sukses Ditambahkan co!");
                        this.showModal = false;
                        this.fetchData();
                    })
                    .catch(err => alert("Gagal tambah data: " + (err.response?.data?.error || err.message)));
            }
        },
        hapusProduk(id) {
            if (confirm("Seriusan mau dihapus jam ini dari gudang?")) {
                axios.delete(`${API_URL}/produk/${id}`)
                    .then(() => {
                        alert("Data sukses dibasmi!");
                        this.fetchData();
                    })
                    .catch(err => console.error(err));
            }
        },
        handleLogout() {
            localStorage.clear();
            window.location.href = "#/login";
        }
    },
    mounted() {
        this.fetchData();
    }
};


// ----------------------------------------------------
// VUE ROUTER ALLOCATION & NAVIGATION GUARDS
// ----------------------------------------------------
const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Navigation Guards: Cegat user nakal yang belum login tapi maksa buka Dashboard
router.beforeEach((to, from, next) => {
    const authenticated = localStorage.getItem('isLoggedIn') === 'true';
    if (to.meta.requiresAuth && !authenticated) {
        alert("Akses Ilegal jirr! Lu harus login admin dulu co!");
        next('/login');
    } else {
        next();
    }
});

// Initialize Vue Instance
const app = createApp({});
app.use(router);
app.mount('#app');