import React from 'react';
import { Home, Compass, PlusCircle, Heart, User } from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  onOpenPostModal,
  onOpenProfileDrawer,
  favoritesCount
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-2 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
          activeTab === 'home' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Beranda</span>
      </button>

      <button
        onClick={() => setActiveTab('explore')}
        className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
          activeTab === 'explore' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>Fakultas</span>
      </button>

      {/* Floating Center Post CTA */}
      <button
        onClick={onOpenPostModal}
        className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white w-12 h-12 rounded-full shadow-lg shadow-emerald-500/40 border-4 border-slate-950 active:scale-95 transition-transform"
      >
        <PlusCircle className="w-6 h-6" />
      </button>

      <button
        onClick={onOpenProfileDrawer}
        className="relative flex flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
      >
        <Heart className="w-5 h-5" />
        <span>Favorit</span>
        {favoritesCount > 0 && (
          <span className="absolute -top-1 right-2 w-4 h-4 bg-emerald-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
            {favoritesCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenProfileDrawer}
        className="flex flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
      >
        <User className="w-5 h-5" />
        <span>Akun</span>
      </button>
    </div>
  );
}
