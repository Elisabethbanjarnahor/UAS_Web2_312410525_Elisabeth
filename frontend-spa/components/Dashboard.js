const Dashboard = {
    template: `
    <div class="flex min-h-screen bg-rose-50 font-sans selection:bg-rose-200">
        <aside class="w-64 bg-white m-4 rounded-3xl shadow-xl flex flex-col overflow-hidden border border-rose-100">
            <div class="p-8 text-center border-b border-rose-50">
                <h2 class="text-3xl font-black text-rose-600 tracking-tight">Elisa<span class="text-slate-800">Lib.</span></h2>
                <p class="text-[10px] text-slate-400 uppercase tracking-widest mt-2 font-bold">Admin Panel</p>
            </div>

            <nav class="flex flex-col gap-2 p-4 flex-grow">
                <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 font-medium">✨ Beranda</router-link>
                <router-link to="/dashboard/buku" class="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 font-medium">📚 Data Buku</router-link>
                <router-link to="/dashboard/kategori" class="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 font-medium">🏷️ Kategori Genre</router-link>
                <router-link to="/dashboard/peminjaman" class="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 font-medium">📝 Peminjaman</router-link>
                <router-link to="/dashboard/pengembalian" class="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 font-medium">↩️ Pengembalian</router-link>
            </nav>

            <div class="p-5 bg-rose-50/50 m-4 rounded-2xl text-center border border-rose-100">
                <div class="w-12 h-12 bg-rose-200 rounded-full mx-auto mb-2 flex items-center justify-center text-rose-600 font-bold text-xl shadow-inner">
                    E
                </div>
                <p class="text-sm font-extrabold text-slate-800">Elisabeth</p>
                <p class="text-xs text-rose-500 mb-4 font-semibold">Teknik Informatika</p>
                <button @click="logout" class="w-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-0.5">
                    Logout
                </button>
            </div>
        </aside>

        <main class="flex-1 p-4 overflow-y-auto">
            <div class="max-w-7xl mx-auto pt-4 pr-4">
                <header class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-2xl font-extrabold text-slate-800 tracking-tight">Dashboard Area</h1>
                        <p class="text-slate-500 text-sm mt-1 font-medium">Selamat datang di sistem manajemen perpustakaan.</p>
                    </div>
                    <div class="bg-white px-5 py-2.5 rounded-2xl shadow-sm text-sm font-bold text-rose-600 border border-rose-100 flex items-center gap-2">
                        📅 {{ new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
                    </div>
                </header>

                <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[500px]">
                    <router-view></router-view>
                </div>
            </div>
        </main>
    </div>
    `,
    methods: {
        logout() {
            if(confirm('Yakin mau keluar dari sistem?')) {
                localStorage.removeItem('token');
                localStorage.removeItem('isLoggedIn');
                window.location.hash = '#/login';
            }
        }
    }
};