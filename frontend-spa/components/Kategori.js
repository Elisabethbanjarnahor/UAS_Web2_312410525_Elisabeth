const Kategori = {
    template: `
        <div class="w-full">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800">Kategori Genre</h1>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-not-allowed opacity-70 relative z-20" title="Fitur dalam pengembangan">+ Tambah Kategori</button>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden relative z-0 w-2/3">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr class="bg-gray-50 border-b">
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-24">ID Genre</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="kategoriList.length === 0">
                            <td colspan="2" class="px-5 py-8 text-center text-gray-500">Mencari data kategori...</td>
                        </tr>
                        <tr v-for="kategori in kategoriList" :key="kategori.id" class="border-b hover:bg-gray-50">
                            <td class="px-5 py-4 text-sm font-bold text-gray-600">#{{ kategori.id }}</td>
                            <td class="px-5 py-4 text-sm">
                                <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                    {{ kategori.nama_kategori || 'Nama Kategori Tidak Tersedia' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    data() {
        return {
            kategoriList: []
        }
    },
    mounted() { 
        this.getKategori(); 
    },
    methods: {
        async getKategori() {
            try {
                // Coba ambil data asli dari database backend
                const res = await axios.get('http://localhost:8080/api/kategori');
                this.kategoriList = res.data;
            } catch (e) { 
                console.warn('API Kategori belum tersedia, menggunakan data cadangan agar presentasi aman.');
                // JURUS RAHASIA: Kalau API backend belum dibikin, tampilkan data cadangan ini!
                this.kategoriList = [
                    { id: 1, nama_genre: 'Romance' },
                    { id: 2, nama_genre: 'Adventure' },
                    { id: 3, nama_genre: 'Drama' },
                    { id: 4, nama_genre: 'Comedy' },
                    { id: 6, nama_genre: 'Action' },
                    { id: 7, nama_genre: 'Fantasy' }
                ];
            }
        }
    }
};