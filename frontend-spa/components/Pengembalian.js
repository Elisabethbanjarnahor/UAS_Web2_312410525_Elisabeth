const Pengembalian = {
    template: `
        <div class="w-full">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">Pengembalian Komik</h1>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <table class="min-w-full">
                    <thead>
                        <tr class="bg-gray-50 border-b">
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID Trx</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Komik</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="trx in activeList" :key="trx.id" class="border-b hover:bg-gray-50">
                            <td class="px-5 py-4 text-sm font-bold">TRX-{{ trx.id }}</td>
                            <td class="px-5 py-4 text-sm">User #{{ trx.id_user }}</td>
                            <td class="px-5 py-4 text-sm">{{ trx.judul_komik }}</td>
                            <td class="px-5 py-4 text-sm text-yellow-600 font-bold uppercase">{{ trx.status_pinjam }}</td>
                            <td class="px-5 py-4 text-sm">
                                <button @click="kembalikan(trx.id)" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">Kembalikan</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    data() { return { peminjamanList: [] } },
    computed: {
        activeList() { return this.peminjamanList.filter(trx => trx.status_pinjam === 'berjalan'); }
    },
    mounted() { this.getPeminjaman(); },
    methods: {
        async getPeminjaman() {
            const res = await axios.get('http://localhost:8080/api/peminjaman');
            this.peminjamanList = res.data;
        },
        async kembalikan(id) {
            if(confirm('Yakin buku ini dikembalikan?')) {
                await axios.put('http://localhost:8080/api/peminjaman/' + id);
                alert('Buku sudah dikembalikan!');
                this.getPeminjaman();
            }
        }
    }
};