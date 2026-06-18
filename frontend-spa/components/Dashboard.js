const Dashboard = {
    data() {
        return {
            adminName: localStorage.getItem('adminName') || 'M. Saepul Rafii',
            produk: [],
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
        <div class="bg-white rounded-xl p-6">
            <div class="flex justify-between items-center pb-6 gap-4">
                <div>
                    <h2 class="text-4xl font-bold text-slate-800">Dashboard Master Inventaris</h2>
                    <p class="text-sm text-slate-400 mt-1">Selamat bekerja kembali, <span class="font-semibold text-indigo-600">{{ adminName }}</span> 👨‍💻</p>
                </div>
                <div class="flex gap-3">
                    <button @click="bukaModalTambah" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-lg transition shadow-md cursor-pointer text-sm">
                        + Tambah Jam Tangan
                    </button>
                    <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2.5 rounded-lg transition shadow-md cursor-pointer text-sm">Log Out</button>
                </div>
            </div>

            <div class="mt-8 overflow-x-auto rounded-xl">
                <table class="w-full text-left border-collapse bg-white">
                    <thead class="text-slate-600 text-sm font-bold uppercase border-b border-slate-200">
                        <tr>
                            <th class="px-6 py-4">Nama Jam Tangan</th>
                            <th class="px-6 py-4">Merk</th>
                            <th class="px-6 py-4">Kategori</th>
                            <th class="px-6 py-4">Harga</th>
                            <th class="px-6 py-4">Stok</th>
                            <th class="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
                        <tr v-for="item in produk" :key="item.id_produk" class="hover:bg-slate-50/70 transition">
                            <td class="px-6 py-4 font-semibold text-slate-900">{{ item.nama_product || item.nama_produk }}</td>
                            <td class="px-6 py-4 text-slate-500">{{ item.merk }}</td>
                            <td class="px-6 py-4"><span class="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded">{{ item.nama_kategori }}</span></td>
                            <td class="px-6 py-4 font-bold text-slate-900">Rp {{ Number(item.harga).toLocaleString('id-ID') }}</td>
                            <td class="px-6 py-4 font-medium">{{ item.stok }}</td>
                            
                            <td class="px-6 py-4 text-center">
                                <div class="flex justify-center gap-2">
                                    <button @click="bukaModalEdit(item)" class="text-amber-600 hover:text-white hover:bg-amber-500 border border-amber-200 font-semibold rounded-lg px-3 py-1.5 text-xs transition cursor-pointer">
                                        Edit
                                    </button>
                                    <button @click="hapusProduk(item.id_produk)" class="text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 font-semibold rounded-lg px-3 py-1.5 text-xs transition cursor-pointer">
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
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
                                <label class="block text-xs font-bold text-slate-500 uppercase">Stok</label>
                                <input v-model="form.stok" type="number" class="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required>
                            </div>
                        </div>
                        
                        <div class="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-6">
                            <button type="button" @click="showModal = false" class="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-semibold cursor-pointer">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm cursor-pointer">Simpan</button>
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
                axios.put(`${API_URL}/produk/${this.form.id_produk}`, this.form)
                    .then(() => {
                        alert("Data Berhasil Diperbarui co!");
                        this.showModal = false;
                        this.fetchData();
                    })
                    .catch(err => alert("Gagal ubah data: " + (err.response?.data?.error || err.message)));
            } else {
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
            if (confirm("Seriusan mau lu hapus jam ini dari gudang co?")) {
                axios.delete(`${API_URL}/produk/${id}`)
                    .then(() => {
                        alert("Data sukses dibasmi co!");
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