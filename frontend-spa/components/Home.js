const Home = {
    template: `
        <div class="space-y-6">
            <header class="text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100">
                <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">Koleksi Jam Tangan Premium</h2>
                <p class="text-gray-500 mt-2 text-sm md:text-base">Daftar inventaris jam tangan terupdate secara realtime.</p>
            </header>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="item in listProduk" :key="item.id_produk" class="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-100 flex flex-col justify-between">
                    <div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                            {{ item.nama_kategori }}
                        </span>
                        <h3 class="text-xl font-bold text-gray-800 mt-3">{{ item.nama_produk }}</h3>
                        <p class="text-xs text-gray-400 font-bold uppercase mt-1">Brand: {{ item.merk }}</p>
                    </div>
                    <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                        <span class="text-lg font-black text-emerald-600">Rp {{ Number(item.harga).toLocaleString() }}</span>
                        <span class="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600 font-medium">Stok: {{ item.stok }} pcs</span>
                    </div>
                </div>
            </div>
            
            <div v-if="listProduk.length === 0" class="text-center py-12 text-gray-400 text-sm">
                Belum ada data jam tangan yang tersedia.
            </div>
        </div>
    `,
    data() {
        return {
            listProduk: []
        }
    },
    mounted() {
        // Ambil data produk jam tangan dari API backend
        axios.get(`${API_URL}/produk`)
            .then(res => {
                this.listProduk = res.data;
            })
            .catch(err => console.error("Gagal mengambil data:", err));
    }
};