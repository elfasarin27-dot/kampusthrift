import React from 'react';
import { UNNES_FACULTIES, CATEGORIES } from '../data/mockData';
import { 
  MapPin, 
  SlidersHorizontal, 
  CheckCircle2, 
  BookOpen, 
  Laptop, 
  Home, 
  Shirt, 
  Trophy, 
  Grid,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

const CATEGORY_ICONS = {
  Sparkles: Sparkles,
  BookOpen: BookOpen,
  Laptop: Laptop,
  Home: Home,
  Shirt: Shirt,
  Trophy: Trophy,
  Grid: Grid
};

export default function CampusFilterBar({
  selectedFaculty,
  setSelectedFaculty,
  selectedCategory,
  setSelectedCategory,
  radiusKm,
  setRadiusKm,
  verifiedOnly,
  setVerifiedOnly,
  sortBy,
  setSortBy
}) {
  return (
    <div className="w-full space-y-4 mb-8">
      {/* Hero Banner Intro */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900/40 via-slate-900 to-teal-900/40 border border-emerald-500/20 p-6 md:p-8 glass-panel shadow-xl">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Semarang Campus Hyperlocal Network • Sekaran UNNES</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Pasar Preloved Mahasiswa <span className="gradient-text">UNNES</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed">
            Cari buku kuliah, elektronik, furnitur kos, dan outfit bekas layak pakai dari sesama mahasiswa UNNES. 
            <strong className="text-emerald-400 font-semibold"> COD Gratis Rp0 Ongkir</strong> di Kantin FT, MIPA, FIS, FEB, FIP, FBS, FIK, FH & Banaran!
          </p>
        </div>
      </div>

      {/* Main Filter Section */}
      <div className="glass-panel rounded-2xl p-4 md:p-6 border border-slate-800 space-y-5">
        
        {/* Top Row: Faculty Selector & Radius Slider */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          
          {/* Faculty / Area Chips */}
          <div className="flex-1 overflow-hidden">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pilih Lokasi Kampus / Fakultas UNNES:</span>
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {UNNES_FACULTIES.map((fac) => {
                const isActive = selectedFaculty === fac.id;
                return (
                  <button
                    key={fac.id}
                    onClick={() => setSelectedFaculty(fac.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {fac.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distance Radius Range */}
          <div className="w-full lg:w-64 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-400 font-semibold">Maksimal Jarak COD:</span>
              <span className="text-emerald-400 font-bold">{radiusKm} km dari Kos/Fakultas</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="5"
              step="0.1"
              value={radiusKm}
              onChange={(e) => setRadiusKm(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Second Row: Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.icon] || Grid;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Row: Verified Seller Checkbox & Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
          
          {/* Verified Seller Toggle */}
          <label className="flex items-center gap-2 cursor-pointer bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-emerald-500/40 transition-colors">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-200">
              Hanya Penjual Terverifikasi UNNES (<span className="text-emerald-400">@students.unnes.ac.id</span>)
            </span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="newest">Paling Baru Diunggah</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="rating">Rating Penjual Tertinggi</option>
              <option value="distance">Jarak COD Terdekat</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}
