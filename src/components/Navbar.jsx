import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  Sun, 
  Moon, 
  MapPin,
  Sparkles,
  User,
  LogIn,
  GraduationCap,
  Tag,
  Home
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  currentUser, 
  activeMode, // 'guest_landing' | 'buyer' | 'seller'
  setActiveMode,
  onOpenPostModal, 
  onOpenVerifyModal, 
  onOpenProfileDrawer,
  onOpenSafetyModal,
  onOpenAuthModal,
  favoritesCount,
  onToggleTheme,
  isDarkTheme,
  selectedFaculty,
  setSelectedFaculty
}) {
  const isGuest = currentUser?.role === 'guest';
  const isVerifiedStudent = currentUser?.badgeVerified || currentUser?.role === 'verified_student';

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-colors">
      {/* Top Campus Alert Bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-500/20 px-4 py-1.5 text-xs font-medium text-emerald-300 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Platform Preloved Resmi Mahasiswa UNNES • <strong>COD Rp0 Ongkir</strong> di Kampus Sekaran</span>
          </div>
          <button 
            onClick={onOpenSafetyModal}
            className="hover:underline flex items-center gap-1 text-emerald-400 hover:text-emerald-200 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tips COD Safe Campus</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveMode(isGuest ? 'guest_landing' : 'buyer')}
            className="flex items-center gap-3 shrink-0 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 transform transition hover:scale-105">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  Kampus<span className="gradient-text">Thrift</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  UNNES
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-none">Hyperlocal Campus Marketplace</p>
            </div>
          </div>

          {/* Mode Switcher Pills (If not Guest landing) */}
          {!isGuest && (
            <div className="hidden lg:flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveMode('buyer')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'buyer'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Mode Pembeli 🛒</span>
              </button>

              <button
                onClick={() => setActiveMode('seller')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'seller'
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Mode Penjual 🏷️</span>
              </button>
            </div>
          )}

          {/* Search Bar (Only shown in buyer mode) */}
          {activeMode === 'buyer' && (
            <div className="hidden md:flex flex-1 max-w-sm mx-2">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari buku kalkulus, rice cooker kos..."
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Student Verification Badge / Login Trigger */}
            {isGuest ? (
              <button
                onClick={() => onOpenAuthModal('general')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk / Daftar</span>
              </button>
            ) : (
              <button
                onClick={onOpenVerifyModal}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isVerifiedStudent
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20 animate-pulse'
                }`}
                title="Status Verifikasi Mahasiswa UNNES"
              >
                {isVerifiedStudent ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mahasiswa Terverifikasi</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Verifikasi @students.unnes.ac.id</span>
                  </>
                )}
              </button>
            )}

            {/* Wishlist Button */}
            {!isGuest && (
              <button
                onClick={onOpenProfileDrawer}
                className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                title="Favorit Saya"
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-md">
                    {favoritesCount}
                  </span>
                )}
              </button>
            )}

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Ganti Tema"
            >
              {isDarkTheme ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
            </button>

            {/* Post Item CTA Button */}
            <button
              onClick={onOpenPostModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Jual Barang</span>
              <span className="sm:hidden">Jual</span>
            </button>

            {/* Profile Avatar Trigger */}
            <button
              onClick={onOpenProfileDrawer}
              className="w-9 h-9 rounded-xl border-2 border-emerald-500/50 overflow-hidden hover:border-emerald-400 transition-colors p-0.5 bg-slate-800 cursor-pointer relative"
              title="Profil & Ganti Mode"
            >
              <img 
                src={currentUser?.avatar} 
                alt="Profile Avatar" 
                className="w-full h-full object-cover rounded-lg"
              />
              {isGuest && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border border-slate-950 rounded-full" title="Mode Tamu"></span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Mode Switcher Row */}
        {!isGuest && (
          <div className="lg:hidden pb-3 pt-1 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveMode('buyer')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                activeMode === 'buyer'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              🛒 Mode Pembeli
            </button>

            <button
              onClick={() => setActiveMode('seller')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                activeMode === 'seller'
                  ? 'bg-teal-500 text-slate-950 border-teal-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              🏷️ Mode Penjual
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
