import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Star, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  Share2, 
  ExternalLink,
  Clock,
  Building,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

export default function ProductDetailModal({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenWhatsApp
}) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0] || '');
  const { seller } = product;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Lihat preloved ${product.title} seharga ${formatRupiah(product.price)} di KampusThrift UNNES!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link produk berhasil disalin!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto modal-backdrop animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden glass-panel my-8 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-4 md:p-6 bg-slate-950/60 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
          <div className="space-y-3">
            {/* Main Preview */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-emerald-500/90 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-lg backdrop-blur-md shadow">
                {product.condition}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImage === imgUrl ? 'border-emerald-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* COD Guarantee Box */}
          <div className="mt-4 p-3.5 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Jaminan COD Bebas Penipuan:</span>
              <span>Bertemu di area publik kampus (Kantin/Perpus UNNES), cek barang dulu sepuasnya baru bayar cash/QRIS Rp0 Ongkir!</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Seller Actions */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            {/* Faculty Tag & Actions */}
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700 text-xs font-semibold">
                <Building className="w-3.5 h-3.5" />
                <span>UNNES ({product.faculty}) • Jarak ~{product.distanceKm} km</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Bagikan Lapak"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    isFavorite ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title={isFavorite ? 'Disukai' : 'Tambah ke Favorit'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Title & Price */}
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-extrabold text-white leading-snug">
                {product.title}
              </h2>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl md:text-3xl font-heading font-extrabold text-emerald-400">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through font-medium">
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi & Kondisi Barang:</h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800 whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Preferred COD Spot */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Titik Temu COD Pilihan Penjual:</span>
              </h4>
              <p className="text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl">
                📍 {product.codLocation}
              </p>
            </div>

            {/* Seller Info Box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={seller.avatar}
                    alt={seller.fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-bold text-white text-sm">{seller.fullName}</span>
                      {seller.badgeVerified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>UNNES Student Badge</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{seller.email}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center text-xs">
                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Honesty Score</span>
                  <span className="text-amber-400 font-bold flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> {seller.ratingHonesty}
                  </span>
                </div>
                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Transaksi Sukses</span>
                  <span className="text-white font-bold">{seller.totalReviews} Barang</span>
                </div>
                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Respon WA</span>
                  <span className="text-emerald-400 font-bold">&lt; 15 Menit</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action CTA: Hubungi via WA */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => onOpenWhatsApp(product)}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-slate-950" />
              <span>Hubungi Penjual via WhatsApp (Nego & COD)</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Pesan WA akan terisi otomatis dengan rincian produk dan lokasi COD UNNES.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
