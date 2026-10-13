import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  Save, 
  GraduationCap,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function UserProfileModal({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile
}) {
  if (!isOpen || !currentUser) return null;

  const isGuest = currentUser?.role === 'guest';
  const isVerified = currentUser?.badgeVerified || currentUser?.role === 'verified_student';

  const [fullName, setFullName] = useState(currentUser.fullName || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || currentUser.phoneNumberWa || '');
  const [faculty, setFaculty] = useState(currentUser.faculty || 'FT');
  const [address, setAddress] = useState(currentUser.address || 'Sekaran UNNES');
  
  const [isEditing, setIsEditing] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !address) {
      alert('Mohon isi semua data: Nama, Email, Nomor HP/WA, dan Alamat!');
      return;
    }

    // Format phone
    let formattedPhone = phone.trim().replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    }

    const isStudentEmail = email.toLowerCase().endsWith('@students.unnes.ac.id');

    const updatedUser = {
      ...currentUser,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: formattedPhone,
      phoneNumberWa: formattedPhone,
      faculty: faculty,
      address: address.trim(),
      isStudent: isStudentEmail ? true : currentUser.isStudent,
      badgeVerified: isStudentEmail ? true : currentUser.badgeVerified,
      role: isStudentEmail ? 'verified_student' : currentUser.role,
      campusName: isStudentEmail ? `UNNES (${faculty})` : `Warga (${address})`
    };

    onUpdateProfile(updatedUser);
    setIsEditing(false);
    setToastMsg('✅ Data profil berhasil diperbarui & disimpan!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto modal-backdrop animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden glass-panel my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-heading font-extrabold text-lg text-white">{currentUser.fullName}</h2>
                {isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" title="Verified Student UNNES" />
                )}
              </div>
              <p className="text-xs text-emerald-400 font-medium">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {toastMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {isGuest ? (
            <div className="text-center py-8 space-y-3">
              <AlertCircle className="w-12 h-12 mx-auto text-amber-400" />
              <h3 className="text-base font-bold text-white">Mode Tamu (Belum Login)</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Anda belum terdaftar. Silakan login atau buat akun baru untuk melihat dan mengubah data profil Anda.
              </p>
            </div>
          ) : (
            <>
              {/* Profile Card Header Status */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status Akun:</span>
                  {isVerified ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>Mahasiswa UNNES Terverifikasi (@students.unnes.ac.id)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 mt-0.5">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Pengguna Umum (Belum Verifikasi Kampus)</span>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isEditing
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                  }`}
                >
                  {isEditing ? 'Batal Edit' : '✏️ Ubah Data Profil'}
                </button>
              </div>

              {/* VIEW MODE */}
              {!isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-emerald-400" /> Nama Lengkap
                      </span>
                      <span className="text-sm font-extrabold text-white block">{currentUser.fullName}</span>
                    </div>

                    <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-emerald-400" /> Alamat Email
                      </span>
                      <span className="text-sm font-extrabold text-emerald-400 block truncate">{currentUser.email}</span>
                    </div>

                    <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" /> No. HP / WhatsApp
                      </span>
                      <span className="text-sm font-extrabold text-white block">{currentUser.phone || currentUser.phoneNumberWa}</span>
                    </div>

                    <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-emerald-400" /> Fakultas / Area UNNES
                      </span>
                      <span className="text-sm font-extrabold text-white block">{currentUser.faculty || 'FT UNNES'}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Alamat Lengkap Kos / Rumah
                    </span>
                    <span className="text-sm font-semibold text-slate-200 block">{currentUser.address || 'Sekaran UNNES'}</span>
                  </div>
                </div>
              ) : (
                /* EDIT FORM MODE */
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                    />
                    <p className="text-[10px] text-slate-400">
                      *Ubah ke email <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">@students.unnes.ac.id</code> untuk langsung verifikasi Mahasiswa UNNES 🎓!
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Nomor HP / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Fakultas / Area</label>
                      <select
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan Data</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}
