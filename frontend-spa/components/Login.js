const Login = {
    template: `
        <div class="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-black text-slate-800">Login Admin</h2>
                <p class="text-sm text-gray-400 mt-1">Masukkan akun Anda untuk mengelola inventaris jam tangan</p>
            </div>
            
            <form @submit.prevent="handleLogin" class="space-y-5">
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Username</label>
                    <input type="text" v-model="username" class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Masukkan username" required>
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Password</label>
                    <input type="password" v-model="password" class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="••••••••" required>
                </div>
                
                <button type="submit" class="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-all shadow-md hover:shadow-lg transform active:scale-95">
                    Masuk ke Sistem
                </button>
            </form>
        </div>
    `,
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleLogin() {
            axios.post(`${API_URL}/login`, { 
                username: this.username, 
                password: this.password 
            })
            .then(res => {
                if (res.data.token) {
                    // Simpan status login dan token ke dalam localStorage sesuai spesifikasi UAS
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', res.data.token);
                    
                    // Alihkan halaman ke panel dashboard admin
                    this.$router.push('/dashboard');
                }
            })
            .catch(err => {
                alert("Gagal Login: " + (err.response ? err.response.data.message : "Server Error"));
            });
        }
    }
};