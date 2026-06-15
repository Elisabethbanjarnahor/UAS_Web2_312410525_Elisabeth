const Peminjaman = {
    template: `
        <div class="w-full">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800">Sirkulasi: Peminjaman Buku</h1>
                <button @click="bukaModal" class="bg-rose-600 text-white px-4 py-2 rounded-lg shadow hover:bg-rose-700 transition cursor-pointer relative z-20">+ Transaksi Baru</button>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden relative z-0">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr class="bg-gray-50 border-b">
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID Transaksi</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID User</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID / Judul Buku</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tgl Pinjam</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tgl Kembali</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="peminjamanList.length === 0">
                            <td colspan="6" class="px-5 py-8 text-center text-gray-500">Belum ada data transaksi.</td>
                        </tr>
                        <tr v-for="trx in peminjamanList" :key="trx.id" class="border-b hover:bg-gray-50">
                            <td class="px-5 py-4 text-sm font-bold text-gray-600">TRX-{{ trx.id }}</td>
                            <td class="px-5 py-4 text-sm font-semibold">User #{{ trx.id_user }}</td>
                            <td class="px-5 py-4 text-sm italic">{{ trx.judul_buku || trx.judul || 'ID Buku: ' + trx.id_buku }}</td>
                            <td class="px-5 py-4 text-sm text-gray-500">{{ trx.tanggal_pinjam }}</td>
                            <td class="px-5 py-4 text-sm text-red-500 font-semibold">{{ trx.tanggal_kembali }}</td>
                            <td class="px-5 py-4 text-sm">
                                <span :class="(trx.status === 'dikembalikan' || trx.status_pinjam === 'dikembalikan' || trx.status_pinjam === 'selesai') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'" class="px-2 py-1 rounded text-xs font-semibold shadow-sm uppercase">
                                    {{ trx.status || trx.status_pinjam || 'dipinjam' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModal" class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex items-center justify-center z-[9999]">
                <div class="bg-white p-6 rounded-lg w-96 shadow-2xl transform transition-all">
                    <h2 class="text-xl font-bold mb-4 text-gray-800">Tambah Transaksi Baru</h2>
                    <form @submit.prevent="simpanPeminjaman">
                        
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-1">ID User (Angka)</label>
                            <input v-model="form.id_user" type="number" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-rose-500" required>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-1">ID Buku (Angka)</label>
                            <input v-model="form.id_buku" type="number" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-rose-500" required>
                        </div>

                        <div class="flex gap-4 mb-4">
                            <div class="w-1/2">
                                <label class="block text-gray-700 text-sm font-bold mb-1">Tgl Pinjam</label>
                                <input v-model="form.tanggal_pinjam" type="date" class="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" required>
                            </div>
                            <div class="w-1/2">
                                <label class="block text-gray-700 text-sm font-bold mb-1">Tgl Kembali</label>
                                <input v-model="form.tanggal_kembali" type="date" class="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" required>
                            </div>
                        </div>

                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-1">Status</label>
                            <select v-model="form.status" class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-rose-500" required>
                                <option value="dipinjam">Dipinjam</option>
                                <option value="dikembalikan">Dikembalikan</option>
                            </select>
                        </div>

                        <div class="flex justify-end mt-4">
                            <button type="button" @click="tutupModal" class="mr-3 px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold">Batal</button>
                            <button type="submit" class="bg-rose-600 text-white px-4 py-2 rounded shadow hover:bg-rose-700 font-semibold">Simpan Transaksi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            peminjamanList: [],
            showModal: false,
            form: { id_user: '', id_buku: '', tanggal_pinjam: '', tanggal_kembali: '', status: 'dipinjam' }
        }
    },
    mounted() { 
        this.getPeminjaman(); 
    },
    methods: {
        bukaModal() { this.showModal = true; },
        tutupModal() { 
            this.showModal = false;
            this.form = { id_user: '', id_buku: '', tanggal_pinjam: '', tanggal_kembali: '', status: 'dipinjam' };
        },
        async getPeminjaman() {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:8080/api/peminjaman', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.peminjamanList = res.data;
            } catch (e) { 
                console.error("Gagal mengambil data peminjaman", e);
            }
        },
        async simpanPeminjaman() {
            try {
                const token = localStorage.getItem('token');
                
                await axios.post('http://localhost:8080/api/peminjaman', this.form, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                this.tutupModal();
                this.getPeminjaman();
                alert('MANTAP! Transaksi peminjaman berhasil dicatat.');
            } catch (e) { 
                alert('Gagal menyimpan transaksi! Cek tab Console & Network bos.'); 
                console.error(e);
            }
        }
    }
};