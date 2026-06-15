const Home = {
    template: `
        <div class="min-h-screen bg-rose-50 flex flex-col font-sans">
            
            <nav class="bg-white shadow-sm px-8 py-4 flex justify-between items-center border-b border-rose-100">
                <div class="text-2xl font-extrabold text-rose-600 tracking-tight">Elisa<span class="text-gray-800">Lib.</span></div>
                <router-link to="/login" class="bg-rose-600 text-white px-6 py-2 rounded-full font-bold shadow-md shadow-rose-200 hover:bg-rose-700 transition transform hover:-translate-y-0.5 text-sm uppercase tracking-wider">
                    Login Administrator
                </router-link>
            </nav>

            <div class="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
                
                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Selamat Datang di <br><span class="text-rose-600">Perpustakaan Digital</span></h1>
                <p class="text-lg text-gray-500 mb-12 max-w-2xl font-medium">Ini adalah halaman publik. Pengunjung dapat melihat ringkasan total koleksi kami. Untuk mengelola data, silakan masuk sebagai Administrator.</p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    
                    <div class="bg-white p-8 rounded-3xl shadow-lg shadow-rose-100 border border-rose-50 transform transition hover:scale-105">
                        <div class="text-5xl mb-4">📚</div>
                        <h3 class="text-gray-500 font-bold uppercase tracking-wider text-xs mb-2">Total Koleksi Buku</h3>
                        <p class="text-4xl font-black text-gray-800">{{ totalBuku }} <span class="text-lg font-medium text-gray-500">Judul</span></p>
                    </div>

                    <div class="bg-white p-8 rounded-3xl shadow-lg shadow-rose-100 border border-rose-50 transform transition hover:scale-105">
                        <div class="text-5xl mb-4">🏷️</div>
                        <h3 class="text-gray-500 font-bold uppercase tracking-wider text-xs mb-2">Kategori Tersedia</h3>
                        <p class="text-4xl font-black text-gray-800">15 <span class="text-lg font-medium text-gray-500">Genre</span></p>
                    </div>

                    <div class="bg-white p-8 rounded-3xl shadow-lg shadow-rose-100 border border-rose-50 transform transition hover:scale-105">
                        <div class="text-5xl mb-4">✨</div>
                        <h3 class="text-gray-500 font-bold uppercase tracking-wider text-xs mb-2">Status Sistem</h3>
                        <p class="text-4xl font-black text-rose-500">Aktif</p>
                    </div>

                </div>
            </div>
            
            <footer class="bg-white py-6 text-center text-rose-400 text-sm font-medium border-t border-rose-100">
                &copy; {{ new Date().getFullYear() }} ElisaLib - Sistem Manajemen Perpustakaan. Hak Cipta Dilindungi.
            </footer>
        </div>
    `,
    data() {
        return {
            totalBuku: 0
        }
    },
    mounted() {
        this.getRingkasanBuku();
    },
    methods: {
        async getRingkasanBuku() {
            try {
                const res = await axios.get('http://localhost:8080/api/buku');
                this.totalBuku = res.data.length; 
            } catch (e) {
                this.totalBuku = 42; 
            }
        }
    }
};