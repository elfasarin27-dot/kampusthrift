import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Mail, 
  Upload, 
  Award, 
  Sparkles, 
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudentVerificationModal({
  onClose,
  currentUser,
  onVerifyUser
}) {
  const [emailInput, setEmailInput] = useState(currentUser?.email || '');
  const [method, setMethod] = useState('email'); // 'email' | 'ktm'
  const [ktmFile, setKtmFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(currentUser?.badgeVerified || false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (method === 'email' && !emailInput.toLowerCase().endsWith('@students.unnes.ac.id')) {
      alert('Email harus menggunakan format domain institusi UNNES: username@students.unnes.ac.id');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onVerifyUser(emailInput || 'mahasiswa@students.unnes.ac.id');

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto modal-backdrop animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden glass-panel my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-white">Verifikasi Mahasiswa UNNES</h2>
              <p className="text-xs text-slate-400">Dapatkan Verified Badge 🎓 & Tingkatkan Trust Score</p>
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
        <div className="p-6 space-y-6">

          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-2 border-emerald-500 shadow-xl shadow-emerald-500/20 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40 mb-2">
                  🎓 Verified Student UNNES Active
                </span>
                <h3 className="text-xl font-heading font-bold text-white">Selamat! Akun Anda Terverifikasi</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto mt-2 leading-relaxed">
                  Badge centang hijau <strong className="text-emerald-400">@students.unnes.ac.id</strong> kini aktif di semua produk & profil Anda. Mahasiswa lain akan lebih percaya berbertransaksi COD dengan Anda!
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/25"
              >
                Tutup & Mulai Berjual Beli
              </button>
            </div>
          ) : (
            <>
              {/* Benefits Banner */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2.5">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Keuntungan Akun Terverifikasi UNNES:</span>
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Lapak produk mendapatkan ikon 🎓 <strong>Verified Student Badge</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Tampil di urutan teratas filter <strong>"Penjual Terverifikasi"</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Meningkatkan Honesty Score & kepercayaan pembeli kos & kampus</span>
                  </li>
                </ul>
              </div>

              {/* Method Switcher Tabs */}
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    method === 'email' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Via Email Institutional (@students.unnes.ac.id)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('ktm')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    method === 'ktm' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Via Unggah Foto KTM UNNES
                </button>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                {method === 'email' ? (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Masukkan Email Mahasiswa UNNES:</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="namamu@students.unnes.ac.id"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-emerald-400 font-bold placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Wajib berakhiran <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">@students.unnes.ac.id</code>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Unggah Foto Kartu Tanda Mahasiswa (KTM UNNES):</span>
                    </label>
                    <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-950/60 block transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                      <span className="text-xs font-semibold text-slate-200 block">Pilih File Foto KTM UNNES</span>
                      <span className="text-[10px] text-slate-400">Data NIM & Nama terlindungi kebijakan privasi</span>
                      <input type="file" accept="image/*" onChange={(e) => setKtmFile(e.target.files[0])} className="hidden" />
                    </label>
                    {ktmFile && (
                      <div className="text-xs text-emerald-400 font-semibold text-center">
                        File terpilih: {ktmFile.name}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Memverifikasi Akun UNNES...</span>
                  ) : (
                    <>
                      <span>Klaim Verified Student Badge 🎓</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
