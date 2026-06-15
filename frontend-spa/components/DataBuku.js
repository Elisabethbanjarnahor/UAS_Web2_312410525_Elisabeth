const DataBuku = {
    template: `
        <div class="w-full">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800">Kelola Data Buku</h1>
                <button @click="bukaModalBaru" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer relative z-20">+ Tambah Buku</button>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden relative z-0">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr class="bg-gray-50 border-b">
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Cover</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Judul Buku</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Kategori</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Penulis</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Penerbit</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="bukuList.length === 0">
                            <td colspan="7" class="px-5 py-8 text-center text-gray-500">Belum ada data buku.</td>
                        </tr>
                        <tr v-for="buku in bukuList" :key="buku.id" class="border-b hover:bg-gray-50">
                            <td class="px-5 py-4">
                                <img v-if="buku.cover" :src="'http://localhost:8080/uploads/' + buku.cover" class="w-12 h-16 object-cover rounded shadow" alt="Cover">
                                <span v-else class="text-xs text-gray-400 italic">No Image</span>
                            </td>
                            <td class="px-5 py-4 text-sm font-bold">{{ buku.judul }}</td>
                            <td class="px-5 py-4 text-sm">
                                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">{{ buku.nama_kategori || 'Tanpa Kategori' }}</span>
                            </td>
                            <td class="px-5 py-4 text-sm">{{ buku.penulis }}</td>
                            <td class="px-5 py-4 text-sm">{{ buku.penerbit }}</td>
                            <td class="px-5 py-4 text-sm">
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold text-xs capitalize">{{ buku.status_ketersediaan }}</span>
                            </td>
                            <td class="px-5 py-4 text-sm flex gap-2">
                                <button @click="editBuku(buku)" class="bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-600 font-semibold text-xs uppercase tracking-wider">Edit</button>
                                <button @click="hapusBuku(buku.id)" class="bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700 font-semibold text-xs uppercase tracking-wider">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModal" class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex items-center justify-center z-[9999]">
                <div class="bg-white p-6 rounded-lg w-96 shadow-2xl transform transition-all">
                    <h2 class="text-xl font-bold mb-4 text-gray-800">{{ isEdit ? 'Edit Data Buku' : 'Tambah Buku Baru' }}</h2>
                    <form @submit.prevent="simpanBuku">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-1">ID Kategori (1-15)</label>
                            <input type="number" v-model="form.id_kategori" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-1">Judul Buku</label>
                            <input v-model="form.judul" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-1">Penulis</label>
                            <input v-model="form.penulis" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-1">Penerbit</label>
                            <input v-model="form.penerbit" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-1">Status</label>
                            <select v-model="form.status_ketersediaan" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <option value="tersedia">Tersedia</option>
                                <option value="dipinjam">Dipinjam</option>
                            </select>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-1">Cover Buku <span v-if="isEdit" class="text-xs text-red-500 font-normal">(Abaikan jika tidak ingin ganti cover)</span></label>
                            <input type="file" @change="handleFileUpload" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                        </div>
                        <div class="flex justify-end mt-4">
                            <button type="button" @click="tutupModal" class="mr-3 px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold">Batal</button>
                            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 font-semibold">{{ isEdit ? 'Update Data' : 'Simpan Data' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            bukuList: [],
            showModal: false,
            isEdit: false, // Penanda mode Edit atau Tambah
            form: { id: null, id_kategori: 1, judul: '', penulis: '', penerbit: '', status_ketersediaan: 'tersedia', cover: null } 
        }
    },
    mounted() { this.getBuku(); },
    methods: {
        bukaModalBaru() { 
            this.isEdit = false;
            this.form = { id: null, id_kategori: 1, judul: '', penulis: '', penerbit: '', status_ketersediaan: 'tersedia', cover: null };
            this.showModal = true; 
        },
        tutupModal() { 
            this.showModal = false; 
            this.form.cover = null; 
            this.isEdit = false;
        },
        handleFileUpload(event) { this.form.cover = event.target.files[0]; },
        
        async getBuku() {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:8080/api/buku', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.bukuList = res.data;
            } catch (e) { console.error(e); }
        },

        editBuku(buku) {
            this.isEdit = true;
            // Copy data buku yang di-klik ke form, kecuali cover biar nggak error
            this.form = { ...buku, cover: null }; 
            this.showModal = true;
        },

        async hapusBuku(id) {
            if(confirm('Yakin mau hapus data master buku ini bos?')) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete('http://localhost:8080/api/buku/' + id, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    alert('MANTAP! Data master berhasil dihapus.');
                    this.getBuku(); // Refresh tabel
                } catch (e) {
                    alert('Gagal menghapus data! Cek console.');
                    console.error(e);
                }
            }
        },
        
        async simpanBuku() {
            try {
                const fd = new FormData();
                fd.append('id_kategori', this.form.id_kategori); 
                fd.append('judul', this.form.judul);
                fd.append('penulis', this.form.penulis);
                fd.append('penerbit', this.form.penerbit);
                fd.append('status_ketersediaan', this.form.status_ketersediaan);
                
                if (this.form.cover) { 
                    fd.append('cover', this.form.cover); 
                }

                const token = localStorage.getItem('token');
                const config = {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                };

                if (this.isEdit) {
                    // Pakai trick _method=PUT karena PHP kadang rewel nangkep FormData di request PUT murni
                    fd.append('_method', 'PUT');
                    await axios.post('http://localhost:8080/api/buku/' + this.form.id, fd, config);
                    alert('Sip! Data buku berhasil di-update.');
                } else {
                    await axios.post('http://localhost:8080/api/buku', fd, config);
                    alert('MANTAP! Buku + Cover berhasil ditambahkan.');
                }
                
                this.tutupModal();
                this.getBuku();
            } catch (e) { 
                alert('Gagal menyimpan data! Cek console browser lu bos.'); 
                console.error(e); 
            }
        }
    }
};