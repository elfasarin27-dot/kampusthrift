export const UNNES_FACULTIES = [
  { id: 'all', name: 'Semua Fakultas & Area UNNES', short: 'Semua' },
  { id: 'FT', name: 'Fakultas Teknik (FT)', short: 'FT' },
  { id: 'FMIPA', name: 'Fakultas MIPA (FMIPA)', short: 'FMIPA' },
  { id: 'FIS', name: 'Fakultas Ilmu Sosial & IP (FISIP)', short: 'FIS' },
  { id: 'FEB', name: 'Fakultas Ekonomika & Bisnis (FEB)', short: 'FEB' },
  { id: 'FIP', name: 'Fakultas Ilmu Pendidikan (FIP)', short: 'FIP' },
  { id: 'FBS', name: 'Fakultas Bahasa & Seni (FBS)', short: 'FBS' },
  { id: 'FIK', name: 'Fakultas Ilmu Keolahragaan (FIK)', short: 'FIK' },
  { id: 'FH', name: 'Fakultas Hukum (FH)', short: 'FH' },
  { id: 'Rusunawa', name: 'Area Rusunawa UNNES', short: 'Rusunawa' },
  { id: 'Banaran', name: 'Sekaran & Gang Banaran', short: 'Banaran' },
];

export const CATEGORIES = [
  { id: 'all', name: 'Semua Kategori', icon: 'Sparkles' },
  { id: 'buku', name: 'Buku & Kuliah', icon: 'BookOpen' },
  { id: 'elektronik', name: 'Elektronik & Gadget', icon: 'Laptop' },
  { id: 'kos', name: 'Perlengkapan Kos', icon: 'Home' },
  { id: 'fashion', name: 'Fashion & Sepatu', icon: 'Shirt' },
  { id: 'hobi', name: 'Olahraga & Hobi', icon: 'Trophy' },
  { id: 'lainnya', name: 'Lain-lain', icon: 'Grid' }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Buku Kalkulus Purcell Edisi 9 (Bahasa Indonesia)',
    category: 'buku',
    price: 45000,
    originalPrice: 120000,
    condition: 'Sangat Baik (90%)',
    conditionLevel: 'excellent',
    faculty: 'FT',
    distanceKm: 0.3,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dijual karena mata kuliah Kalkulus sudah lulus dapet nilai A! Halaman utuh, tidak ada yang robek, hanya ada coretan pensil sedikit di bab 2.',
    codLocation: 'Kantin FT UNNES / Perpustakaan Pusat UNNES',
    createdAt: '2 jam yang lalu',
    seller: {
      userId: 'user-101',
      fullName: 'Dimas Prasetyo',
      email: 'dimas.ft@students.unnes.ac.id',
      isStudent: true,
      badgeVerified: true,
      campusName: 'UNNES (Fakultas Teknik)',
      phoneNumberWa: '6281234567890',
      ratingHonesty: 5.0,
      totalReviews: 18,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Agustus 2024'
    }
  },
  {
    id: 'prod-2',
    title: 'Monitor LED LG 24 Inch Full HD 75Hz - Mulus Buat Nugas & Skripsi',
    category: 'elektronik',
    price: 680000,
    originalPrice: 1450000,
    condition: 'Mulus 95% (Seperti Baru)',
    conditionLevel: 'like-new',
    faculty: 'FMIPA',
    distanceKm: 0.5,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pemakaian 6 bulan buat skripsi Matematika UNNES. Tidak ada dead pixel, lengkap dengan kabel HDMI dan adaptor original LG. Dus masih simpan.',
    codLocation: 'Gedung D1 FMIPA UNNES / Rusunawa Putri',
    createdAt: '3 jam yang lalu',
    seller: {
      userId: 'user-102',
      fullName: 'Annisa Rahmawati',
      email: 'annisa.mipa@students.unnes.ac.id',
      isStudent: true,
      badgeVerified: true,
      campusName: 'UNNES (Fakultas MIPA)',
      phoneNumberWa: '6285712345678',
      ratingHonesty: 4.9,
      totalReviews: 24,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Januari 2024'
    }
  },
  {
    id: 'prod-3',
    title: 'Meja Belajar Lipat Kayu Minimalis + Slot HP & Tempat Gelas',
    category: 'kos',
    price: 35000,
    originalPrice: 75000,
    condition: 'Bagus (88%)',
    conditionLevel: 'good',
    faculty: 'FIS',
    distanceKm: 0.2,
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Kuat tahan beban sampai 15kg. Kaki kokoh ada karet anti selip. Dijual karena mau wisuda semester ini dan bersih-bersih kamar kos.',
    codLocation: 'Sekaran Gang Cempaka / Pelataran FIS UNNES',
    createdAt: '5 jam yang lalu',
    seller: {
      userId: 'user-103',
      fullName: 'Bintang Rizky',
      email: 'bintang.fis@students.unnes.ac.id',
      isStudent: true,
      badgeVerified: true,
      campusName: 'UNNES (FISIP)',
      phoneNumberWa: '6289612349876',
      ratingHonesty: 5.0,
      totalReviews: 9,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'September 2023'
    }
  },
  {
    id: 'prod-4',
    title: 'Rice Cooker Cosmos 0.6L Hemat Listrik (Cocok Anak Kos)',
    category: 'kos',
    price: 115000,
    originalPrice: 240000,
    condition: 'Baik (92%)',
    conditionLevel: 'excellent',
    faculty: 'FEB',
    distanceKm: 0.7,
    images: [
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Kapasitas pas untuk 1-2 porsi makan. Anti lengket, elemen pemanas masih normal banget 300 watt. Bonus centong nasi + gelas ukur.',
    codLocation: 'Gedung L1 FEB UNNES / Simpang Tiga Sekaran',
    createdAt: 'Hari ini, 09:15',
    seller: {
      userId: 'user-104',
      fullName: 'Siti Nurhaliza',
      email: 'siti.feb@students.unnes.ac.id',
      isStudent: true,
      badgeVerified: true,
      campusName: 'UNNES (FEB)',
      phoneNumberWa: '6282134567891',
      ratingHonesty: 5.0,
      totalReviews: 31,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Maret 2024'
    }
  },
  {
    id: 'prod-5',
    title: 'Sepatu Compass Gazelle Low Black White Size 42 Original',
    category: 'fashion',
    price: 240000,
    originalPrice: 408000,
    condition: 'Bagus (90%) Dus Complete',
    conditionLevel: 'excellent',
    faculty: 'FIK',
    distanceKm: 0.9,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sepatu hits anak kuliah. Sole masih tebal, tidak ada yang jebol. Dijual karena agak kekecilan di kaki. Pembelian di official store.',
    codLocation: 'Lapangan Atletik FIK UNNES / GSG UNNES',
    createdAt: 'Kemarin',
    seller: {
      userId: 'user-105',
      fullName: 'Farhan FIK',
      email: 'farhan.fik@students.unnes.ac.id',
      isStudent: true,
      badgeVerified: true,
      campusName: 'UNNES (FIK)',
      phoneNumberWa: '6288212345678',
      ratingHonesty: 4.8,
      totalReviews: 14,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Oktober 2023'
    }
  },
  {
    id: 'prod-6',
    title: 'Kipas Angin Portable Advance Stand Rechargeable USB-C',
    category: 'kos',
    price: 42000,
    originalPrice: 89000,
    condition: 'Seperti Baru (99%)',
    conditionLevel: 'like-new',
    faculty: 'FIP',
    distanceKm: 0.4,
    images: [
      'https://images.unsplash.com/photo-1618941723628-e27e14c88b9a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Baru beli 2 minggu lalu saat Sekaran panas-panasnya. Sekarang kamar kos sudah terpasang AC jadi tidak terpakai lagi. Batere awet 6 jam.',
    codLocation: 'Gedung A1 FIP UNNES / Dekan FIP',
    createdAt: 'Kemarin',
    seller: {
      userId: 'user-106',
      fullName: 'Amanda Putri',
      email: 'amanda.fip@students.unnes.ac.id',
      isStudent: true,
      badgeVerified: true,
      campusName: 'UNNES (FIP)',
      phoneNumberWa: '6281398765432',
      ratingHonesty: 5.0,
      totalReviews: 7,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Februari 2025'
    }
  },
  {
    id: 'prod-7',
    title: 'Buku Pokok-Pokok Hukum Perdata Prof. Subekti Original',
    category: 'buku',
    price: 38000,
    originalPrice: 85000,
    condition: 'Baik (85% Stabilo Neat)',
    conditionLevel: 'good',
    faculty: 'FH',
    distanceKm: 0.6,
    images: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Buku wajib mahasiswa Hukum UNNES semester awal. Ada rekapan stabilo rapi untuk poin-poin ujian semester. Sampul plastik masih terpasang.',
    codLocation: 'Kantin FH UNNES / Gedung K1 FH',
    createdAt: '2 hari lalu',
    seller: {
      userId: 'user-107',
      fullName: 'Bayu Prasetya',
      email: 'bayu.fh@students.unnes.ac.id',
      isStudent: true,
      badgeVerified: true,
      campusName: 'UNNES (Fakultas Hukum)',
      phoneNumberWa: '6281987654321',
      ratingHonesty: 4.9,
      totalReviews: 12,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Nopember 2023'
    }
  },
  {
    id: 'prod-8',
    title: 'Keyboard Mechanical RGB Outemu Blue Switch Redragon Kumara',
    category: 'elektronik',
    price: 195000,
    originalPrice: 380000,
    condition: 'Fungsional 100% (92%)',
    conditionLevel: 'excellent',
    faculty: 'FT',
    distanceKm: 0.3,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clicky mantap buat ngetik kodingan tugas PWD / PBO Teknik Informatika UNNES. RGB mode normal semua, lengkap keycap puller.',
    codLocation: 'Gedung E1 FT UNNES / Lab Komputer FT',
    createdAt: '3 hari lalu',
    seller: {
      userId: 'user-101',
      fullName: 'Dimas Prasetyo',
      email: 'dimas.ft@students.unnes.ac.id',
      isStudent: true,
      badgeVerified: true,
      campusName: 'UNNES (Fakultas Teknik)',
      phoneNumberWa: '6281234567890',
      ratingHonesty: 5.0,
      totalReviews: 18,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Agustus 2024'
    }
  },
  {
    id: 'prod-9',
    title: 'Raket Badminton Yonex Arcsaber 11 + Senar BG66 Ultimax (Free Grip)',
    category: 'hobi',
    price: 185000,
    originalPrice: 350000,
    condition: 'Bagus (88%) Tarikan 26 lbs',
    conditionLevel: 'good',
    faculty: 'FIK',
    distanceKm: 0.8,
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cocok buat yang suka mabar badminton sore di GSG UNNES atau Gor Sekaran. Tidak ada retak sama sekali, baru ganti senar bulan lalu.',
    codLocation: 'Gor Badminton Sekaran / Lapangan FIK UNNES',
    createdAt: '3 hari lalu',
    seller: {
      userId: 'user-105',
      fullName: 'Farhan FIK',
      email: 'farhan.fik@students.unnes.ac.id',
      isStudent: true,
      badgeVerified: true,
      campusName: 'UNNES (FIK)',
      phoneNumberWa: '6288212345678',
      ratingHonesty: 4.8,
      totalReviews: 14,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'Oktober 2023'
    }
  }
];

export const CURRENT_USER_MOCK = {
  userId: 'user-guest-999',
  fullName: 'Mahasiswa UNNES',
  email: 'mahasiswa@students.unnes.ac.id',
  isStudent: true,
  badgeVerified: true,
  campusName: 'Universitas Negeri Semarang',
  faculty: 'FT',
  phoneNumberWa: '6281299887766',
  ratingHonesty: 5.0,
  totalReviews: 5,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};
