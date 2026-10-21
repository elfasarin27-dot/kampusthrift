KampusThrift - Website Jual Beli Barang Preloved Khusus Mahasiswa

KampusThrift adalah platform pasar digital berbasis website yang dibuat khusus untuk memudahkan mahasiswa saling jual-beli barang bekas (preloved) di area sekitar kampus. Lewat platform ini, transaksi jadi lebih aman, serba praktis, dan hemat karena tanpa biaya ongkos kirim!

---

Fitur-Fitur Utama

Akun & Keamanan Pengguna
- Tanda Mahasiswa Asli (Verified Badge): Mahasiswa yang mendaftar pakai email resmi kampus (seperti @students.unnes.ac.id) otomatis dapat centang biru / status terverifikasi.
- Akses untuk Umum: Masyarakat umum di luar kampus juga tetap bisa mendaftar dan menggunakan aplikasi.
- Keamanan Sesi: Sistem akan otomatis keluar (logout) jika aplikasi didiamkan tanpa aktivitas selama 30 menit demi menjaga keamanan akun.

Pencarian Barang yang Fleksibel
- Filter Fakultas: Bisa cari barang khusus di area fakultas tertentu (misalnya FT, FMIPA, FIS, FEB, dan lainnya).
- Pengatur Jarak (Radius Slider): Kamu bisa membatasi jarak pencarian barang, mulai dari radius 1 km sampai 5 km saja dari lokasimu.
- Filter Penjual Terpercaya: Ada opsi centang khusus untuk hanya menampilkan barang dari penjual yang sudah terverifikasi.

Kemudahan untuk Pembeli
- Tampilan detail barang yang transparan, lengkap dengan informasi tingkat kelayakan kondisi fisik barang dan ulasan/rating penjual.
- Rekomendasi Tempat COD Aman: Menyarankan lokasi ketemuan yang aman di dalam kampus, seperti Kantin FT, Perpustakaan Pusat, atau area Dekanat.
- Langsung Terhubung ke WhatsApp: Sekali klik, kamu akan diarahkan ke Chat WhatsApp penjual dengan pesan draf transaksi yang sudah otomatis terisi.

Kemudahan untuk Penjual
- Halaman Kelola Lapak: Penjual bisa melihat status barang yang sedang dijual, berapa orang yang melihat produk, dan statistik barang yang sudah laku.
- Unggah Foto Cepat: Proses unggah foto produk berjalan ringan karena foto otomatis dikompres oleh sistem.
- Pengaturan Profil: Mudah memperbarui nomor WhatsApp, lokasi tempat kos, hingga asal fakultas kapan saja.

Sistem Monetisasi (Biaya Admin)
- Biaya Upload Rp2.000 via QRIS: Setiap kali ingin menayangkan barang jualan, penjual membayar biaya admin terjangkau sebesar Rp2.000 via scan QRIS dan mengunggah foto bukti bayarnya.

Teknologi yang Pengembang Gunakan

- Tampilan Web (Frontend): React.js, Vite, serta Tailwind CSS / CSS3.
- Sistem Server & Database: Firebase Auth (Login) dan Firestore Database.
- Pengolahan Gambar: Mengubah foto menjadi format Base64 agar hemat biaya penyimpanan server (mengoptimalkan fitur gratis Firebase).
- Penyimpanan Lokal (Backup): Menggunakan LocalStorage agar draf data kamu tidak hilang jika koneksi internet mendadak lambat atau putus.

Cara Menjalankan Aplikasi di Laptop Kamu

Bagi yang ingin mencoba atau mengembangkan aplikasi ini di komputer lokal, ikuti langkah berikut:

1. Salin/Download Folder Proyek dari GitHub:
   ```bash
   git clone [https://github.com/elfasarin27-dot/kampusthrift.git](https://github.com/elfasarin27-dot/kampusthrift.git)
   cd kampusthrift

1) Unduh Semua Pustaka/Library yang Dibutuhkan:
    Bash
    npm install
2) Jalankan Aplikasi:
    Bash
    npm run dev
3) Buka browser (Chrome/Edge/Firefox) lalu kunjungi alamat: http://localhost:5173
