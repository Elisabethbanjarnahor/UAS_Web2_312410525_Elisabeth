const Login = {
    template: `
    <div class="min-h-screen flex items-center justify-center bg-rose-50 font-sans selection:bg-rose-200 p-4 relative overflow-hidden">
        
        <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

        <div class="bg-white p-10 rounded-3xl shadow-2xl border border-rose-100 w-full max-w-md transform transition-all hover:scale-[1.01] relative z-10">
            <div class="text-center mb-8">
                <div class="w-16 h-16 bg-rose-100 rounded-full mx-auto mb-4 flex items-center justify-center shadow-inner">
                    <span class="text-3xl">📚</span>
                </div>
                <h2 class="text-3xl font-black text-rose-600 tracking-tight">Elisa<span class="text-slate-800">Lib.</span></h2>
                <p class="text-sm text-slate-500 mt-2 font-medium">Selamat datang kembali, Pustakawan!</p>
            </div>

            <form @submit.prevent="login" class="space-y-6">
                <div>
                    <label class="block text-sm font-extrabold text-slate-700 mb-2">Alamat Email</label>
                    <input type="email" v-model="email" required
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white text-slate-700"
                        placeholder="elisa@admin.com">
                </div>
                
                <div>
                    <label class="block text-sm font-extrabold text-slate-700 mb-2">Password</label>
                    <input type="password" v-model="password" required
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white text-slate-700"
                        placeholder="••••••••">
                </div>

                <button type="submit" 
                    class="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-1 mt-2">
                    Masuk ke Dashboard
                </button>
            </form>

            <div class="mt-8 text-center text-xs text-slate-400 font-semibold tracking-wide">
                &copy; 2026 Elisabeth Library System. <br> Crafted with Vue.js & CodeIgniter 4
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            try {
                // KODE FINAL: Tetep pake FormData biar gak ditolak CodeIgniter (nyaru jadi Postman)
                let formData = new FormData();
                formData.append('email', this.email);
                formData.append('password', this.password);

                const response = await axios.post('http://localhost:8080/api/login', formData);
                
                // Simpan Token dan pindah halaman
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isLoggedIn', 'true');
                
                window.location.hash = '#/dashboard';
            } catch (error) {
                alert('Gagal login! Cek lagi email sama passwordnya ya.');
                console.error(error);
            }
        }
    }
};