import React from 'react';
import { 
  PlusCircle, 
  Package, 
  Eye, 
  CheckCircle2, 
  Star, 
  Trash2, 
  Share2, 
  MessageSquare, 
  Building, 
  Tag, 
  ShoppingBag,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Settings
} from 'lucide-react';

export default function SellerDashboardView({
  currentUser,
  userListings,
  onOpenPostModal,
  onOpenVerifyModal,
  onOpenProfileModal,
  onDeleteProduct,
  onSwitchToBuyerMode
}) {
  const isVerified = currentUser?.badgeVerified || currentUser?.role === 'verified_student';

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Seller Studio Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 border border-teal-500/30 p-6 md:p-8 glass-panel shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Left Seller Profile */}
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400 shadow-lg shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Dashboard Penjual UNNES</span>
                {isVerified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Badge Active</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-heading font-extrabold text-white">{currentUser?.fullName}</h1>
              <p className="text-xs text-slate-300">
                Fakultas: <strong className="text-teal-300">{currentUser?.faculty || 'FT UNNES'}</strong> • WA: <strong className="text-teal-300">{currentUser?.phone || currentUser?.phoneNumberWa}</strong>
              </p>
            </div>
          </div>

          {/* Right Action CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPostModal}
              className="py-3 px-5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-teal-500/25 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-5 h-5 fill-slate-950 text-teal-400" />
              <span>+ Pasang Lapak Preloved Baru</span>
            </button>

            <button
              onClick={onOpenProfileModal}
              className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>⚙️ Detail & Edit Profil</span>
            </button>

            <button
              onClick={onSwitchToBuyerMode}
              className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Mode Pembeli 🛒</span>
            </button>
          </div>

        </div>

        {/* Verification Alert Banner if Not Verified */}
        {!isVerified && (
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-4 text-xs text-amber-200">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Tingkatkan Trust Score lapakmu dengan verifikasi email <strong>@students.unnes.ac.id</strong></span>
            </div>
            <button
              onClick={onOpenVerifyModal}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors shrink-0"
            >
              Verifikasi Sekarang
            </button>
          </div>
        )}
      </div>

      {/* Seller Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Lapak Aktif</span>
          <span className="text-2xl font-heading font-extrabold text-white block">{userListings.length} Barang</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Total Dilihat / Leads</span>
          <span className="text-2xl font-heading font-extrabold text-teal-400 block">{userListings.length * 14 + 32} Pembeli</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Barang Terjual</span>
          <span className="text-2xl font-heading font-extrabold text-emerald-400 block">5 Preloved</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Honesty Rating</span>
          <span className="text-2xl font-heading font-extrabold text-amber-400 flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-400" /> 5.0 / 5.0
          </span>
        </div>
      </div>

      {/* Active Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-extrabold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-teal-400" />
            <span>Kelola Lapak Preloved Saya ({userListings.length})</span>
          </h2>
          <button
            onClick={onOpenPostModal}
            className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
          >
            <span>+ Tambah Lapak</span>
          </button>
        </div>

        {userListings.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl border border-slate-800 space-y-4">
            <Tag className="w-12 h-12 mx-auto text-slate-600 animate-bounce" />
            <div className="space-y-1">
              <h3 className="text-base font-heading font-bold text-white">Belum Ada Lapak Aktif</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Mulai jual buku kuliah, peralatan kos, atau barang bekasmu kepada sesama mahasiswa UNNES.
              </p>
            </div>
            <button
              onClick={onOpenPostModal}
              className="py-2.5 px-5 bg-teal-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20"
            >
              + Pasang Lapak Pertama Gratis
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {userListings.map(item => (
              <div
                key={item.id}
                className="glass-panel rounded-2xl overflow-hidden border border-slate-800 p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded">
                      {item.condition}
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-2">{item.title}</h4>
                    <div className="text-base font-extrabold text-teal-400">
                      {formatRupiah(item.price)}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="block font-semibold text-slate-300">📍 Location COD:</span>
                  <span className="truncate block">{item.codLocation}</span>
                </div>

                {/* Listing Action Controls */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onDeleteProduct(item.id)}
                    className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>

                  <button
                    onClick={() => {
                      const text = `Halo, saya menjual preloved "${item.title}" seharga ${formatRupiah(item.price)} di KampusThrift UNNES! Hubungi saya di ${currentUser?.phone || currentUser?.phoneNumberWa} untuk COD di ${item.codLocation}.`;
                      navigator.clipboard.writeText(text);
                      alert('Pesan promosi lapak berhasil disalin!');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Bagikan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
