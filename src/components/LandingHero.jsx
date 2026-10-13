import React from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  PlusCircle, 
  Search,
  CheckCircle2,
  Tag,
  MessageSquare
} from 'lucide-react';

export default function LandingHero({
  onOpenAuth,
  onBrowseAsBuyer,
  onStartSelling
}) {
  return (
    <div className="w-full space-y-12 pb-12">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 p-8 md:p-14 glass-panel shadow-2xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Platform Preloved Resmi Mahasiswa UNNES Sekaran</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Jual Beli Preloved Kampus <span className="gradient-text">UNNES</span>
          </h1>

          <p className="text-base md:text-xl text-slate-300 font-normal leading-relaxed">
            Tempat aman & hemat mahasiswa UNNES bertransaksi buku kuliah, elektronik, peralatan kos, dan fashion. 
            <strong className="text-emerald-400 font-semibold"> COD Gratis Rp0 Ongkir</strong> di area Sekaran!
          </p>

          {/* Call to Actions for Guest */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onOpenAuth('general')}
              className="py-3.5 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Masuk / Daftar Akun</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onBrowseAsBuyer}
              className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Jelajahi Katalog (Sebagai Pembeli)</span>
            </button>

            <button
              onClick={onStartSelling}
              className="py-3.5 px-6 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Mulai Jual (Sebagai Penjual)</span>
            </button>
          </div>

          {/* Quick Features Checklist */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Badge <code className="text-emerald-400 font-mono">@students.unnes.ac.id</code></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>COD Rp0 Ongkir Kampus Sekaran</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct WhatsApp Seller Contact</span>
            </div>
          </div>

        </div>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Buyer Option Card */}
        <div 
          onClick={onBrowseAsBuyer}
          className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-emerald-500/40 transition-all glass-panel-hover cursor-pointer group flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">Mode Pembeli 🛒</span>
              <h3 className="text-xl font-heading font-extrabold text-white">Cari & Beli Preloved Murah Kos</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Jelajahi buku modul perkuliahan UNNES, peralatan elektronik kos, rice cooker, helm, dan fashion. Filter sesuai fakultasmu!
              </p>
            </div>
          </div>
          <button className="w-full py-3 bg-slate-900 group-hover:bg-emerald-500 text-slate-200 group-hover:text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2">
            <span>Masuk Mode Pembeli</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Seller Option Card */}
        <div 
          onClick={onStartSelling}
          className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-emerald-500/40 transition-all glass-panel-hover cursor-pointer group flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 group-hover:scale-110 transition-transform">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">Mode Penjual 🏷️</span>
              <h3 className="text-xl font-heading font-extrabold text-white">Jual Barang Bekas Jadi Uang</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Punya barang kos atau buku bekas yang tak terpakai? Pasang lapak gratis, atur lokasi COD UNNES, dan terima chat WA pembeli!
              </p>
            </div>
          </div>
          <button className="w-full py-3 bg-slate-900 group-hover:bg-teal-500 text-slate-200 group-hover:text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2">
            <span>Masuk Mode Penjual</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
