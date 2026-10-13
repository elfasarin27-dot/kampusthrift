import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  PlusCircle, 
  MapPin, 
  Tag, 
  DollarSign, 
  FileText, 
  Sparkles, 
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  QrCode,
  Lock,
  Check
} from 'lucide-react';
import { UNNES_FACULTIES, CATEGORIES } from '../data/mockData';
import { saveProductToFirestore, saveUserToFirestore, convertImageToBase64 } from '../firebase/config';

const SAMPLE_PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618941723628-e27e14c88b9a?auto=format&fit=crop&w=800&q=80'
];

export default function PostItemModal({
  onClose,
  onAddProduct,
  currentUser
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'buku',
    price: '',
    originalPrice: '',
    condition: 'Sangat Baik (90%)',
    faculty: currentUser?.faculty || 'FT',
    codLocation: 'Kantin FT UNNES / Perpus Utama',
    description: '',
    imageUrl: SAMPLE_PRODUCT_IMAGES[0]
  });

  const [imagePreview, setImagePreview] = useState(SAMPLE_PRODUCT_IMAGES[0]);
  const [rawImageFile, setRawImageFile] = useState(null);
  
  // Payment Proof States (Required QRIS Listing Fee Rp2.000)
  const [paymentProofBase64, setPaymentProofBase64] = useState('');
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [paymentProofError, setPaymentProofError] = useState('');

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setRawImageFile(file);
      // Auto compress preview image to Base64 Data URL
      const compressedBase64 = await convertImageToBase64(file);
      setImagePreview(compressedBase64);
      setFormData(prev => ({ ...prev, imageUrl: compressedBase64 }));
    }
  };

  const handlePaymentProofChange = async (e) => {
    const file = e.target.files[0];
    setPaymentProofError('');
    if (!file) return;

    // File size validation (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setPaymentProofError('Ukuran file bukti transfer melebihi batas maksimal 5MB! Harap pilih gambar yang lebih kecil.');
      return;
    }

    try {
      const compressedBase64 = await convertImageToBase64(file);
      setPaymentProofBase64(compressedBase64);
      setPaymentProofFile(file);
    } catch (err) {
      console.error("Payment proof conversion error:", err);
      setPaymentProofError('Gagal memproses gambar bukti transfer. Silakan coba unggah ulang.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');

    if (!formData.title || !formData.price || !formData.codLocation) {
      alert('Mohon isi Judul, Harga, dan Lokasi COD pilihan!');
      return;
    }

    if (!paymentProofBase64) {
      setUploadError('Bukti transfer pembayaran QRIS Rp2.000 wajib diunggah sebelum menayangkan lapak!');
      return;
    }

    setIsUploading(true);

    try {
      // 1. Client-side Base64 compression for product image
      const imageToProcess = rawImageFile || imagePreview;
      const compressedBase64 = await convertImageToBase64(imageToProcess);

      // 2. Prepare Product Payload including Payment Info
      const productId = `prod-fs-${Date.now()}`;
      const newProduct = {
        id: productId,
        title: formData.title,
        category: formData.category,
        price: parseInt(formData.price, 10),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice, 10) : null,
        condition: formData.condition,
        conditionLevel: 'excellent',
        faculty: formData.faculty,
        distanceKm: 0.3,
        images: [compressedBase64],
        description: formData.description || 'Baru diunggah oleh mahasiswa UNNES. Siap COD Rp0 ongkir di area kampus Sekaran!',
        codLocation: formData.codLocation,
        createdAt: 'Baru saja (Firestore Spark)',
        createdTimestamp: Date.now(),
        // Firestore Payment Data
        paymentMethod: "QRIS",
        listingFeeAmount: 2000,
        paymentProofBase64: paymentProofBase64,
        paymentStatus: "VERIFIED_AUTO",
        paidAt: new Date().toISOString(),
        seller: {
          userId: currentUser.userId || 'user-me',
          fullName: currentUser.fullName || 'Mahasiswa UNNES',
          email: currentUser.email || 'mahasiswa@students.unnes.ac.id',
          isStudent: currentUser.isStudent ?? true,
          badgeVerified: currentUser.badgeVerified ?? true,
          campusName: 'UNNES (' + formData.faculty + ')',
          phoneNumberWa: currentUser.phone || currentUser.phoneNumberWa || '6281299887766',
          ratingHonesty: 5.0,
          totalReviews: 1,
          avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          joinedDate: 'Hari ini'
        }
      };

      // 3. Save to Firestore collection 'products' (With 5-Second Timeout & LocalStorage fallback)
      await saveProductToFirestore(newProduct);

      // 4. Sync User info to Firestore collection 'users'
      await saveUserToFirestore({
        userId: currentUser.userId,
        fullName: currentUser.fullName,
        email: currentUser.email,
        isStudent: currentUser.isStudent ?? true,
        campusName: 'UNNES (' + formData.faculty + ')',
        badgeVerified: currentUser.badgeVerified ?? true,
        phoneNumberWa: currentUser.phone || currentUser.phoneNumberWa,
        ratingHonesty: currentUser.ratingHonesty || 5.0,
        totalReviews: currentUser.totalReviews || 1,
        createdAt: new Date().toISOString()
      });

      onAddProduct(newProduct);
      setIsUploading(false);
      onClose();
    } catch (err) {
      console.error("Spark Product Upload Error:", err);
      setIsUploading(false);
      setUploadError("Gagal menyimpan ke Firestore. Otomatis menyimpan ke LocalStorage.");
    }
  };

  const isFormSubmittable = Boolean(formData.title && formData.price && formData.codLocation && paymentProofBase64);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto modal-backdrop animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden glass-panel my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-white">Jual Barang Preloved Kampus</h2>
              <p className="text-xs text-slate-400">Listing Fee QRIS Rp2.000 • Direct Sync Firestore 'products'</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Error Banner */}
          {uploadError && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-2xl text-amber-300 text-xs font-bold flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-200 mb-1">Status Form / Firestore:</strong>
                <span>{uploadError}</span>
              </div>
            </div>
          )}

          {/* Base64 Upload Zone */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Foto Barang Preloved (Convert Base64 Spark Plan):</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Preview Box */}
              <div className="sm:col-span-1 relative aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 flex items-center justify-center group">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white bg-slate-900/90 px-2 py-1 rounded">Base64 Spark</span>
                </div>
              </div>

              {/* Upload Input & Samples */}
              <div className="sm:col-span-2 space-y-2 flex flex-col justify-between">
                <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-3 text-center cursor-pointer bg-slate-950/40 hover:bg-slate-900 transition-colors flex flex-col items-center justify-center gap-1">
                  <UploadCloud className="w-6 h-6 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">Unggah Foto dari HP/Laptop</span>
                  <span className="text-[10px] text-slate-400">Convert ke String Base64 Terkompresi (Maks 5s)</span>
                  <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                </label>

                {/* Quick Sample Selector */}
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Atau pilih sampel foto cepat:</span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {SAMPLE_PRODUCT_IMAGES.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setRawImageFile(null);
                          setImagePreview(sample);
                          setFormData(prev => ({ ...prev, imageUrl: sample }));
                        }}
                        className={`w-10 h-10 rounded-lg overflow-hidden border-2 shrink-0 ${
                          imagePreview === sample ? 'border-emerald-400 scale-105' : 'border-slate-800 opacity-60'
                        }`}
                      >
                        <img src={sample} alt="Sample" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Judul Barang Preloved *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Buku Kalkulus Purcell Ed. 9 / Rice Cooker Cosmos 0.6L"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Kategori Barang</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Kondisi Barang</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Seperti Baru (99%)">Seperti Baru (99%)</option>
                <option value="Sangat Baik (90%)">Sangat Baik (90%)</option>
                <option value="Bagus (80%)">Bagus (80%)</option>
                <option value="Cukup (70%)">Cukup (70%)</option>
              </select>
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Harga Jual (Rp) *</label>
              <input
                type="number"
                required
                placeholder="Contoh: 45000"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-emerald-400 font-bold placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Harga Asli/Beli Dulu (Coret - Opsional)</label>
              <input
                type="number"
                placeholder="Contoh: 120000"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-400 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Faculty & Specific COD Spot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Fakultas / Lokasi UNNES</label>
              <select
                value={formData.faculty}
                onChange={(e) => setFormData(prev => ({ ...prev, faculty: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {UNNES_FACULTIES.filter(f => f.id !== 'all').map(fac => (
                  <option key={fac.id} value={fac.id}>{fac.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Titik Temu COD Spesifik *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Kantin FT / Rusunawa Putri / Simpang 3 Banaran"
                value={formData.codLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, codLocation: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Deskripsi Lengkap & Alasan Dijual</label>
            <textarea
              rows="3"
              placeholder="Jelaskan kondisi barang, minus (jika ada), kelengkapan, dan alasan dijual..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          {/* ========================================================================= */}
          {/* SECTION PEMBAYARAN KHUSUS: Biaya Admin Listing Lapak Rp 2.000 (QRIS ONLY) */}
          {/* ========================================================================= */}
          <div className="border border-emerald-500/30 bg-slate-950/90 rounded-2xl p-5 space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header Title Pembayaran */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                    <span>Biaya Admin Listing Lapak:</span>
                    <span className="text-emerald-400 font-black text-lg">Rp 2.000</span>
                  </h3>
                  <p className="text-xs text-slate-400">Metode Pembayaran Resmi: <strong className="text-emerald-300">QRIS National</strong></p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 tracking-wider">
                QRIS WAJIB
              </span>
            </div>

            {/* Instruksi Ringkas */}
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                Scan QRIS ini menggunakan aplikasi e-wallet / m-banking pilihan Anda sebesar <strong className="text-emerald-400 font-bold">Rp2.000</strong>.
              </p>
            </div>

            {/* Visual Display QRIS */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              
              {/* Box Kode QRIS Resmi */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center bg-white p-3.5 rounded-2xl shadow-xl text-slate-900 border border-slate-200 text-center">
                {/* Header Band Logo QRIS */}
                <div className="w-full flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="font-black text-red-600 text-sm tracking-tighter italic">QRIS</span>
                    <span className="text-[8px] font-bold text-slate-500 block leading-tight text-left">STANDAR<br/>PEMBAYARAN</span>
                  </div>
                  <div className="bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded tracking-wide">
                    GPN
                  </div>
                </div>

                {/* QR Code Image Placeholder */}
                <div className="relative p-1 bg-white rounded-lg border border-slate-100">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=00020101021126580014ID.LINKAJA.WWW01189360091100000000000215200459995303360540420005802ID5916KAMPUSTHRIFT.UNNES6008SEMARANG61055022962070703A0163040E03" 
                    alt="QRIS Admin Listing Rp2.000 KampusThrift" 
                    className="w-36 h-36 object-contain rounded-md"
                  />
                </div>

                {/* Detail Merchant & Fee */}
                <div className="w-full mt-2 pt-2 border-t border-slate-200">
                  <p className="font-extrabold text-xs text-slate-900 uppercase tracking-tight">KAMPUSTHRIFT UNNES</p>
                  <p className="text-[10px] text-slate-500 font-mono">NMID: ID1024398129031</p>
                  <div className="mt-1 bg-emerald-100 text-emerald-800 font-extrabold text-[11px] py-1 px-2 rounded-md inline-block">
                    Admin Fee: Rp 2.000
                  </div>
                </div>
              </div>

              {/* Panduan Pembayaran & App Badges */}
              <div className="sm:col-span-7 space-y-3">
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px] border border-emerald-500/30">1</span>
                    <span>Buka aplikasi <strong>GoPay, OVO, ShopeePay, DANA, LinkAja</strong> atau <strong>M-Banking</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px] border border-emerald-500/30">2</span>
                    <span>Pilih menu <strong>Scan / Bayar QRIS</strong> dan scan kode di samping sebesar <strong>Rp2.000</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px] border border-emerald-500/30">3</span>
                    <span>Simpan / Capture bukti transfer pembayaran Anda.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px] border border-emerald-500/30">4</span>
                    <span>Unggah foto bukti transfer pada kolom di bawah ini.</span>
                  </div>
                </div>

                {/* Supported Payment Badges */}
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1.5 font-semibold">Bisa Pakai Semua Aplikasi Pembayaran:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['GoPay', 'OVO', 'ShopeePay', 'DANA', 'LinkAja', 'BCA Mobile', 'Livin Mandiri', 'BRImo'].map(app => (
                      <span key={app} className="text-[10px] font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Komponen Upload Bukti Pembayaran (Wajib) */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4 text-emerald-400" />
                  <span>Unggah Bukti Transfer / Capture QRIS (Max 5MB) *</span>
                </label>
                {paymentProofBase64 && (
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Bukti Transfer Terunggah ✓</span>
                  </span>
                )}
              </div>

              {paymentProofError && (
                <div className="p-2.5 bg-red-500/10 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{paymentProofError}</span>
                </div>
              )}

              {paymentProofBase64 ? (
                /* Payment Proof Local Preview & Status Box */
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-emerald-500/60 bg-slate-950 shrink-0">
                      <img src={paymentProofBase64} alt="Bukti Transfer QRIS" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white">{paymentProofFile ? paymentProofFile.name : 'bukti_transfer_qris.jpg'}</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">Base64</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">Metode: QRIS • Nominal: Rp2.000 • Status: Terverifikasi</p>
                    </div>
                  </div>

                  <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition-colors border border-slate-700 shrink-0">
                    <span>Ganti Foto</span>
                    <input type="file" accept="image/*" onChange={handlePaymentProofChange} className="hidden" />
                  </label>
                </div>
              ) : (
                /* Upload Dropzone Placeholder */
                <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer bg-slate-950/60 hover:bg-slate-900/80 transition-all flex flex-col items-center justify-center gap-1.5 group">
                  <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-emerald-500/20 text-slate-400 group-hover:text-emerald-400 flex items-center justify-center transition-colors">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">Unggah Bukti Transfer / Capture QRIS (Max 5MB)</span>
                  <span className="text-[11px] text-slate-400">Format Gambar: JPG, PNG, WEBP (Convert ke String Base64)</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mt-1">
                    * Tombol "Tayangkan Lapak" dalam keadaan disabled sebelum bukti transfer diunggah.
                  </span>
                  <input type="file" accept="image/*" onChange={handlePaymentProofChange} className="hidden" />
                </label>
              )}
            </div>

          </div>

          {/* Submit CTA Button (Disabled until Payment Proof Uploaded) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isUploading || !paymentProofBase64}
              className={`w-full py-3.5 px-6 font-extrabold text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 ${
                isUploading || !paymentProofBase64
                  ? 'bg-slate-800 text-slate-500 border border-slate-700/80 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/25 cursor-pointer transform hover:-translate-y-0.5'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Menyimpan ke Firestore Spark Plan (Maks 5s)...</span>
                </>
              ) : !paymentProofBase64 ? (
                <>
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span>Unggah Bukti Transfer QRIS Rp2.000 untuk Tayangkan Lapak</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 fill-slate-950" />
                  <span>Tayangkan Lapak (Bukti QRIS Terkonfirmasi ✓)</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

