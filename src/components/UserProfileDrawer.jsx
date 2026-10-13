import React, { useState } from 'react';
import { 
  X, 
  User, 
  CheckCircle2, 
  Star, 
  Heart, 
  Package, 
  ShieldCheck, 
  LogOut, 
  PlusCircle, 
  Trash2,
  ExternalLink,
  MapPin,
  LogIn,
  GraduationCap,
  Settings,
  Phone,
  Mail
} from 'lucide-react';

export default function UserProfileDrawer({
  isOpen,
  onClose,
  currentUser,
  userListings,
  favoriteProducts,
  onRemoveFavorite,
  onOpenVerifyModal,
  onOpenPostModal,
  onOpenAuthModal,
  onOpenProfileModal,
  onLogout,
  onSelectProduct
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'favorites'
  const isGuest = currentUser?.role === 'guest';
  const isVerified = currentUser?.badgeVerified || currentUser?.role === 'verified_student';

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden modal-backdrop animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl glass-panel flex flex-col justify-between">
          
          {/* Top Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dashboard User & Profil</span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Avatar Card */}
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.fullName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-extrabold text-white text-base truncate">{currentUser?.fullName}</h3>
                  {isVerified && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" title="Verified @students.unnes.ac.id" />
                  )}
                </div>
                
                {/* Role Pill */}
                <div className="mt-1">
                  {isGuest ? (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[11px] font-bold border border-amber-500/30">
                      🔒 Mode Tamu (Guest)
                    </span>
                  ) : isVerified ? (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                      🎓 Mahasiswa UNNES Terverifikasi
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold border border-slate-700">
                      👤 Pengguna Umum
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-1 truncate">{currentUser?.email}</p>
              </div>
            </div>

            {/* Registered User Data Overview Card */}
            {!isGuest && (
              <div className="p-3.5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data Pendaftaran Terdaftar:</span>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenProfileModal();
                    }}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Detail & Edit Profil</span>
                  </button>
                </div>
                <div className="space-y-1 text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">WA: {currentUser.phone || currentUser.phoneNumberWa || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Alamat: {currentUser.address || 'Sekaran UNNES'} ({currentUser.faculty || 'FT'})</span>
                  </div>
                </div>
              </div>
            )}

            {/* Guest Login Banner CTA */}
            {isGuest ? (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2">
                <p className="text-xs text-amber-300 leading-relaxed">
                  Anda berada dalam mode Tamu. Masuk ke akun Anda untuk pasang lapak, chat WhatsApp penjual, dan simpan favorit.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuthModal('general');
                  }}
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk / Daftar Akun</span>
                </button>
              </div>
            ) : !isVerified && (
              <button
                onClick={() => {
                  onClose();
                  onOpenVerifyModal();
                }}
                className="w-full py-2.5 px-3 bg-amber-500/10 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-amber-500/20 transition-all animate-pulse"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Klaim Verified Student Badge (@students.unnes.ac.id)</span>
              </button>
            )}
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-2">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'listings'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Lapak Saya ({userListings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'favorites'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Favorit Saya ({favoriteProducts.length})</span>
            </button>
          </div>

          {/* Content List Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeTab === 'listings' ? (
              userListings.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-3">
                  <Package className="w-12 h-12 mx-auto text-slate-600" />
                  <p className="text-xs">
                    {isGuest ? 'Mode Tamu tidak dapat memasang barang.' : 'Belum ada barang preloved yang Anda jual.'}
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPostModal();
                    }}
                    className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400 transition-colors"
                  >
                    + Pasang Lapak Sekarang
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userListings.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(item);
                      }}
                      className="p-3 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center gap-3 hover:border-emerald-500/40 transition-colors cursor-pointer"
                    >
                      <img src={item.images[0]} alt={item.title} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-200 truncate">{item.title}</h4>
                        <span className="text-sm font-extrabold text-emerald-400 block">{formatRupiah(item.price)}</span>
                        <span className="text-[10px] text-slate-400">COD: {item.codLocation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              favoriteProducts.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-3">
                  <Heart className="w-12 h-12 mx-auto text-slate-600" />
                  <p className="text-xs">Belum ada barang dalam daftar favorit Anda.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoriteProducts.map(item => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center gap-3 hover:border-emerald-500/40 transition-colors"
                    >
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="w-14 h-14 rounded-xl object-cover cursor-pointer"
                        onClick={() => {
                          onClose();
                          onSelectProduct(item);
                        }}
                      />
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { onClose(); onSelectProduct(item); }}>
                        <h4 className="text-xs font-bold text-slate-200 truncate">{item.title}</h4>
                        <span className="text-sm font-extrabold text-emerald-400 block">{formatRupiah(item.price)}</span>
                        <span className="text-[10px] text-slate-400">📍 UNNES ({item.faculty})</span>
                      </div>
                      <button
                        onClick={() => onRemoveFavorite(item.id)}
                        className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                        title="Hapus favorit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Footer CTA & Logout / Switch */}
          <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-2">
            {!isGuest ? (
              <button
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar (Switch ke Mode Tamu)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuthModal('general');
                }}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 fill-slate-950 text-emerald-400" />
                <span>Masuk Akun Mahasiswa / Umum</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
