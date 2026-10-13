import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  UserCheck, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  GraduationCap, 
  User,
  Sparkles,
  AlertCircle,
  Phone,
  MapPin
} from 'lucide-react';

export default function AuthModal({
  onClose,
  onLoginSuccess,
  registeredUsers,
  onRegisterUser,
  actionContext // 'contact_seller' | 'post_item' | 'favorite' | 'general'
}) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [userType, setUserType] = useState('student'); // 'student' | 'general'
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Register State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Sekaran UNNES');
  const [faculty, setFaculty] = useState('FT');
  const [password, setPassword] = useState('');

  const getContextPrompt = () => {
    switch (actionContext) {
      case 'contact_seller':
        return {
          title: 'Login / Daftar untuk Chat WhatsApp',
          desc: 'Untuk keamanan transaksi UNNES, silakan masuk ke akun terdaftar sebelum menghubungi penjual.'
        };
      case 'post_item':
        return {
          title: 'Login / Daftar untuk Jual Barang',
          desc: 'Pasang lapak preloved kamu secara gratis setelah membuat akun terdaftar.'
        };
      case 'favorite':
        return {
          title: 'Login / Daftar untuk Simpan Favorit',
          desc: 'Simpan barang idamanmu ke dalam daftar favorit dengan akun terdaftar.'
        };
      default:
        return {
          title: 'Selamat Datang di KampusThrift UNNES',
          desc: 'Masuk atau buat akun baru untuk mulai berjual beli barang preloved kampus.'
        };
    }
  };

  const contextInfo = getContextPrompt();

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!loginEmail || !loginPassword) {
      setAuthError('Mohon isi Alamat Email dan Kata Sandi!');
      return;
    }

    // Check if user exists in registered database
    const existingUser = registeredUsers.find(
      u => u.email.toLowerCase() === loginEmail.toLowerCase().trim()
    );

    if (!existingUser) {
      setAuthError('❌ Email belum terdaftar! Silakan klik tab "Daftar Baru" terlebih dahulu untuk membuat akun.');
      return;
    }

    if (existingUser.password !== loginPassword) {
      setAuthError('❌ Password yang Anda masukkan salah! Silakan coba lagi.');
      return;
    }

    // Login Success!
    onLoginSuccess(existingUser);
    onClose();
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!fullName || !email || !phone || !address || !password) {
      setAuthError('Mohon lengkapi semua data: Nama, Email, Nomor HP/WA, Alamat, dan Password!');
      return;
    }

    // Format phone number to standard WA format 628xxx
    let formattedPhone = phone.trim().replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    }

    const isStudentEmail = email.toLowerCase().endsWith('@students.unnes.ac.id');
    const isStudentRole = userType === 'student' || isStudentEmail;

    // Check if email already registered
    const existingUser = registeredUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (existingUser) {
      setAuthError('⚠️ Email ini sudah terdaftar! Silakan pindah ke tab "Masuk Akun".');
      return;
    }

    const newUser = {
      userId: `user-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: formattedPhone,
      phoneNumberWa: formattedPhone,
      address: address.trim(),
      faculty: faculty,
      password: password,
      isStudent: isStudentRole,
      badgeVerified: isStudentRole,
      role: isStudentRole ? 'verified_student' : 'general',
      campusName: isStudentRole ? `UNNES (${faculty})` : `Warga (${address})`,
      ratingHonesty: 5.0,
      totalReviews: 0,
      avatar: isStudentRole 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };

    onRegisterUser(newUser);
    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto modal-backdrop animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden glass-panel my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Lock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-base text-white">Akun KampusThrift UNNES</h2>
              <p className="text-xs text-slate-400">Autentikasi Terverifikasi Real Database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">

          {/* Action Restricted Context Alert */}
          {actionContext && actionContext !== 'general' && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300 font-bold block">{contextInfo.title}</strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">{contextInfo.desc}</p>
              </div>
            </div>
          )}

          {/* Login / Register Tab Switcher */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => {
                setTab('login');
                setAuthError('');
              }}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'login' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Masuk Akun Terdaftar
            </button>
            <button
              onClick={() => {
                setTab('register');
                setAuthError('');
              }}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'register' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>

          {/* Auth Error Banner */}
          {authError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-semibold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Alamat Email Terdaftar *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="nama@students.unnes.ac.id atau nama@gmail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Kata Sandi *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="Masukkan kata sandi..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Masuk Ke Akun Saya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER FORM */}
          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              
              {/* Type Selection */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Tipe Pendaftaran:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUserType('student');
                      if (!email) setEmail('nama@students.unnes.ac.id');
                    }}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                      userType === 'student'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    🎓 Mahasiswa UNNES
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserType('general');
                      if (email.endsWith('@students.unnes.ac.id')) setEmail('');
                    }}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                      userType === 'general'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    👤 Pengguna Umum
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Nama Lengkap *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dimas Prasetyo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Alamat Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder={userType === 'student' ? 'username@students.unnes.ac.id' : 'emailkamu@gmail.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                {userType === 'student' && (
                  <p className="text-[10px] text-emerald-400">
                    *Gunakan domain <code className="bg-slate-950 px-1 py-0.5 rounded">@students.unnes.ac.id</code> untuk langsung mendapat Verified Student Badge 🎓!
                  </p>
                )}
              </div>

              {/* Phone / WA Number */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Nomor HP / WhatsApp Active *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Address / Faculty */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Fakultas / Area</label>
                  <select
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="FT">FT UNNES</option>
                    <option value="FMIPA">FMIPA UNNES</option>
                    <option value="FIS">FIS UNNES</option>
                    <option value="FEB">FEB UNNES</option>
                    <option value="FIP">FIP UNNES</option>
                    <option value="FBS">FBS UNNES</option>
                    <option value="FIK">FIK UNNES</option>
                    <option value="FH">FH UNNES</option>
                    <option value="Banaran">Banaran / Sekaran</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Alamat Kos / Rumah *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sekaran Gang Cempaka No. 12"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Buat Kata Sandi *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="Minimal 6 karakter..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer pt-2"
              >
                <span>Daftar Akun Baru & Masuk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
