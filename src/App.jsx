import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import CampusFilterBar from './components/CampusFilterBar';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import PostItemModal from './components/PostItemModal';
import StudentVerificationModal from './components/StudentVerificationModal';
import SafetyTipsModal from './components/SafetyTipsModal';
import UserProfileDrawer from './components/UserProfileDrawer';
import UserProfileModal from './components/UserProfileModal';
import AuthModal from './components/AuthModal';
import SellerDashboardView from './components/SellerDashboardView';
import MobileBottomNav from './components/MobileBottomNav';

import { INITIAL_PRODUCTS } from './data/mockData';
import { 
  subscribeFirestoreProducts, 
  deleteProductFromFirestore,
  saveUserToFirestore 
} from './firebase/config';
import { useInactivityTimer } from './hooks/useInactivityTimer';
import { Sparkles, CheckCircle2, ShieldCheck, ShoppingBag, Database, AlertCircle } from 'lucide-react';

const GUEST_USER_MOCK = {
  userId: 'guest-000',
  fullName: 'Tamu (Pengunjung)',
  email: 'tamu@kampusthrift.id',
  isStudent: false,
  badgeVerified: false,
  role: 'guest',
  campusName: 'Ekosistem UNNES Sekaran',
  faculty: 'Sekaran',
  phone: '',
  phoneNumberWa: '',
  address: 'Area Kampus UNNES',
  ratingHonesty: 0.0,
  totalReviews: 0,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
};

// Initial Registered Users Seed
const INITIAL_REGISTERED_USERS = [
  {
    userId: 'user-101',
    fullName: 'Dimas Prasetyo',
    email: 'dimas.ft@students.unnes.ac.id',
    password: 'password123',
    phone: '6281234567890',
    phoneNumberWa: '6281234567890',
    address: 'Sekaran Gang Cempaka No. 12',
    faculty: 'FT',
    isStudent: true,
    badgeVerified: true,
    role: 'verified_student',
    campusName: 'UNNES (Fakultas Teknik)',
    ratingHonesty: 5.0,
    totalReviews: 18,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
  },
  {
    userId: 'user-102',
    fullName: 'Annisa Rahmawati',
    email: 'annisa.mipa@students.unnes.ac.id',
    password: 'password123',
    phone: '6285712345678',
    phoneNumberWa: '6285712345678',
    address: 'Rusunawa UNNES Putri Block A',
    faculty: 'FMIPA',
    isStudent: true,
    badgeVerified: true,
    role: 'verified_student',
    campusName: 'UNNES (Fakultas MIPA)',
    ratingHonesty: 4.9,
    totalReviews: 24,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    userId: 'user-201',
    fullName: 'Budi Warga Sekaran',
    email: 'budi.sekaran@gmail.com',
    password: 'password123',
    phone: '6285711223344',
    phoneNumberWa: '6285711223344',
    address: 'Simpang Tiga Sekaran',
    faculty: 'Banaran',
    isStudent: false,
    badgeVerified: false,
    role: 'general',
    campusName: 'Warga Sekaran UNNES',
    ratingHonesty: 4.8,
    totalReviews: 4,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'
  }
];

export default function App() {
  // Restore Persistent Active Session from LocalStorage on refresh
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedSession = localStorage.getItem('kampusthrift_active_session');
      return savedSession ? JSON.parse(savedSession) : GUEST_USER_MOCK;
    } catch (e) {
      return GUEST_USER_MOCK;
    }
  });

  // Application Active Mode: 'guest_landing' | 'buyer' | 'seller'
  const [activeMode, setActiveMode] = useState(() => {
    try {
      const savedSession = localStorage.getItem('kampusthrift_active_session');
      return savedSession ? 'buyer' : 'guest_landing';
    } catch (e) {
      return 'guest_landing';
    }
  });
  
  // Dynamic Firestore Products State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Registered Users Database State
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('kampusthrift_users');
      return saved ? JSON.parse(saved) : INITIAL_REGISTERED_USERS;
    } catch (e) {
      return INITIAL_REGISTERED_USERS;
    }
  });

  // Save active user session to localStorage whenever updated
  useEffect(() => {
    try {
      if (currentUser && currentUser.role !== 'guest') {
        localStorage.setItem('kampusthrift_active_session', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('kampusthrift_active_session');
      }
    } catch (e) {}
  }, [currentUser]);

  // Save registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kampusthrift_users', JSON.stringify(registeredUsers));
    } catch (e) {}
  }, [registeredUsers]);

  // Real-Time Sync with Firebase Firestore Collection 'products'
  useEffect(() => {
    const unsubscribe = subscribeFirestoreProducts((firestoreProducts) => {
      if (firestoreProducts && firestoreProducts.length > 0) {
        setProducts(firestoreProducts);
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [radiusKm, setRadiusKm] = useState(3.0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  
  // UI & Modals State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authActionContext, setAuthActionContext] = useState('general');
  
  const [activeMobileTab, setActiveMobileTab] = useState('home');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Favorites (Wishlist)
  const [favorites, setFavorites] = useState(['prod-1', 'prod-3']);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 30-Minutes Inactivity Auto-Logout Handler
  const handleInactivityLogout = () => {
    if (currentUser?.role !== 'guest') {
      try {
        localStorage.removeItem('kampusthrift_active_session');
      } catch (e) {}
      setCurrentUser(GUEST_USER_MOCK);
      setActiveMode('guest_landing');
      showToast('⚠️ Sesi Anda telah berakhir karena tidak ada aktivitas selama 30 menit.');
    }
  };

  // Attach 30-Minute Inactivity Auto-Logout Listener
  const isLoggedIn = currentUser?.role !== 'guest';
  useInactivityTimer(isLoggedIn, handleInactivityLogout, 30 * 60 * 1000);

  // Toggle Theme
  const handleToggleTheme = () => {
    setIsDarkTheme(prev => !prev);
    if (document.body) {
      document.body.classList.toggle('light-theme');
    }
  };

  // Guest Access Control Guard
  const requireAuth = (actionContextName, callback) => {
    if (currentUser?.role === 'guest') {
      setAuthActionContext(actionContextName);
      setIsAuthModalOpen(true);
      return false;
    }
    if (callback) callback();
    return true;
  };

  // Open Post Item Modal with Guest Guard
  const handleOpenPostModal = () => {
    requireAuth('post_item', () => {
      setActiveMode('seller');
      setIsPostModalOpen(true);
    });
  };

  // Wishlist Handler with Guest Guard
  const handleToggleFavorite = (productId) => {
    requireAuth('favorite', () => {
      if (favorites.includes(productId)) {
        setFavorites(prev => prev.filter(id => id !== productId));
        showToast('Barang dihapus dari daftar favorit');
      } else {
        setFavorites(prev => [...prev, productId]);
        showToast('❤️ Barang ditambahkan ke favorit!');
      }
    });
  };

  // WhatsApp Launcher with Guest Guard
  const handleOpenWhatsApp = (product) => {
    requireAuth('contact_seller', () => {
      const sellerPhone = product.seller.phoneNumberWa || '6281234567890';
      const buyerName = currentUser.fullName;
      const buyerPhone = currentUser.phone || currentUser.phoneNumberWa || '';
      const buyerAddress = currentUser.address || 'Sekaran UNNES';

      const message = `Halo Kak ${product.seller.fullName}, saya berminat dengan barang preloved "${product.title}" (Rp ${product.price.toLocaleString('id-ID')}) di KampusThrift UNNES.\n\nData Pembeli Terverifikasi:\n• Nama: ${buyerName}\n• No. HP/WA: ${buyerPhone}\n• Alamat/Kos: ${buyerAddress}\n\nApakah barang masih tersedia kak? Saya ingin janji COD di titik: ${product.codLocation}. Terima kasih!`;
      const waUrl = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  };

  // Register New User
  const handleRegisterUser = (newUser) => {
    setRegisteredUsers(prev => [...prev, newUser]);
    saveUserToFirestore({
      user_id: newUser.userId,
      full_name: newUser.fullName,
      email: newUser.email,
      is_student: newUser.isStudent,
      campus_name: newUser.campusName,
      badge_verified: newUser.badgeVerified,
      phone_number_wa: newUser.phone,
      rating_honesty: 5.0,
      total_reviews: 0
    });
    showToast(`🎉 Pendaftaran berhasil! Akun ${newUser.fullName} tersimpan di Firestore.`);
  };

  // Login Success Handler
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('kampusthrift_active_session', JSON.stringify(user));
    } catch (e) {}
    setActiveMode('buyer');
    showToast(`👋 Masuk berhasil! Status login tersimpan secara permanen.`);
  };

  // Update Profile Handler
  const handleUpdateUserProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('kampusthrift_active_session', JSON.stringify(updatedUser));
    } catch (e) {}
    
    // Update in registeredUsers
    setRegisteredUsers(prev => prev.map(u => u.userId === updatedUser.userId ? updatedUser : u));

    // Update in Firestore
    saveUserToFirestore({
      user_id: updatedUser.userId,
      full_name: updatedUser.fullName,
      email: updatedUser.email,
      is_student: updatedUser.isStudent,
      campus_name: updatedUser.campusName,
      badge_verified: updatedUser.badgeVerified,
      phone_number_wa: updatedUser.phone || updatedUser.phoneNumberWa
    });

    showToast('✨ Data profil ter-update & tersimpan secara permanen!');
  };

  // Explicit Manual Logout Handler (ONLY triggered when user clicks Logout button)
  const handleLogout = () => {
    try {
      localStorage.removeItem('kampusthrift_active_session');
    } catch (e) {}
    setCurrentUser(GUEST_USER_MOCK);
    setActiveMode('guest_landing');
    showToast('Keluar akun berhasil. Beralih ke Mode Tamu.');
  };

  // Add New Product
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev.filter(p => p.id !== newProduct.id)]);
    setActiveMode('seller');
    showToast('Bukti pembayaran QRIS Rp2.000 berhasil dikonfirmasi! Lapak Anda resmi ditayangkan di KampusThrift.');
  };

  // Delete Product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Yakin ingin menghapus lapak barang ini dari Firestore?')) {
      await deleteProductFromFirestore(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
      showToast('Lapak barang berhasil dihapus dari Firestore.');
    }
  };

  // Student Verification Handler (@students.unnes.ac.id)
  const handleVerifyUser = (email) => {
    setCurrentUser(prev => {
      const updated = {
        ...prev,
        email: email,
        badgeVerified: true,
        role: 'verified_student'
      };

      try {
        localStorage.setItem('kampusthrift_active_session', JSON.stringify(updated));
      } catch (e) {}

      setRegisteredUsers(users => users.map(u => u.userId === prev.userId ? updated : u));
      saveUserToFirestore({
        user_id: prev.userId,
        email: email,
        badge_verified: true,
        is_student: true
      });

      return updated;
    });
    showToast('🎓 Akun terverifikasi sebagai Mahasiswa UNNES!');
  };

  // Filtered Products Memo
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesLocation = product.codLocation.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesLocation) return false;
      }

      // 2. Faculty Filter
      if (selectedFaculty !== 'all' && product.faculty !== selectedFaculty) {
        return false;
      }

      // 3. Category Filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // 4. Radius Filter
      if (product.distanceKm > radiusKm) {
        return false;
      }

      // 5. Verified Seller Filter
      if (verifiedOnly && !product.seller.badgeVerified) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.seller.ratingHonesty - a.seller.ratingHonesty;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      // Default: newest
      return (b.createdTimestamp || 0) - (a.createdTimestamp || 0);
    });
  }, [products, searchQuery, selectedFaculty, selectedCategory, radiusKm, verifiedOnly, sortBy]);

  // Favorite Products List
  const favoriteProductsList = useMemo(() => {
    return products.filter(p => favorites.includes(p.id));
  }, [products, favorites]);

  // User's own listings
  const userListings = useMemo(() => {
    if (currentUser?.role === 'guest') return [];
    return products.filter(p => p.seller.email === currentUser.email || p.seller.userId === currentUser.userId);
  }, [products, currentUser]);

  return (
    <div className={`min-h-screen pb-20 md:pb-12 ${isDarkTheme ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors`}>
      
      {/* Toast Notification Floating Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-300 animate-in slide-in-from-top-4 duration-300 max-w-md">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentUser={currentUser}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        onOpenPostModal={handleOpenPostModal}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        onOpenProfileDrawer={() => setIsProfileDrawerOpen(true)}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onOpenAuthModal={(ctx) => {
          setAuthActionContext(ctx || 'general');
          setIsAuthModalOpen(true);
        }}
        favoritesCount={favorites.length}
        onToggleTheme={handleToggleTheme}
        isDarkTheme={isDarkTheme}
        selectedFaculty={selectedFaculty}
        setSelectedFaculty={setSelectedFaculty}
      />

      {/* Main Body Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* VIEW 1: Guest / Unauthenticated Landing Page */}
        {activeMode === 'guest_landing' && (
          <>
            <LandingHero
              onOpenAuth={(ctx) => {
                setAuthActionContext(ctx || 'general');
                setIsAuthModalOpen(true);
              }}
              onBrowseAsBuyer={() => setActiveMode('buyer')}
              onStartSelling={handleOpenPostModal}
            />

            {/* Public Catalog Preview */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
                  <span>Pratinjau Barang Preloved Terbaru (Firebase Firestore)</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Database className="w-3 h-3" /> Live Firestore
                  </span>
                </h2>
                <button
                  onClick={() => setActiveMode('buyer')}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  Lihat Semua Katalog & Filter ➔
                </button>
              </div>

              <ProductGrid
                products={products.slice(0, 4)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectProduct={(product) => setSelectedProduct(product)}
                onOpenWhatsApp={handleOpenWhatsApp}
              />
            </div>
          </>
        )}

        {/* VIEW 2: Buyer Mode (Katalog & Filter Hyperlocal) */}
        {activeMode === 'buyer' && (
          <>
            <CampusFilterBar
              selectedFaculty={selectedFaculty}
              setSelectedFaculty={setSelectedFaculty}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              radiusKm={radiusKm}
              setRadiusKm={setRadiusKm}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                <span>Katalog Preloved UNNES</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Database className="w-3 h-3" /> {filteredProducts.length} Barang (Firestore)
                </span>
              </h2>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Status COD: <strong className="text-emerald-400">Gratis Rp0 Ongkir</strong>
              </span>
            </div>

            <ProductGrid
              products={filteredProducts}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProduct={(product) => setSelectedProduct(product)}
              onOpenWhatsApp={handleOpenWhatsApp}
            />
          </>
        )}

        {/* VIEW 3: Seller Mode (Dashboard Studio Penjual) */}
        {activeMode === 'seller' && (
          <SellerDashboardView
            currentUser={currentUser}
            userListings={userListings}
            onOpenPostModal={handleOpenPostModal}
            onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
            onDeleteProduct={handleDeleteProduct}
            onSwitchToBuyerMode={() => setActiveMode('buyer')}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs text-slate-400">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span className="font-heading font-extrabold text-white text-base">KampusThrift UNNES</span>
            </div>
            <p>Platform Hyperlocal Jual Beli Preloved Mahasiswa Universitas Negeri Semarang (UNNES Sekaran).</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSafetyModalOpen(true)} className="hover:text-emerald-400 transition-colors">Panduan COD</button>
            <button onClick={() => setIsVerifyModalOpen(true)} className="hover:text-emerald-400 transition-colors">Verifikasi @students.unnes.ac.id</button>
            <button onClick={handleOpenPostModal} className="hover:text-emerald-400 transition-colors">Pasang Lapak</button>
          </div>
          <p className="text-slate-500">© 2026 KampusThrift. Session Persistent & Firebase Firestore.</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeMobileTab}
        setActiveTab={setActiveMobileTab}
        onOpenPostModal={handleOpenPostModal}
        onOpenProfileDrawer={() => setIsProfileDrawerOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={handleToggleFavorite}
          onOpenWhatsApp={handleOpenWhatsApp}
        />
      )}

      {/* User Profile Detail & Edit Modal */}
      {isProfileModalOpen && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          currentUser={currentUser}
          onUpdateProfile={handleUpdateUserProfile}
        />
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          registeredUsers={registeredUsers}
          onRegisterUser={handleRegisterUser}
          actionContext={authActionContext}
        />
      )}

      {/* Post New Item Modal */}
      {isPostModalOpen && (
        <PostItemModal
          onClose={() => setIsPostModalOpen(false)}
          onAddProduct={handleAddProduct}
          currentUser={currentUser}
        />
      )}

      {/* Student Verification Modal */}
      {isVerifyModalOpen && (
        <StudentVerificationModal
          onClose={() => setIsVerifyModalOpen(false)}
          currentUser={currentUser}
          onVerifyUser={handleVerifyUser}
        />
      )}

      {/* Safety Tips Hub Modal */}
      {isSafetyModalOpen && (
        <SafetyTipsModal
          onClose={() => setIsSafetyModalOpen(false)}
        />
      )}

      {/* Profile Drawer */}
      <UserProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        currentUser={currentUser}
        userListings={userListings}
        favoriteProducts={favoriteProductsList}
        onRemoveFavorite={handleToggleFavorite}
        onOpenVerifyModal={() => {
          setIsProfileDrawerOpen(false);
          setIsVerifyModalOpen(true);
        }}
        onOpenPostModal={() => {
          setIsProfileDrawerOpen(false);
          handleOpenPostModal();
        }}
        onOpenAuthModal={(ctx) => {
          setIsProfileDrawerOpen(false);
          setAuthActionContext(ctx || 'general');
          setIsAuthModalOpen(true);
        }}
        onOpenProfileModal={() => {
          setIsProfileDrawerOpen(false);
          setIsProfileModalOpen(true);
        }}
        onLogout={handleLogout}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

    </div>
  );
}
