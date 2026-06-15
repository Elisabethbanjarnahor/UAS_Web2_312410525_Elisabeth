## Relasi Tabel Database

Skema di bawah ini menampilkan relasi antar tabel (Entity Relationship Diagram) yang digunakan dalam sistem perpustakaan, meliputi tabel `user`, `buku`, `kategori`, dan `peminjaman`. Relasi ini dirancang menggunakan fitur *Designer* pada phpMyAdmin untuk memastikan integritas data tetap terjaga.

![foto](https://github.com/Elisabethbanjarnahor/UAS_Web2_312410525_Elisabeth/blob/a27a1c1221cee106d8b4f92c43e231383ac9c69c/screenshot/Screenshot%202026-06-16%20011714.png)

---

## Uji Coba API Gagal (Error 401 Unauthorized)

Sistem ini telah dilengkapi dengan proteksi keamanan berbasis Token (JWT / Bearer). Gambar ini membuktikan bahwa jika ada pengguna yang mencoba melakukan aksi manipulasi data (seperti *POST*, *PUT*, atau *DELETE*) melalui Postman tanpa menyertakan Token Login yang valid, sistem *backend* CodeIgniter 4 akan menolak akses tersebut dan mengembalikan status **401 Unauthorized**.

![foto](https://github.com/Elisabethbanjarnahor/UAS_Web2_312410525_Elisabeth/blob/a27a1c1221cee106d8b4f92c43e231383ac9c69c/screenshot/Screenshot%202026-06-16%20012333.png)

---

## Halaman Login

Antarmuka halaman *login* untuk Administrator. Halaman ini berfungsi sebagai "pintu gerbang" sistem. Hanya admin yang memiliki kredensial valid yang dapat masuk ke dalam *Dashboard*. Jika pengunjung publik mencoba mengakses rute lain, sistem *Vue Router Guard* akan mengarahkan mereka secara otomatis ke halaman awal atau *login*.

![foto](https://github.com/Elisabethbanjarnahor/UAS_Web2_312410525_Elisabeth/blob/a27a1c1221cee106d8b4f92c43e231383ac9c69c/screenshot/Screenshot%202026-06-16%20013739.png)

---

## Halaman Dashboard Admin

Tampilan panel kendali utama (Dashboard) bagi Administrator setelah berhasil melakukan *login*. Antarmuka ini dirancang secara estetik dan responsif menggunakan **Tailwind CSS**. Melalui panel *sidebar* di sebelah kiri, Admin dapat melakukan navigasi dengan mulus (konsep *Single Page Application* tanpa *reload* halaman) untuk mengelola data buku, kategori, hingga sirkulasi peminjaman.

![foto](https://github.com/Elisabethbanjarnahor/UAS_Web2_312410525_Elisabeth/blob/a27a1c1221cee106d8b4f92c43e231383ac9c69c/screenshot/Screenshot%202026-06-16%20013927.png)

---

## Tampilan Form Modal (Tambah, Edit, Hapus Data)

Aplikasi ini menggunakan konsep *Modal Form* dinamis yang dikendalikan oleh *state* VueJS. Form ini digunakan secara serbaguna untuk operasi **Create, Read, Update, dan Delete (CRUD)** data master (termasuk fitur *upload* gambar/cover buku). Admin tidak perlu berpindah halaman saat memodifikasi data, sehingga memberikan pengalaman pengguna (UX) yang sangat cepat dan efisien.

![foto](https://github.com/Elisabethbanjarnahor/UAS_Web2_312410525_Elisabeth/blob/a27a1c1221cee106d8b4f92c43e231383ac9c69c/screenshot/Screenshot%202026-06-16%20013948.png)
