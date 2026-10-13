import React from 'react';
import { 
  Heart, 
  MapPin, 
  CheckCircle2, 
  Star, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function ProductGrid({
  products,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onOpenWhatsApp
}) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 glass-panel rounded-2xl border border-slate-800">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
          <Sparkles className="w-8 h-8 text-emerald-400 animate-bounce" />
        </div>
        <h3 className="text-lg font-heading font-bold text-white mb-2">Tidak Ada Barang Ditemukan</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          Coba atur ulang kata kunci pencarian, radius lokasi COD, atau pilih fakultas UNNES lainnya.
        </p>
      </div>
    );
  }

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => {
        const isFav = favorites.includes(product.id);
        const { seller } = product;

        return (
          <div
            key={product.id}
            className="group relative glass-panel rounded-2xl overflow-hidden border border-slate-800/90 glass-panel-hover flex flex-col justify-between"
          >
            {/* Top Image Section */}
            <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none"></div>

              {/* Condition Badge Top Left */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-md">
                  {product.condition}
                </span>
              </div>

              {/* Wishlist Button Top Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(product.id);
                }}
                className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all z-10 cursor-pointer ${
                  isFav
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110'
                    : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
                title={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>

              {/* Location Tag Bottom Left */}
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-[11px] font-semibold text-slate-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>UNNES ({product.faculty})</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-300 font-bold">{product.distanceKm} km</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 
                  onClick={() => onSelectProduct(product)}
                  className="font-heading font-semibold text-slate-100 text-base line-clamp-2 group-hover:text-emerald-400 transition-colors cursor-pointer leading-snug"
                >
                  {product.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-normal">
                  COD: {product.codLocation}
                </p>
              </div>

              {/* Price & Discount */}
              <div className="pt-1 flex items-baseline justify-between border-t border-slate-800/60">
                <div>
                  <div className="text-lg font-heading font-extrabold text-emerald-400 tracking-tight">
                    {formatRupiah(product.price)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-[11px] text-slate-500 line-through">
                      {formatRupiah(product.originalPrice)}
                    </div>
                  )}
                </div>
                <div className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{product.createdAt}</span>
                </div>
              </div>

              {/* Seller Information Card Footer */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={seller.avatar}
                    alt={seller.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-500/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-slate-200 truncate">{seller.fullName}</span>
                      {seller.badgeVerified && (
                        <CheckCircle2 
                          className="w-3.5 h-3.5 text-emerald-400 shrink-0" 
                          title="Verified UNNES Student (@students.unnes.ac.id)"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-300">{seller.ratingHonesty}</span>
                      <span>({seller.totalReviews})</span>
                    </div>
                  </div>
                </div>

                {/* Direct WA Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWhatsApp(product);
                  }}
                  className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 text-emerald-400 hover:text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                  title="Chat Langsung via WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WA</span>
                </button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
