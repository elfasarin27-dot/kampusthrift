import React from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Eye, 
  PhoneCall,
  Lock
} from 'lucide-react';

export default function SafetyTipsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto modal-backdrop animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden glass-panel my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-emerald-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-white">Panduan COD Safe Campus UNNES</h2>
              <p className="text-xs text-emerald-300">Transaksi Aman Rp0 Ongkir di Lingkungan Kampus Sekaran</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs text-slate-300">
          
          {/* Warning Banner */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-amber-300 text-sm mb-1">Dilarang Transfer DP di Muka!</strong>
              <p className="leading-relaxed">
                Jangan pernah mentransfer uang muka (DP) atau biaya ongkir sebelum bertemu langsung & mengecek kondisi fisik barang di kampus UNNES.
              </p>
            </div>
          </div>

          {/* Recommended Safe COD Spots in UNNES */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5 text-xs">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Rekomendasi Titik Temu COD Aman di UNNES Sekaran:</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                <span className="font-bold text-white block">1. Perpustakaan Utama UNNES</span>
                <span className="text-slate-400 text-[11px]">Area ramai, terang, dan ada CCTV kampus.</span>
              </div>
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                <span className="font-bold text-white block">2. Kantin Dekanat (FT/FMIPA/FIS)</span>
                <span className="text-slate-400 text-[11px]">Banyak tempat duduk & colokan listrik untuk test barang elektronik.</span>
              </div>
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                <span className="font-bold text-white block">3. GSG & Student Center</span>
                <span className="text-slate-400 text-[11px]">Titik temu tengah untuk antarfakultas.</span>
              </div>
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                <span className="font-bold text-white block">4. Simpang Tiga Banaran</span>
                <span className="text-slate-400 text-[11px]">Cocok untuk pertemuan luar jam kuliah kos Sekaran.</span>
              </div>
            </div>
          </div>

          {/* 3 Step Rules */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-slate-100 uppercase tracking-wider text-xs">
              3 Langkah Emas Jual Beli Aman:
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <Eye className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">1. Cek Kelengkapan & Fungsi</strong>
                  <p className="text-slate-400 text-[11px]">Pastikan buku tidak ada halaman hilang, elektronik menyala, dan ukuran sepatu pas.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">2. Utamakan Penjual Terverifikasi</strong>
                  <p className="text-slate-400 text-[11px]">Cari badge 🎓 centang hijau dengan domain @students.unnes.ac.id untuk kepastian akun.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">3. Pembayaran Cash / QRIS On-the-spot</strong>
                  <p className="text-slate-400 text-[11px]">Bayar langsung setelah barang diterima & dinyatakan sesuai deskripsi.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Contact */}
          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              Saya Mengerti & Siap COD Aman
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
